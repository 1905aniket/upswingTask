import { signal, computed } from '@angular/core';
import { Injectable } from '@angular/core';
import { Task } from '../shared/models/task-model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskStore {
    private tasksSignal = signal<Task[]>([]);
    tasks = computed(() => this.tasksSignal());

    addTask(task: Omit<Task, 'id'>) {
        debugger
        const newTask: Task = { ...task, id: uuidv4() };
        this.tasksSignal.set([...this.tasksSignal(), newTask]);
    }

    updateTask(updated: Task) {
        this.tasksSignal.set(
            this.tasksSignal().map(t => (t.id === updated.id ? updated : t))
        );
    }

    deleteTask(id: string) {
        this.tasksSignal.set(this.tasksSignal().filter(t => t.id !== id));
    }
    getTaskById(id: string): Task | undefined {
        return this.tasksSignal().find(task => task.id === id);
    }

    statusDistribution = computed(() => {
        const counts: Record<string, number> = {};
        for (const task of this.tasksSignal()) {
            counts[task.status] = (counts[task.status] || 0) + 1;
        }
        return counts;
    });

    taskTrends = computed(() => {
        const byDate: Record<string, number> = {};
        for (const task of this.tasksSignal()) {
            const date = new Date(task.createdAt).toDateString();
            byDate[date] = (byDate[date] || 0) + 1;
        }
        return byDate;
    });
}