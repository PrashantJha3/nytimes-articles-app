import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesList from '../components/ArticlesList';

test('renders articles list', async () => {
    render(<ArticlesList />);
    const linkElement = await screen.findByText(/Most Popular Articles/i);
    expect(linkElement).toBeInTheDocument();
});
