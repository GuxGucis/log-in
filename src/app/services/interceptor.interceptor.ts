import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {


  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log('Request made with:', request);

  //   return next.handle(request)
  //     .pipe(
  //       tap(event => {
  //         if (event instanceof HttpResponse) {
  //           console.log('Response received on interceptor:', event);
  //         }
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error from response on interceptor:', error);
  //         return throwError(error);
  //       })
  //     );
  // }

  // POR EJEMPLO PARA INTERCEPTAR EL CORREO Y PONER SIEMPRE EL MISMO Y TENER QUE PONERLO CADA

  private userExample = {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
      const modifiedRequest = request.clone({
        body: {
          ...request.body,
          ...this.userExample
        }
      });
      console.log('Request received on interceptor');
      return next.handle(modifiedRequest);
    }
    
    return next.handle(request);
  }

}

