import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetailPage from './components/RecipeDetailPage';
import SearchResultsPage from './components/SearchResultsPage';
import TipsPage from './components/TipsPage';
import FridgeComponent from './components/FridgeComponent/FridgeComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchResultsPage />} />
        <Route path="/recipe/:recipeId" element={<SearchResultsPage />} />
        <Route path="/refrigerator" element={<FridgeComponent />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
