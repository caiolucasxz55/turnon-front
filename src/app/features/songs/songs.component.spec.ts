import { TestBed } from '@angular/core/testing';
import { SongsComponent } from './songs.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('SongsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SongsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
