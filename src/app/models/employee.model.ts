/**
 * Title: employee.model.ts
 * Author: George Taylor
 * Date: 07.09.2024
 */


export class Employee {
  id: number;
  firstname: string;
  gender: string;
  email?: string;
  phoneNumber?: number;
  contactPreference: string;
  dateOfBirth: Date;
  department: string;
  isActive: boolean;
  photoPath?: string;
}