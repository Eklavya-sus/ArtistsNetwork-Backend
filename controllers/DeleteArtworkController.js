import Artwork from "../models/ArtworkModel.js";

const DeleteArtwork = async (req, res) => {
  try {
    console.log("DeleteArtworkController.js: req.body.id:", req.body.id);
    const artwork = await Artwork.findOneAndDelete({
      _id: req.body.id,
    }).exec();
    return res.status(200).send(artwork);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { DeleteArtwork };