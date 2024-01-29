import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private router: Router,
  ) { }

  // ----------- Local Storage -----------

  setElementInLocalStorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementInLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key) as string);
  }

  // ----------- Router Link -----------

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

}
