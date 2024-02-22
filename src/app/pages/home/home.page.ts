import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userName: string | undefined;

  constructor(
    private utilsSvc: UtilService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.userName = this.userSvc.getLastUser()?.userName
  }

  singOut(): Promise<void>{
    return this.utilsSvc.presentAlert({
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
    });
  }

}
