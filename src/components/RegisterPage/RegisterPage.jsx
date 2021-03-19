import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  return (
    <div className="login-container">
      <div
        className="bg"
        style={{ backgroundImage: 'url(images/login-background.jpg)' }}
      ></div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
