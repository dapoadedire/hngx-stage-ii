import { useQuery } from "@tanstack/react-query";

const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

export const useFetchMovies = () => {
    
    const { data, isLoading, isError, error } = useQuery(
        ["movies"],
        async () => {
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${TMDB_API_TOKEN}`,
                }
              };
            const response = await fetch(`${API_URL}`, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }
    );
    return { data, isLoading, isError, error };
}
