import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  router: Router = inject(Router);

  isChildRoute (): boolean{
    return !this.router.url.includes('/dashboard/user-profile') && !this.router.url.includes('/dashboard/teachers');
  }
}
