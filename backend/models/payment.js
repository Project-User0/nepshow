import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  plan: {
    type: String,
    enum: ["free", "premium", "pro"],
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Please provide amount"],
  },
  currency: {
    type: String,
    default: "USD",
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "debit_card", "paypal", "stripe", "razorpay", "esewa", "khalti"],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  durationType: {
    type: String,
    enum: ["monthly", "quarterly", "yearly"],
    default: "monthly",
  },
  paymentProof: {
    url: String,
    publicId: String,
  },
  notes: String,
  isRefunded: {
    type: Boolean,
    default: false,
  },
  refundAmount: Number,
  refundReason: String,
  refundedAt: Date,
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
