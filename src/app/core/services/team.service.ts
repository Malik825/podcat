import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  TeamMember,
  CreateTeamMember,
  UpdateTeamMember
} from '../../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = `${environment.apiUrl}/team-members`;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<{ status: string; data: TeamMember[] }> {
    return this.http.get<{ status: string; data: TeamMember[] }>(this.baseUrl);
  }

  addTeamMember(member: CreateTeamMember): Observable<{ status: string; data: TeamMember }> {
    return this.http.post<{ status: string; data: TeamMember }>(this.baseUrl, member);
  }

  deleteTeamMember(id: number): Observable<{ status: string; message: string }> {
    return this.http.delete<{ status: string; message: string }>(`${this.baseUrl}/${id}`);
  }

  updateTeamMember(id: number, data: UpdateTeamMember): Observable<{ status: string; data: TeamMember }> {
    return this.http.put<{ status: string; data: TeamMember }>(`${this.baseUrl}/${id}`, data);
  }
}
