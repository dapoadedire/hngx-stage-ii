import { useQuery } from "@tanstack/react-query";

const API_URL = "https://api.themoviedb.org/3/movie";
const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

export const useFetchMovieByTitle = (movieTitle) => {
  
  const { data, isLoading, isError, error } = useQuery(
    ["movie", movieTitle],
    async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      };
      const response = await fetch(
        `${API_URL}/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
        options,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  );
  return { data, isLoading, isError, error };
};
