/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import PasswordInputs from './RegisterFormInputs/PasswordInputs';
import TextInputs from './RegisterFormInputs/TextInputs';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loginLink: {
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.error.light, 0.85),
    },
  },
  loginButton: {
    backgroundColor: '#2E3B55',
    color: 'white',
    '&:hover': {
      backgroundColor: '#E8F0FE',
      color: '#2E3B55',
    },
  },
  loginError: {
    color: '#ff1744',
    fontWeight: 'bold',
  },
  [theme.breakpoints.down('xs')]: {
    loginTitle: {
      fontSize: 'calc(1rem + 1vw)',
    },
  },
}));

function Login() {
  const classes = useStyles();
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

  function loginUsers(e) {
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
          console.log(data);
          data.error ? setErrMessage(data.error.message) : setRedirect(true);
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) window.location.assign('/');

  return (
    <Box className="login" textAlign="center" mt={6}>
      <Box mb={5}>
        <h1 className={classes.loginTitle}>WX</h1>
        <p>
          Don't have an account?{' '}
          <strong>
            {
              <Link to="/register" className={classes.loginLink}>
                Sign Up
              </Link>
            }
          </strong>
        </p>
      </Box>
      <form action="" className="login-form" onSubmit={loginUsers}>
        <Box className="form-email" onChange={handleFormChange} mb={3}>
          <TextInputs type="email" label="Email" name="email" />
        </Box>

        <Box className="form-password" onChange={handleFormChange} mb={3}>
          <PasswordInputs />
        </Box>
        <Box className="form-btn">
          <Box mb={3}>
            <button variant="outlined" className={classes.loginButton}>
              Login
            </button>
          </Box>
          {errMessage ? (
            <p className={classes.loginError}>{errMessage}</p>
          ) : (
            <p> </p>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default Login;
