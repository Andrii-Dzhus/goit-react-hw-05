import { useState } from "react";
import { searchMovies } from "../../TMDS";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error("Failed to search movies:", error);
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
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
}
