import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})

export class InputComponent {

  @Input() intype!: string;
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type!: string;


  @Output() formSubmit = new EventEmitter<{ userName: string; email: string; password: string }>();
  
  HashPass!: string;
  
  singForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, 
                                Validators.email
                                ]),   
    password: new FormControl('', [Validators.required, 
                                    Validators.minLength(8),
                                    this.uppercaseValidator(),
                                    this.lowercaseValidator(),
                                    this.numericValidator(),
                                    this.specialCharValidator()
                                    ]),
  })

  constructor( ) { }

  onSubmit() {
    if (this.singForm.valid) {
      this.formSubmit.emit({
        userName: this.singForm.value.userName ?? '',
        email: this.singForm.value.email ?? '',
        password: this.singForm.value.password ?? '',
      });
    }
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
