/**
 * Title: security.module.ts
 * Author: Professor Krasso
 * Editor: Cody Skelton
 * Date: 07.02.2024
*/

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    HttpClientModule
  ]
})
export class SecurityModule { }
