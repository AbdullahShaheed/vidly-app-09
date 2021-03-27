import axios from "axios";
import http from "./httpService";

const endpoint = "http://localhost:3900/api/genres";

export async function getGenres() {
  const { data } = await axios.get(endpoint);
  return data;
}

export async function getGenre(genreId) {
  const { data } = await axios.get(`${endpoint}/${genreId}`);
  return data;
}
