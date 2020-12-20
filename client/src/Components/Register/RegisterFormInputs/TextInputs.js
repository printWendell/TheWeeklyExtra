import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textInput: {
    width: '55%',
  },
  [theme.breakpoints.down('xs')]: {
    textInput: {
      width: '100%',
    },
  },
}));

function TextInputs({ type, label, name }) {
  const classes = useStyles();
  return (
    <TextField
      className={(`outlined-basic`, classes.textInput)}
      variant="outlined"
      type={type}
      label={label}
      name={name}
    />
  );
}

TextInputs.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default TextInputs;
