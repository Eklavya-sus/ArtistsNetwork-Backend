import User from "../models/UserModel.js";
import Artwork from "../models/ArtworkModel.js";

const ProfileDetails = async (req, res) => {
  try {
    const { name } = req.body; // Access the username from the request body
    const user = await User.findOne({ name }).exec();
    
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const ArtworksListedByUser = async (req, res) => {
  try {
    const { name } = req.body; // Access the username from the request body
    const artworks = await Artwork.find({ userName: name })
      .select('title userName image')
      .exec();
    
    return res.status(200).send(artworks);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { ProfileDetails, ArtworksListedByUser };