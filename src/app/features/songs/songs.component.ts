import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SongService } from '../../core/services/song.service';
import { GenreService } from '../../core/services/genre.service';
import { PlaylistService } from '../../core/services/playlist.service';
import { ExternalMusicService, ExternalSong } from '../../core/services/external-music.service';
import { DurationPipe } from '../../shared/duration-pipe/duration.pipe';
import { Song, Genre, Playlist } from '../../core/models/models';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [FormsModule, DurationPipe],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent implements OnInit, OnDestroy {
  // Catálogo local
  songs     = signal<Song[]>([]);
  genres    = signal<Genre[]>([]);
  playlists = signal<Playlist[]>([]);
  loading   = signal(true);

  selectedGenre = signal<string>('');
  activeSong    = signal<Song | null>(null);

  // Busca externa (iTunes via Http Exchange)
  searchTerm    = signal<string>('');
  externalSongs = signal<ExternalSong[]>([]);
  searching     = signal(false);
  showExternal  = signal(false);

  private searchInput$ = new Subject<string>();
  private destroy$     = new Subject<void>();

  constructor(
    private songService: SongService,
    private genreService: GenreService,
    private playlistService: PlaylistService,
    private externalMusic: ExternalMusicService,
  ) {}

  ngOnInit() {
    this.genreService.getAll().subscribe(g => this.genres.set(g));
    this.playlistService.getAll().subscribe(p => this.playlists.set(p));
    this.fetchSongs();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Catálogo local ──────────────────────────────────────
  fetchSongs() {
    this.loading.set(true);
    const genre = this.selectedGenre() || undefined;
    this.songService.getAll(genre).subscribe({
      next: s  => { this.songs.set(s); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  filterByGenre(slug: string) {
    this.selectedGenre.set(slug);
    this.fetchSongs();
  }

  addToPlaylist(playlistId: number, songId: number) {
    this.playlistService.addSong(playlistId, songId).subscribe();
    this.activeSong.set(null);
  }

  toggleMenu(song: Song) {
    this.activeSong.set(this.activeSong()?.id === song.id ? null : song);
  }

  // ── Busca externa (iTunes Http Exchange) ────────────────
  setupSearch() {
    this.searchInput$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term.trim()) {
          this.externalSongs.set([]);
          this.showExternal.set(false);
          this.searching.set(false);
          return of(null);
        }
        this.searching.set(true);
        this.showExternal.set(true);
        return this.externalMusic.search(term, 8);
      }),
      takeUntil(this.destroy$),
    ).subscribe({
      next: res => {
        if (res) {
          this.externalSongs.set(res.results);
        }
        this.searching.set(false);
      },
      error: () => this.searching.set(false),
    });
  }

  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
    this.searchInput$.next(term);
  }

  clearSearch() {
    this.searchTerm.set('');
    this.searchInput$.next('');
    this.showExternal.set(false);
    this.externalSongs.set([]);
  }

  formatMs(ms: number): string {
    if (!ms) return '--:--';
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }
}
