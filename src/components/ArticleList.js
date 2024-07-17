import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ArticleList.css'; 

const ArticleList = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);

  useEffect(() => {
    const fetchArticles = async () => {
        try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=GscBytNZgCYpszIh2uiQ5RoqFapCZ7Ba`
      );
      setArticles(response.data.results);
    } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);
  


  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="article-list-container">
      <h2 className="text-center mb-4">Most Popular Articles</h2>
      <ul className="list-group" role="list">
        {currentArticles.map(article => (
          <li
            key={article.id}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectArticle(article)}
            role="listitem"
          >
            <div className="article-title">{article.title}</div>
            <div className="article-details">
              <small className="text-muted">
                {article.published_date} | {article.section}
              </small>
            </div>
          </li>
        ))}
      </ul>
      
    
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {[...Array(Math.ceil(articles.length / articlesPerPage)).keys()].map(pageNumber => (
            <li key={pageNumber} className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(pageNumber + 1)} className="page-link">
                {pageNumber + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ArticleList;

