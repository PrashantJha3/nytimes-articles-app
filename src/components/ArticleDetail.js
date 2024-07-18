import React from 'react';

const ArticleDetail = ({ article }) => {
  const imageUrl = article.media.length > 0 ? article.media[0]['media-metadata'][2].url : ''; // use larger image

  return (
    <div className="article-detail">
      <h2>{article.title}</h2>
      {imageUrl && <img src={imageUrl} alt={article.title} />}
      <p>{article.byline}</p>
      <p>{article.published_date}</p>
      <p>{article.abstract}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default ArticleDetail;
