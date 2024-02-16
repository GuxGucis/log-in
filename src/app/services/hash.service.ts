import { Injectable } from '@angular/core';

import bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

export class HashService {

  constructor(
    
  ) { }

  async HashingPassword(rawPassword: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(rawPassword, salt);
  
    return hash; 
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    console.log(password, storedHash)
    const isMatch = await bcrypt.compare(password, storedHash);
    return isMatch; 
  }

}
