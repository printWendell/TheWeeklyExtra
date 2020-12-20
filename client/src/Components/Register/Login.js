/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import PasswordInputs from './RegisterFormInputs/PasswordInputs';
import TextInputs from './RegisterFormInputs/TextInputs';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  function registerUsers(e) {
    e.preventDefault();
    try {
      fetch(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          data.error ? setErrMessage(data.error.message) : setRedirect(true);
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) window.location.assign('/');

  return (
    <div className="login">
      <AccountCircle />
      <h1>WX</h1>
      <p>
        Don't have an account?{' '}
        <strong>{<Link to="/register">Sign Up</Link>}</strong>
      </p>
      <form action="">
        <div className="form-email" onChange={handleFormChange}>
          <TextInputs type="email" label="Email" name="email" />
        </div>

        <div className="form-password" onChange={handleFormChange}>
          <PasswordInputs />
        </div>
        <div className="form-btn">
          <Button variant="outlined" color="primary" onClick={registerUsers}>
            Login
          </Button>
          {errMessage ? (
            <p className="has-text-danger">{errMessage}</p>
          ) : (
            <p> </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
