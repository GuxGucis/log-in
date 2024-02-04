import { Injectable } from '@angular/core';
import * as forge from  'node-forge';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  HashingPassword(rawPassword: string){
  
    const md = forge.md.sha256.create();
    md.update(rawPassword);
    const hashedPassword = md.digest().toHex();
    return hashedPassword;

  }

}
