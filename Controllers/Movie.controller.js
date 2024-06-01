import dotenv from "dotenv";

import Movie from "../Models/Movies.Schema.js";
import CarouselImage from "../Models/Carousel.Schema.js";

dotenv.config();

// Movies Upload in Db Call

export const UploadMovie = async (req, res) => {
  try {
    const { movietitle, image, censor, duration, language, genre } = req.body;
    let movieExist = await Movie.findOne({"movietitle":movietitle})
    if(movieExist){
      return res
      .status(400)
      .json({ message: "Movie Already in Database", data: movieExist });
    }
    const newMovie = new Movie({
      movietitle,
      image,
      censor,
      duration,
      language,
      genre,
    });

    await newMovie.save();
    return res
      .status(200)
      .json({ message: "Movie Uploaded Successfully", data: newMovie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Upload Failed" });
  }
};

export const UploadTheater = async (req, res) => {
  try {
      const { theaterName, theaterAmenties, screenTimings } = req.body;
      const { _id } = req.params;

      const movie = await Movie.findOne({ _id });
      
      if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
      }

      const theaterExists = movie.theater.some(item => item.theatername === theaterName);

      if (theaterExists) {
          return res.status(400).json({ message: "Theater already exists in the database" });
      }

      const newTheater = {
          "theatername":theaterName,
          "theateramenties":theaterAmenties,
          "screentimings":screenTimings
      };

      movie.theater.push(newTheater);

      await movie.save();

      return res.status(200).json({ message: "Theater updated successfully" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Upload failed" });
  }
};

export const UploadCarouselImage = async (req, res) => {
  try {
    const { image } = req.body;

    const CarouselImages = new CarouselImage({
     image
    });

    await CarouselImages.save();
    res
      .status(200)
      .json({
        message: "Carousel Images Uploaded Successfully",
        data: CarouselImages,
      });
  } catch (error) {

    res.status(500).json({ error: "Upload Failed" });
  }
};

export const AllMovies = async (req, res) => {
  try {
    const MovieList = await Movie.find();
    res.status(200).json({
      message: "All Movie Details Fetched Successfully",
      data: MovieList,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const AllCarouselImage = async (req, res) => {
    try {
      const imageList = await CarouselImage.find();
  
      res.status(200).json({
        message: "All Images Fetched Successfully",
        data: imageList,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


