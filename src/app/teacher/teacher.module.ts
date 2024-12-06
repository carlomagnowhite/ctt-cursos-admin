import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableTeachersComponent } from './components/table-teachers/table-teachers.component';
import { ModalAddTeacherComponent } from './components/modal-add-teacher/modal-add-teacher.component';

@NgModule({
  declarations: [
    TableTeachersComponent,
    ModalAddTeacherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    TableTeachersComponent,
    ModalAddTeacherComponent
  ]
})
export class TeacherModule { }
