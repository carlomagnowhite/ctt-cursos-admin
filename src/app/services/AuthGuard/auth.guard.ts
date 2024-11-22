import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if(state.url.includes('supabase.co')){
    const token = route.queryParamMap.get('token');
    const type = route.queryParamMap.get('type');
    if(token && type === 'recovery'){
      return true;
    }
    router.navigate(['/login']);
    return false;
  }

  if(!authService.isAuthenticated()){
    router.navigate(["/login"]);
    return false;
  }

  return true;
};
