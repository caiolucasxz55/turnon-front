import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ExternalSong {
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackTimeMillis: number;
}

export interface ExternalSearchResponse {
  resultCount: number;
  results: ExternalSong[];
}

@Injectable({ providedIn: 'root' })
export class ExternalMusicService {
  private readonly API = 'https://turnon-app-cp5.azurewebsites.net/external/songs';

  constructor(private http: HttpClient) {}

  search(term: string, limit = 10) {
    return this.http.get<ExternalSearchResponse>(`${this.API}/search`, {
      params: { term, limit },
    });
  }
}
