import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  userToken: String,
  userName: String,
  title: String,
  description: String,
  tags: [String],
  image: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Artwork = mongoose.model("Artwork", artworkSchema);

export default Artwork;