import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ForgotPasswordPage from '../pages/forgotPasswordPage/ForgotPasswordPage';
import Loginpage from '../pages/loginPage/Loginpage';
import NotfoundPage from '../pages/notFoundPage/NotfoundPage';
import Mainpage from '../pages/mainPage/MainPage';
import Registerpage from '../pages/registerPage/Registerpage';
import ResetPasswordPage from '../pages/resetPasswordPage/ResetPasswordPage';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  // const userApp = useContext(UserContext);

  const location = useLocation();

  // if (
  //   location.pathname === '/login' ||
  //   location.pathname === '/register' ||
  //   location.pathname === '/forgot-password' ||
  //   location.pathname === '/reset-password'
  // ) {

  //   return currentUser ? <Navigate to="../" replace /> : children;
  // }

  return currentUser ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />
      <Route
        path="login"
        element={
          /* <ProtectedRoute> */
          <Loginpage />
          /* </ProtectedRoute> */
        }
      />
      <Route
        path="register"
        element={
          // <ProtectedRoute>
          <Registerpage />
          // </ProtectedRoute>
        }
      />
      <Route
        path="forgot-password"
        element={
          // <ProtectedRoute>
          <ForgotPasswordPage />
          // </ProtectedRoute>
        }
      />
      <Route
        path="reset-password"
        element={
          // <ProtectedRoute>
          <ResetPasswordPage />
          // </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
};
