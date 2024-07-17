import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleDetail from '../components/ArticleDetail';
import '../styles/ArticleList.css'; // Import your custom CSS for ArticleList

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=GscBytNZgCYpszIh2uiQ5RoqFapCZ7Ba`
      );
      setArticles(response.data.results);
    };

    fetchArticles();
  }, []);

  const handleSelectArticle = article => {
    setSelectedArticle(article);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='row'>
    <div className="article-list-container col-md-6" >
      <h2 className="text-center mb-4">Most Popular Articles</h2>
      <ul className="list-group">
        {currentArticles.map(article => (
          <li
            key={article.id}
            className="list-group-item list-group-item-action"
            onClick={() => handleSelectArticle(article)}
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
    <div className="col-md-6">
          {selectedArticle && <ArticleDetail article={selectedArticle} />}
          </div>
    </div>
  );
};

export default ArticleList;
