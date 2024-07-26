/**
 * Title: employee.service.ts
 * Author: George Taylor
 * Date: 07.21.2024
 * Description: Service for handling employee request
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

/**
 * Method to get user information by ID
 * @param userId - ID of the user
 * @returns Observable<any> - user information
 */
getEmployeeById(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${userId}`);
}



  /**
 * Method to get user information by email
 * @param email -Email of user
 * @returns Observable<any> - User information
 */
getEmployeeByEmail(email: string) : Observable<any> {
  return this.http.get(`${this.apiUrl}/profile/${email}`);
}
  /**
   * Method to update employee profile information by email address
   * @param email - Email of the user
   * @param address - New address of the user
   * @param phoneNumber -New phone number of the user
   * @return Observable<any> -Response
   */
  updateEmployeeProfile(email: string, address: string, phoneNumber: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${email}/update-profile`, { address, phoneNumber });
  }


}