/**
 * Title: security.service.ts
 * Author: Cody Skelton
 * Date: 07.02.2024
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {
    // Include findUserById API here once implemented
  }
}
