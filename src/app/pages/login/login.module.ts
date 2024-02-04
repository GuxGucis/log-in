import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [LoginPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class LoginPageModule {}
