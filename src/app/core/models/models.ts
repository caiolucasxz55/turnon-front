export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  coverUrl?: string;
  previewUrl?: string;
  genre: Genre;
}

export interface User {
  id: number;
  name: string;
  email: string;
  favoriteGenres: Genre[];
}

export interface Playlist {
  id: number;
  name: string;
  description?: string;
  songs: Song[];
}

export interface AuthResponse {
  token: string;
  user: User;
}
