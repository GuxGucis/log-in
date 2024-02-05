import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { HashService } from 'src/app/services/hash.service';
import { MySqlite } from 'src/app/services/mysqlite.service';
import { UserService } from 'src/app/services/user.service';
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
    private userSvc: UserService,
    private utilsSvc: UtilService,
    private hashSvc: HashService

  ) { }

  async handleFormSubmit(formValue: { userName: string; email: string; password: string }) {
    const { userName, email, password } = formValue;
    this.HashPass = this.hashSvc.HashingPassword(password)
          
    let user: User = {
      id : +1,
      userName: userName,
      email: email,
      password: this.HashPass
    }
    
    if(await this.mysqliteSvc.addUser(user.userName, user.email, user.password)){

      console.log('Usuario logeado', this.userSvc.lastUser);
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
