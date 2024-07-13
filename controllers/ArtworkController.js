import multer from "multer";
import Artwork from "../models/ArtworkModel.js";

const upload = multer({
  limits: {
    fileSize: 500 * 1024, // 500KB limit for each file
  },
});

const uploadArtwork = async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).send("Error uploading image");
      }

      const { userToken, userName, title, description, tags } = req.body;
      const image = req.file;

      console.log("userToken:", userToken);
      console.log("userName:", userName);
      console.log("title:", title);
      console.log("description:", description);
      console.log("tags:", tags);
      console.log("image:", image);

      try {
        const artwork = new Artwork({
          userToken,
          userName,
          title,
          description,
          tags: tags.split(',').map(tag => tag.trim()),
          image,
        });
        console.log("Artwork to be saved to db : ", artwork);
        const result = await artwork.save();
        console.log("Artwork saved successfully", result);
        return res.status(200).send("Artwork uploaded successfully");
      } catch (err) {
        console.log(err);
        return res.status(500).send("Error uploading artwork");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { uploadArtwork };