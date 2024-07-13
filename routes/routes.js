import express from "express";
import { signup, login } from "../controllers/AuthController.js";
import { uploadArtwork } from "../controllers/ArtworkController.js";
import { dashboardListArtworks } from "../controllers/DashboardController.js";
import { ArtworkDetailsController } from "../controllers/ArtworkDetailsController.js";
import { ProfileDetails, ArtworksListedByUser } from "../controllers/ProfileController.js";
import { DeleteArtwork } from "../controllers/DeleteArtworkController.js";

const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);
router.post("/api/upload", uploadArtwork);
router.get("/api/dashboard", dashboardListArtworks);
router.post("/api/artworkDetails", ArtworkDetailsController);
router.post("/api/profile", ProfileDetails);
router.post("/api/artworksByUser", ArtworksListedByUser);
router.post("/api/deleteArtwork", DeleteArtwork);

export default router;