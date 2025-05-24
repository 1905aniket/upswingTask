export interface Task {
    id: string;
    title: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    createdAt: string;
  }
  