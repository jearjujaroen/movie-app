import { useEffect, useCallback, useState } from 'react';
import {
  fetchMovieImageConfigs,
  fetchMovies,
  fetchMovieDetails,
} from './api/APIUtils';

export function useImageDetails() {
  const [state, setState] = useState({
    basePosterUrl: '',
    baseBackdropUrl: '',
    baseProfileUrl: '',
  });

  useEffect(() => {
    fetchMovieImageConfigs().then(
      ({ basePosterUrl, baseBackdropUrl, baseProfileUrl }) => {
        setState(state => ({
          basePosterUrl,
          baseBackdropUrl,
          baseProfileUrl,
        }));
      }
    );
  }, []);

  const { basePosterUrl, baseBackdropUrl, baseProfileUrl } = state;
  return { basePosterUrl, baseBackdropUrl, baseProfileUrl };
}

export function useFetchMovies(data, dispatch, query) {
  const [header, setHeader] = useState('Popular Movies');
  const isSearch = query !== '';

  const getMovies = useCallback(() => {
    const { page } = data;

    fetchMovies(query, page, isSearch).then(movieResults => {
      if (movieResults) {
        setHeader(isSearch ? 'Results' : 'Popular Movies');
        dispatch({ type: 'STACK_MOVIES', movies: movieResults });
      }
      dispatch({ type: 'FETCHING_MOVIES', fetching: false });
    });
  }, [data, query, dispatch, isSearch]);

  useEffect(() => {
    dispatch({ type: 'FETCHING_MOVIES', fetching: true });

    if (data.page !== 0) {
      getMovies();
    }
  }, [data.page, getMovies, dispatch]);

  return { header };
}

export function useFetchMovieDetails(movieId) {
  const [state, setState] = useState({
    movie: {},
    cast: [],
  });

  useEffect(() => {
    fetchMovieDetails(movieId).then(({ movie, cast }) => {
      setState(state => ({
        movie,
        cast,
      }));
    });
  }, [movieId]);

  const { movie, cast } = state;
  return { movie, cast };
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
