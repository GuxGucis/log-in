import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private utilsSvc: UtilService,
    private userSvc: UserService
  ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    
      if(await this.userSvc.getLoggedUser() == true){
        return true;
      }else{
        this.utilsSvc.routerLink('/login');
        return false;
      }

    }
  
}
