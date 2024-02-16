import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/interfaces/user.model';
import { TranslationService } from 'src/app/services/translate.service';
import { UserService } from 'src/app/services/user.service';

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
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private userSvc:  UserService,
    private translationSvc:  TranslationService,
    private utilsSvc: UtilService,
    private changeDetectorRef: ChangeDetectorRef 
  ) {
    this.translationSvc.setLanguage('es').subscribe();
  }


  ngOnInit(): void {

    this.UsersList = this.userSvc.UsersList

  }

  async onUserList(): Promise<boolean>{
    try {
      const usernames = await this.userSvc.fetchUsernames();
      this.UsersList = usernames;
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

        if(this.logForm.value.userName != null){
        
          if(this.logForm.value.password != null){

            const isValidUser  = await this.userSvc.isUserLoggedIn(this.logForm.value.userName, this.logForm.value.password);

            if(isValidUser){
              
              this.utilsSvc.routerLink('/home');
              this.logForm.reset();
              console.log('Access granted');
              return true;
                    
            }else{
              this.logForm.reset();
              console.log("NO se ha podido iniciar sesión");
              return false;
            }

          }else{
            console.log('Error en el log de Usuario');
            return false;
          }

        }else{
          console.log('Error el formulario no es válido', this.logForm.value.userName);
          return false;
        }

    } catch (error) {
        console.error('Error checking login status:', error);
        return false; // In case of error, return false or handle accordingly
    }
  }

}
