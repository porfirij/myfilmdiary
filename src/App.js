import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import Login from './components/Login';
import NotFound from './components/NotFound';
import Home from './components/Home';

function App() {

  console.log("App running.");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
