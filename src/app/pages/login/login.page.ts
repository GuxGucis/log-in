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

  onUserList(): Promise<boolean>{
    return this.userSvc.fetchUsernames().then(usernames => {
      this.UsersList = usernames;
      this.changeDetectorRef.detectChanges();
      return true;
    }).catch(error => {
      console.error('Error fetching usernames:', error);
      this.UsersList = []; 
      this.changeDetectorRef.detectChanges();
      return false;
    });
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

              // // Generamos JWT for the user
              // const token = this.jwtSvc.generateToken({ username: this.logForm.value.userName, password: this.logForm.value.password });
              // // Y lo guardamos en local
              // localStorage.setItem('jwtToken', token);
              // //Verificamos el Token
              // const storedToken = localStorage.getItem('jwtToken') || '';

              // if (this.jwtSvc.verifyToken(storedToken)) {

                  
              // } else {
              //   // Redirect to login or show an error message
              //   console.log('Access denied: Invalid or expired token');
              //   return false;
              // }



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
