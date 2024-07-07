/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Editor: George Taylor
 * Date: 07.07.2024
 */


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInterface } from 'src/app/user-interface';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponentComponent {
  email: any;
  url: any;

NewUserdetails : UserInterface


constructor(private http: HttpClient, private route: ActivatedRoute) {
  this.NewUserdetails = {} as UserInterface;

  employeeForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    // password field requires one uppercase character and one number (min 8 characters)
    password: [null, Validators.compose([Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).{8,}$')])],
    role: [null, Validators.compose([Validators.required])]
  })

  console.log('Calling findById....');

/*
    this.route.queryParamMap.subscribe((p: any) => {
      console.log(p['params']);
    });
    */
  }

  onSubmit(form: NgForm) {
    // Form submission logic
    console.log(form.value);
  }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    console.log('email: ', this.email);

    this.url = `/api/users/${this.email}`;

    //this.http.get('/api/users/bach@nodebucket.com').subscribe({
    this.http.get(this.url).subscribe({
      next: (use: any) => {
        this.User = use;
        console.log('User: ', this.User);
      },
      error: () => {
        console.error('Unable to get user data');
      },
      complete: () => {},
    });
  }
  NewUser() {
    console.log('New user added....');

    console.log('New User: ', this.User);

    const NewUserDetails = {
      email: this.User.email,
      firstName: this.User.firstName,
      lastName: this.User.lastName,
      phoneNumber: this.User.phoneNumber,
      address: this.User.address,
    };

    console.log('Updated User email: ', UserDetails.email);

    this.url = `/api/users/${this.email}`;

    this.http.put<any>(this.url, UserDetails).subscribe({
      next: (data) => {
        UserDetails.email = data.email;
      },
      error: (error) => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }
}


