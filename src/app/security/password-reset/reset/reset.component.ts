/**
 * Title: reset.component.ts
 * Author: Cody Skelton
 * Date: 07.14.2024
 */

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from'@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  email: string;

  passwordForm: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required])]
  })

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient, private cookieService: CookieService) {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? ''

    if (!this.email){
      this.router.navigate(['/security/signin'])
    }
  }

  onSubmit() {
    const password = this.passwordForm.controls['password'].value

    this.http.post(`/api/security/users/${this.email}/reset-password`, {password}).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log('resetPassword API error Stack:', err)
      }
    })

  }
}
