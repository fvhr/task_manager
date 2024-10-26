import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import './sass/App.scss';
import { Home } from './pages';
import { Tasks } from './pages/Tasks';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks/:id" element={<Tasks />} />
			
      </Routes>
    </AuthProvider>
  );
};
