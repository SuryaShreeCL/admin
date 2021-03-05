import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialValues) {
  const [records, setRecords] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setRecords(initialValues);
    setErrors({});
  };

  return {
    records,
    setRecords,
    errors,
    setErrors,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete='off' {...other}>
      {props.children}
    </form>
  );
}
