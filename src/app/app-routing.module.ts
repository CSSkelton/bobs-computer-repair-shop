/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Editor: Cody Skelton, Jeremy Lates
 * Date: 07.07.2024
 */

// imports statements
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './shared/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { roleGuard } from './shared/role.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SecurityComponent } from './security/security.component';
import { SigninComponent } from './security/signin/signin.component';
import { CreateEmployeeComponent } from './admin/Employee/create-employee/create-employee.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { EmployeeDirectoryComponent } from './employee-directory/employee-directory.component';
import { VerifyEmailComponent } from './security/password-reset/verify-email/verify-email.component';
import { VerifySecQuestionsComponent } from './security/password-reset/verify-sec-questions/verify-sec-questions.component';
import { ResetComponent } from './security/password-reset/reset/reset.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ServiceRepairguideComponent } from './faq/Instructions/service-repairguide/service-repairguide.component';
import { UserConfiguguideComponent } from './faq/Instructions/user-configuguide/user-configuguide.component';
import { ResetPasswordguideComponent } from './faq/Instructions/reset-passwordguide/reset-passwordguide.component';
import { InvoiceGuideComponent } from './faq/Instructions/invoice-guide/invoice-guide.component';
import { RegisterGuideComponent } from './faq/Instructions/register-guide/register-guide.component';
import { PurchaseServiceguideComponent } from './faq/Instructions/purchase-serviceguide/purchase-serviceguide.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceRepairComponent } from './service-repair/service-repair.component';
import { ServiceGraphComponent } from './admin/service-graph/service-graph.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';

// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,

    //  Uncomment after signin page implemented
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        //component: BaseLayoutComponent,
        title: 'BCRS: Home', // title for the home page
      },

      {
        path: 'home',
        component: HomeComponent,
        title: 'BCRS: Home',
      },
      {
        path: 'employee',
        component: EmployeeDirectoryComponent,
        title: 'BCRS: Employee Directory',
      },
      {
        path: 'faq',
        component: FaqComponent,
        title: 'BCRS: FAQ',
      },
      {
        path: 'user-guide',
        component: UserGuideComponent,
        title: 'BCRS: User-guide',
      },
      {
        path: 'service-repairguide',
        component: ServiceRepairguideComponent,
        title: 'BCRS: Service Repair-Guide',

      },
      {
        path: 'user-configuguide',
        component: UserConfiguguideComponent,
        title: 'BCRS: User Configure-Guide',

      },
      {
        path: 'reset-passwordguide',
        component: ResetPasswordguideComponent,
        title: 'BCRS: Reset Password-Guide',
      },
      {
        path: 'invoice-guide',
        component: InvoiceGuideComponent,
        title: 'BCRS: Invoice-Guide',
      },
      {
        path: 'register-guide',
        component: RegisterGuideComponent,
        title: 'BCRS: Register-Guide',
      },
      {
        path: 'purchase-serviceguide',
        component: PurchaseServiceguideComponent,
        title: 'BCRS: Purchase-ServiceGuide',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'BCRS: Profile',
      },
      {
        path: 'service',
        component: ServiceRepairComponent,
        title: 'BCRS: Employee Directory',
      },
      {
        path: 'invoice-summary',
        component: InvoiceSummaryComponent,
        title: 'BCRS: Invoice Summary',
      },
    ],
  },
  {
    path: 'admin',
    component: BaseLayoutComponent,
    title: 'BCRS: Admin',
    children: [
      {
        path: '',
        component: AdminComponent,
        title: 'BCRS: Admin',
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent,
        title: 'BCRS: Administration',
      },
      {
        path: 'edit/:email',
        component: EditUserComponent,
        title: 'BCRS: Administration',
      },
      {
        path: 'service-graph',
        component: ServiceGraphComponent,
        title: 'BCRS: Service Graph'
      }
    ],
    canActivate: [roleGuard],
  },
  {
    // path for the security module (e.g. login, register, forgot password, etc.)
    path: 'security',
    component: SecurityComponent,
    title: 'BCRS: Security',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        title: 'BCRS: Signin',
      },
      {
        path: 'register',
        component: RegisterUserComponent,
        title: 'BCRS: Registration',
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        title: 'BCRS: Password Reset',
      },
      {
        path: 'verify-security-questions',
        component: VerifySecQuestionsComponent,
        title: 'BCRS: Password Reset',
      },
      {
        path: 'password-reset',
        component: ResetComponent,
        title: 'BCRS: Password Reset',
      },
    ],
  },

  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
