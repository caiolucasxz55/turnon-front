import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Song } from '../models/models';

@Injectable({ providedIn: 'root' })
export class SongService {
  private readonly API = 'http://localhost:8080/songs';

  constructor(private http: HttpClient) {}

  getAll(genre?: string) {
    let params = new HttpParams();
    if (genre) {
      params = params.set('genre', genre);
    }
    return this.http.get<Song[]>(this.API, { params });
  }

  getRecommended() {
    return this.http.get<Song[]>(`${this.API}/recommended`);
  }
}
