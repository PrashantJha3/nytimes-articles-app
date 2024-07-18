import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/nytimesService';
import ArticleItem from './ArticleItem';
import Loading from './Loading';
import Error from './Error';

const ArticleList = ({ onSelect }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        const articles = await fetchArticles(period);
        setArticles(articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getArticles();
  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    setCurrentPage(1); // Reset to first page when period changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  // Calculate articles to display for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="article-list-container">
      <div className="filter">
        <label htmlFor="period">Select Period: </label>
        <select id="period" value={period} onChange={handlePeriodChange}>
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>
      <div className="article-list">
        {currentArticles.map(article => (
          <ArticleItem key={article.id} article={article} onSelect={onSelect} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
