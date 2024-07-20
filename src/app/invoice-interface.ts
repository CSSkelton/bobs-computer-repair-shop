/**
 * Title: invoice-interface.ts
 * Author: Jeremy Lates
 * Date: 07.15.2024
 * Note: I diverted from the ord diagram's naming convention and replaced the LineItem array name
 * with Items array name as seen below. Items then can have an itemName and itemPrice.
 *
 */
import { InvoiceItemInterface } from './invoice-item-interface';
export interface InvoiceInterface {
  email: string;
  fullName: string;
  lineItems: [
    // Items: Array<InvoiceItemInterface>,
    Items: [itemName: string, itemPrice: number],
    partsNumber: number,
    laborAmount: number,
    lineItemTotal: number,
    invoiceTotal: number,
    orderDate: string
  ];
}
