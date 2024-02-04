import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports:[
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    PipesModule,
    FormsModule,
  ]
})
export class ComponentsModule { }