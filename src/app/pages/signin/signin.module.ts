import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [SigninPage],
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      SigninPageRoutingModule,
      ComponentsModule,
      ReactiveFormsModule,
      PipesModule
  ]
})

export class SigninPageModule {}
