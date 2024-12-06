import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  router: Router = inject(Router);

  catchButtonRoute(id: string): void{
    switch(id){
      case "cursos":
        alert(id);
        this.router.navigate(["dashboard"]);
        break;
      case "docentes":
        alert(id);
        this.router.navigate(["dashboard/teachers"]);
        break;
      case "perfil":
        alert(id);
        this.router.navigate(["dashboard/user-profile"]);
        break;
    }
  }
}
