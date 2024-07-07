/**
 * Title: newuser-interface.ts
 * Author: George Taylor
 * Date: 07.07.2024
 */
export interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  isDisabled: boolean;
  role: string;

}
