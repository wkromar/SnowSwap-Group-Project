import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterForm() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    if (retypePassword !== password) {
      setIsValid(false);
    } else if (retypePassword === password) {
      dispatch({
        type: "REGISTER",
        payload: {
          username: username,
          password: password,
          retypePassword: retypePassword,
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
    }
  }; // end registerUser

  return (
    <form onSubmit={registerUser}>
      <div className="login-form">
        <div className="login-snow-swap">SnowSwaps</div>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="input-container">
          <div className="input-tag">User Name</div>
          <input
            className="styled-input"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-tag">Password</div>
          <input
            className="styled-input"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-tag">Retype Password</div>
          <input
            className="styled-input"
            type="retypePassword"
            name="retypePassword"
            value={retypePassword}
            required
            onChange={(event) => setRetypePassword(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-tag">First Name</div>
          <input
            className="styled-input"
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-tag">Last Name</div>
          <input
            className="styled-input"
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-tag">Email</div>
          <input
            className="styled-input"
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login-btn-container">
          <button className="ss-btn" type="submit" name="submit">
            Register
          </button>
        </div>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
