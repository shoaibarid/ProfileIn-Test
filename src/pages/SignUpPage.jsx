import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './PageStyles.css'; // Basic styling for forms
import axios from 'axios';
const SignUp = () => {
  const [isSignedup, setIsSignedup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: '',

  });
  const navigate = useNavigate(); // for redirect after signup
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState('');

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    const updatedErrors = { ...errors };

    if (name === 'password') {
      if (!value) {
        updatedErrors.password = 'Password is required';
      } else if (value.length < 6) {
        updatedErrors.password = 'Password must be at least 6 characters';
      } else {
        delete updatedErrors.password;
      }

      if (formData.confirmPassword && formData.confirmPassword !== value) {
        updatedErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete updatedErrors.confirmPassword;
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        updatedErrors.confirmPassword = 'Please confirm your password';
      } else if (value !== formData.password) {
        updatedErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete updatedErrors.confirmPassword;
      }
    }

    setErrors(updatedErrors);
  };




  const validate = () => {
    const newErrors = {};


    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }
    else if (
      formData.password.length >= 6 && // ✅ Only compare if password is valid
      formData.confirmPassword !== formData.password
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form Data Submitted:', formData);
      axios.post('https://profilein.infy.uk/signup.php', formData).then(response => {
            
            if (response.data.success) {
              console.log(response.data);
              setIsSignedup(true);
              setSignupError('');
              setTimeout(() => {
                navigate('/login'); // or wherever you want
              }, 1500);
              // Redirect or perform any other action on successful login
            } else {
              console.error('Signup failed:', response.data.message);
              setSignupError(response.data.message || 'Signup failed. Please try again.');
              
            }
          })
    }

  };



  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100 m-0 p-0">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-4/5 md:w-1/3 mt-2 flex flex-col justify-center items-center">
        <p className={`text-green-600 bg-green-100 border border-green-400 mt-0.5 px-2 py-2 
          rounded-md text-center font-semibold ${isSignedup ? "block" : "hidden"}`}>  ✅ Signup successful</p>
        
        {signupError && (
  <p className="text-red-600 bg-red-100 border border-red-400 mt-2 px-2 py-2 rounded-md text-center font-semibold">
    ❌ Email is already registered!
  </p>
)}

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create Your ProfileIn Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 flex items-center justify-center">
          <center>

            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
              className="px-2 py-2 border border-sky-300 rounded-lg mt-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            <br></br>
            <br></br>

            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
              className="px-2 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            <br></br>
            <br></br>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                className="px-2 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            {errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}

            <br></br>


            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
                onBlur={(e) => {
                  if (formData.confirmPassword !== formData.password) {
                    e.target.focus();
                  }
                }}
                className="self-center px-2 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-0">{errors.confirmPassword}</p>
            )}

            <br></br>

            <input type="text" name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange}
              className="px-2 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <br></br>
            <br></br>

            <button
              type="submit"
              className="w-22 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up

            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </a>
            </p>

          </center>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
