import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterOutlet } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { LoginModule } from '../login/login.module';
import { TeacherModule } from '../teacher/teacher.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TeachersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    LoginModule,
    TeacherModule
  ]
})
export class HomeModule { }
