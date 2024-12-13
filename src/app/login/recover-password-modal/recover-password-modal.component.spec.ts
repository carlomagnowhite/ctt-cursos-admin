import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordModalComponent } from './recover-password-modal.component';

describe('RecoverPasswordModalComponent', () => {
  let component: RecoverPasswordModalComponent;
  let fixture: ComponentFixture<RecoverPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoverPasswordModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoverPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
