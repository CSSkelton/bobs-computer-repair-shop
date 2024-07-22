/**
 * Title: user-interface.ts
 * Author: Jeremy Lates
 * Date: 07.07.2024
 */
import { ISecurityQuestion } from './security-question-interface';

export interface UserInterface {
  getuserByemail(email: any): unknown;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  isDisabled: boolean;
  role: string;
  securityQuestions: ISecurityQuestion[];
}
