import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArticleList from '../components/ArticleList';
import axios from 'axios';

jest.mock('axios');

const mockArticles = [
  { id: 1, title: 'Sample Article Title 1', published_date: '2024-07-16', section: 'Section 1' },
  { id: 2, title: 'Sample Article Title 2', published_date: '2024-07-16', section: 'Section 2' },
  { id: 3, title: 'Sample Article Title 3', published_date: '2024-07-16', section: 'Section 3' },
  { id: 4, title: 'Sample Article Title 4', published_date: '2024-07-16', section: 'Section 4' },
  { id: 5, title: 'Sample Article Title 5', published_date: '2024-07-16', section: 'Section 5' },
  { id: 6, title: 'Sample Article Title 6', published_date: '2024-07-16', section: 'Section 6' },
];

describe('ArticleList component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { results: mockArticles },
    });
  });

  test('fetches and displays articles', async () => {
    render(<ArticleList onSelectArticle={jest.fn()} />);

    for (let i = 0; i < 5; i++) {
      const articleTitleElement = await waitFor(() => screen.getByText(mockArticles[i].title));
      expect(articleTitleElement).toBeInTheDocument();
    }

    expect(screen.queryByText(mockArticles[5].title)).toBeNull();
  });

  test('pagination works as expected', async () => {
    render(<ArticleList onSelectArticle={jest.fn()} />);

    for (let i = 0; i < 5; i++) {
      const articleTitleElement = await waitFor(() => screen.getByText(mockArticles[i].title));
      expect(articleTitleElement).toBeInTheDocument();
    }

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    const articleTitleElement = await waitFor(() => screen.getByText(mockArticles[5].title));
    expect(articleTitleElement).toBeInTheDocument();

    for (let i = 0; i < 5; i++) {
      expect(screen.queryByText(mockArticles[i].title)).toBeNull();
    }
  });

  test('calls onSelectArticle with the correct article', async () => {
    const mockOnSelectArticle = jest.fn();
    render(<ArticleList onSelectArticle={mockOnSelectArticle} />);

    const articleTitleElement = await waitFor(() => screen.getByText(mockArticles[0].title));

    fireEvent.click(articleTitleElement);

    expect(mockOnSelectArticle).toHaveBeenCalledWith(mockArticles[0]);
  });
});
