import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PasswordInputs from './RegisterFormInputs/PasswordInputs';
import TextInputs from './RegisterFormInputs/TextInputs';
import { Box } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  registerLink: {
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.error.light, 0.85),
    },
  },
  registerCheckBox: {
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  registerButton: {
    backgroundColor: '#2E3B55',
    color: 'white',
    '&:hover': {
      backgroundColor: '#E8F0FE',
      color: '#2E3B55',
    },
  },

  registerError: {
    color: '#ff1744',
    fontWeight: 'bold',
  },

  [theme.breakpoints.down('xs')]: {
    registerTitle: {
      fontSize: 'calc(1rem + 1vw)',
    },
    registerCheckBox: {
      width: '100%',
      fontSize: 'calc(.6rem + 1vw)',
    },
  },
}));

function register() {
  const classes = useStyles();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  function registerUsers(e) {
    e.preventDefault();
    if (checked === true) {
      try {
        fetch(`api/auth/signup`, {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            data.error & data.error.status
              ? setErrMessage(data.error.message)
              : setRedirect(true);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrMessage('Please indicate that you accept the Terms and Conditions');
    }
  }
  if (redirect) window.location.assign('/');
  return (
    <Box className="register" textAlign="center" mt={6}>
      <Box mb={5}>
        <h1 className={classes.registerTitle}>
          Create A TheWeeklyExtra Account
        </h1>
        <p>
          Already have an account?{' '}
          <strong>
            {
              <Link to="/login" className={classes.registerLink}>
                Log In
              </Link>
            }
          </strong>
        </p>
      </Box>
      <form action="" className="register-form" onSubmit={registerUsers}>
        <Box className="form-username" onChange={handleFormChange} mb={5}>
          <TextInputs type="text" label="Username" name="username" />
        </Box>

        <Box className="form-email" onChange={handleFormChange} mb={5}>
          <TextInputs type="email" label="Email" name="email" />
        </Box>

        <Box className="form-password" onChange={handleFormChange} mb={5}>
          <PasswordInputs />
        </Box>

        <Box className={classes.registerCheckBox} mb={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckBox}
                name="check"
              />
            }
          />
          By creating this account, I agree to the {''}
          {<Link to="/terms">Terms of Use</Link>} and acknowledge that I have
          definitely {`"read"`} the {<Link to="/privacy">Privacy Policy</Link>}
        </Box>

        <Box className="form-btn" mb={4}>
          <Button
            variant="outlined"
            className={classes.registerButton}
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
        {errMessage ? (
          <p className={classes.registerError}>{errMessage}</p>
        ) : (
          <p> </p>
        )}
      </form>
    </Box>
  );
}

export default register;
