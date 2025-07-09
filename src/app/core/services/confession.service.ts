import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Confession } from '../../models/confession.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfessionService {
  private baseUrl = `${environment.apiUrl}/confessions`;

  constructor(private http: HttpClient) {}

  getConfessions(): Observable<{ status: string; data: Confession[] }> {
    return this.http.get<{ status: string; data: Confession[] }>(this.baseUrl);
  }
  updateConfession(id: number, data: Partial<Confession>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteConfession(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createConfession(data: {
    message: string;
    category: string;
    emotion: string;
  }) {
    // console.log(data);
    return this.http.post(this.baseUrl, data);
  }
}
