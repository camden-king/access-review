import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Search from './Search';
import Results from './Results';
import Place from './Place';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Results />} />
        <Route path="/place" element={<Place />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
