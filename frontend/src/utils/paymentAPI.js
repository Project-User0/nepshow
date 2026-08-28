import { apiClient } from './api';

// Payment APIs
export const getUserPayments = async () => {
  try {
    const response = await apiClient.get('/payments/my-payments');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch payments' };
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment creation failed' };
  }
};

export const handlePaymentFailure = async (failureData) => {
  try {
    const response = await apiClient.post('/payments/failure', failureData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failure recording failed' };
  }
};

export const completePayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments/complete', paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment completion failed' };
  }
};

// Notification APIs
export const getUserNotifications = async () => {
  try {
    const response = await apiClient.get('/notifications');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch notifications' };
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const response = await apiClient.get('/notifications/unread-count');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch unread count' };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to mark as read' };
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await apiClient.delete(`/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete notification' };
  }
};
