import { TestBed } from '@angular/core/testing';
import { PlaylistListComponent } from './playlist-list.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PlaylistListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistListComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PlaylistListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
