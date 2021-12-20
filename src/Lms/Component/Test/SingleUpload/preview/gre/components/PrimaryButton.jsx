import React from 'react';
import Button from '@material-ui/core/Button';
import { greTheme } from '../../../../../../assets/css/GreStyles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import withStyles from '@material-ui/styles/withStyles';

const styles = {
  root: {
    background: 'linear-gradient(180deg, #3C699C 0%, #335783 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxSizing: 'border-box',
    ...greTheme.typography.h5,
    color: greTheme.palette.text.secondary,
    textTransform: 'none',
    '&:hover': {
      background: 'linear-gradient(180deg, #3C699C 0%, #335783 100%)',
    },
    width: '130px',
    // '& .MuiButtonBase': {
    //   root: {
    //     color: 'blue',
    //   },
    // },
    '&.Mui-disabled': {
      color: greTheme.palette.text.secondary,
      height: greTheme.spacing(6),
    },
  },
};

function PrimaryButton({ classes, onClick, children, disabled }) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      endIcon={<ArrowForwardIcon />}
      className={classes.root}
    >
      {children}
    </Button>
  );
}

export default withStyles(styles)(PrimaryButton);
