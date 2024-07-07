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

export class EditUserComponent {
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




export class CreateEmployeeComponent {
  errorMessage: string // holds error messages

   //employee form with validation rules for each field
   employeeForm: FormGroup = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    // password field requires one uppercase character and one number (min 8 characters)
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9](?=.*[a-z](?=.*[A-Z](?=.*[a-zA-Z].{8,}$')])],
    role: [null, Validators.compose([Validators.required])]
})

// injects FormBuilder, Router, and EmployeeService
constructor(private fb: FormBuilder, private router: Router,){
  this.errorMessage ='' //set error Message to empty string


}
