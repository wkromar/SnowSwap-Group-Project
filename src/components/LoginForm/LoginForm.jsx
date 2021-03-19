import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function LoginForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form onSubmit={login}>
      <div className="login-form">
        <div className="login-snow-swap">SnowSwaps</div>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div className="input-container">
          <div className="input-tag">User Name</div>
          <input
            className="styled-input"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-tag">Password</div>
          <input
            className="styled-input"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="login-btn-container">
          {/* <input className="ss-btn" type="submit" name="submit" value="Log In" /> */}
          <button className="ss-btn" type="submit" name="submit">
            Log In
          </button>
        </div>
      <button
        type="button"
        className="btn btn_asLink"
        onClick={() => {
          history.push('/registration');
        }}
        >
        Register
      </button>
        </div>
    </form>
  );
}

export default LoginForm;
