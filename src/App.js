import React, { useState, useReducer, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Movie } from './pages/movie/Movie';
import { Home } from './pages/home/Home';
import {
  useImageDetails,
  useFetchMovies,
  useInfiniteScroll,
} from './customHooks';

function App() {
  const { baseProfileUrl, basePosterUrl, baseBackdropUrl } = useImageDetails();
  const [query, setQuery] = useState('');

  //movie reducer
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

  //page reducer
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

  //custom hook to get popular movies and searched movies
  const { header } = useFetchMovies(pager, movieDispatch, query);

  // implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const handleInputChange = e => {
    setQuery(e.target.value);
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
            basePosterUrl={basePosterUrl}
            handleInputChange={handleInputChange}
          />{' '}
        </Route>{' '}
        <Route path='/movie'>
          <Movie
            baseBackdropUrl={baseBackdropUrl}
            baseProfileUrl={baseProfileUrl}
          />{' '}
        </Route>{' '}
      </Switch>{' '}
      <div
        style={{ border: '1px solid transparent' }}
        ref={bottomBoundaryRef}
      ></div>
    </Router>
  );
}

export default App;
