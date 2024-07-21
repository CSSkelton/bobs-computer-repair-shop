/**
 * Title: service-repair.component.ts
 * Author: Jeremy Lates
 * Date: 07.21.2024
 */
import { InvoiceInterface } from './../invoice-interface';
import { InvoiceItemInterface } from '../invoice-item-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InvoiceItem } from './InvoiceItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css'],
})
export class ServiceRepairComponent implements OnInit {
  serviceForm: FormGroup;
  invoiceTotal: number;
  orderDate: string;

  invoiceItems: Array<InvoiceItem>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.invoiceItems = [];
    this.invoiceTotal = 0;
    this.orderDate = '';

    this.serviceForm = this.fb.group({
      email: [null, Validators.required],
      customerName: [null, Validators.required],
      passwordReset: [null],
      spywareRemoval: [null],
      ramUpgrade: [null],
      softwareInstallation: [null],
      pcTuneUp: [null],
      keyBoardCleaning: [],
      diskCleanup: [null],
      otherService: [null],
      parts: [null],
      labor: [null],
    });
  }
  ngOnInit(): void {
    //TODO
  }
  serviceRequest() {
    console.log('Service Request...');
    console.log(
      'password reset value: ',
      this.serviceForm.controls['passwordReset'].value
    );

    //Set password reset values
    if (this.serviceForm.controls['passwordReset'].value == true) {
      let myItem = {
        itemName: 'Password Reset',
        itemPrice: '39.99',
      };
      // this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceTotal = this.invoiceTotal + 39.99;
      this.invoiceItems.push(myItem);
    }

    //Set spyware removal values
    if (this.serviceForm.controls['spywareRemoval'].value == true) {
      let myItem = {
        itemName: 'Spyware Removal',
        itemPrice: '99.99',
      };
      //this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceTotal = this.invoiceTotal + 99.99;
      this.invoiceItems.push(myItem);
    }

    //Set ram upgrade values
    if (this.serviceForm.controls['ramUpgrade'].value == true) {
      let myItem = {
        itemName: 'Ram Upgrade',
        itemPrice: '129.99',
      };
      this.invoiceTotal = this.invoiceTotal + 129.99;
      //this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceItems.push(myItem);
    }

    //Set software upgrade values
    if (this.serviceForm.controls['softwareInstallation'].value == true) {
      let myItem = {
        itemName: 'Software Installation',
        itemPrice: '49.99',
      };
      this.invoiceTotal = this.invoiceTotal + 49.99;
      //this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceItems.push(myItem);
    }

    //Set pc tune-up values
    if (this.serviceForm.controls['pcTuneUp'].value == true) {
      let myItem = {
        itemName: 'PC Tune-up',
        itemPrice: '89.99',
      };
      // this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceTotal = this.invoiceTotal + 89.99;
      this.invoiceItems.push(myItem);
    }

    //Set keyboard cleaning values
    if (this.serviceForm.controls['keyBoardCleaning'].value == true) {
      let myItem = {
        itemName: 'Keyboard cleaning',
        itemPrice: '45.00',
      };
      // this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceTotal = this.invoiceTotal + 45.0;
      this.invoiceItems.push(myItem);
    }

    //Set disk cleanup values
    if (this.serviceForm.controls['diskCleanup'].value == true) {
      let myItem = {
        itemName: 'Disk clean-up',
        itemPrice: '129.99',
      };
      //   this.invoiceTotal = this.invoiceTotal + myItem.itemPrice;
      this.invoiceTotal = this.invoiceTotal + 129.99;
      this.invoiceItems.push(myItem);
    }

    //Set Order Date
    const myDate = new Date();
    this.orderDate = myDate.toLocaleDateString();
    console.log('Todays order date: ', this.orderDate);

    //Check if other service is requested
    if (
      this.serviceForm.controls['otherService'].value != '' &&
      this.serviceForm.controls['otherService'].value != null
    ) {
      console.log('Other service requested...');
      let myItem = {
        itemName: this.serviceForm.controls['otherService'].value,
        itemPrice: this.serviceForm.controls['labor'].value,
      };
      console.log('Other service: ', myItem);
      const myPrice = +myItem.itemPrice;
      this.invoiceTotal = this.invoiceTotal + myPrice;
      this.invoiceItems.push(myItem);
    }

    console.log('Invoice Items: ', this.invoiceItems);

    let myInvoice = {
      email: this.serviceForm.controls['email'].value,
      fullName: this.serviceForm.controls['customerName'].value,
      lineItems: this.invoiceItems,
      partsNumber: +this.serviceForm.controls['parts'].value,
      laborAmt: 50,
      lineItemTotal: this.invoiceTotal.toString(),
      invoiceTotal: this.invoiceTotal.toString(),
      orderDate: this.orderDate,
    };

    console.log('my Invoice before db update ', myInvoice);
    //Update database
    const url = `/api/users/invoice`;

    this.http.post<any>(url, myInvoice).subscribe({
      next: (data) => {
        console.log('User invoice created...');
        console.log('My Invoice: ', myInvoice);
        alert('Invoice Created!');
        this.router.navigate(['/invoice-summary'], {
          queryParams: { invoice: JSON.stringify(myInvoice) },
        });
      },
      error: (error) => {
        // this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }
}
