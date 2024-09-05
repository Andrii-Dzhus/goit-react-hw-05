import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDUyNTg1ZGM2NzFhNmQ3YTc4Y2I4YjU4ZDMwYWFkMyIsIm5iZiI6MTcyNTM2NTM1OS4wMjcyMjcsInN1YiI6IjY2ZDZiOTFhMmZhMWE0ZTc2MDk0NjgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjCMCytyR1KWwixtLeBA-pamxV5OX76MALTl5t1NcDU";

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.date.results;
};
