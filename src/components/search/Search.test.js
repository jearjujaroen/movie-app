import React from 'react';
import renderer from 'react-test-renderer';
import { Search } from './Search';

describe('testing search', () => {
  it('renders correctly', () => {
    const handleInputChange = e => {
      console.log(e);
    };

    const item = renderer
      .create(<Search handleInputChange={handleInputChange} />)
      .toJSON();
    expect(item).toMatchSnapshot();
  });
});
