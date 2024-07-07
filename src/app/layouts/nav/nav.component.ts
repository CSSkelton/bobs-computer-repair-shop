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



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  signOut() {
    window.location.href = '/#/signin';
  }
}
