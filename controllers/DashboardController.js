import Artwork from "../models/ArtworkModel.js";

const listArtworksByTag = async (req, res) => {
  try {
    const { tags } = req.query;

    const tagsArray = Array.isArray(tags) ? tags : tags.split(',');

    const artworks = await Artwork.aggregate([
      {
        $match: {
          tags: { $in: tagsArray }
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

export { listArtworksByTag };
