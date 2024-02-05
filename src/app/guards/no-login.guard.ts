import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MySqlite } from '../services/mysqlite.service';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

  constructor(
    private utilsSvc: UtilService,
    private SQLiteSvc: MySqlite
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
        
      if(await this.SQLiteSvc.getLoggedUser() == false){
        return true;
      }else{
        this.utilsSvc.routerLink('/home');
        return false;
      }

    }
  
}
