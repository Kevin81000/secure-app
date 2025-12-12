import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  tasks: any[] = [];
  constructor(private http: HttpClient) {
    this.loadTasks();
  }
  loadTasks() {
    this.http.get('/api/tasks').subscribe(data => this.tasks = data as any[]);
  }
}
