import { Routes } from '@angular/router';
import { TaskAddEditComponent } from './feature/task-add-edit/task-add-edit.component';
import { TaskTableComponent } from './feature/task-table/task-table.component';
import { TaskChartComponent } from './feature/task-chart/task-chart.component';
import { ProductListComponent } from './feature/product-list/product-list.component';
import { UsersListComponent } from './feature/users-list/users-list.component';

export const routes: Routes = [
    { path: 'tasks/table', component: TaskTableComponent },
    { path: 'product/table', component: ProductListComponent },
    { path: 'users/table', component: UsersListComponent },
    { path: 'tasks/charts', component: TaskChartComponent },
    { path: '', redirectTo: '/tasks/table', pathMatch: 'full' },
  ];
