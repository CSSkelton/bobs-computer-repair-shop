import { ISecurityQuestion } from './../security-question-interface';
/**
 * Title: register-user.component.ts
 * Author: Jeremy Lates
 * Date: 07.11.2024
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInterface } from './../user-interface';
import { HttpClient } from '@angular/common/http';
import { FormControl, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  formGroup: FormGroup;
  User = {} as UserInterface;

  securityQuestions: string[]; //This definition did not work here like in professors example
  qArr1: string[];
  qArr2: string[];
  qArr3: string[];

  myQuestion1: string;
  myAnswer1: string;
  myQuestion2: string;
  myAnswer2: string;
  myQuestion3: string;
  myAnswer3: string;
  url: string;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.securityQuestions = [
      'What is your first pets name?',
      'What is your mothers maiden name?',
      'What is the model of your first car?',
    ];

    this.qArr1 = this.securityQuestions;
    this.qArr2 = this.qArr1;
    this.qArr3 = this.qArr2;

    this.myQuestion1 = '';
    this.myAnswer1 = '';
    this.myQuestion2 = '';
    this.myAnswer2 = '';
    this.myQuestion3 = '';
    this.myAnswer3 = '';
    this.url = '';

    this.formGroup = this.fb.group({
      email: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      question1: [null, Validators.required],
      answer1: [null, Validators.required],
      question2: [null, Validators.required],
      answer2: [null, Validators.required],
      question3: [null, Validators.required],
      answer3: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    //TODO
  }
  onChange1(newValue: string) {
    console.log('Hello World....', newValue);
    this.myQuestion1 = newValue;
    console.log('myQuestion1: ', this.myQuestion1);
    this.qArr2 = this.qArr1.filter((q) => q !== newValue);
  }

  onChange2(newValue: string) {
    console.log('Hello World....', newValue);
    this.myQuestion2 = newValue;
    this.qArr3 = this.qArr2.filter((q) => q !== newValue);
  }

  onChange3(newValue: string) {
    console.log('Hello World....', newValue);
    this.myQuestion3 = newValue;
  }

  // registerUser(form: NgForm) {
  registerUser() {
    console.log('registerUser....');
    console.log('My question 1:', this.myQuestion1);
    console.log('My Answer 1: ', this.formGroup.controls['answer1'].value);

    console.log('My question 2:', this.myQuestion2);
    console.log('My Answer 2: ', this.formGroup.controls['answer2'].value);

    console.log('My question 3:', this.myQuestion3);
    console.log('My Answer 3: ', this.formGroup.controls['answer3'].value);

    console.log('Made ity here...');
    const myQuestion1 = this.formGroup.get('question1')?.value;
    console.log('My Question 1: ', myQuestion1);

    const registerUserDetails = {
      // email: form.value.email,
      email: this.formGroup.get('email')?.value,
      // password: form.value.password,
      password: this.formGroup.get('password')?.value,
      // firstName: form.value.firstName,
      firstName: this.formGroup.get('firstName')?.value,
      //lastName: form.value.lastName,
      lastName: this.formGroup.get('lastName')?.value,
      //phoneNumber: form.value.phoneNumber,
      phoneNumber: this.formGroup.get('phoneNumber')?.value,
      // address: form.value.address,
      address: this.formGroup.get('address')?.value,
      role: 'user',
      isDisabled: false,
      securityQuestions: [
        {
          question1: this.formGroup.get('question1')?.value,
          answer1: this.formGroup.get('answer1')?.value,
        },
        {
          question2: this.formGroup.get('question2')?.value,
          answer2: this.formGroup.get('answer2')?.value,
        },
        {
          question3: this.formGroup.get('question3')?.value,
          answer3: this.formGroup.get('answer3')?.value,
        },
      ],
    };

    this.url = `/api/users/register`;

    this.http.post<any>(this.url, registerUserDetails).subscribe({
      next: (data) => {
        console.log('User registered...');
        alert('User Registered!');
      },
      error: (error) => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }
}
