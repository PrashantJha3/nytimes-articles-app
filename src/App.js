import React, { useState } from 'react';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleSelectArticle = article => {
    setSelectedArticle(article);
  };
  return (
      <div className="app-container">
      <div className="container-fluid">
        <div>
          <div>
            <ArticleList onSelectArticle={handleSelectArticle} />
          </div>
          <div>
            {selectedArticle && <ArticleDetail article={selectedArticle} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
