import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextInputs from '../../Register/RegisterFormInputs/TextInputs';
import PasswordInputs from '../../Register/RegisterFormInputs/PasswordInputs';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dialogInput: {
    backgroundColor: 'red',
  },
  dialogError: {
    color: '#ff1744',
    fontWeight: 'bold',
    fontSize: 'calc(.6rem + .7vw)',
  },
  dialogButton: {
    borderColor: '#2E3B55',
    color: '#2E3B55',
    '&:hover': {
      backgroundColor: '#E8F0FE',
    },
  },
}));

function NavDialogForms() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  function loginUser(e) {
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
    <div>
      <form action="" onSubmit={loginUser}>
        <Box onChange={handleFormChange} mb={2} mt={2}>
          <TextInputs type="email" label="Email" name="email" />
        </Box>
        <Box className="form-password" onChange={handleFormChange} mb={2}>
          <PasswordInputs />
        </Box>

        <Box className="form-btn" mb={2}>
          <Button
            variant="outlined"
            className={classes.dialogButton}
            onClick={loginUser}
          >
            Login
          </Button>
        </Box>
        {errMessage ? (
          <p className={classes.dialogError}>{errMessage}</p>
        ) : (
          <p> </p>
        )}
      </form>
    </div>
  );
}

export default NavDialogForms;
