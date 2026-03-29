import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlaylistService } from '../../../core/services/playlist.service';
import { DurationPipe } from '../../../shared/duration-pipe/duration.pipe';
import { Playlist } from '../../../core/models/models';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [RouterLink, DurationPipe],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.css',
})
export class PlaylistDetailComponent implements OnInit {
  playlist = signal<Playlist | null>(null);
  loading  = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playlistService.getById(id).subscribe({
      next: p  => { this.playlist.set(p); this.loading.set(false); },
      error: () => { this.loading.set(false); this.router.navigate(['/playlists']); },
    });
  }

  removeSong(songId: number) {
    const pl = this.playlist();
    if (!pl) return;
    this.playlistService.removeSong(pl.id, songId).subscribe(updated => this.playlist.set(updated));
  }

  totalDuration(): number {
    return this.playlist()?.songs.reduce((acc, s) => acc + (s.duration ?? 0), 0) ?? 0;
  }
}
