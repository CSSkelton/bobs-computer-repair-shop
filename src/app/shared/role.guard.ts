/**
 * Title: role.guard.ts
 * Author: Cody Skelton
 * Date: 07.03.2024
 */

import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);

  console.log('Getting here');

  let sessionUser = JSON.parse(cookie.get('session_user'));

  console.log('sessionUser', sessionUser)
  const router = inject(Router)

  if (sessionUser.role !== 'admin') {
    console.log('You must be an admin to access this page');
    router.navigate(['/security'], { queryParams:  { returnUrl: state.url }})
    return false
  }

  return true
};
