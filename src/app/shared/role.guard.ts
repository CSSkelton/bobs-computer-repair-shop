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

  let sessionUser = null;
  //JSON.parse(cookie.get('session_user'))
  // TODO: replace after signin component

  console.log('sessionUser', sessionUser)
  const router = inject(Router)


  if (!sessionUser) {
    console.log('You must be logged in to view this page')
    router.navigate(['/security'], { queryParams: { returnUrl: state.url }})
    return false
  }

  if (sessionUser['role'] !== 'admin') {
    router.navigate(['/security'], { queryParams:  { returnUrl: state.url }})
    return false
  }

  return true
};
