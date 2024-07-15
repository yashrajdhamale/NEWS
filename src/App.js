import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import News from './Components/News';

const App = () => {
  const apiKey = 'f4355d0659f1473db9612031e5cb1b7f'; // Replace with your NewsAPI API key

  return (
    <div className="app">
      <Nav />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<News key="general" country="us" category="general" pageSize={5} apiKey={apiKey} />} />
          <Route path="/business" element={<News key="business" country="us" category="business" pageSize={5} apiKey={apiKey} />} />
          <Route path="/entertainment" element={<News key="entertainment" country="us" category="entertainment" pageSize={5} apiKey={apiKey} />} />
          <Route path="/health" element={<News key="health" country="us" category="health" pageSize={5} apiKey={apiKey} />} />
          <Route path="/science" element={<News key="science" country="us" category="science" pageSize={5} apiKey={apiKey} />} />
          <Route path="/sports" element={<News key="sports" country="us" category="sports" pageSize={5} apiKey={apiKey} />} />
          <Route path="/technology" element={<News key="technology" country="us" category="technology" pageSize={5} apiKey={apiKey} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
