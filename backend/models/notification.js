import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["payment_success", "payment_failed", "new_movie", "subscription_expiring", "subscription_expired", "comment_reply", "system"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  relatedMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  relatedPayment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  actionUrl: String,
  icon: String,
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
