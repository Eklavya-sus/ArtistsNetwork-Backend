import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  userToken: {
    type: String,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    index: true
  },
  image: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

artworkSchema.index({ title: 1 });
artworkSchema.index({ userName: 1 });

const Artwork = mongoose.model("Artwork", artworkSchema);

export default Artwork;
