import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const uploadToCloudinary = async (filePath, folder) => {
  try {
    let resourceType = "image";

    if (folder === "videos") {
      resourceType = "video";
    }

    if (folder === "subtitles") {
      resourceType = "raw";
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: `nepshow/${folder}`,
      resource_type: resourceType,
      quality: resourceType === "image" ? "auto" : undefined,
      fetch_format: resourceType === "image" ? "auto" : undefined,
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Full Cloudinary error:", error);

    throw new Error(
      JSON.stringify({
        message: error.message,
        name: error.name,
        http_code: error.http_code,
        error: error.error,
      }),
    );
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error(`Cloudinary delete failed: ${error.message}`);
    return false;
  }
};

export const paginationHelper = (page = 1, limit = 10) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 100) limit = 100; // Max limit 100

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const calculatePaginationData = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    page,
    limit,
    totalPages,
    totalRecords: total,
    hasNextPage,
    hasPrevPage,
  };
};

export const successResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
  });
};

export const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
