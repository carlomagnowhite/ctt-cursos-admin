import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);

  constructor() { }

  isAuthenticated(): boolean {
    const session = localStorage.getItem('session');
    return session !== null;
  }

  setPasswordAllow(){
    
  }

}
