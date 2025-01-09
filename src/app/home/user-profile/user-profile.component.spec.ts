import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { RecoverPasswordModalComponent } from '../../login/recover-password-modal/recover-password-modal.component';
import { LoginModule } from '../../login/login.module';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent, RecoverPasswordModalComponent],
      imports: [LoginModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación del componente', () => {
    expect(component).toBeTruthy();
  });
});
