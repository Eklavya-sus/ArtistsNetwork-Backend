import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import "dotenv/config.js";

const app = express();
const PORT = 4000;
const MONGODB_URI = "mongodb+srv://eklavya0304:TapWgsAoFhRsfXWO@cluster0.1gx0uav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors(
  {
      origin: ['https://artistnetwork.vercel.app', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
  }
));
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
