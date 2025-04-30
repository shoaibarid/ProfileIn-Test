import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageStyles.css'; // Basic styling for forms

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // for redirect after login

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost/Profilein/login.php', credentials) // Ideally: rename this endpoint to "login.php"
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setIsLoggedIn(true);
          setLoginError('');
          // Optional: Redirect after login
          setTimeout(() => {
            navigate('/templates'); // or wherever you want
          }, 1500);
        } else {
          console.error('Login failed:', response.data.message);
          setLoginError(response.data.message || 'Login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setLoginError('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-4/5 md:w-1/3 border border-sky-200">
        {isLoggedIn && (
          <p className="text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ✅ Login successful!
          </p>
        )}
        {loginError && (
          <p className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md mb-4 text-center font-semibold">
            ❌ {loginError}
          </p>
        )}

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back to ProfileIn</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 w-[90%] md:w-[80%] mx-auto">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-4 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-sky-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
