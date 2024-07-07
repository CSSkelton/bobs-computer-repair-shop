import { UserInterface } from './../user-interface';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  email: any;
  url: any;

  User: UserInterface = {
    email: 'richard.krasso@bcrs.com',
    password: 'Password1',
    firstName: 'Richard',
    lastName: 'Krasso',
    phoneNumber: '603-555-1212',
    address: '555 main street',
    isDisabled: false,
    role: 'user',
    whatIsYourFirstPetsName: 'babe',
    whatIsYourMothersMaidenName: 'lates',
    whatIsTheModelOfYourFirstCar: 'accord',
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
        this.User = use;
        console.log('User: ', this.User);
      },
      error: () => {
        console.error('Unable to get user data');
      },
      complete: () => {},
    });
  }
  updateUser() {
    console.log('Update user....');

    /*
    ///api/users/{userId}:
    this.url = `/api/users/${this.email}`;
    //this.http.put('/api/users/bach@nodebucket.com', this.User).subscribe({
    this.http.put(this.url, this.User).subscribe({
      //this.http.post(this.url).subscribe({
      next: (use: any) => {
        this.User = use;
        console.log('User: ', this.User);
      },
      error: () => {
        console.error('Unable to get user data');
      },
      complete: () => {},
    });
    */

    this.http
      .put<UserInterface>(this.url, this.User)
      .subscribe((data) => (this.email = data.email));
  }
}
