import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private baseUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    createUser(dto: Partial<User>): Observable<User> {
        return this.http.post<User>(this.baseUrl, dto);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    updateUser(id: string, dto: Partial<User>): Observable<User> {
        return this.http.patch<User>(`${this.baseUrl}/${id}`, dto);
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
