import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userRefreshToken } from './api/user';
import { Home } from './pages';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';
import './sass/App.scss';

export const App = () => {
  const refresh = localStorage.getItem('refresh');

  useEffect(() => {
    userRefreshToken();
    const intervalId = setInterval(() => userRefreshToken(), 1000 * 60 * 60);

    return () => clearInterval(intervalId);
  }, [refresh]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/project/:id" element={<Tasks />} />
    </Routes>
  );
};
