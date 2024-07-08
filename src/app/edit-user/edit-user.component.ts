/**
 * Title: edit-user.component.ts
 * Author: Jeremy Lates
 * Date: 07.07.2024
 */

import { UserInterface } from './../user-interface';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  email: any;
  url: any;

  User = {} as UserInterface;

  //   = {
  //   email: 'richard.krasso@bcrs.com',
  //   password: 'Password1',
  //   firstName: 'Richard',
  //   lastName: 'Krasso',
  //   phoneNumber: '603-555-1212',
  //   address: '555 main street',
  //   isDisabled: false,
  //   role: 'user',
  //   whatIsYourFirstPetsName: 'babe',
  //   whatIsYourMothersMaidenName: 'lates',
  //   whatIsTheModelOfYourFirstCar: 'accord',
  // };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    console.log('Calling findById....');

    /*
    this.route.queryParamMap.subscribe((p: any) => {
      console.log(p['params']);
    });
    */
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

  updateUser(form: NgForm) {
    console.log('Update user....');

    console.log('Updated User: ', this.User);

    const updatedUserDetails = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phoneNumber: form.value.phoneNumber,
      address: form.value.address,
    };

    console.log('Updated User email: ', updatedUserDetails.email);

    this.url = `/api/users/${this.email}`;

    this.http.put<any>(this.url, updatedUserDetails).subscribe({
      next: (data) => {
        updatedUserDetails.email = data.email;
      },
      error: (error) => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });

    this.router.navigate(['/admin']);
  }
}
