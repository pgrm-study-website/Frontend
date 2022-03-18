import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Main</div>} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/signup" element={<div>Sign Up</div>} />
      <Route path="/*" element={<div>Not Found</div>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
