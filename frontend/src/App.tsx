import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import './sass/App.scss';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Home } from './pages';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
				<Route
          path="/profile" 
          element={
            <ProtectedRoute>
              <div>пенис</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
