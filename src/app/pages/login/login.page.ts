import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/interfaces/user.model';
import { TranslationService } from 'src/app/services/translate.service';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  LoggedUser!: User;
  HashPass!: string;

  UsersList!: string[];

  logForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private userSvc:  UserService,
    private translationSvc:  TranslationService,
    private utilsSvc: UtilService,
    private changeDetectorRef: ChangeDetectorRef,
    private authHTTP: HttpService
  ) {
    this.translationSvc.setLanguage('es').subscribe();
  }


  ngOnInit(): void {

    this.UsersList = this.userSvc.UsersList

  }

  async onUserList(): Promise<boolean>{
    try {
      const emails = await this.userSvc.fetchUsers();
      this.UsersList = emails;
      this.changeDetectorRef.detectChanges();
      return true;
    } catch (error) {
      console.error('Error fetching usernames:', error);
      this.UsersList = [];
      this.changeDetectorRef.detectChanges();
      return false;
    }
  }

  changeLanguage(lang: string): void {
    this.translationSvc.setLanguage(lang);
  }

  async isUserLoggedIn(): Promise<boolean>{
    try {
      if(this.logForm.value.email != null && this.logForm.value.password != null){
      
        const isValidUser  = await this.userSvc.isUserLoggedIn(this.logForm.value.email, this.logForm.value.password);

        if(isValidUser && this.userSvc.lastUser?.email && this.userSvc.lastUser?.password){

          console.log(isValidUser);
            
          let exito = false;
          this.authHTTP.loginHTTP().subscribe({
            next: (response) => {
              console.log('Login successful HTTP', response);
              this.utilsSvc.routerLink('/home');
              this.logForm.reset();
              console.log('Access granted');
              exito = true;
            },
            error: (error) => {
              console.error('Login failed', error);
              exito = false
            }
          });

          return exito;

        }else{
          this.logForm.reset();
          console.log("NO se ha podido iniciar sesión");
          return false;
        }

      }else{
        console.log('Error el formulario no es válido', this.logForm.value.email);
        return false;
      }

    } catch (error) {
        console.error('Error checking login status:', error);
        return false; 
    }
  }

}
