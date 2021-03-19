import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-container">
      <div className="bg" style={{backgroundImage: 'url(images/login-background.jpg)'}}></div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
