/**
 * Title: verify-email.component.ts
 * Author: Cody Skelton
 * Date: 07.14.2024
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ Router } from'@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  emailForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required])]
  })

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  onSubmit() {
    const formValues = this.emailForm.value;
    const email = formValues.email;

    this.http.post(`/api/security/verify/users/${email}`, {}).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/security/verify-security-questions'], { queryParams: { email }, skipLocationChange: true})
      },
      error: (err) => {
        console.log('Server Error from verifyEmail Call:', err)

        if (err.status === 404) {
          console.log('Email you entered was not found')
          return
        }
      },
      complete: () => {}
    });
  }
}
