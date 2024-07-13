import User from "../models/UserModel.js";
import Artwork from "../models/ArtworkModel.js";

const ProfileDetails = async (req, res) => {
  try {
    const { token } = req.body; // Access the token from the request body
    const user = await User.findOne({
      token: token, // Find the user by token
    }).exec();
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

const ArtworksListedByUser = async (req, res) => {
  try {
    const { token } = req.body; // Access the token from the request body
    const artworks = await Artwork.aggregate([
      {
        $match: {
          userToken: token, // Filter by userToken instead of token
        }
      },
      {
        $project: {
          title: 1,
          userName: 1,
          image: 1
        }
      }
    ]);
    return res.status(200).send(artworks);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { ProfileDetails, ArtworksListedByUser };