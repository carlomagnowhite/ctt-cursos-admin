import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { authGuard } from './services/AuthGuard/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { RecoverPasswordFormComponent } from './login/recover-password-form/recover-password-form.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { TeachersComponent } from './home/teachers/teachers.component';

export const routes: Routes = [
  {path: "", component: LoginPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "dashboard", component: DashboardComponent, canActivate:[authGuard], children:
    [
      {path: "user-profile", component: UserProfileComponent},
      {path: "teachers", component: TeachersComponent},
    ]
  },
  {path: "set-password", component: RecoverPasswordFormComponent}
];
