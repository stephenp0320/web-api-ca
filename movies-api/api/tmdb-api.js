import fetch from 'node-fetch';

const handleTmdbResponce = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.status_message || 'TMDB API error');    }
    return await response.json();
}

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    return handleTmdbResponce(response);
};

export const getWatchlist = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    );
    return handleTmdbResponce(response);
};
