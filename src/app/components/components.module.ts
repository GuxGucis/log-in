import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinginFormComponent } from './singin-form/singin-form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SinginFormComponent
  ],
  exports:[
    HeaderComponent,
    SinginFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }