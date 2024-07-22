/**
 * Title: service-graph.component.ts
 * Author: Cody Skelton
 * Date: 07.20.2024
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.css']
})
export class ServiceGraphComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get('/api/invoices/purchases-graph').subscribe({
      next: (dbData: any) => {
        console.log(dbData)
        /**
         * Returns the following data structure:
         * [
            { _id: 'PC Tune-up', count: 2 },
            { _id: 'Password Reset', count: 3 },
            { _id: 'Disk clean-up', count: 3 },
            { _id: 'Software Installation', count: 3 },
            { _id: 'Keyboard cleaning', count: 2 },
            { _id: 'Spyware Removal', count: 2 },
            { _id: 'Replacement', count: 3 },
            { _id: 'Ram Upgrade', count: 1 }
           ]
         */

        // const chart = new Chart("serviceGraph", {
        //   type: 'pie',
        //   data: {
        //     labels: dbData.map(entry => entry._id),
        //     datasets: [{
        //       data: dbData.map(entry => entry.count),
        //       backgroundColor: ['#0e1a40']
        //     }]
        //   }
        // })
      },
      error: () => {
        console.error('Error receiving data')
      },
      complete: () => {}
    })

    // This isn't pulling dynamic data
    // Can't figure out how to bind it with data from API
    // Tried directly assigning (see above) and creating new arrays to push to
    // Using both forEach and map results in errors
    const chart = new Chart("serviceGraph", {
      type: 'pie',
      data: {
        labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk clean-up', 'Replacement'],
        datasets: [{
          data: [5, 13, 5, 17, 6, 1, 20],
          backgroundColor: ['#946b2d',  '#222f5b','#5d5d5d', '#0e1a40']
        }]
      }
    })
  }

}
