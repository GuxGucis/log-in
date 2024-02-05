import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { HashService } from 'src/app/services/hash.service';
import { MySqlite } from 'src/app/services/mysqlite.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage{

  HashPass!: string;

  singForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, 
                                    this.minLengthValidator(8),
                                    this.uppercaseValidator(),
                                    this.lowercaseValidator(),
                                    this.numericValidator(),
                                    this.specialCharValidator()
                                ]),
  })

  constructor(
    private mysqliteSvc: MySqlite,
    private storageSvc: StorageService,
    private utilsSvc: UtilService,
    private hashSvc: HashService

  ) { }

  async Submit(){
    
    if(this.singForm.valid){
      
      if(this.singForm.value.userName != null && this.singForm.value.userName != undefined ){
        
        if(this.singForm.value.password != null && this.singForm.value.password != undefined){

          this.HashPass = this.hashSvc.HashingPassword(this.singForm.value.password)
          
          let user: User = {
            id : +1,
            userName: this.singForm.value.userName,
            password: this.HashPass
          }
          
          if(await this.storageSvc.addUser(user.userName, user.password)){

            await this.mysqliteSvc.fetchUsuarios();
            console.log('Usuario logeado', this.mysqliteSvc.getLastUser());
            this.utilsSvc.routerLink('/home');
            return true;

          }else{
            // User do match
            this.utilsSvc.presentToast({
              message: "Usuario ya registrado",
              duration: 5000, //milisegundos
              color: 'warning',
              icon: 'alert-circle-outline'
            })
            this.singForm.reset();
            console.log('Se ha encontrado un usuario');
            return false;
          }

        }else{
          console.log('Error en el log de la contraseña');
          return false;
        }

      }else{
        console.log('Error en el log de Usuario');
        return false;
      }
    }else{
      console.log('Error el formulario no es válido');
      return false;
    }
  }

  // Validator for minimum length
  minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minLength) {
        return { minLength: { requiredLength: minLength, actualLength: control.value.length } };
      }
      return null;
    };
  }

  // Validator for uppercase character
  uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasUpperCase = /[A-Z]/.test(control.value);
      return !hasUpperCase ? { uppercaseRequired: true } : null;
    };
  }

  // Validator for lowercase character
  lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasLowerCase = /[a-z]/.test(control.value);
      return !hasLowerCase ? { lowercaseRequired: true } : null;
    };
  }

  // Validator for numeric character
  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasNumeric = /\d/.test(control.value);
      return !hasNumeric ? { numericRequired: true } : null;
    };
  }

  // Validator for special character
  specialCharValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      return !hasSpecialChar ? { specialCharRequired: true } : null;
    };
  }

}
