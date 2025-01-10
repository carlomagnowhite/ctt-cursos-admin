import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { HomeModule } from '../home/home.module';
import { ModalFormCoursesComponent } from './modal-form-courses/modal-form-courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInfoCoursesComponent } from './modal-info-courses/modal-info-courses.component';
import { ModalPricesComponent } from './modal-prices/modal-prices.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TableComponent,
    ModalFormCoursesComponent,
    ModalInfoCoursesComponent,
    ModalPricesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  exports: [
    HeaderComponent,
    SidebarComponent,
    TableComponent
  ]
})

export class SharedModule { }
