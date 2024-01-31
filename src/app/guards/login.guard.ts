// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { UtilService } from '../services/util.service';
// import { LoginPage } from '../pages/login/login.page';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginGuard implements CanActivate {

//   constructor(
//     private utilsSvc: UtilService,
//     private loginPage: LoginPage
//   ){}
//   async canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Promise<boolean> {
    
//       if(await this.loginPage.LogUser()){
//         return true;
//       }else{
//         this.utilsSvc.routerLink('/login');
//         return false;
//       }

//     }
  
// }
