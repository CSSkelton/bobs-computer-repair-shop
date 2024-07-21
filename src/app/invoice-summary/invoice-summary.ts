/**
 * Title: invoice-summary.ts
 * Author: Jeremy Lates
 * Date: 07.21.2024
 */
export class InvoiceSummaryItem {
  itemName?: string;
  itemPrice?: string;
}

export class InvoiceSummary {
  email?: string;
  fullName?: string;
  lineItems?: Array<InvoiceSummaryItem>;
  partsNumber?: string;
  laborAnt?: string;
  lineItemTotal?: string;
  invoiceTotal?: string;
  orderDate?: string;
}
