/**
 * Title: admin.component.ts
 * Author: Cody Skelton
 * Date: 07.03.2024
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  isDisabled: boolean;
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

  deleteUser(email: string) {
    console.log(`User: ${email}`);

    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }

    this.http.delete(`/api/users/${email}`).subscribe({
      next: (result: any) => {
        console.log('User deleted with id', email)

        this.users.filter(u => u.email = email)
      },
      error: (err) => {
        console.error('Unable to delete user with email ' + email, err)
      }
    })
  }
}
