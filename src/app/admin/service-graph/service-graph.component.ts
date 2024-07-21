/**
 * Title: service-graph.component.ts
 * Author: Cody Skelton
 * Date: 07.20.2024
 */

import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.css']
})
export class ServiceGraphComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
      const chart = new Chart("serviceGraph", {
        type: 'pie',
        data: {
          labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'],
          datasets: [{
            //TODO: Replace with actual data once API is fixed
            data: [5, 13, 5, 17, 6, 1, 20],
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#683FA0',
              '#AF593E',
              '#6CDAE7'
            ]
          }]
        }
  })
  }

}
