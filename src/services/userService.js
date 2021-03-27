import axios from "axios";

const endpoint = "http://localhost:3900/api/users";

export function register(user) {
  return axios.post(endpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
