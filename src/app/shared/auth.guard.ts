/**
 * Title: auth.guard.ts
 * Author: Cody Skelton
 * Date: 07.02.2024
 */

import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);

  if (cookie.get('session_user')) {
    return true;
  } else {
    const router = inject(Router);
    // Include signin page after it's created
    // Clear to '/' if testing pages
    router.navigate(['/security/signin'], {queryParams: {returnUrl: state.url }})
    return false;
  }
};
