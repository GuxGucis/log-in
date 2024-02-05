import { Component} from '@angular/core';
import { MySqlite } from 'src/app/services/mysqlite.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private utilsSvc: UtilService,
    private sqliteSvc: MySqlite,
    private userSvc: UserService
  ) { }

  userName = this.userSvc.lastUser?.userName;

  singOut(){
    this.utilsSvc.presentAlert({
      header: 'Cerrar sesión',
      message: '¿Seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Si, cerrar',
          handler: () => {
            this.userSvc.setLoggedUser(false),
            this.utilsSvc.routerLink('/login');
          }
        }
      ]
    })
  }

}
