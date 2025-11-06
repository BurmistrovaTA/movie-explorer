import { useState, useEffect } from "react";
import { type MovieType } from "../types/types";
import { fetchMovies } from "../services/api"; 

export const useMovies = (query: string) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(query);
        setMovies(data);
        setError(null);
      } catch {
        setError("Ошибка при загрузке данных");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { movies, loading, error };
};
