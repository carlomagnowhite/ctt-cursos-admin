import { Component, inject, Input } from '@angular/core';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  supabase = inject(SupabaseService);
  router: Router = inject(Router);
  error: boolean = false;
  @Input() bntLogout = true;

  constructor(){}

  async logout(){
    const result: boolean = await this.supabase.signOut();
    if(result){
      this.router.navigate(['/login']);
    }
    this.error = true;
  }
}
