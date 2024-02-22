import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'https://apptest.free.beeceptor.com';

  constructor(
    private http: HttpClient
  ) { }

  /*
  ********************* USO SIMULADO CON REQRES.IN ( USANDO REQRES PARA SIMULAR LAS RESPUESTAS DE SERVER ) **************************
  * Como tal no hay almacenamiendo de usuarios, dado que es una api que sirve para ensayar con las respuestas de server
  */

  loginHTTP(): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {});
  }

  registerHTTP(): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {});
  }

  
}
