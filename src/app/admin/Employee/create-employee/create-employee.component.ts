import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeserviceComponent } from '../employeeservice/employeeservice.component';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent {
  errorMessage: string | undefined //holds error message



// employee form with validation rules for each field
employeeForm: FormGroup = this.fb.group({
  firstName: [null, Validators.compose([Validators.required])],
  lastName: [null, Validators.compose([Validators.required])],
  email: [null, Validators.compose([Validators.required, Validators.email])],
  // password field requires one uppercase character and one number (min 8 characters)
  password: [null, Validators.compose([Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).{8,}$')])],
  role: [null, Validators.compose([Validators.required])]
})

// injects FormBuilder, Router, and EmployeeService
constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeserviceComponent) {
  this.errorMessage = '' // sets errorMessage to empty string

}
createEmployee() {
  console.log(this.employeeForm.value) // logs employee form value to the console

  //create new employee object with form values
  const employee: Employee = {
    firstName: this.employeeForm.controls['firstName'].value,
    lastName: this.employeeForm.controls['lastName'].value,
    email: this.employeeForm.controls['email'].value,
    password: this.employeeForm.controls['password'].value,
    role:this.employeeForm.controls['role'].value,
  }

  //calls createEmployee method from employee service
  this.employeeService.createEmployee(employee).subscribe( {
    next: (res) => {
      console.log(res)
      this.router.navigate(['admin/employees']) // navigates to list of employee page
    },
    error: (err) => {
      //checks for error message and sets errorMessage accordingly (if no message, sets generic error message)
      if (err.error.message) {
        console.log('db error:', err.error.message)
        this.errorMessage = err.error.message //sets error message to database error message
      } else {
        this.errorMessage = 'Something went wrong. Please contact the system administrator.' // sets generic error message
      }
      console.log(err)
      this.hideAlert() // calls hideAlert method
    }
  })

}

//hides error message after 3 seconds (3000 milliseconds)
hideAlert() {
  setTimeout(() => {
    this.errorMessage = ''
  }, 3000)
 }
}