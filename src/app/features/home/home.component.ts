import { Component, OnInit, signal, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SongService } from '../../core/services/song.service';
import { GenreService } from '../../core/services/genre.service';
import { UserService } from '../../core/services/user.service';
import { DurationPipe } from '../../shared/duration-pipe/duration.pipe';
import { Song, Genre } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DurationPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recommended = signal<Song[]>([]);
  allGenres   = signal<Genre[]>([]);
  loading     = signal(true);

  // Model signal para gêneros selecionados
  selectedGenreIds = model<number[]>([]);

  constructor(
    public auth: AuthService,
    private songService: SongService,
    private genreService: GenreService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    // Inicializa com gêneros favoritos do usuário atual
    const favIds = this.auth.currentUser()?.favoriteGenres.map(g => g.id) ?? [];
    this.selectedGenreIds.set(favIds);

    this.genreService.getAll().subscribe(genres => this.allGenres.set(genres));
    this.loadRecommended();
  }

  loadRecommended() {
    this.loading.set(true);
    this.songService.getRecommended().subscribe({
      next: songs => { this.recommended.set(songs); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  toggleGenre(id: number) {
    const current = this.selectedGenreIds();
    const next = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id];
    this.selectedGenreIds.set(next);

    this.userService.updateFavoriteGenres(next).subscribe(() => this.loadRecommended());
  }

  isSelected(id: number) {
    return this.selectedGenreIds().includes(id);
  }
}
