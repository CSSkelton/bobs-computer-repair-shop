/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Editor: George Taylor
 * Date: 07.07.2024
 */


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInterface } from 'src/app/newuser-interface';
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


export interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  isDisabled: boolean;
  role: string;

};

constructor(private http: HttpClient, private route: ActivatedRoute) {
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
        this.newUser = use;
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

    console.log('Updated User email: ', newUserDetails.email);

    this.url = `/api/users/${this.email}`;

    this.http.put<any>(this.url, newUserDetails).subscribe({
      next: (data) => {
        newUserDetails.email = data.email;
      },
      error: (error) => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }
}


