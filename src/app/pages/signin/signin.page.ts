import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { formData } from 'src/app/interfaces/formData.model';
import { HashService } from 'src/app/services/hash.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import DataEs from '../../../assets/formDataEs.json';
import { HttpService } from 'src/app/services/http.service';

const data: formData = DataEs as formData;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit{


  Countries = data.Country;
  comunidadAutonoma = data.Region;
  genders = data.Gender
  provincia! : string[];
  HashPass!: string;
  cc!: string;

  singForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, 
                                Validators.email
                                ]),   
    phone: new FormControl('', [this.validatorSvc.AllNumericValidator()]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, 
                                    Validators.minLength(8),
                                    this.validatorSvc.uppercaseValidator(),
                                    this.validatorSvc.lowercaseValidator(),
                                    this.validatorSvc.numericValidator(),
                                    this.validatorSvc.specialCharValidator()
                                ]),
    country: new FormControl('', Validators.required),
    comunidadAutonoma: new FormControl({value: '', disabled: true}),
    provincia: new FormControl({value: '', disabled: true})
  })

  constructor(
    private userSvc: UserService,
    private utilsSvc: UtilService,
    private hashSvc: HashService,
    private validatorSvc: ValidatorsService,
    private authHTTP: HttpService
  ) { }

  ngOnInit(): void {

    this.singForm.get('country')?.valueChanges.subscribe(selectedCountry => {
      if (selectedCountry === 'España') {
        this.singForm.get('comunidadAutonoma')?.enable();
      } else {
        this.singForm.get('comunidadAutonoma')?.disable();
      };
    });


    this.singForm.get('comunidadAutonoma')?.valueChanges.subscribe( selectedCCAA => {
      if(selectedCCAA){
        this.provincia = data.Province[selectedCCAA];
        this.singForm.get('provincia')?.enable();
      } else {
        this.singForm.get('provincia')?.disable();
      }
    });
  }

  handleGenderSelection(selectedGender: string | null): void{
    this.singForm.get('gender')?.setValue(selectedGender);
  }
 
  async Submit(userName: string, email: string, phone: string, name: string, surname: string, gender: string,
                 password: string, country: string, ccaa?: string, provincia?: string): Promise<boolean> {
    
    this.HashPass = await this.hashSvc.HashingPassword(password);
          
    let user: User = {
      id : +1,
      userName: userName,
      email: email,
      phone: phone,
      name: name,
      surname: surname,
      gender: gender,
      password: this.HashPass,
      country: country,
      ccaa: ccaa,
      provincia: provincia
    }
    
    if(await this.userSvc.StorageUser(user.userName, user.email, user.phone, user.name, user.surname, 
                              user.gender, user.password, user.country, user.ccaa, user.provincia)){

      // this.authHTTP.registerHTTP({email: user.email, password: user.password}).subscribe({
      this.authHTTP.registerHTTP().subscribe({
        next: (response) => {console.log('Registration successful', response);},
        error: (error) => {console.error('Registration failed', error);}
      })

      console.log('Usuario logeado', this.userSvc.lastUser);
      this.utilsSvc.routerLink('/home');
      this.singForm.reset()
      return true;

    }else{
      // User do match
      this.utilsSvc.presentToast("Usuario ya registrado");
      this.singForm.reset();
      console.log('Se ha encontrado un usuario');
      return false;
    }
  }

  async onSubmit(): Promise<boolean> {
    if (this.singForm.valid) {
      
    const userName = this.singForm.value.userName ?? '';
    const email = this.singForm.value.email ?? '';
    const phone = this.singForm.value.phone ?? '';
    const name = this.singForm.value.name ?? '';
    const surname = this.singForm.value.surname ?? '';
    const gender = this.singForm.value.gender ?? '';
    const password = this.singForm.value.password ?? '';
    const country = this.singForm.value.country ?? '';
    const comunidadAutonoma = this.singForm.value.comunidadAutonoma ?? '';
    const provincia = this.singForm.value.provincia ?? '';
      
      try {
        
        const success = await this.Submit(
          userName, email, phone, name, 
          surname, gender, password, 
          country, comunidadAutonoma, provincia
          );
  
        if (success) {

          return true;
          
        } else {
          
          console.log("Error específico al enviar los datos");
          return false;
        }
      } catch (error) {
        
        console.error("Submission error:", error);
        this.utilsSvc.presentToast("Error al enviar el formulario");
        return false;
      }
    } else {
      
      this.utilsSvc.presentToast("Por favor, completa todos los campos requeridos correctamente.");
      console.log(this.singForm.value);
      return false;
      
    }
  }

}
