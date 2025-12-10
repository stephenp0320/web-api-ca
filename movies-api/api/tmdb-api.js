import fetch from 'node-fetch';

const apiKey = process.env.VITE_TMDB_KEY;
const baseUrl = `https://api.themoviedb.org/3`;

const handleTmdbResponce = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.status_message || 'TMDB API error');    }
    return await response.json();
};

export const getMovies = async () => {
    const response = await fetch(
        `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    return handleTmdbResponce(response);
};

export const getWatchlist = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getKeyword = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/keywords?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};


export const getTv = async () => {
    const response = await fetch(
        `${baseUrl}/discover/tv?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    return handleTmdbResponce(response);
};


export const getNowPlaying = async () => {
    const response = await fetch(
        `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    return handleTmdbResponce(response);
};

export const getOnAir = async () => {
    const response = await fetch(
        `${baseUrl}/tv/on_the_air?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    return handleTmdbResponce(response);
};

export const getTvGenres = async () => {
    const response = await fetch(
        `${baseUrl}/genre/tv/list?api_key=${apiKey}&language=en-US`
    );
    return handleTmdbResponce(response);
};


export const getMovie = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getGenres = async () => {
    const response = await fetch(
        `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    return handleTmdbResponce(response);
};

export const getMovieImages = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/images?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getMovieReviews = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/reviews?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getSimilar = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getAlternativeTitles = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/alternative_titles?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getUpcomingMovies = async (page=1) => {
    const response = await fetch(
        `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return handleTmdbResponce(response);
};

export const getMovieCredits = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};


export const getStreamingProviders = async (id) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/watch/providers?api_key=${apiKey}`
    );
    return handleTmdbResponce(response);
};

export const getPopularMovies = async (page=1) => {
    const response = await fetch(
        `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return handleTmdbResponce(response);
};

export const getRecommendations = async (id, page=1) => {
    const response = await fetch(
        `${baseUrl}/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return handleTmdbResponce(response);
};
