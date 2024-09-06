import { useState } from "react";
import { searchMovies } from "../../TMDS";
import MovieList from "../../components/MovieList/MovieList";

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

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
}
