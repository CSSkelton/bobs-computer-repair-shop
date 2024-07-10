/**
 * Title: app.module.ts
 * Author: Professor Krasso
 * Editor: Cody Skelton, Jeremy Lates
 * Date: 07.01.2024
 */

// imports statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { EditUserComponent } from './edit-user/edit-user.component';

import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { CreateEmployeeComponentComponent } from './admin/create-employee/create-employee.component';
import { CreateEmployeeComponent } from './admin/Employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './admin/Employee/list-employees/list-employees.component';
import { EmployeeserviceComponent } from './admin/Employee/employeeservice/employeeservice.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    NavComponent,
    FooterComponent,
    AdminComponent,
    PagenotfoundComponent,
    EditUserComponent,
    CreateEmployeeComponentComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent,
    EmployeeserviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
