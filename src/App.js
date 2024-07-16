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
        <div className="row">
          <div className="col-md-6">
            <ArticleList onSelectArticle={handleSelectArticle} />
          </div>
          <div className="col-md-6">
            {selectedArticle && <ArticleDetail article={selectedArticle} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
