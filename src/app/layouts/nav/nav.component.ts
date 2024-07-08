/**
 * Title: nav.component.ts
 * Author: Professor Krasso
 * Editor: Cody Skelton, Jeremy Lates
 * Date: 07.02.2024
 */

// imports statements
import { Component,OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import{ Router } from'@angular/router';

export interface AppUser {
  fullName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  appUser: AppUser;
  isSignedIn: boolean;

  constructor(private cookieService: CookieService, private router: Router){
    this.appUser = {} as AppUser;
    this.isSignedIn = this.cookieService.get('session_user') ? true:false;
  }

  signOut() {
    console.log('Removing user session from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '#/security/signin';
  }
}
