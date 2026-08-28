import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { successResponse, errorResponse, isValidObjectId, paginationHelper, calculatePaginationData } from "../utils/helpers.js";

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, role = "user" } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, "Name, email, and password are required");
    }

    if (!["user", "admin", "moderator"].includes(role)) {
      return errorResponse(res, 400, "Invalid role");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      isEmailVerified: true,
    });

    successResponse(res, 201, "User created successfully", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const { page, limit, role, search } = req.query;
    const { page: pageNum, limit: limitNum, skip } = paginationHelper(page, limit);

    let filter = {};

    if (role) {
      filter.role = role;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const totalUsers = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(pageNum, limitNum, totalUsers);

    successResponse(res, 200, "Users fetched successfully", {
      users,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get user by ID (Admin only)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    if (!["user", "admin", "moderator"].includes(role)) {
      return errorResponse(res, 400, "Invalid role");
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "User role updated successfully", user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Update user details (Admin only)
export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, isActive, subscriptionPlan, subscriptionIsActive } = req.body;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    const user = await User.findById(id).select("+password");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, 400, "Email is already in use");
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (role) {
      if (!["user", "admin", "moderator"].includes(role)) {
        return errorResponse(res, 400, "Invalid role");
      }
      user.role = role;
    }
    if (isActive !== undefined) {
      user.isActive = String(isActive) === "true" || isActive === true;
    }
    if (subscriptionPlan) {
      user.subscription.plan = subscriptionPlan;
    }
    if (subscriptionIsActive !== undefined) {
      user.subscription.isActive = String(subscriptionIsActive) === "true" || subscriptionIsActive === true;
    }

    await user.save();
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    successResponse(res, 200, "User updated successfully", sanitizedUser);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Activate/Deactivate user (Admin only)
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    user.isActive = !user.isActive;
    await user.save();

    successResponse(res, 200, `User ${user.isActive ? "activated" : "deactivated"} successfully`, user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "User deleted successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get user statistics (Admin only)
export const getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: "admin" });
    const premiumUsers = await User.countDocuments({ "subscription.isActive": true });

    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const subscriptionStats = await User.aggregate([
      {
        $group: {
          _id: "$subscription.plan",
          count: { $sum: 1 },
        },
      },
    ]);

    successResponse(res, 200, "User statistics fetched successfully", {
      totalUsers,
      activeUsers,
      adminUsers,
      premiumUsers,
      usersByRole,
      subscriptionStats,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Update user subscription
export const updateUserSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan, startDate, endDate, isActive } = req.body;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (plan) user.subscription.plan = plan;
    if (startDate) user.subscription.startDate = new Date(startDate);
    if (endDate) user.subscription.endDate = new Date(endDate);
    if (isActive !== undefined) user.subscription.isActive = isActive;

    await user.save();

    successResponse(res, 200, "User subscription updated successfully", user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get users with expiring subscriptions
export const getUsersWithExpiringSubscriptions = async (req, res) => {
  try {
    const { days } = req.query;
    const daysNum = parseInt(days) || 7;

    const now = new Date();
    const futureDate = new Date(now.getTime() + daysNum * 24 * 60 * 60 * 1000);

    const users = await User.find({
      "subscription.isActive": true,
      "subscription.endDate": {
        $lte: futureDate,
        $gt: now,
      },
    }).select("-password");

    successResponse(res, 200, "Users with expiring subscriptions fetched successfully", users);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
