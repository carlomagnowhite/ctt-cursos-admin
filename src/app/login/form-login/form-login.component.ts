import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})

export class FormLoginComponent {
  //VAR
  logInForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  errorMessage: boolean = false;
  message: string = "";
  router = inject(Router);

  //Constructor
  constructor(private supabaseService: SupabaseService, private formBuilder: FormBuilder){
    this.logInForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]]
      }
    );


  }

  //START
  async signIn(){
    try {
      this.submitted = true;
      if(this.logInForm.valid){
        this.errorMessage = false;
        this.loading = true;
        const { email , password } = this.logInForm.value;
        const data =  await this.supabaseService.authLogIn(email, password);
        if(data.session){
          localStorage.setItem('session', JSON.stringify(data.session));
          this.router.navigate(["/dashboard"]);
          console.log(data.session);
        }
      }else{
        this.errorMessage = true;
        this.message = "Revise las credenciales e intente de nuevo."
      }
    } catch (error: any) {
      this.errorMessage = true;
      this.message = error.message;
    } finally {
      this.loading = false;
    }
  }
}
