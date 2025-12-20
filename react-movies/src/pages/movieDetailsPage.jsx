import React, { useEffect } from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getStreamingProviders, getSimilar } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import { addRecentlyViewed } from "../api/tmdb-api";
import { useAuth } from "../contexts/moviesContext";


const MoviePage = (props) => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  })
  const { data: creditsData, creditsError, creditsIsPending, creditsIsError } = useQuery({
    queryKey: ['moviecredits', { id: id }],
    queryFn: getMovieCredits,
  })

  const { data: providerData, providerError, providerIsPending, providerIsError } = useQuery({
    queryKey: ['movieProvider', { id: id }],
    queryFn: getStreamingProviders,
  })


  const { data: similarData, similarError, similarIsPending, similarIsError } = useQuery({
    queryKey: ['similarMovie', { id: id }],
    queryFn: getSimilar,
  })

  useEffect(() => {
    if (isAuthenticated && movie?.id) {
      addRecentlyViewed(movie.id);
    }
  }, [movie?.id, isAuthenticated]);

  //refactored this code to make it cleaner
  if (isPending || creditsIsPending || providerIsPending || similarIsPending) {
    return <Spinner />;
  }


  const Error = error || creditsError || providerError || similarError;


  if (isError || creditsIsError || providerIsError || similarIsError) {
    return <h1>{Error.message}</h1>;
  }



  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} credits={creditsData} provider={providerData} similar={similarData} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
