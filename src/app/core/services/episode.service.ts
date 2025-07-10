import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Episode } from '../../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private baseUrl = `${environment.apiUrl}/episodes`;
  constructor(private http: HttpClient) {}

  // Fetch all episodes (with optional pagination if API supports it)
  getEpisodes(): Observable<{ status: string; data: Episode[] }> {
    return this.http.get<{ status: string; data: Episode[] }>(this.baseUrl);
  }

  // Fetch a single episode by ID
  getEpisode(idOrSlug: string): Observable<{ status: string; data: Episode }> {
    return this.http.get<{ status: string; data: Episode }>(
      `${this.baseUrl}/${idOrSlug}`
    );
  }

  // Create new episode
  addEpisode(episode: any): Observable<any> {
    return this.http.post(this.baseUrl, episode);
  }

  // Update episode
  updateEpisode(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete episode
  deleteEpisode(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
