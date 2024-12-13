import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  supabase: SupabaseService = inject(SupabaseService);

  constructor(){
  }
}
