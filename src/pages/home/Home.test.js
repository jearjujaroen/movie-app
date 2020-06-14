import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from './Home';

describe('Home', () => {
  test('snapshot renders', () => {
    const header = '';
    const basePosterUrl = '';
    const movies = [];
    const handleInputChange = e => {
      console.log(e);
    };

    const component = renderer.create(
      <Home {...{ header, handleInputChange, movies, basePosterUrl }} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
