import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTeacherComponent } from './modal-add-teacher.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ModalAddTeacherComponent', () => {
  let component: ModalAddTeacherComponent;
  let fixture: ComponentFixture<ModalAddTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddTeacherComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });
});
