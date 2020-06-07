import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Movie } from './movie/Movie';
import { Home } from './pages/home/Home';

const sortMoviesByPopularity = movies =>
  movies.sort((a, b) => b.popularity - a.popularity);

function App() {
  const [state, setState] = useState({
    movieConfigurations: {},
    basePosterUrl: '',
    baseBackdropUrl: '',
    baseProfileUrl: '',
  });

  const [searchValue, setSearchValue] = useState('');
  const [header, setHeader] = useState('Popular Movies');

  const movieReducer = (state, action) => {
    switch (action.type) {
      case 'CLEAR_MOVIES':
        return { ...state, movies: action.movies };
      case 'STACK_MOVIES':
        return { ...state, movies: state.movies.concat(action.movies) };
      case 'FETCHING_MOVIES':
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const [movieData, movieDispatch] = useReducer(movieReducer, {
    movies: [],
    fetching: true,
  });

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'RESET_PAGE':
        return { ...state, page: action.page };
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + action.page };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, {
    page: 0,
  });

  useEffect(() => {
    const fetchMovieImageConfigs = async () => {
      try {
        const movieImageConfigsResp = await (
          await fetch(
            `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`
          )
        ).json();

        const basePosterUrl =
          movieImageConfigsResp.images.base_url +
          movieImageConfigsResp.images.poster_sizes[6];
        const baseBackdropUrl =
          movieImageConfigsResp.images.base_url +
          movieImageConfigsResp.images.backdrop_sizes[2];
        const baseProfileUrl =
          movieImageConfigsResp.images.base_url +
          movieImageConfigsResp.images.profile_sizes[3];

        setState({
          ...state,
          basePosterUrl,
          baseBackdropUrl,
          baseProfileUrl,
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchMovieImageConfigs();
  }, []);

  const fetchPopularMovies = useCallback(async () => {
    try {
      const popularMoviesApiResp = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${pager.page}`
        )
      ).json();

      const movies = sortMoviesByPopularity(popularMoviesApiResp.results);
      setHeader('Popular Movies');

      movieDispatch({ type: 'STACK_MOVIES', movies });
      movieDispatch({ type: 'FETCHING_MOVIES', fetching: false });
    } catch (e) {
      movieDispatch({ type: 'FETCHING_MOVIES', fetching: false });
      console.log(e);
    }
  }, [pager.page]);

  const fetchFilteredMovies = useCallback(async () => {
    try {
      const filterMoviesApiRes = await (
        await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&query=${searchValue}&page=${pager.page}&include_adult=false`
        )
      ).json();

      const movies = filterMoviesApiRes.results;
      setHeader('Results');

      movieDispatch({ type: 'STACK_MOVIES', movies });
      movieDispatch({ type: 'FETCHING_MOVIES', fetching: false });
    } catch (e) {
      console.log(e);
      movieDispatch({ type: 'FETCHING_MOVIES', fetching: false });
    }
  }, [searchValue, pager.page]);

  useEffect(() => {
    movieDispatch({ type: 'FETCHING_MOVIES', fetching: true });

    if (pager.page !== 0) {
      if (searchValue !== '') {
        fetchFilteredMovies();
      } else {
        fetchPopularMovies();
      }
    }
  }, [fetchPopularMovies, fetchFilteredMovies]);

  // implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            pagerDispatch({ type: 'ADVANCE_PAGE', page: 1 });
          }
        });
      }).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  const handleInputChange = e => {
    setSearchValue(e.target.value);
    movieDispatch({ type: 'CLEAR_MOVIES', movies: [] });
    pagerDispatch({ type: 'RESET_PAGE', page: 0 });
  };

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home
            header={header}
            movies={movieData.movies}
            movieConfigurations={state.movieConfigurations}
            basePosterUrl={state.basePosterUrl}
            handleInputChange={handleInputChange}
          />{' '}
        </Route>{' '}
        <Route path='/movie'>
          <Movie
            baseBackdropUrl={state.baseBackdropUrl}
            baseProfileUrl={state.baseProfileUrl}
          />{' '}
        </Route>{' '}
      </Switch>{' '}
      <div
        id='page-bottom-boundary'
        style={{ border: '1px solid red' }}
        ref={bottomBoundaryRef}
      ></div>
    </Router>
  );
}

export default App;
