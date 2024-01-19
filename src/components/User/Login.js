import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';


const LoginRegistrationPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSwitchMode = () => {
    setIsLoginMode(!isLoginMode);
  };
  

  
  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Registration'}</h2>
      {isLoginMode ? (
        <LoginForm />
      ) : (
        <RegistrationForm />
      )}
      <div className='toggle'>
      <p>
        <strong>
        {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
        </strong>
        <button onClick={handleSwitchMode}>
          {isLoginMode ? 'Create an account' : 'Login'}
        </button>
      </p>
      </div>
    </div>
  );
};

export default LoginRegistrationPage;
