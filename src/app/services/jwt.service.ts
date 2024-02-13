import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private secretKey = 'your-256-bit-secret';
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  loginAuth(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      console.log('Token is valid:', decoded);
      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      return false; // Token is invalid
    }
  }
}
