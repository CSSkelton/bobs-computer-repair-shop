/**
 * Title: admin-routing.module.ts
 * Author: Cody Skelton
 * Date: 07.03.2024
 */

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { roleGuard } from './shared/role.guard';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  {

  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
