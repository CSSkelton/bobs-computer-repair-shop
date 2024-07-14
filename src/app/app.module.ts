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
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './security/signin/signin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatButtonModule } from '@angular/material/button';
import { SecurityComponent } from './security/security.component';
import { CreateEmployeeComponent } from './admin/Employee/create-employee/create-employee.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';
import { FaqComponent } from './faq/faq.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    NavComponent,
    FooterComponent,
    AdminComponent,
    SigninComponent,
    SecurityComponent,
    PagenotfoundComponent,
    EditUserComponent,
    FaqComponent,
    CreateEmployeeComponent,
    RegisterUserComponent,
    EmployeeDirectoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
