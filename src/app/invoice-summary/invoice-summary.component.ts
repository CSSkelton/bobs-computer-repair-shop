/**
 * Title: invoice-summary.component.ts
 * Author: Jeremy Lates
 * Date: 07.21.2024
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceSummary } from './invoice-summary';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css'],
})
export class InvoiceSummaryComponent {
  invoiceSummary: InvoiceSummary;

  constructor(private route: ActivatedRoute) {
    const invoiceQueryParam = this.route.snapshot.queryParamMap.get('invoice');

    console.log('Passed in Invoice: ', invoiceQueryParam);

    if (invoiceQueryParam !== null)
      this.invoiceSummary = JSON.parse(invoiceQueryParam);
    else this.invoiceSummary = {} as InvoiceSummary;

    console.log('My inventory summary data: ', this.invoiceSummary);
    console.log('my count: ', this.invoiceSummary.lineItems?.length);
  }
  print() {
    console.log('Print....');
    window.print();
  }
}
