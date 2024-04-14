import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Earn from './earn/Earn';
import Arbitrum from './Arbitrum';
import Debt from './Debt';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="earn" element={<Earn />} />
        <Route path="arbitrum" element={<Arbitrum />} />
        <Route path="debt" element={<Debt />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
