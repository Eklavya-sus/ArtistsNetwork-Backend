import Artwork from "../models/ArtworkModel.js";

const dashboardListArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.aggregate([
      {
        $project: {
          title: 1,
          userName: 1,
          image: 1,
          tags: 1 // Include the tags field in the projection
        }
      }
    ]);
    return res.status(200).json({ success: true, data: artworks });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { dashboardListArtworks };
