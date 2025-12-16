import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [FormsModule , CommonModule],
    template: `
    <div>
      <h2>Tasks</h2>
      <div>
        <input [(ngModel)]="newTitle" placeholder="New task title" />
        <button (click)="createTask()">Create Task</button>
      </div>
      <ul>
        <li *ngFor="let task of tasks">
          {{ task.title }}
          <button (click)="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  `
})
export class TasksComponent {
    tasks: any[] = [];
    newTitle = '';

    constructor(private http: HttpClient) {
        this.loadTasks();
    }

    loadTasks() {
        this.http.get<any[]>('http://localhost:3000/tasks').subscribe(data => this.tasks = data);
    }

    createTask() {
        if (!this.newTitle) return;
        this.http.post('http://localhost:3000/tasks', { title: this.newTitle }).subscribe(() => {
            this.newTitle = '';
            this.loadTasks();
        });
    }

    deleteTask(id: number) {
        this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => this.loadTasks());
    }
}