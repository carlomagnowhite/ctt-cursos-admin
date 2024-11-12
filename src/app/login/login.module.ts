import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormLoginComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormLoginComponent,
    LoginPageComponent
  ]
})
export class LoginModule { }
