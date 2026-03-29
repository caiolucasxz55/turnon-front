import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/models';

@Injectable({ providedIn: 'root' })
export class GenreService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Genre[]>('http://localhost:8080/genres');
  }
}
