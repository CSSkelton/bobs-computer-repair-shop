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

        this.mapChartData(dbData);
      },
      error: () => {
        console.error('Error receiving data')
      },
      complete: () => {}
    })
  }


  mapChartData(data: any): void {
    const labels = data.map((el: any) => el._id);
    const count = data.map((el: any) => el.count);

    const chart = new Chart("serviceGraph", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: count,
          backgroundColor: ['#946b2d',  '#222f5b','#5d5d5d', '#0e1a40']
        }]
      }
    })
  }

}
