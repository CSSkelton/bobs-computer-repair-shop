/**
 * Title: profile.component.ts
 * Author: George Taylor
 * Date: 07.19.2024
 */


import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserInterface } from '../user-interface';
import { EmployeeService } from '../shared/employee.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserInterface // user variable
  errorMessage: string // error message variable
  profileOnSaveError: string // error message variable
  profileOnSaveSuccess: string // success message variable
  userInitials: string // user initials variable
  role: string // role variable
  avatarColors: Array<string> = ['#0e1a40', '#222f5b', '#bebebe', '#946b3d'] //array of theme colors
  randomAvatarColor: string

  // form for the profile component with the first name and last name fields
  profileForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([ Validators.required])],
    lastName: [null, Validators.compose([ Validators.required])],
  })

  //Injecting the user-interface, CookieService, Router, and HttpClient
  constructor (private cookieService: CookieService, private employeeService: EmployeeService, private fb: FormBuilder) {
    this.user = {} as UserInterface // initializing the user variable
    this.errorMessage = '' // initializing the error message variable
    this.profileOnSaveError = '' // initializing the error message variable
    this.profileOnSaveSuccess = '' // initializing the success message variable
    this.userInitials = '' // initializing the user initials variable
    this.role = '' // initializing the role variable
    this.randomAvatarColor = this.avatarColors[Math.floor(Math.random() * this.avatarColors.length)] // setting the random avatar color variable

    const cookie = JSON.parse(this.cookieService.get('session_user')) //parsing the cookie

    console.log('cookie', cookie) // logging the cookie

    // call to the get
    this.employeeService.getEmployeeById(cookie.empId).subscribe({
      //
      next: (res) => {
        this.user = res // setting the user variable to the response
        console.log('user', this.user) // logging the user variable
      },
      // if error occurs in the getEmployeeByEmpId function call this function to handle the error
      error: (err) => {
        console.log(err) // logging the error
        this.errorMessage = err.message // setting the error message

      },
      complete: () => {
        this.userInitials = `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}` // setting the users initials variable
        this.role = this.user.role.charAt(0).toUpperCase() + this.user.role.slice(1) // setting the role variable

        this.profileForm.controls['firstName'].setValue(this.user.firstName) //setting the first name field in the profile form
        this.profileForm.controls['lastName'].setValue(this.user.lastName) //setting the last name field in the profile form
      }
    })
  }


  //function to save the changes made to the profile form
  saveChanges() {
    const firstName = this.profileForm.controls['firstName'].value // getting the first name form the profile form
    const lastName = this.profileForm.controls['lastName'].value // getting the last name form the profile form

    console.log(`firstName: ${firstName}, lastName: ${lastName}` ) // logging the first name and last name

    // call to the updateProfile function in the userService
     this.employeeService.updateEmployeeProfile(this.user.email, firstName, lastName).subscribe({
      // on next function form the observable response from the updateProfile function
      next: (res) => {
        console.log(`Response from API call: ${res}`) // logging the response
        this.user.firstName = firstName // setting the first name in the user variable
        this.user.lastName = lastName // setting the last name in the user variable
        this.userInitials = `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}` //setting the user initials variable
        this.profileOnSaveSuccess = 'Profile saved successfully!' // setting the success message variable
      },

      // if error occurs in the updatedProfile function call this function to handle the error
      error:(err) => {
        console.log(err) // logging the error
        this.profileOnSaveError = err.message // setting the error message variable
      },
      complete:() => {
        this.profileForm.reset() // resetting the profile form
        this.profileForm.controls['firstName'].setValue(this.user.firstName) // setting the first name field in the profile form
        this.profileForm.controls['lastName'].setValue(this.user.lastName) // setting the last name field in the profile form

      }
    })
  }

  // function to close the profile form and reset the form
  close() {
    this.profileForm.reset() //resetting the profile form
    this.profileForm.controls['firstName'].setValue(this.user.firstName) // setting the first name field in the profile form
    this.profileForm.controls['lastName'].setValue(this.user.lastName) // setting the last name field in the profile form
    this.profileOnSaveError = '' // resetting the error message variable
    this.profileOnSaveSuccess = '' // resetting the success message variable
  }
}
