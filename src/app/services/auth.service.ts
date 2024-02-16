import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserToken } from '../interfaces/userToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users: UserToken[] = [];

  constructor() { }

  login(username: string, password: string){
    const user = this.users.find(user => user.userName === username && user.password === password);
    if (user) {
      const simulatedToken = `simulatedTokenFor-${username}`;
      return of({ token: simulatedToken });
    } else {
      return throwError(() => new Error('Authentication failed'));
    }
  }

  register(username: string, password: string) {
    const existingUser = this.users.find(user => user.userName === username);
    if (existingUser) {
      return throwError(() => new Error('Username already exists'));
    } else {
      // Simulate user registration by adding the new user to the array
      const newUser: UserToken = { userName: username, password: password, token: `simulatedTokenFor-${username}` };
      this.users.push(newUser);
      return of({ message: 'User registered successfully', user: newUser });
    }
  }

}
