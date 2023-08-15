import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthenPage from './pages/AuthenPage';
import Main from './pages/Main';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthenPage />} />
        <Route path="/main" element={<MainLayout />}>
          <Route path="messages/:receiverId" element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
