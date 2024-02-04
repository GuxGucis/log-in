import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MySqlite } from './mysqlite.service';
import { AlertController, AlertOptions, ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  // // ----------- Local Storage -----------

  // setElementInLocalStorage(key: string, element: any){
  //   return localStorage.setItem(key, JSON.stringify(element));
  // }

  // getElementInLocalStorage(key: string){
  //   return JSON.parse(localStorage.getItem(key) as string);
  // }

  // ----------- Router Link -----------

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  //------------- Toast -----------------------

  async presentToast(opt: ToastOptions) {
    const toast = await this.toastController.create(opt);
    toast.present();
  }

  //----------- Alerta de confirmacion -------------

  async presentAlert(opt: AlertOptions) {
    const alert = await this.alertController.create(opt);
  
    await alert.present();
  }

}
