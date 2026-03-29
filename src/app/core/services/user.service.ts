import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private auth: AuthService) {}

  updateFavoriteGenres(genreIds: number[]) {
    return this.http
      .put<User>(`${this.API}/me/genres`, { genreIds })
      .pipe(tap(user => this.auth.updateUser(user)));
  }
}
