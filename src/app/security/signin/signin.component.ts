
import { Component,OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import{ Router } from'@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm: FormGroup = this.fb.group({
    employId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    password: [null, Validators.compose([Validators.required,])]
  });
  errorMessage: String;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder,) {
    console.log(this.cookieService.get('session_user'));
    this.errorMessage = ''
  }





onSubmit(){
  const formValues = this.signinForm.value;
  const employId = parseInt(formValues.employId);
}

}
