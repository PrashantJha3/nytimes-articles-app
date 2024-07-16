import React from 'react';
import '../styles/ArticleDetail.css';

const ArticleDetail = ({ article }) => {
  if (!article) {
    return <div>No article selected</div>;
  }

  return (
    <div >
         <h2 className="text-center mb-4">Articles Details</h2>
         <div className="article-detail-container">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-byline">{article.byline}</p>
      <p className="article-abstract">{article.abstract}</p>
      <a href={article.url} className="article-link" target="_blank" rel="noopener noreferrer">
        Read more
      </a>
      </div>
    </div>
  );
};

export default ArticleDetail;

