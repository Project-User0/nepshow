import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false, // Don't return password by default
  },
  phone: {
    type: String,
  },
  avatar: {
    url: String,
    publicId: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  subscription: {
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: false,
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  }],
  watchHistory: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    watchedAt: {
      type: Date,
      default: Date.now,
    },
    lastWatchedAt: Date,
    duration: Number, // seconds watched
  }],
  favoriteGenres: [String],
  preferences: {
    language: {
      type: String,
      default: "English",
    },
    subtitles: {
      enabled: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        default: "English",
      },
    },
    quality: {
      type: String,
      enum: ["480p", "720p", "1080p", "2K", "4K"],
      default: "720p",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: Date,
  lastLoginIp: String,
  allowedIps: [String],
  sessionFingerprint: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
