import React from 'react';

const ArticleItem = ({ article, onSelect }) => {
  const imageUrl = article.media.length > 0 ? article.media[0]['media-metadata'][0].url : '';

  return (
    <div className="article-item" onClick={() => onSelect(article)}>
      {imageUrl && <img src={imageUrl} alt={article.title} />}
      <h2>{article.title}</h2>
      <p>{article.byline}</p>
      <p>{article.published_date}</p>
    </div>
  );
};

export default ArticleItem;
