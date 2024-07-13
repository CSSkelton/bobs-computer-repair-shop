import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})

export class RoleDeleteDialogComponent implements OnInit {
  role: String;

  constructor(private dialogRef: MatDialogRef<RoleDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.role = data.role;
   }

  ngOnInit(): void {
  }

}