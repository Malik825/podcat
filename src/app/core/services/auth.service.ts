import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../models/auth.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Register a new user
  register(data: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, data);
  }

  // 🔐 Login
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res.status === 'success') {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log('[AuthService] User logged in:', res.data.user);
        }
      })
    );
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // ✅ Check if user is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🧠 Optional: semantic alias
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // 🔑 Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 👤 Get logged-in user
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
