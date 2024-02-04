import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/interfaces/user.model';
import { MySqlite } from 'src/app/services/mysqlite.service';
import { TranslationService } from 'src/app/services/translate.service';
import { HashService } from 'src/app/services/hash.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  LoggedUser!: User;
  HashPass!: string;

  logForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private mysqliteSvc: MySqlite,
    private utilsSvc: UtilService,
    private translationSvc:  TranslationService,
    private hashSvc: HashService
  ) {
    this.translationSvc.setLanguage('es').subscribe();
  }

  async ngOnInit() {
    await this.mysqliteSvc.initializeDB();
  }

  changeLanguage(lang: string) {
    this.translationSvc.setLanguage(lang);
  }

  async isUserLoggedIn(){
    try {

        if(this.logForm.value.userName != null && this.logForm.value.userName != undefined ){
        
          if(this.logForm.value.password != null && this.logForm.value.password != undefined){

            const result = await this.mysqliteSvc.isUserLoggedIn(this.logForm.value.userName, this.logForm.value.password);

            if(result == true){

              this.utilsSvc.routerLink('/home');
              this.logForm.reset();
              return true;

            }else{
              console.log("NO se ha podido iniciar sesión");
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
