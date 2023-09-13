import { useQuery } from "@tanstack/react-query";
const API_URL = "https://api.themoviedb.org/3/movie";
const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

export const useFetchMovieDetails = (movieId) => {
  const { data, isLoading, isError, error } = useQuery(
    ["movie", movieId],
    async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      };
      const response = await fetch(
        `${API_URL}/${movieId}?language=en-US`,
        options,
      );
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      return response.json();
    },
  );
  return { movie:data, isLoading, isError, error };
};
