import React from 'react';
import { render } from '@testing-library/react';
import Card from '../src/components/Card/Card';

test('renders card with name and continent', () => {
  const props = {
    id: 1,
    name: 'Argentina',
    image: 'https://image.url',
    continent: 'South America',
  };

  const { getByText, getByAltText } = render(<Card {...props} />);

  expect(getByText(/Argentina/i)).toBeInTheDocument();
  expect(getByText(/Continent : South America/i)).toBeInTheDocument();
  expect(getByAltText('Argentina')).toBeInTheDocument();
});
