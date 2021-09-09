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
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import Controls from '../../Utils/controls/Controls';
import { useDispatch } from 'react-redux';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MomentUtils from '@date-io/moment';
import { Formik, Form } from 'formik';
import { scheduleTest } from '../../../Actions/TestActions';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
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

export default function ScheduleLater(props) {
  const { scheduler, setScheduler, data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = (id, dates) => {
    dispatch(scheduleTest(id, dates));
  };

  return (
    <Dialog open={scheduler} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <ScheduleIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6' style={{ marginBottom: '2rem' }}>
          Schedule this test for later
        </Typography>
        <Formik
          initialValues={data || []}
          onSubmit={(values, { resetForm }) => {
            let scheduleDate = {
              startDateTime: values.startDateTime,
              endDateTime: values.endDateTime,
            };
            onSubmit(values.id, scheduleDate);
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue }) => (
            <>
              <div className='CreateTest'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <Grid
                    item
                    container
                    direction='row'
                    justify='space-around'
                    style={{ width: '100%' }}
                  >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EventIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.startDateTime}
                        name='startDateTime'
                        inputVariant='outlined'
                        label='Start Date & Time'
                        onChange={(val) => {
                          setFieldValue('startDateTime', val);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EventIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.endDateTime}
                        style={{ marginLeft: '1.5rem' }}
                        name='endDateTime'
                        inputVariant='outlined'
                        label='End Date & Time'
                        onChange={(val) => {
                          setFieldValue('endDateTime', val);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <DialogActions className={classes.dialogAction}>
                    <Controls.Button
                      variant='outlined'
                      text='Cancel'
                      color='primary'
                      onClick={() => setScheduler(false)}
                    />
                    <Controls.Button text='Submit' type='submit' color='primary' />
                  </DialogActions>
                </Form>
              </div>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
