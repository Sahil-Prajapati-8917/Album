const API_BASE_URL = 'http://localhost:5000/api';

// Store token in localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
};

// Store user data in localStorage
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const removeUser = () => {
  localStorage.removeItem('user');
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication functions
export const registerUser = async (userData) => {
  const response = await apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.success) {
    setToken(response.data.token);
    setUser(response.data.user);
  }

  return response;
};

export const loginUser = async (credentials) => {
  const response = await apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.success) {
    setToken(response.data.token);
    setUser(response.data.user);
  }

  return response;
};

export const logoutUser = () => {
  removeToken();
  removeUser();
};

export const getCurrentUser = async () => {
  try {
    const response = await apiRequest('/users/me');
    if (response.success) {
      setUser(response.data);
    }
    return response;
  } catch (error) {
    // If token is invalid, clear localStorage
    logoutUser();
    throw error;
  }
};

export const getUserProfile = async () => {
  return await apiRequest('/users/profile');
};

export const updateUserProfile = async (profileData) => {
  const response = await apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });

  if (response.success) {
    setUser(response.data);
  }

  return response;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Initialize auth state from localStorage
export const initializeAuth = () => {
  const token = getToken();
  const user = getUser();
  
  if (token && user) {
    return { isAuthenticated: true, user };
  }
  
  return { isAuthenticated: false, user: null };
};

// Export getUser for use in components
export { getUser };
