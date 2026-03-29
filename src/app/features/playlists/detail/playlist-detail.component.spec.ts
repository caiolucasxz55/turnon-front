import { TestBed } from '@angular/core/testing';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PlaylistDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDetailComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PlaylistDetailComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
