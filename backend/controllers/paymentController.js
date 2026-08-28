import Payment from "../models/payment.js";
import User from "../models/user.js";
import { successResponse, errorResponse, isValidObjectId, paginationHelper, calculatePaginationData } from "../utils/helpers.js";
import { sendPaymentSuccessEmail, sendPaymentFailureEmail } from "../config/email.js";
import { initiateGatewayPayment } from "../services/paymentGateway.js";

// Create a payment record
export const createPayment = async (req, res) => {
  try {
    const { plan, amount, currency, paymentMethod, transactionId, startDate, endDate, durationType } = req.body;
    const userId = req.user.userId;

    if (!plan || !amount || !paymentMethod || !transactionId || !startDate || !endDate) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
      return errorResponse(res, 409, "Payment with this transaction ID already exists");
    }

    const gatewayResponse = await initiateGatewayPayment({
      amount,
      paymentMethod,
      transactionId,
      plan,
    });

    if (!gatewayResponse.success) {
      return errorResponse(res, 400, gatewayResponse.message || "Unable to start payment");
    }

    const payment = await Payment.create({
      user: userId,
      plan,
      amount,
      currency: currency || "USD",
      paymentMethod,
      transactionId,
      status: "pending",
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      durationType: durationType || "monthly",
    });

    successResponse(res, 201, "Payment initialized successfully", {
      payment,
      gateway: gatewayResponse,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Handle payment failure
export const handlePaymentFailure = async (req, res) => {
  try {
    const { transactionId, plan, reason } = req.body;
    const userId = req.user.userId;

    if (!transactionId || !plan || !reason) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      {
        user: userId,
        plan,
        amount: 0,
        paymentMethod: req.body.paymentMethod || "unknown",
        transactionId,
        status: "failed",
      },
      { upsert: true, new: true }
    );

    const user = await User.findById(userId);
    if (user) {
      try {
        await sendPaymentFailureEmail(user.email, user.name, plan, reason);
      } catch (emailError) {
        console.log("Email sending failed:", emailError.message);
      }
    }

    successResponse(res, 201, "Payment failure recorded", payment);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const completePayment = async (req, res) => {
  try {
    const { transactionId, paymentMethod, plan, amount, currency, startDate, endDate, durationType } = req.body;
    const userId = req.user?.userId;

    if (!transactionId || !paymentMethod || !plan) {
      return errorResponse(res, 400, "Missing payment completion data");
    }

    const existingPayment = await Payment.findOne({ transactionId });
    if (!existingPayment) {
      await Payment.create({
        user: userId,
        plan,
        amount: amount || 0,
        currency: currency || "NPR",
        paymentMethod,
        transactionId,
        status: "completed",
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        durationType: durationType || "monthly",
      });
    } else if (existingPayment.status !== "completed") {
      existingPayment.status = "completed";
      existingPayment.amount = amount || existingPayment.amount;
      existingPayment.currency = currency || existingPayment.currency;
      existingPayment.paymentMethod = paymentMethod;
      existingPayment.plan = plan;
      existingPayment.startDate = startDate ? new Date(startDate) : existingPayment.startDate;
      existingPayment.endDate = endDate ? new Date(endDate) : existingPayment.endDate;
      existingPayment.durationType = durationType || existingPayment.durationType;
      await existingPayment.save();
    }

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.subscription = {
          plan,
          startDate: startDate ? new Date(startDate) : new Date(),
          endDate: endDate ? new Date(endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          isActive: true,
          autoRenew: true,
        };
        await user.save();

        try {
          await sendPaymentSuccessEmail(user.email, user.name, plan, amount || 499, startDate, endDate);
        } catch (emailError) {
          console.log("Email sending failed:", emailError.message);
        }
      }
    }

    successResponse(res, 200, "Payment completed successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all payments (Admin only)
export const getAllPayments = async (req, res) => {
  try {
    const { page, limit, status, plan } = req.query;
    const { page: pageNum, limit: limitNum, skip } = paginationHelper(page, limit);

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (plan) {
      filter.plan = plan;
    }

    const totalPayments = await Payment.countDocuments(filter);
    const payments = await Payment.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(pageNum, limitNum, totalPayments);

    successResponse(res, 200, "Payments fetched successfully", {
      payments,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid payment ID");
    }

    const payment = await Payment.findById(id).populate("user", "name email");
    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    successResponse(res, 200, "Payment fetched successfully", payment);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get user payments
export const getUserPayments = async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    const userId = req.user.userId;
    const { page: pageNum, limit: limitNum, skip } = paginationHelper(page, limit);

    let filter = { user: userId };

    if (status) {
      filter.status = status;
    }

    const totalPayments = await Payment.countDocuments(filter);
    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const paginationData = calculatePaginationData(pageNum, limitNum, totalPayments);

    successResponse(res, 200, "User payments fetched successfully", {
      payments,
      pagination: paginationData,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Process refund
export const processRefund = async (req, res) => {
  try {
    const { id } = req.params;
    const { refundAmount, refundReason } = req.body;

    if (!isValidObjectId(id)) {
      return errorResponse(res, 400, "Invalid payment ID");
    }

    const payment = await Payment.findById(id);
    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    if (payment.status !== "completed") {
      return errorResponse(res, 400, "Can only refund completed payments");
    }

    payment.isRefunded = true;
    payment.refundAmount = refundAmount || payment.amount;
    payment.refundReason = refundReason;
    payment.refundedAt = new Date();
    payment.status = "refunded";

    await payment.save();

    // Update user subscription
    const user = await User.findById(payment.user);
    if (user) {
      user.subscription.isActive = false;
      await user.save();
    }

    successResponse(res, 200, "Refund processed successfully", payment);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get payment statistics (Admin only)
export const getPaymentStatistics = async (req, res) => {
  try {
    const totalRevenue = await Payment.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const paymentsByPlan = await Payment.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $group: {
          _id: "$plan",
          count: { $sum: 1 },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    const paymentsByMethod = await Payment.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ]);

    const failedPayments = await Payment.countDocuments({ status: "failed" });
    const refundedPayments = await Payment.countDocuments({ status: "refunded" });
    const totalPayments = await Payment.countDocuments();

    const monthlyRevenue = await Payment.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 12,
      },
    ]);

    successResponse(res, 200, "Payment statistics fetched successfully", {
      totalRevenue: totalRevenue[0]?.total || 0,
      paymentsByPlan,
      paymentsByMethod,
      failedPayments,
      refundedPayments,
      totalPayments,
      monthlyRevenue,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
