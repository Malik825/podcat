import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../../models/playlist.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private baseUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ status: string; data: { data: Playlist[] } }> {
    return this.http.get<{ status: string; data: { data: Playlist[] } }>(this.baseUrl);
  }

  getOne(id: number): Observable<{ status: string; data: Playlist }> {
    return this.http.get<{ status: string; data: Playlist }>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Playlist>): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: number, data: Partial<Playlist>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
