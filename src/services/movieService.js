import axios from "axios";
import http from "./httpService"; //grayed because of no direct reference here, but it's working, it's very important to mport it in order to include the jwt in the requests headers

const endpoint = "http://localhost:3900/api/movies";

export async function getMovies() {
  const { data } = await axios.get(endpoint);
  return data;
}

export async function deleteMovie(movieId) {
  const { data } = await axios.delete(`${endpoint}/${movieId}`);
  return data;
}

export async function getMovie(movieId) {
  const { data } = await axios.get(`${endpoint}/${movieId}`);
  return data;
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  if (movie._id) return axios.put(`${endpoint}/${movie._id}`, body);
  else return axios.post(endpoint, body);
}
