import express from "express";
import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for a adding new book to database
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required Fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for getting single book from the database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid book ID:", id);
      return response.status(400).json({ message: "Invalid book ID format" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    response.status(200).json(book);
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

//Route to update a Book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all the required Fields: title, authorm, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    } else {
      return response
        .status(404)
        .send({ message: `Book updated Sucessfully.  ${result}` });
    }
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

//Route for deleting the book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    } else {
      return response.status(200).json({
        message: `Book deleted Sucessfully.  ${result}`,
      });
    }
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Route for a getting all the books from the database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

export default router;
