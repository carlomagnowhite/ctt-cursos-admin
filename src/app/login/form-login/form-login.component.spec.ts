import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginComponent } from './form-login.component';
import { RecoverPasswordModalComponent } from '../recover-password-modal/recover-password-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLoginComponent, RecoverPasswordModalComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });

});
