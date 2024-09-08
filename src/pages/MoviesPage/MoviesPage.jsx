import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../TMDS";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const [noResultsMessage, setNoResultsMessage] = useState("");

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
          // Save the search results in session storage
          sessionStorage.setItem("searchResults", JSON.stringify(results));
        } catch (error) {
          console.error("Failed to search movies:", error);
          setNoResultsMessage("An error occurred while fetching movies.");
        }
      }
    };

    // Restore the search results from session storage
    const savedResults = sessionStorage.getItem("searchResults");
    if (savedResults) {
      setMovies(JSON.parse(savedResults));
    } else {
      fetchMovies();
    }
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
