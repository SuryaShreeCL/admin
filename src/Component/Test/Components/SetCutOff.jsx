import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import * as yup from 'yup';
import Controls from '../../Utils/controls/Controls';
import { useDispatch } from 'react-redux';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Winner from '@material-ui/icons/EmojiEvents';
import { Formik, Form } from 'formik';
import Notification from '../../Utils/Notification';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmSubmit from '../../Utils/ConfirmSubmit';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(1),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
    padding: 0,
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: 'rgba(84,179,230,0.20)',
    padding: '1.5rem',
    margin: '1.5rem',
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      fontSize: '4rem',
    },
  },
}));

export default function SetCutOff(props) {
  const { openCutOff, setOpenCutOff, data, type, listTests } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const [confirmSubmit, setConfirmSubmit] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    testName: '',
    cutOffScore: '',
  });

  const validationSchema = yup.object({
    duration: yup
      .string()
      .required()
      .test(
        'durationCheck',
        'Cut off score cannot be higher than set score for the test.',
        (duration) => duration <= data.duration
      ),
  });

  return (
    <>
      <Dialog open={openCutOff} classes={{ paper: classes.dialog }}>
        <CloseIcon
          fontSize='medium'
          onClick={() => setOpenCutOff(false)}
          style={{ position: 'relative', marginLeft: 'auto' }}
        />
        <DialogTitle className={classes.dialogTitle}>
          <IconButton disableRipple className={classes.titleIcon}>
            <Winner />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant='h6' style={{ marginBottom: '1rem' }}>
            Set Cut Off
          </Typography>
          <Formik
            initialValues={data || []}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              setConfirmSubmit({
                isOpen: true,
                title: 'Confirm Submission',
                subTitle: 'Are you sure you want to submit this data?',
                testName: data.name,
                cutOffScore: values.duration,
                onConfirm: () => {
                  // dispatch(updateAppVersion(values));
                  setOpenCutOff(false);
                  setConfirmSubmit({
                    ...confirmSubmit,
                    isOpen: false,
                  });
                  setNotify({
                    isOpen: true,
                    message: 'Cut of Set Successful',
                    type: 'success',
                  });
                  setTimeout(() => {
                    dispatch(listTests(type));
                  }, 1200);
                  resetForm();
                },
              });
            }}
            enableReinitialize
          >
            {({ handleSubmit, values, handleChange, touched, errors }) => (
              <>
                <div className='CreateTest'>
                  <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Grid item container style={{ width: '300px' }}>
                      <Controls.Input
                        label='Cut Off'
                        name='duration'
                        type='number'
                        style={{ width: '100%', marginBottom: '1rem' }}
                        value={values.duration}
                        onChange={handleChange}
                        helperText={touched.duration && errors.duration}
                        error={touched.duration && Boolean(errors.duration)}
                      />
                    </Grid>
                    <DialogActions className={classes.dialogAction}>
                      <Controls.Button
                        variant='outlined'
                        text='Cancel'
                        color='primary'
                        onClick={() => setOpenCutOff(false)}
                      />
                      <Controls.Button text='Set' type='submit' color='primary' />
                    </DialogActions>
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <ConfirmSubmit confirmSubmit={confirmSubmit} setConfirmSubmit={setConfirmSubmit} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
