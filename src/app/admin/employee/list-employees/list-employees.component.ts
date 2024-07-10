import { Component,OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements  OnInit {
employee: Employee[] = [
  {id: 1,
    firstname: 'Melissa',
    gender: 'Female',
    email: 'melissatolate@yahoo.com',
    phoneNumber: 5642523333,
    contactPreference: 'Phone',
    dateOfBirth: new Date('12/05/84'),
    department: 'HR',
    isActive: true,
    photoPath: '/assets/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg',
    },
    ];

constructor() { }

ngOnInit(): void {

}
}
