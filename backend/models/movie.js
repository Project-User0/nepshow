import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a movie title"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    genre: {
      type: String,
      enum: [
        "Action",
        "Adventure",
        "Cars",
        "Comedy",
        "Religious",
        "Horror",
        "Drama",
        "Fantasy",
      ],
    },
    posterImage: {
      url: {
        type: String,
      },
      publicId: String,
    },
    thumbnailImage: {
      url: {
        type: String,
      },
      publicId: String,
    },
    videoUrl: {
      url: String,
      publicId: String,
    },
    duration: {
      type: Number, // in minutes
      required: [true, "Please provide duration in minutes"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    lang: {
      type: String,
      enum: ["Nepali", "English", "Hindi"],
    },
    subtitles: [
      {
        label: {
          type: String,
          trim: true,
        },
        language: {
          type: String,
          enum: ["English", "Nepali", "Hindi", "Spanish", "French"],
          required: true,
        },
        file: {
          url: {
            type: String,
          },
          publicId: String,
          resourceType: String,
        },
      },
    ],
    subtitle: {
      type: String,
      enum: ["English", "Nepali", "Hindi", "Spanish", "French"],
    },
    subtitles: [
      {
        label: {
          type: String,
          trim: true,
        },
        language: {
          type: String,
          enum: ["English", "Nepali", "Hindi", "Spanish", "French"],
        },
        file: {
          url: {
            type: String,
          },
          publicId: String,
          resourceType: String,
        },
      },
    ],
    subtitleFile: {
      url: {
        type: String,
      },
      publicId: String,
      resourceType: String,
    },
    airedDate: {
      type: Date,
      required: [true, "Please provide aired date"],
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Airing"],
      default: "Completed",
    },
    quality: {
      type: String,
      enum: ["480p", "720p", "1080p", "2K", "4K"],
      default: "720p",
    },
    contentType: {
      type: String,
      enum: ["Movie", "Series", "TV"],
      default: "Movie",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isNewRelease: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    ageRating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
      default: "PG-13",
    },
    director: {
      type: String,
    },
    cast: [String],
    releaseYear: {
      type: Number,
    },
    tags: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Movie", movieSchema);
