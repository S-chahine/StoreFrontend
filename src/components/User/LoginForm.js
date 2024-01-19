import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginFailure } from './loginActions';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.login.loginError);
  const user = useSelector((state) => state.login.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleLogin = async (email, password) => {
    try {
      await dispatch(loginUser(email, password));
      navigate('/dashboard');
    } catch (error) {
      console.log('Login error:', error);
      dispatch(loginFailure(error.message || 'Login failed. Please check your credentials.'));
    }
  };

  return (
    <div className="login-container">
      <div className="h1-login">
        <h1 className="h1-color">Login</h1>
      </div>
      {loginError && <p className="error-message">{loginError}</p>}
      {user && <p>Welcome, {user.name}!</p>}
      <div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
