import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersComponent } from './teachers.component';
import { TableTeachersComponent } from '../../teacher/components/table-teachers/table-teachers.component';
import { TeacherModule } from '../../teacher/teacher.module';

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeachersComponent, TableTeachersComponent],
      imports: [TeacherModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });
});
