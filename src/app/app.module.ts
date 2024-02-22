import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MySqlite } from './services/mysqlite.service';
import { PipesModule } from './pipes/pipes.module';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { HashService } from './services/hash.service';
import { MyHttpInterceptor } from './services/interceptor.interceptor';

registerLocaleData(es)


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    { 
      provide: LOCALE_ID, 
      useValue: 'es-ES' 
    },
    MySqlite,
    PipesModule,
    HashService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
