const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    // If user data is corrupted, clean it up
    localStorage.removeItem('user');
    return null;
  }
};

const removeUser = () => {
  localStorage.removeItem('user');
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Only set Content-Type to application/json if we are not sending FormData
  if (!(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // If token expired, clean up and redirect
      if (response.status === 401) {
        removeToken();
        removeUser();
      }
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

// Admin login — uses server-side admin authentication (AUTH-01 fix)
export const adminLogin = async (credentials) => {
  const response = await apiRequest('/users/admin-login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.success) {
    setToken(response.data.token);
    setUser(response.data.user);
    sessionStorage.setItem('isMasterAdmin', 'true');
  }

  return response;
};

export const logoutUser = () => {
  removeToken();
  removeUser();
  sessionStorage.removeItem('isMasterAdmin');
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

// Check if user is authenticated — validates token with server on first check
export const isAuthenticated = () => {
  return !!getToken();
};

// Validate token with server (used by ProtectedRoute)
export const validateToken = async () => {
  try {
    const response = await apiRequest('/users/me');
    return response.success;
  } catch (error) {
    return false;
  }
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

// Album functions
export const getMyAlbums = async (page = 1, limit = 50) => {
  return await apiRequest(`/albums?page=${page}&limit=${limit}`);
};

export const getAlbumById = async (id) => {
  return await apiRequest(`/albums/${id}`);
};

export const createAlbum = async (albumData) => {
  return await apiRequest('/albums', {
    method: 'POST',
    body: albumData instanceof FormData ? albumData : JSON.stringify(albumData),
  });
};

export const updateAlbum = async (id, albumData) => {
  return await apiRequest(`/albums/${id}`, {
    method: 'PUT',
    body: albumData instanceof FormData ? albumData : JSON.stringify(albumData),
  });
};

export const deleteAlbum = async (id) => {
  return await apiRequest(`/albums/${id}`, {
    method: 'DELETE',
  });
};

// Photographer functions
export const getMyPhotographers = async () => {
  return await apiRequest('/photographers');
};

export const createPhotographer = async (photographerData) => {
  return await apiRequest('/photographers', {
    method: 'POST',
    body: JSON.stringify(photographerData),
  });
};

export const updatePhotographer = async (id, photographerData) => {
  return await apiRequest(`/photographers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(photographerData),
  });
};

export const deletePhotographer = async (id) => {
  return await apiRequest(`/photographers/${id}`, {
    method: 'DELETE',
  });
};

// Billing functions
export const getBillingHistory = async () => {
  return await apiRequest('/billing/history');
};

export const purchaseCredits = async (purchaseData) => {
  return await apiRequest('/billing/purchase', {
    method: 'POST',
    body: JSON.stringify(purchaseData),
  });
};

export const getPlans = async () => {
  return await apiRequest('/billing/plans');
};

// Export getUser for use in components
export { getUser };
