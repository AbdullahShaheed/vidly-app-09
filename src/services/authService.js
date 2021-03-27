import axios from "axios";
import jwt_decode from "jwt-decode";

const endpoint = "http://localhost:3900/api/auth";

async function login(email, password) {
  const { data: token } = await axios.post(endpoint, { email, password });
  localStorage.setItem("token", token);
}

function loginWithJwt(token) {
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwt_decode(token);
  } catch {
    return null;
  }
}

function getToken() {
  return localStorage.getItem("token");
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getToken,
};
