import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [accessCode, setAccessCode] = useState('');
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // The admin access code for demonstration purposes
  const ADMIN_ACCESS_CODE = 'tonylovesngwati';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (role === 'admin' && accessCode !== ADMIN_ACCESS_CODE) {
        setError('Invalid access code for admin');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const isAdmin = role === 'admin';
      navigate(isAdmin ? '/admin' : '/user');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (role === 'admin' && accessCode !== ADMIN_ACCESS_CODE) {
        setError('Invalid access code for admin');
        return;
      }

      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const isAdmin = role === 'admin';
      navigate(isAdmin ? '/admin' : '/user');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div 
      className="flex items-center justify-end min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: 'url("https://i.pinimg.com/564x/85/81/3a/85813a9b4fc7f99f43263b732d609f6c.jpg")' }}>
      <div 
        className="w-full max-w-md p-8 space-y-6 glassmorphism mr-10" 
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '15px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2 className="text-3xl font-semibold text-center text-white">Welcome Back</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
            >
              <option className='text-black' value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {role === 'admin' && (
            <div className="relative">
              <label htmlFor="accessCode" className="block text-sm font-medium text-white">Access Code</label>
              <input
                type={showAccessCode ? 'text' : 'password'}
                id="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full p-3 mt-2 rounded-lg bg-transparent border border-white/50 focus:border-white/80 text-white placeholder-white/70 focus:outline-none"
                placeholder="Enter admin access code"
              />
              <span
                onClick={() => setShowAccessCode(!showAccessCode)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
              >
                {showAccessCode ? '👁️' : '🙈'}
              </span>
            </div>
          )}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-white">Show Password</label>
          </div>
          <button 
            type="submit" 
            className="w-full py-3 mt-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-900 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-3">
          <button 
            onClick={handleGoogleLogin} 
            className="flex items-center justify-center w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-900 transition-colors duration-300"
            style={{ marginTop: '8px' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 48 48" 
              width="24" 
              height="24" 
              className="mr-3"
            >
              <path fill="#EA4335" d="M24 9.5c3.06 0 5.88 1.17 8.05 3.07l6-6C33.73 3.57 29.14 1.5 24 1.5 14.73 1.5 6.92 7.57 3.5 16.09l6.9 5.36C12.34 14.59 17.78 9.5 24 9.5z" />
              <path fill="#4285F4" d="M24 44.5c5.14 0 9.73-2.07 13.05-5.57l-6-5.07C30.55 35.33 27.46 36.5 24 36.5c-6.23 0-11.67-5.09-12.6-11.95l-6.9 5.36C6.92 40.43 14.73 44.5 24 44.5z" />
              <path fill="#FBBC05" d="M44.5 24c0-1.48-.16-2.91-.46-4.29H24v8.57h11.82c-.5 2.52-1.95 4.67-3.82 6.06l6 5.07C41.9 35.66 44.5 30.17 44.5 24z" />
              <path fill="#34A853" d="M11.4 24c0-1.34.22-2.64.62-3.85L5.12 14.79C3.91 17.32 3.5 20.08 3.5 23c0 2.92.41 5.68 1.62 8.21l6.9-5.36c-.4-1.21-.62-2.51-.62-3.85z" />
            </svg>
            Continue with Google
          </button>
        </div>
        <div className="text-center mt-4">
        <p className="text-sm text-white">
            Don't have an account? <Link to="/signup" className="text-green-900 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;