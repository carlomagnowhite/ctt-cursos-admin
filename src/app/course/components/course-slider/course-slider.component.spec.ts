import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSliderComponent } from './course-slider.component';

describe('CourseSliderComponent', () => {
  let component: CourseSliderComponent;
  let fixture: ComponentFixture<CourseSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
