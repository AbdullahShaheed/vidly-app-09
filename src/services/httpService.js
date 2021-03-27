import axios from "axios";
import { toast } from "react-toastify";
import authService from "./authService";

axios.defaults.headers.common["x-auth-token"] = authService.getToken();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error:", error);
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});
