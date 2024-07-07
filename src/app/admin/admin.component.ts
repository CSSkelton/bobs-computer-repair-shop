/**
 * Title: admin.component.ts
 * Author: Cody Skelton
 * Date: 07.03.2024
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string[];
}

export interface UserViewModel {
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  // employeeEmail = 'jeremylates@gmil.com';

  // Local variables
  users: User[];

  constructor(private dialog: MatDialog, private http: HttpClient) {
    console.log('Hello World!');
    this.users = [];

    this.http.get('/api/users').subscribe({
      next: (use: any) => {
        this.users = use;
      },
      error: () => {
        console.error('Unable to get user data');
      },
      complete: () => {},
    });
  }
}
