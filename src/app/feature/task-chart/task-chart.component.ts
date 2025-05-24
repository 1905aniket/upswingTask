import { Component } from '@angular/core';
import { TaskStore } from '../../store/task-store';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartOptions, registerables } from 'chart.js'



@Component({
  selector: 'app-task-chart',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './task-chart.component.html',
  styleUrl: './task-chart.component.scss'
})
export class TaskChartComponent {

  statusData: any
  trendData: any;
  constructor(public taskStore: TaskStore) {
    Chart.register(...registerables);
    this.statusData = this.taskStore.statusDistribution;
    this.trendData = this.taskStore.taskTrends;
  }


  get doughnutChartData() {
    const data = this.taskStore.statusDistribution();
    return {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: ['#ffc107', '#17a2b8', '#28a745'],
        },
      ],
    };
  }

  get barChartData() {
    const data = this.taskStore.taskTrends();
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Tasks Over Time',
          data: Object.values(data),
          backgroundColor: '#007bff',
        },
      ],
    };
  }

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };
}
