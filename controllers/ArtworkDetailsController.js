import Artwork from "../models/ArtworkModel.js";

const ArtworkDetailsController = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.body.id);
    console.log({artwork});
    return res.status(200).send(artwork);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { ArtworkDetailsController };