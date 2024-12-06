import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  loading: boolean = false;
  userProfile: any;

  supabase: SupabaseService = inject(SupabaseService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserData();
  }

  async getUserData(){
    this.loading = true;
    try {
      this.userProfile = await this.supabase.getUserProfile()
      console.log(this.userProfile);
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }
}
