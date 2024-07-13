/**
 * Title:delete-user.component.ts
 * Author: Professor Krasso
 * Editor: George Taylor
 * Date: 07.13.2024
 * Description: Removes users from the system
 */


import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{
  employee: string;

  constructor(private dialogRef: MatDialogRef<DeleteUserComponent>, @Inject(MAT_DIALOG_DATA)data){
    this.employee = data.employee;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
