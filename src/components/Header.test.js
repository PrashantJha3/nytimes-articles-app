import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders header', () => {
  const { getByText } = render(<Header />);
  expect(getByText(/NY Times Most Popular Articles/i)).toBeInTheDocument();
});
