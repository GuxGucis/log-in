import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/interfaces/user.model';
import { TranslationService } from 'src/app/services/translate.service';
import { UserService } from 'src/app/services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  LoggedUser!: User;
  HashPass!: string;

  UsersList!: any;

  logForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private userSvc:  UserService,
    private utilsSvc: UtilService,
    private translationSvc:  TranslationService,
    private router: Router // Inject the Router
  ) {
    this.translationSvc.setLanguage('es').subscribe();
  }

  ngOnInit(): void {
    this.userSvc.fetchUsernames();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) 
    ).subscribe((event) => {
      this.userSvc.fetchUsernames();
    });
  }

  fetchUsernames(): void {
    this.userSvc.getUsernames().then(usernames => {
      this.UsersList = usernames;
    }).catch(error => {
      console.error('Error fetching usernames:', error);
    });
  }

  changeLanguage(lang: string) {
    this.translationSvc.setLanguage(lang);
  }

  async isUserLoggedIn(){
    try {

        if(this.logForm.value.userName != null){
        
          if(this.logForm.value.password != null){

            const result = await this.userSvc.isUserLoggedIn(this.logForm.value.userName, this.logForm.value.password);

            if(result == true){

              this.utilsSvc.routerLink('/home');
              this.logForm.reset();
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

        // // Assuming getDB() is a method that returns the database connection
        // const db = this.mysqliteSvc.getDB();
        // // Query the database for the user by userName
        // const result = await db.query(`SELECT * FROM Usuarios WHERE userName = ?`, [this.logForm.value.userName]);
        // if (result.values && result.values.length > 0) {
        //   // User found, now compare passwords
        //   const user = result.values[0];

        //   if(this.logForm.value.password != undefined){
        //     const hashedPassword = this.hashSvc.HashingPassword(this.logForm.value.password); // Hash the password provided during login
            
        //     if (user.password === hashedPassword) {
        //         // Passwords match
        //         this.mysqliteSvc.LoggedUser = true; // Assuming you're using this to track login status
        //         this.utilsSvc.routerLink('/home')
        //         this.logForm.reset()
        //         return true;
        //     } else {
        //         // Passwords do not match
        //         this.utilsSvc.presentToast({
        //           message: "The password is incorrect",
        //           duration: 5000, //milisegundos
        //           color: 'warning',
        //           icon: 'alert-circle-outline'
        //         })
        //         return false;
        //     }
