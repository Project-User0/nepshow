import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  clearAuthState,
  getStoredToken,
  getStoredUser,
  isAuthenticated,
  logoutAPI,
  persistAuthState,
  updateStoredUser,
} from './authMiddleware';

const API_URL = 'http://localhost:8000/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiry
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthState();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH APIS ============
export const loginAPI = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    });

    if (response.data.success) {
      const userPayload = response.data.user || {};
      persistAuthState({
        token: response.data.token,
        user: {
          ...userPayload,
          subscription: userPayload.subscription || {},
        },
      });
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const signupAPI = async (name, email, password, passwordConfirmation) => {
  try {
    const response = await apiClient.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    });

    if (response.data.success) {
      const userPayload = response.data.user || {};
      persistAuthState({
        token: response.data.token,
        user: {
          ...userPayload,
          subscription: userPayload.subscription || {},
        },
      });
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Signup failed' };
  }
};

export const getToken = () => getStoredToken();

export const getUser = () => getStoredUser();

export const isAuth = () => isAuthenticated();
export const logout = () => logoutAPI();

export const refreshUserState = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    if (response.data?.success) {
      updateStoredUser(response.data.data || response.data.user);
      return response.data.data || response.data.user;
    }
  } catch (error) {
    console.error('Failed to refresh user state', error);
  }
  return getUser();
};

export const fetchCurrentUserAPI = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data?.data || response.data || null;
};

export const updateCurrentUserAPI = async (userData) => {
  const response = await apiClient.put('/auth/profile', userData);
  return response.data?.data || response.data || null;
};

// ============ USER MANAGEMENT APIS (Admin) ============
export const fetchUsersAPI = async (params = {}) => {
  const response = await apiClient.get('/users', { params });
  return response.data;
};

export const createUserAPI = async (userData) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

export const updateUserAPI = async (userId, userData) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUserAPI = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

// ============ MOVIE MANAGEMENT APIS (Admin) ============
export const fetchMoviesAPI = async (params = {}) => {
  const response = await apiClient.get('/movies', { params });
  return response.data;
};

export const createMovieAPI = async (movieData) => {
  const response = await apiClient.post('/movies', movieData);
  return response.data;
};

export const updateMovieAPI = async (movieId, movieData) => {
  const response = await apiClient.put(`/movies/${movieId}`, movieData);
  return response.data;
};

export const deleteMovieAPI = async (movieId) => {
  const response = await apiClient.delete(`/movies/${movieId}`);
  return response.data;
};

// ============ REVIEW MANAGEMENT APIS (Admin - View Only) ============
export const fetchReviewsAPI = async () => {
  const response = await apiClient.get('/review');
  return response.data;
};

export const deleteReviewAPI = async (reviewId) => {
  const response = await apiClient.delete(`/review/${reviewId}`);
  return response.data;
};

// ============ PAYMENT MANAGEMENT APIS (Admin - View Only) ============
export const fetchPaymentsAPI = async (params = {}) => {
  const response = await apiClient.get('/payments', { params });
  return response.data;
};

export const deletePaymentAPI = async (paymentId) => {
  const response = await apiClient.delete(`/payments/${paymentId}`);
  return response.data;
};

// ============ TANSTACK QUERY HOOKS - USER MANAGEMENT ============
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsersAPI,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, userData }) => updateUserAPI(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// ============ TANSTACK QUERY HOOKS - MOVIE MANAGEMENT ============
export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMoviesAPI,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMovieAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ movieId, movieData }) => updateMovieAPI(movieId, movieData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMovieAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

// ============ TANSTACK QUERY HOOKS - REVIEW MANAGEMENT ============
export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviewsAPI,
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReviewAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

// ============ TANSTACK QUERY HOOKS - PAYMENT MANAGEMENT ============
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: fetchPaymentsAPI,
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePaymentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};
