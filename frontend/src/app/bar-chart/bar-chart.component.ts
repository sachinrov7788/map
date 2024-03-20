import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  barChart: any;
  user: any[] = [];
  months: { [key: string]: number } = {};
  month: any;
  year: any;

  constructor(private data: UserService) {
    this.data.getAllUsers().subscribe(
      (res: any) => {
        this.user = res;
        this.countMonths(this.user);
        this.createBarChart(Object.keys(this.months), Object.values(this.months));
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    );
  }

  selectedMonth(event: Event) {
    this.month = (event.target as HTMLSelectElement).value;
    this.updateChart();
  }

  selectedYear(event: Event) {
    this.year = (event.target as HTMLSelectElement).value;
    this.updateChart();
  }

  updateChart() {
    if (this.year && this.month && this.user.length > 0) {

      const filteredDates = this.user.filter((user: { registration_date: string | number | Date }) => {
        const registrationDate = new Date(user.registration_date);
        const year = registrationDate.getFullYear();
        const month = registrationDate.getMonth() + 1; // Months are zero-indexed
        console.log('Registration Date:', registrationDate, 'Year:', year, 'Month:', month);
        return month === parseInt(this.month, 10) && year === parseInt(this.year, 10);
      }).map((user: { registration_date: any }) => user.registration_date);

      const dateCounts = filteredDates.reduce((counts: { [key: string]: number }, date: string) => {
        const formattedDate = date.split('T')[0]; // Extract date part only
        console.log('Formatted Date:', formattedDate);

        counts[formattedDate] = (counts[formattedDate] || 0) + 1;
        return counts;
      }, {});


      this.createBarChart(Object.keys(dateCounts), Object.values(dateCounts))
    }
  }

  countMonths(users: any[]) {
    this.months = {};
    users.forEach((user: any) => {
      const registrationDate = new Date(user.registration_date);
      const month = registrationDate.getMonth() + 1; // Months are 0 indexed
      const year = registrationDate.getFullYear();
      const key = `${year}-${month}`;
      this.months[key] = (this.months[key] || 0) + 1;
    });
  }

  createBarChart(labels: string[], data: number[]) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.barChart) {
      this.barChart.destroy(); // Destroy existing chart instance
    }
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Month',
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
