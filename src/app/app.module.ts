import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MySqlite } from './services/mysqlite.service';
import { PipesModule } from './pipes/pipes.module';

export function initializeApp(mySqliteService: MySqlite) {
  return (): Promise<any> => { 
    // Call the initialize method in your MySqlite service
    return mySqliteService.initializeDB();
  }
}

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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MySqlite,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [MySqlite], // Dependency Injection
      multi: true // Important: APP_INITIALIZER can have multiple functions
    },
    PipesModule
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
