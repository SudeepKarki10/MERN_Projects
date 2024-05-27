import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDB_URL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();
// To parse body request to JSON
app.use(express.json());

//Option 1: Allow all Origins with the Default of cors(*)
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Bookstore Project");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
