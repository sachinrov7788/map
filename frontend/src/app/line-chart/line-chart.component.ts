  import { Component } from '@angular/core';
  import { User } from '../model/User';
  import { UserService } from '../services/user.service';
  import { Chart } from 'chart.js';

  @Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
  })
  export class LineChartComponent {

    lineChart: any;
    user: User[] = [];
    hoursCount: number[] = Array.from({ length: 24 }, () => 0); // Initialize array with 24 zeros

    constructor(private data: UserService) {
      this.data.getAllUsers().subscribe(
        (res: any) => {
          this.user = res;
          this.countHours(this.user);
          this.createLineChart();
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );
    }

    countHours(users: User[]) {
      users.forEach(user => {
        const registeredTime = new Date(user.registration_date);
        const registeredHour = registeredTime.getUTCHours();
        this.hoursCount[registeredHour]++;
      });
    }

    createLineChart() {
      const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const data = this.hoursCount;

      const ctx = document.getElementById('MyLineChart') as HTMLCanvasElement;
      if (this.lineChart) {
        this.lineChart.destroy();
      }
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Hour of Registration',
              data: data,
              backgroundColor: 'blue'
            },
          ]
        },
        options: {
          aspectRatio: 2.5
        }
      });
    }
  }
