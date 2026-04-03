import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private readonly API = 'https://turnon-app-cp5.azurewebsites.net/playlists';

  constructor(private http: HttpClient) {}

  getAll()                           { return this.http.get<Playlist[]>(this.API); }
  getById(id: number)                { return this.http.get<Playlist>(`${this.API}/${id}`); }
  create(name: string, description?: string) { return this.http.post<Playlist>(this.API, { name, description }); }
  update(id: number, name: string, description?: string) { return this.http.put<Playlist>(`${this.API}/${id}`, { name, description }); }
  delete(id: number)                 { return this.http.delete<void>(`${this.API}/${id}`); }
  addSong(pid: number, sid: number)  { return this.http.post<Playlist>(`${this.API}/${pid}/songs/${sid}`, {}); }
  removeSong(pid: number, sid: number) { return this.http.delete<Playlist>(`${this.API}/${pid}/songs/${sid}`); }
}
