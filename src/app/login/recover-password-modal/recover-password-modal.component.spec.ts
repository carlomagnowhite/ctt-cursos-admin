import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordModalComponent } from './recover-password-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecoverPasswordModalComponent', () => {
  let component: RecoverPasswordModalComponent;
  let fixture: ComponentFixture<RecoverPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoverPasswordModalComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });
});
