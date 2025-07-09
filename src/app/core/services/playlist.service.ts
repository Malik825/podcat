import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/playlist.model';

interface PlaylistResponse {
  status: string;
  data: Playlist;
}

interface PlaylistListResponse {
  status: string;
  data: {
    data: Playlist[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  // ✅ Create playlist
  createPlaylist(data: Partial<Playlist>): Observable<PlaylistResponse> {
    return this.http.post<PlaylistResponse>(this.baseUrl, data);
  }

  // ✅ Get all playlists
  getPlaylists(): Observable<PlaylistListResponse> {
    return this.http.get<PlaylistListResponse>(this.baseUrl);
  }

  // ✅ Get single playlist
  getPlaylist(id: number | string): Observable<PlaylistResponse> {
    return this.http.get<PlaylistResponse>(`${this.baseUrl}/${id}`);
  }

  // ✅ Update playlist
  updatePlaylist(id: number, data: Partial<Playlist>): Observable<PlaylistResponse> {
    return this.http.put<PlaylistResponse>(`${this.baseUrl}/${id}`, data);
  }

  // ✅ Delete playlist
  deletePlaylist(id: number): Observable<{ status: string; message: string }> {
    return this.http.delete<{ status: string; message: string }>(`${this.baseUrl}/${id}`);
  }
}
