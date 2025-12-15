import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <h2>Tasks</h2>
    <div>
      <input [(ngModel)]="newTask" placeholder="New task title" />
      <button (click)="addTask()">Add Task</button>
    </div>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} (Owner: {{ task.owner?.name || 'Unknown' }})
        <button (click)="deleteTask(task.id)" *ngIf="isOwner(task)">Delete</button>
      </li>
    </ul>
  `
})
export class TasksComponent {
    tasks: any[] = [];
    newTask = '';

    constructor(private http: HttpClient) {
        this.loadTasks();
    }

    loadTasks() {
        this.http.get<any[]>('/tasks').subscribe(data => this.tasks = data);
    }

    addTask() {
        if (!this.newTask) return;
        this.http.post('/tasks', { title: this.newTask }).subscribe(() => {
            this.newTask = '';
            this.loadTasks();
        });
    }

    deleteTask(id: number) {
        this.http.delete(`/tasks/${id}`).subscribe(() => this.loadTasks());
    }

    isOwner(task: any) {
        
        return true; 
    }
}