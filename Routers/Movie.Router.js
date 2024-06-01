import express from 'express'
import { AllCarouselImage, AllMovies, UploadCarouselImage, UploadMovie, UploadTheater } from '../Controllers/Movie.controller.js'

const movieRouter = express.Router()

movieRouter.post('/uploadmovie',UploadMovie)
movieRouter.get('/allmovies',AllMovies)
movieRouter.post('/uploadtheater/:_id',UploadTheater)
movieRouter.post('/uploadcarousel',UploadCarouselImage)
movieRouter.get('/allimages',AllCarouselImage)

export default movieRouter;