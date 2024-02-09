import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

    
  /*
  * ----------------- CUSTOM VALIDATORS --------------------
  */

  // Validator for uppercase character
  uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasUpperCase = /[A-Z]/.test(control.value);
      return !hasUpperCase ? { uppercaseRequired: true } : null;
    };
  };

  // Validator for lowercase character
  lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasLowerCase = /[a-z]/.test(control.value);
      return !hasLowerCase ? { lowercaseRequired: true } : null;
    };
  };

  // Validator for numeric character
  numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasNumeric = /\d/.test(control.value);
      return !hasNumeric ? { numericRequired: true } : null;
    };
  };

  AllNumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return null; // Consider empty values as valid
      }
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { 'numeric': { value: control.value } };
    };
  }

  // Validator for special character
  specialCharValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
      return !hasSpecialChar ? { specialCharRequired: true } : null;
    };
  };

}
