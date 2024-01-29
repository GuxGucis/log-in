import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  async hashPassword(password: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(password); // Codifica el password como UTF-8
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); // Hashea el buffer
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convierte el buffer a un array de bytes
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convierte los bytes a hexadecimal
    return hashHex;
  }

}
