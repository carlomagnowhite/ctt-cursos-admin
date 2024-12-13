import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordModalComponent } from './recover-password-modal/recover-password-modal.component';
import { RecoverPasswordFormComponent } from './recover-password-form/recover-password-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FormLoginComponent,
    LoginPageComponent,
    RecoverPasswordModalComponent,
    RecoverPasswordFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FormLoginComponent,
    LoginPageComponent,
    RecoverPasswordModalComponent
  ]
})

export class LoginModule { }
