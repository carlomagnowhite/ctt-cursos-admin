import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormCoursesComponent } from './modal-form-courses.component';

describe('ModalFormCoursesComponent', () => {
  let component: ModalFormCoursesComponent;
  let fixture: ComponentFixture<ModalFormCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
