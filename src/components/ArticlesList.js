import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesThunk, setPeriod, setCurrentPage } from '../store/articlesSlice';
import ArticleItem from './ArticleItem';
import Loading from './Loading';
import Error from './Error';

const ArticleList = ({ onSelect }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.items);
  const status = useSelector((state) => state.articles.status);
  const error = useSelector((state) => state.articles.error);
  const period = useSelector((state) => state.articles.period);
  const currentPage = useSelector((state) => state.articles.currentPage);
  const articlesPerPage = 5;

  useEffect(() => {
    dispatch(fetchArticlesThunk(period));
  }, [dispatch, period]);

  const handlePeriodChange = (event) => {
    dispatch(setPeriod(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;

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
