import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/interfaces/user.model';
import { SQLiteService } from 'src/app/services/sqlite.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private utilsSvc: UtilService,
    private sqlSvc: SQLiteService,
    private storageSvc: StorageService
  ) { }

  async ngOnInit() {
    await this.storageSvc.initializeDatabase('Users');
  }

  async Submit(){
    console.log(this.form.value)
    if(this.form.valid){
      if(this.form.value.userName != null || this.form.value.userName != undefined){
        this.storageSvc.addUser(this.form.value.userName);
      }else{
        console.log('error entrando en el if de addUser');
      }
    }
  }

}
