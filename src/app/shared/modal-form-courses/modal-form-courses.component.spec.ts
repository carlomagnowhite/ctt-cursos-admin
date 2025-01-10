import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormCoursesComponent } from './modal-form-courses.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ModalFormCoursesComponent', () => {
  let component: ModalFormCoursesComponent;
  let fixture: ComponentFixture<ModalFormCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormCoursesComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente.', () => {
    expect(component).toBeTruthy();
  });
});
