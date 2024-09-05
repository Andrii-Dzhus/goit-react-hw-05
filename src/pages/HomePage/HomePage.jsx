import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../TMDS";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };
    getMovies();
  }, []);
  return <MovieList movies={movies} />;
}
