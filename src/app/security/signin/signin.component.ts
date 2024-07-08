/**
 * Title: signin.component.ts
 * Author: George Taylor
 * Date: 07.07.2024
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import{ Router } from'@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm: FormGroup = this.fb.group({
    employeeId: [null, Validators.compose([Validators.required])],
    passwordId: [null, Validators.compose([Validators.required])]
  });
  errorMessage: String;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {
    console.log(this.cookieService.get('session_user'));
    this.errorMessage = ''
  }

  onSubmit(){
    const formValues = this.signinForm.value;
    const email = formValues.employeeId;
    const password = formValues.passwordId;

    this.http.post(`/api/security/signin`, {
      email, password
    }).subscribe({
      next: (user: any) => {

        const sessionCookie = {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }

        this.cookieService.set('session_user', JSON.stringify(sessionCookie), 1);
        this.cookieService.set('session_admin', sessionCookie.role, 1);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  }

}
