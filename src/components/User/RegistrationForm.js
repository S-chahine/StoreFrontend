import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginFailure } from './loginActions';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ firstName, lastName, email, password, confirmPassword });
  };

  const handleLogin = async (email, password) => {
    try {
      await dispatch(loginUser(email, password));
      // Delay rendering by 1 second
      // setTimeout(() => {
      //   navigate('/dashboard');
      // }, 2000);

    } catch (error) {
      console.log('Login error:', error);
      dispatch(loginFailure(error.message || 'Login failed. Please check your credentials.'));
    }
  };

  const handleRegister = async (userData) => {
    const { firstName, lastName, email, password, confirmPassword } = userData;

    // Validate if passwords match
    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Make a POST request to your backend API with the registration data
      const response = await axios.post('https://storebackend-2c94.onrender.com/api/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // Handle the response from the server
      if (response.status === 201) {
        // Successful registration
        console.log('Registered successfully!');
        setSuccessMessage('Registered successfully!');
        handleLogin(email, password);

      } else {
        // Handle registration error
        console.log('Registration failed');
      }
    } catch (error) {
      // Handle error
      console.log('Registration error:', error);
    }
  };

  return (
    <div className='login-container'>
      <h1 className='h1-color'>Register</h1>
      <form className='registration-form' onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Register</button>
        <div className='error-message'>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div className='success-message'>
          {successMessage && <p>{successMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
