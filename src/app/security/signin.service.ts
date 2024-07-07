import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  employeeIds: Array<number>;

  constructor() {
    this.employeeIds = [1007, 1008, 1009, 1010, 1011, 1012];
   }

   validate(employeeId: string) {
    return;
   }
}
