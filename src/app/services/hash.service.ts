import { Injectable } from '@angular/core';

const bcrypt = require('bcryptjs');

@Injectable({
  providedIn: 'root'
})

export class HashService {

  constructor(
    
  ) { }

  // HashingPassword(rawPassword: string): Promise<string>{
  
  //   const md = forge.md.sha256.create();
  //   md.update(rawPassword);
  //   const hashedPassword = md.digest().toHex();
  //   return Promise.resolve(hashedPassword);

  // }


  async HashingPassword(rawPassword: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(rawPassword, salt);
  
    return hash; // This hash is what you store in the database
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    console.log(password, storedHash)
    const isMatch = await bcrypt.compare(password, storedHash);
    return isMatch; // true if the password matches, false otherwise
  }

}
