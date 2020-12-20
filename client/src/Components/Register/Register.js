import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PasswordInputs from './RegisterFormInputs/PasswordInputs';
import TextInputs from './RegisterFormInputs/TextInputs';

function register() {
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
    // console.log({ username, email, password });
    if (checked === true) {
      try {
        fetch(`api/auth/signup`, {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) =>
            data.error ? setErrMessage(data.error.message) : setRedirect(true)
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrMessage('Please indicate that you accept the Terms and Conditions');
    }
  }
  if (redirect) window.location.assign('/');
  return (
    <div className="register">
      <AccountCircle />
      <h1>Create A TheWeeklyExtra Account</h1>
      <p>
        Already have an account?{' '}
        <strong>{<Link to="/login">Log In</Link>}</strong>
      </p>
      <form action="">
        <div className="form-username" onChange={handleFormChange}>
          <TextInputs type="text" label="Username" name="username" />
        </div>

        <div className="form-email" onChange={handleFormChange}>
          <TextInputs type="email" label="Email" name="email" />
        </div>

        <div className="form-password" onChange={handleFormChange}>
          <PasswordInputs />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckBox}
              name="check"
            />
          }
        />
        <span>
          By creating this account, I agree to the {''}
          {<Link to="/terms">Terms of Use</Link>} and acknowledge that I have
          definitely {`"read"`} the {<Link to="/privacy">Privacy Policy</Link>}
        </span>

        <div className="form-btn">
          <Button variant="outlined" color="primary" onClick={registerUsers}>
            Sign Up
          </Button>
        </div>
        {errMessage ? <p>{errMessage}</p> : <p> </p>}
      </form>
    </div>
  );
}

export default register;
