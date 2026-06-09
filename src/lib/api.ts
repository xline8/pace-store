import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — normalize error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Network error: Unable to reach the server. Please check your connection.'));
    }
    const status = error.response.status;
    if (status >= 500) {
      return Promise.reject(new Error(`Server error (${status}): The server encountered a problem. Please try again later.`));
    }
    if (status === 404) {
      return Promise.reject(new Error('Not found: The requested resource does not exist.'));
    }
    if (status >= 400) {
      return Promise.reject(new Error(`Client error (${status}): The request could not be completed.`));
    }
    return Promise.reject(error);
  }
);

export default api;
