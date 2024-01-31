import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  // user = this.utilsSvc.getElementInLocalStorage('user').userName

  constructor(
    private utilsSvc: UtilService
  ) { }

}
