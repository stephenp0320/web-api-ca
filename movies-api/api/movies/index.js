import express from 'express';
import asyncHandler from 'express-async-handler';

import {
    getMovies,
    getMovie,
    getGenres,
    getTvGenres,
    getNowPlaying,
    getPopularMovies,
    getUpcomingMovies,
    getKeyword,
    getMovieImages,
    getMovieReviews,
    getSimilar,
    getAlternativeTitles,
    getMovieCredits,
    getStreamingProviders,
    getRecommendations,
    getTv,
    getOnAir
} from '../tmdb-api.js';

const router = express.Router();

// movie routes to be added
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tv/genres', asyncHandler(async (req, res) => {
    const tv_genres = await getTvGenres();
    res.status(200).json(tv_genres);
}));

router.get('/tv/discover', asyncHandler(async (req, res) => {
    const tv_discover = await getTv();
    res.status(200).json(tv_discover);
}));

router.get('/tv/on_the_air', asyncHandler(async (req, res) => {
    const on_air = await getOnAir();
    res.status(200).json(on_air);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
    const now_playing = await getNowPlaying();
    res.status(200).json(now_playing);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const popular = await getPopularMovies(page);
    res.status(200).json(popular);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const upcoming_movies = await getUpcomingMovies(page);
    res.status(200).json(upcoming_movies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

router.get('/:id/keywords', asyncHandler(async (req, res) => {
    const keyword = await getKeyword(req.params.id);
    res.status(200).json(keyword);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const img = await getMovieImages(req.params.id);
    res.status(200).json(img);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const review = await getMovieReviews(req.params.id);
    res.status(200).json(review);
}));

router.get('/:id/similar', asyncHandler(async (req, res) => {
    const similar = await getSimilar(req.params.id);
    res.status(200).json(similar);
}));

router.get('/:id/alternative_titles', asyncHandler(async (req, res) => {
    const alternative_titles = await getAlternativeTitles(req.params.id);
    res.status(200).json(alternative_titles);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const credits = await getMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

router.get('/:id/watch/providers', asyncHandler(async (req, res) => {
    const streaming_providers = await getStreamingProviders(req.params.id);
    res.status(200).json(streaming_providers);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const recommendations = await getRecommendations(req.params.id, page);
    res.status(200).json(recommendations);
}));



export default router;
