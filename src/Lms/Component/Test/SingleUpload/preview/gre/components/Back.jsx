import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { greTheme } from '../../../../../../assets/css/GreStyles';

const style = {
  root: {
    background: '#2F3946',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxSizing: 'border-box',
    borderRadius: '4px',
    ...greTheme.typography.h5,
    color: greTheme.palette.text.secondary,
    textTransform: 'none',
    width: '130px',
    '&:hover': {
      background: '#2F3946',
    },
  },
};

function Back(props) {
  return (
    <Button
      {...props}
      startIcon={<ArrowBackIcon />}
      className={props.classes.root}
    >
      Back
    </Button>
  );
}

export default withStyles(style)(Back);
