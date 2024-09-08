import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../TMDS";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        try {
          const results = await searchMovies(query, page);
          if (results.length === 0) {
            setNoResultsMessage("No movies found");
          } else {
            setNoResultsMessage("");
          }
          setMovies(results);
        } catch (error) {
          console.error("Failed to search movies:", error);
          setNoResultsMessage("An error occurred while fetching movies.");
        }
      }
    };

    fetchMovies();
  }, [query, page]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = () => {
    setSearchParams({ query: inputValue, page: 1 });
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
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      {noResultsMessage && <p className={css.noResults}>{noResultsMessage}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
