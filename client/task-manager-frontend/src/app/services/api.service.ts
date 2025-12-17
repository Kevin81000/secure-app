import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            })
        };
    }

    getTasks() {
        return this.http.get(`${this.baseUrl}/tasks`, this.getHeaders());
    }

    createTask(title: string) {
        return this.http.post(`${this.baseUrl}/tasks`, { title }, this.getHeaders());
    }

    deleteTask(id: number) {
        return this.http.delete(`${this.baseUrl}/tasks/${id}`, this.getHeaders());
    }

    getUsers() {
        return this.http.get(`${this.baseUrl}/users`, this.getHeaders());
    }
}