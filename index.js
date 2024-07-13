import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import "dotenv/config.js";

const app = express();
const PORT = 4000;
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

app.use(cors());
app.use(express.json());
app.use("/", routes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

 