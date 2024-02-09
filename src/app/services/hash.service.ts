import { Injectable } from '@angular/core';
import * as forge from  'node-forge';
import * as CryptoJS from 'crypto-js';
import {jwtDecode} from 'jwt-decode';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  private secretKey = 'your-secret-key'; // This should be kept secure and on the server-side in real apps

  constructor(
    
  ) { }

  HashingPassword(rawPassword: string): Promise<string>{
  
    const md = forge.md.sha256.create();
    md.update(rawPassword);
    const hashedPassword = md.digest().toHex();
    return Promise.resolve(hashedPassword);

  }

  // Simulate JWT creation
  generateJWT(payload: any): string {
    // Normally, you would use an actual JWT library to handle token creation.
    // For simulation, we'll concatenate payload info with a fake signature.
    const payloadBase64 = btoa(JSON.stringify(payload));
    const signature = forge.md.sha256.create().update(payloadBase64 + this.secretKey).digest().toHex();
    return `${payloadBase64}.${signature}`;
  }

  // Simulate JWT verification
  verifyJWT(token: string): boolean {
    const [payloadBase64, signature] = token.split('.');
    const expectedSignature = forge.md.sha256.create().update(payloadBase64 + this.secretKey).digest().toHex();
    return signature === expectedSignature;
  }

  // // Imula la generación the JWT ( De normal esto sería un proceso del servidor )
  // generateJWT(user: User): string {
  //   // Simulate payload and encode JWT. Do NOT use in production.
  //   const payload = { //La info que se vaya a codificar del usuario para mandar en el token
  //     userName: user.userName,
  //     email: user.email
  //   };
  //   const simulatedJWT = btoa(JSON.stringify(payload)); // Simple Base64 encoding, not a real JWT
  //   return simulatedJWT;
  // }

  // // Decodificación y validación de JWT (simple)
  // decodeJWT(token: string): User | null {
  //   try {
  //     const decoded = jwtDecode(token); // Decodificado
  //     if (this.isTokenExpired(decoded)) {
  //       console.log('Token expired');
  //       return null;
  //     }
  //     // Esto asume que el token que decodifica va a ser info de un usuario (es demomento lo que se tiene, pero a la larga estudiar ver una manera de clasificar un token en función del header o asi)
  //     return decoded as User;
  //   } catch (error) {
  //     console.error('Failed to decode JWT:', error);
  //     return null;
  //   }
  // }

  // // Comprueba que el token no ha caducado
  // private isTokenExpired(decodedToken: any): boolean {
  //   const now = Date.now().valueOf() / 1000;
  //   return decodedToken.exp < now;
  // }

}
