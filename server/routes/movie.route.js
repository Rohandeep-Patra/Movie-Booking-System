const router = require("express").Router();
const Movie = require("../models/movie.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");

//add a movie
router.post("/addMovies",authMiddleware, async (req, res) => {
  try {
    const newMovie = new Movie(req.body)
    await newMovie.save()
    res.send({
      success: true,
      message: "Movie added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

//get all movies
router.post("/getAllMovies", async (req, res) => {
  try {
    const movies = await Movie.find()
    res.send({
      success: true,
      message: 'Movies Fetched Successfully !!',
      data: movies
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
})

module.exports = router;
