export interface MovieType {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Genre: string;    
  imdbRating: string;
}

export interface MovieCardProps {
  imdbID: string;
  title: string;
  posterUrl: string;
  year: string;
  genre: string;
  rating: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails?: (id: string) => void;
}

export type MovieDetails = {
  Title: string;
  Year: string;
  Genre: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
  Director?: string;
  Actors?: string;
  Runtime?: string;
};

export type MovieModalProps = {
  imdbID: string;
  onClose: () => void;
};