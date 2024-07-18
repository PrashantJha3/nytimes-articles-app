import React, { useState } from 'react';
import Header from './components/Header';
import ArticleList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

const App = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="app">
      <Header />
      <div className="">
      <div className="row">
      <div className="col-md-6">
        <ArticleList onSelect={setSelectedArticle} />
        </div>
        <div className="col-md-6 marg-top">
        {selectedArticle && <ArticleDetail article={selectedArticle} />}
        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
