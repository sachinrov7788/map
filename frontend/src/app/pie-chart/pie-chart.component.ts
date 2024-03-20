import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit{

  pieChart: any;
  districtCounts: { [key: string]: number } = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => { 
        this.countDistricts(users);
        this.createPieChart();
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  } 

  countDistricts(users: User[]): void {
    this.districtCounts = {};
    users.forEach((user: User) => { 
      const district = user.district;
      this.districtCounts[district] = (this.districtCounts[district] || 0) + 1;
    });
  }

  createPieChart(): void {
    const labels = Object.keys(this.districtCounts);
    const data = Object.values(this.districtCounts);

    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Districts',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'User by District'
          }
        }
      }
    });
  }
}
