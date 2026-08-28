import User from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  generateToken,
  errorResponse,
  successResponse,
} from "../utils/helpers.js";
import { sendEmail } from "../config/email.js";

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return req.socket?.remoteAddress || req.ip || "unknown";
};

const buildSessionFingerprint = (req, user) => {
  const ip = getClientIp(req);
  const userAgent = req.headers["user-agent"] || "unknown";
  return crypto
    .createHash("sha256")
    .update(`${user._id}:${ip}:${userAgent}`)
    .digest("hex");
};

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const sendOtpMail = async (email, name, otp, purpose) => {
  const subject =
    purpose === "verification"
      ? "Verify your NepShow account"
      : "Reset your NepShow password";
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 24px; background: #111827; color: #f9fafb;">
      <h2 style="margin-bottom: 8px;">${purpose === "verification" ? "Email Verification" : "Password Reset"}</h2>
      <p>Hi ${name || "there"},</p>
      <p>${purpose === "verification" ? "Use the following OTP to verify your account:" : "Use the following OTP to reset your password:"}</p>
      <div style="margin: 20px 0; font-size: 28px; letter-spacing: 6px; font-weight: bold; color: #60a5fa;">${otp}</div>
      <p>This code expires in 10 minutes.</p>
    </div>
  `;

  await sendEmail(email, subject, html);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;

    if (!name || !email || !password || !password_confirmation) {
      return errorResponse(res, 400, "All fields required");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return errorResponse(res, 400, "Please provide a valid email");
    }

    if (password.length < 6) {
      return errorResponse(res, 400, "Password must be at least 6 characters");
    }

    if (password !== password_confirmation) {
      return errorResponse(res, 400, "Passwords do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 400, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOtp();
    const ip = getClientIp(req);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isEmailVerified: false,
      emailVerificationToken: otp,
      emailVerificationExpire: new Date(Date.now() + 10 * 60 * 1000),
      lastLoginIp: ip,
      allowedIps: [ip],
      sessionFingerprint: crypto
        .createHash("sha256")
        .update(`${ip}:${Date.now()}`)
        .digest("hex"),
    });

    try {
      await sendOtpMail(user.email, user.name, otp, "verification");
    } catch (emailError) {
      console.error("Verification email failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message:
        "Account created. Please verify your email with the OTP sent to your inbox.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        requiresVerification: true,
      },
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return errorResponse(res, 400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (user.isEmailVerified) {
      return successResponse(res, 200, "Email already verified");
    }

    if (
      !user.emailVerificationToken ||
      new Date(user.emailVerificationExpire) < new Date()
    ) {
      return errorResponse(res, 400, "OTP expired. Please request a new one");
    }

    if (String(user.emailVerificationToken) !== String(otp)) {
      return errorResponse(res, 400, "Invalid OTP");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    successResponse(res, 200, "Email verified successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "No account found with that email");
    }

    const otp = generateOtp();
    user.passwordResetToken = otp;
    user.passwordResetExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendOtpMail(user.email, user.name, otp, "reset");
    } catch (emailError) {
      console.error("Password reset email failed:", emailError.message);
    }

    successResponse(res, 200, "OTP sent to your email address", {
      email: user.email,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return errorResponse(res, 400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (
      !user.passwordResetToken ||
      new Date(user.passwordResetExpire) < new Date()
    ) {
      return errorResponse(res, 400, "OTP expired. Please request a new one");
    }

    if (String(user.passwordResetToken) !== String(otp)) {
      return errorResponse(res, 400, "Invalid OTP");
    }

    successResponse(res, 200, "OTP verified successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password, password_confirmation } = req.body;

    if (!email || !otp || !password || !password_confirmation) {
      return errorResponse(res, 400, "All fields required");
    }

    if (password.length < 6) {
      return errorResponse(res, 400, "Password must be at least 6 characters");
    }

    if (password !== password_confirmation) {
      return errorResponse(res, 400, "Passwords do not match");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (
      !user.passwordResetToken ||
      new Date(user.passwordResetExpire) < new Date()
    ) {
      return errorResponse(res, 400, "OTP expired. Please request a new one");
    }

    if (String(user.passwordResetToken) !== String(otp)) {
      return errorResponse(res, 400, "Invalid OTP");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    successResponse(res, 200, "Password reset successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Email and password required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    if (user.role === "user") {
      const ip = getClientIp(req);
      const isSameDevice = !user.lastLoginIp || user.lastLoginIp === ip;
      if (!isSameDevice) {
        return errorResponse(
          res,
          403,
          "This account is restricted to the registered device/IP address.",
        );
      }

      user.lastLogin = new Date();
      user.lastLoginIp = ip;
      user.sessionFingerprint = buildSessionFingerprint(req, user);
      user.allowedIps = [ip];
      await user.save();
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "User fetched successfully", {
      ...user.toObject(),
      subscription: user.subscription || {},
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone },
      { new: true, runValidators: true },
    );

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, 200, "Profile updated successfully", user);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.userId;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return errorResponse(res, 400, "All fields required");
    }

    if (newPassword !== confirmPassword) {
      return errorResponse(res, 400, "Passwords do not match");
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Current password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    successResponse(res, 200, "Password changed successfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
