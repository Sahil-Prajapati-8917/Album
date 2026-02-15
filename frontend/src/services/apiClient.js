import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors here if needed
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors
        return Promise.reject(error);
    }
);

export default apiClient;
