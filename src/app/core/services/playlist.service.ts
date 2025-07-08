import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  // ✅ Create playlist
  createPlaylist(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // ✅ Get all playlists
  getPlaylists(): Observable<{ status: string; data: { data: Playlist[] } }> {
    return this.http.get<{ status: string; data: { data: Playlist[] } }>(this.baseUrl);
  }

  // ✅ Get single playlist
  getPlaylist(id: number | string): Observable<{ status: string; data: Playlist }> {
    return this.http.get<{ status: string; data: Playlist }>(`${this.baseUrl}/${id}`);
  }

  // ✅ Update playlist
  updatePlaylist(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // ✅ Delete playlist
  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
