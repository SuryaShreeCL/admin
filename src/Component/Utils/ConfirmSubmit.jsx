import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import Controls from './controls/Controls';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary,
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      fontSize: '7rem',
    },
  },
}));

export default function ConfirmSubmit(props) {
  const { confirmSubmit, setConfirmSubmit } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmSubmit.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <WarningIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{confirmSubmit.title}</Typography>
        <Typography variant='subtitle2'>{confirmSubmit.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text='Cancel'
          color='default'
          onClick={() => setConfirmSubmit({ ...confirmSubmit, isOpen: false })}
        />
        <Controls.Button text='Submit' color='primary' onClick={confirmSubmit.onConfirm} />
      </DialogActions>
    </Dialog>
  );
}
