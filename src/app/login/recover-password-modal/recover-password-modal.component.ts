import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-recover-password-modal',
  templateUrl: './recover-password-modal.component.html',
  styleUrl: './recover-password-modal.component.css'
})
export class RecoverPasswordModalComponent {

  recoverPasswordForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  isModalOpen: boolean = false;

  constructor(private supabaseService: SupabaseService, private formBuilder: FormBuilder){
    this.recoverPasswordForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]]
      }
    );
  }

  async sendMail(email: string): Promise<void>{
    this.submitted = true;
    this.loading = true;
    try {
      if(this.recoverPasswordForm.valid){
        await this.supabaseService.recoverPassword(email);
        this.recoverPasswordForm.patchValue(
          {
            email: ""
          }
        );
        alert("Correo enviado, revise su bandeja de entrada.");
      }
    } catch (error) {
      alert("Error: " + error);
      console.log(error);
    } finally{
      this.loading = false;
    }

  }

  toggleModal(): void{
    this.isModalOpen = !this.isModalOpen;
  }
}
