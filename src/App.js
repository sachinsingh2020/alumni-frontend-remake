import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { isUserLoggedIn } from './redux/actions/user';
import RegisteredCard from './components/RegisteredCard/RegisteredCard';

const App = () => {
  const { isAlumniAuthenticated } = useSelector((state) => state.alumni);

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            isAlumniAuthenticated ? <Navigate to="/" /> : <Register />
          }
        />
        <Route
          path="/login"
          element={isAlumniAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={isAlumniAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/registeredCard"
          element={isAlumniAuthenticated ? <RegisteredCard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
