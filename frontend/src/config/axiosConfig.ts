import axios from "axios";
import { getNavigate } from "@/util/navigationService";

const API_URL = "http://localhost:8080/api";
const EXPIRED_TOKEN_REDIRECT_URL = "/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem("token", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, redirect to home
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        const navigate = getNavigate();
        if (navigate) {
          navigate(EXPIRED_TOKEN_REDIRECT_URL);
        } else {
          console.info(
            "Warning: No navigate function found. Using window.location.href, which is not recommended."
          );
          window.location.href = EXPIRED_TOKEN_REDIRECT_URL;
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
