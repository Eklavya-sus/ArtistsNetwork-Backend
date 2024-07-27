import Artwork from "../models/ArtworkModel.js";

const dashboardListArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.aggregate([
      {
        $project: {
          title: 1,
          userName: 1,
          image: 1,
          tags: 1
        }
      }
    ]);
    return res.status(200).send(artworks);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { dashboardListArtworks };
