import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../TMDS";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
<<<<<<< HEAD

=======
>>>>>>> 275db0dd0aee92f31edf48b209116845043182d1
export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Отримуємо поточний запит з URL
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        try {
          const results = await searchMovies(query, page);
          setMovies(results);
        } catch (error) {
          console.error("Failed to search movies:", error);
        }
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearch = () => {
    // Оновлюємо URL, додаючи query та page
    setSearchParams({ query, page: 1 });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={css.con}>
      <input
        type="text"
        value={query}
<<<<<<< HEAD
        onChange={e => setSearchParams({ query: e.target.value, page: 1 })}
=======
        onChange={e => setQuery(e.target.value)}
>>>>>>> 275db0dd0aee92f31edf48b209116845043182d1
        onKeyDown={handleKeyPress}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
}
