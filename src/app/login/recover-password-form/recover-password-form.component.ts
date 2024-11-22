import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrl: './recover-password-form.component.css',
})
export class RecoverPasswordFormComponent {
  formResetPassword: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  router = inject(Router);

  constructor(
    private supabaseService: SupabaseService,
    private formBuilder: FormBuilder
  ) {
    this.formResetPassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmed: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async resetPassword() {
    try {
      this.submitted = true;
      this.loading = true;
      const { password, passwordConfirmed } = this.formResetPassword.value;
      if (password === passwordConfirmed && this.formResetPassword.valid) {
        await this.supabaseService.updatePassword(passwordConfirmed);
        this.router.navigate(['/login']);
      }
    } catch (error) {
      alert(error);
      throw error;
    } finally {
      this.loading = false;
    }
  }
}
