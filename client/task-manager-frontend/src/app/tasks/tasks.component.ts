// src/app/tasks/tasks.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div style="padding: 40px;">
      <h2>Tasks</h2>

      <!-- CREATE TASK FORM -->
      <div style="background: #f0f8ff; padding: 30px; border-radius: 10px; margin-bottom: 40px;">
        <h3>Create New Task</h3>
        <input 
          [(ngModel)]="newTaskTitle" 
          placeholder="Type task title here..." 
          style="padding: 15px; width: 500px; font-size: 16px; border-radius: 8px; border: 1px solid #ccc;"
        />
        <button 
          (click)="createTask()" 
          style="padding: 15px 30px; background: #007bff; color: white; font-size: 16px; border: none; border-radius: 8px; margin-left: 10px; cursor: pointer;">
          CREATE TASK
        </button>
        <p *ngIf="message" style="color: green; margin-top: 10px;">{{ message }}</p>
        <p *ngIf="error" style="color: red; margin-top: 10px;">{{ error }}</p>
      </div>

      <!-- TASK LIST -->
      <h3>All Tasks</h3>
      <ul style="list-style: none; padding: 0;">
        <li *ngFor="let task of tasks" style="padding: 20px; margin: 10px 0; background: white; border: 1px solid #ddd; border-radius: 8px;">
          <strong style="font-size: 18px;">{{ task.title }}</strong>
          <br>
          <small>Owner: {{ task.ownerName || 'You' }}</small>
          <button 
            (click)="deleteTask(task.id)" 
            style="margin-left: 20px; padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px;">
            Delete
          </button>
        </li>
      </ul>
      <p *ngIf="tasks.length === 0">No tasks yet — create one above!</p>
    </div>
  `
})
export class TasksComponent {
    tasks: any[] = [];
    newTaskTitle = '';
    message = '';
    error = '';

    constructor(private http: HttpClient) {
        this.loadTasks();
    }

    private getHeaders() {
        const token = localStorage.getItem('token');
        if (!token) return {};
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    loadTasks() {
        this.http.get<any[]>('http://localhost:3000/tasks', { headers: this.getHeaders() }).subscribe({
            next: (data) => this.tasks = data,
            error: () => this.error = 'Failed to load tasks (are you logged in?)'
        });
    }

    createTask() {
        if (!this.newTaskTitle.trim()) {
            this.error = 'Task title is required';
            return;
        }

        this.http.post('http://localhost:3000/tasks', { title: this.newTaskTitle }, {
            headers: this.getHeaders()
        }).subscribe({
            next: () => {
                this.newTaskTitle = '';
                this.message = 'Task created successfully!';
                this.error = '';
                this.loadTasks();
            },
            error: (err) => this.error = err.error?.message || 'Failed to create task'
        });
    }

    deleteTask(id: number) {
        this.http.delete(`http://localhost:3000/tasks/${id}`, {
            headers: this.getHeaders()
        }).subscribe({
            next: () => this.loadTasks(),
            error: () => this.error = 'Cannot delete (not owner or not admin)'
        });
    }
}