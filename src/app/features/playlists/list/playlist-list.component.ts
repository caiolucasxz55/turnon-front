import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PlaylistService } from '../../../core/services/playlist.service';
import { Playlist } from '../../../core/models/models';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css',
})
export class PlaylistListComponent implements OnInit {
  playlists  = signal<Playlist[]>([]);
  loading    = signal(true);
  showModal  = signal(false);
  submitting = signal(false);

  form = this.fb.group({
    name:        ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
  });

  constructor(
    private playlistService: PlaylistService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.playlistService.getAll().subscribe({
      next: p  => { this.playlists.set(p); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openModal()  { this.showModal.set(true); this.form.reset(); }
  closeModal() { this.showModal.set(false); }

  create() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { name, description } = this.form.value;
    this.submitting.set(true);
    this.playlistService.create(name!, description ?? undefined).subscribe({
      next: () => { this.load(); this.closeModal(); this.submitting.set(false); },
      error: () => this.submitting.set(false),
    });
  }

  delete(id: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm('Excluir esta playlist?')) return;
    this.playlistService.delete(id).subscribe(() => this.load());
  }
}
