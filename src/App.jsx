import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import SignUp from './components/SignupPage';
import AuthForm from './components/AuthForm';
import UserDashboard from './components/UserDashboard'; 
import Furniture from './components/Furniture';
import Handbags from './components/Handbags';
import Shoes from './components/Shoes';
import Tech from './components/Tech';
import Clothes from './components/Clothes';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoutes'; // Import ProtectedRoute

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/handbags" element={<Handbags />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
