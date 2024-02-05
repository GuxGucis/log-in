import { Component} from '@angular/core';
import { MySqlite } from 'src/app/services/mysqlite.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  // user = this.utilsSvc.getElementInLocalStorage('user').userName

  constructor(
    private utilsSvc: UtilService,
    private sqliteSvc: MySqlite
  ) { }

  userName = this.sqliteSvc.getLastUser()?.userName

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
            this.sqliteSvc.setLoggedUser(false),
            this.utilsSvc.routerLink('/login');
          }
        }
      ]
    })
  }

}
