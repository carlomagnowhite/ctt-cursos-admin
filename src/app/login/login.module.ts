import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    FormLoginComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormLoginComponent,
    LoginPageComponent
  ]
})
export class LoginModule { }
