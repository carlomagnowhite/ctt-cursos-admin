import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoCoursesComponent } from './modal-info-courses.component';

describe('ModalInfoCoursesComponent', () => {
  let component: ModalInfoCoursesComponent;
  let fixture: ComponentFixture<ModalInfoCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalInfoCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInfoCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
