import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleDetail from '../components/ArticleDetail';

const mockArticle = {
  title: 'Sample Article Title',
  byline: 'By Author Name',
  abstract: 'Sample abstract of the article.',
  url: 'https://example.com',
};

describe('ArticleDetail component', () => {
  test('renders "No article selected" when no article is passed', () => {
    render(<ArticleDetail article={null} />);
    const noArticleElement = screen.getByText('No article selected');
    expect(noArticleElement).toBeInTheDocument();
  });

  test('renders article details correctly when an article is passed', () => {
    render(<ArticleDetail article={mockArticle} />);

    const titleElement = screen.getByText(mockArticle.title);
    const bylineElement = screen.getByText(mockArticle.byline);
    const abstractElement = screen.getByText(mockArticle.abstract);
    const linkElement = screen.getByRole('link', { name: 'Read more' });

    expect(titleElement).toBeInTheDocument();
    expect(bylineElement).toBeInTheDocument();
    expect(abstractElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', mockArticle.url);
  });
});
