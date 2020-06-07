import { useEffect, useCallback, useRef, useState } from 'react';
import { sortMoviesByPopularity } from './utils';

export function useImageDetails() {
  const [state, setState] = useState({
    basePosterUrl: '',
    baseBackdropUrl: '',
    baseProfileUrl: '',
  });

  useEffect(() => {
    const fetchMovieImageConfigs = async () => {
      try {
        const movieImageData = await (
          await fetch(
            `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`
          )
        ).json();

        const basePosterUrl =
          movieImageData.images.base_url +
          movieImageData.images.poster_sizes[6];
        const baseBackdropUrl =
          movieImageData.images.base_url +
          movieImageData.images.backdrop_sizes[2];
        const baseProfileUrl =
          movieImageData.images.base_url +
          movieImageData.images.profile_sizes[3];

        setState(state => ({
          basePosterUrl,
          baseBackdropUrl,
          baseProfileUrl,
        }));
      } catch (e) {
        console.log(e);
      }
    };

    fetchMovieImageConfigs();
  }, []);

  const { basePosterUrl, baseBackdropUrl, baseProfileUrl } = state;
  return { basePosterUrl, baseBackdropUrl, baseProfileUrl };
}

export function useFetchMovies(data, dispatch, query) {
  const [header, setHeader] = useState('Popular Movies');

  const getMovies = useCallback(async () => {
    let isSearch = query !== '';
    // base api url
    let apiUrl = `https://api.themoviedb.org/3`;
    let apiPopularUrl = `/movie/popular?`;
    let queryMoviesUrl = `/search/movie?query=${query}&include_adult=false&`;

    apiUrl = isSearch ? (apiUrl += queryMoviesUrl) : (apiUrl += apiPopularUrl);

    //append api_key
    apiUrl += `api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`;
    //append page number
    apiUrl += `&page=${data.page}`;

    let movieResults = [];
    try {
      const movieData = await (await fetch(apiUrl)).json();
      movieResults = isSearch
        ? movieData.results
        : sortMoviesByPopularity(movieData.results);
      setHeader(isSearch ? 'Results' : 'Popular Movies');
      dispatch({ type: 'STACK_MOVIES', movies: movieResults });
      dispatch({ type: 'FETCHING_MOVIES', fetching: false });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'FETCHING_MOVIES', fetching: false });
    }
  }, [data.page, query, dispatch]);

  useEffect(() => {
    dispatch({ type: 'FETCHING_MOVIES', fetching: true });

    if (data.page !== 0) {
      getMovies();
    }
  }, [data.page, getMovies, dispatch]);

  return { header };
}

export function useInfiniteScroll(scrollRef, dispatch) {
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            dispatch({ type: 'ADVANCE_PAGE', page: 1 });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}
