import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { authGuard } from './services/AuthGuard/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { RecoverPasswordFormComponent } from './login/recover-password-form/recover-password-form.component';

export const routes: Routes = [
  {path: "", component: LoginPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "dashboard", component: DashboardComponent, canActivate:[authGuard]},
  {path: "set-password", component: RecoverPasswordFormComponent}
];
