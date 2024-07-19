/**
 * Title: profile.component.ts
 * Author: George Taylor
 * Date: 07.19.2024
 */


import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserInterface } from '../user-interface';

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
  constructor (private cookieService: CookieService, private  userService: UserInterface, private fb: FormBuilder) {
    this.user = {} as UserInterface // initializing the user variable
    this.errorMessage = '' // initializing the error message variable
    this.profileOnSaveError = '' // initializing the error message variable
    this.profileOnSaveSuccess = '' // initializing the success message variable
    this.userInitials = '' // initializing the user initials variable
    this.role = '' // initializing the role variable
    this.randomAvatarColor = this.avatarColors[Math.floor(Math.random() * this.avatarColors.length)] // setting the random avatar color variable

    const cookie = JSON.parse(this.cookieService.get('session_user')) //parsing the cookie

    console.log('cookie', cookie) // logging the cookie

    
  }
}
