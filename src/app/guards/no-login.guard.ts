import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

  constructor(
    private utilsSvc: UtilService,
    private userSvc: UserService
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
        
      if(await this.userSvc.getLoggedUser() == false){
        return true;
      }else{
        this.utilsSvc.routerLink('/home');
        return false;
      }

    }
  
}
