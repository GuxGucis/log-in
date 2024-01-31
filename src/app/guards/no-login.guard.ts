// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { UtilService } from '../services/util.service';
// import { LoginPage } from '../pages/login/login.page';

// @Injectable({
//   providedIn: 'root'
// })
// export class NoLoginGuard implements CanActivate {

//   constructor(
//     private utilsSvc: UtilService,
//     private loginPage:  LoginPage
//   ){}

//   async canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Promise<boolean> {
        
//       if(await this.loginPage.LogUser() == null){
//         return true;
//       }else{
//         this.utilsSvc.routerLink('/home');
//         return false;
//       }

//     }
  
// }
