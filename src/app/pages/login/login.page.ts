import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/interfaces/user.model';
import { MySqlite } from 'src/app/services/mysqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  private user!: User;
  private inputSubmit = false;

  logForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private mysqliteSvc: MySqlite,
    private utilsSvc: UtilService,
  ) {}

  async ngOnInit() {
    await this.mysqliteSvc.initializeDB();
  }

  async Submit(){
    
    if(this.logForm.valid){
      
      if(this.logForm.value.userName != null || this.logForm.value.userName != undefined){
        
        let user: User = {
          userName: this.logForm.value.userName,
        }

        this.inputSubmit = true;
        
        if(await this.mysqliteSvc.addUser(user)){
          console.log('Usuario logeado')
          this.utilsSvc.routerLink('/home')
        }

      }else{
        console.log('Error en el log de Usuario');
      }
    }
  }



  async LogUser(){
    console.log('--');
    // if(this.inputSubmit){  
    //   const userName = this.logForm.value.userName;
    //   console.log(userName)
    //   if (userName) {
    //       try {
    //           const user = await this.mysqliteSvc.getUserByUserName(userName);
    //           return user; // This will be null if user is not found
    //       } catch (error) {
    //           console.error('Error fetching user:', error);
    //           return null;
    //       }
    //   } else {
    //       console.log('Username is empty');
    //       return null;
    //   }
    // }else{
    //   return null
    // }
  }

}
