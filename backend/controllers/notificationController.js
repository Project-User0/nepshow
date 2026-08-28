import Notification from "../models/notification.js";
import { successResponse, errorResponse, isValidObjectId, paginationHelper, calculatePaginationData } from "../utils/helpers.js";

// Get user notifications
export const getUserNotifications = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const userId = req.user.userId;
    const { page: pageNum, limit: limitNum, skip } = paginationHelper(page, limit);

    const totalNotifications = await Notification.countDocuments({ user: userId });
    const notifications = await Notification.find({ user: userId })
      .populate("relatedMovie", "title posterImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(pageNum, limitNum, totalNotifications);

    successResponse(res, 200, "Notifications fetched successfully", {
      notifications,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get unread notification count
export const getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const count = await Notification.countDocuments({ user: userId, isRead: false });

    successResponse(res, 200, "Unread count fetched", { unreadCount: count });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid notification ID");
    }

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return errorResponse(res, 404, "Notification not found");
    }

    successResponse(res, 200, "Notification marked as read", notification);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );

    successResponse(res, 200, "All notifications marked as read");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid notification ID");
    }

    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return errorResponse(res, 404, "Notification not found");
    }

    successResponse(res, 200, "Notification deleted successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Delete all notifications
export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Notification.deleteMany({ user: userId });

    successResponse(res, 200, "All notifications deleted");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Create notification (Admin/System use)
export const createNotification = async (req, res) => {
  try {
    const { userId, type, title, message, relatedMovie, relatedPayment, actionUrl } = req.body;

    if (!userId || !type || !title || !message) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const notification = await Notification.create({
      user: userId,
      type,
      title,
      message,
      relatedMovie,
      relatedPayment,
      actionUrl,
    });

    successResponse(res, 201, "Notification created", notification);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
