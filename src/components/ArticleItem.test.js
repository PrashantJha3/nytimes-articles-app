import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ArticleItem from './ArticleItem';

const article = {
  title: 'Test Article',
  byline: 'Author',
  published_date: '2023-01-01'
};

test('renders article item and handles click', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<ArticleItem article={article} onSelect={handleClick} />);

  fireEvent.click(getByText(/Test Article/i));
  expect(handleClick).toHaveBeenCalledWith(article);
});
