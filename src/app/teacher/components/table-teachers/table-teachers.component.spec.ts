import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeachersComponent } from './table-teachers.component';
import { TeachersComponent } from '../../../home/teachers/teachers.component';
import { ModalAddTeacherComponent } from '../modal-add-teacher/modal-add-teacher.component';
import { TeacherModule } from '../../teacher.module';

describe('TableTeachersComponent', () => {
  let component: TableTeachersComponent;
  let fixture: ComponentFixture<TableTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableTeachersComponent, ModalAddTeacherComponent],
      imports: [TeacherModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente.', () => {
    expect(component).toBeTruthy();
  });
});
