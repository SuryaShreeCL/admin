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
import ScheduleIcon from '@material-ui/icons/Schedule';
import MomentUtils from '@date-io/moment';
import { Formik, Form } from 'formik';
import { DatePicker, TimePicker } from '@material-ui/pickers';
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
  const { scheduler, setScheduler } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    wallCategories: [],
    duration: 0,
    supportingMedia: 'image',
    wallFiles: [],
    noOfQuestions: 0,
    testName: '',
    eventDate: new Date(),
    resumeNeeded: false,
    eventEndDate: new Date(),
    selectedDate: new Date(),
    description: '',
    activeStatus: 'Live',
  });

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
          initialValues={state || []}
          onSubmit={(values, { resetForm }) => {}}
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
                      <DatePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EventIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Start Date'
                      />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EventIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Start Date'
                      />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <ScheduleIcon />
                            </InputAdornment>
                          ),
                        }}
                        style={{ marginTop: '1.5rem' }}
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Start Time'
                      />
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <ScheduleIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.selectedDate}
                        disablePast
                        style={{ marginTop: '1.5rem' }}
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='End Time'
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                </Form>
              </div>
            </>
          )}
        </Formik>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button text='Cancel' color='default' onClick={() => setScheduler(false)} />
        <Controls.Button text='Set' color='primary' />
      </DialogActions>
    </Dialog>
  );
}
