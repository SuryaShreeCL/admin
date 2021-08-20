import React, { useState, useEffect } from 'react';
import { ButtonsContainer, CreateTestContainer } from '../Assets/Styles/CreateTestStyles';
import BackHandler from '../Components/BackHandler';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import { Formik, Form } from 'formik';
import Controls from '../../Utils/controls/Controls';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createWallPost, getWallCategories } from '../../../Actions/WallActions';
import Notification from '../../Utils/Notification';
import { useHistory, useLocation } from 'react-router-dom';
import { wallPath } from '../../RoutePaths';
import ConfirmDialog from '../../Utils/ConfirmDialog';

const useStyles = makeStyles({
  root: {
    '& .MuiSelect-root': {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      padding: '1rem',
    },
  },
  captionStyle: {
    width: '100%',
  },
  spacer: {
    width: '80%',
    marginTop: '10px',
  },
});

const CreateTest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    wallCategories: [],
    caption: '',
    isEvent: location.type ?? false,
    supportingMedia: 'image',
    wallFiles: [],
    canComment: false,
    totalViews: 0,
    totalLikes: 0,
    eventTitle: '',
    redirectionUrl: '',
    buttonText: '',
    createdBy: window.sessionStorage.getItem('department') || '',
    eventDate: new Date(),
    resumeNeeded: false,
    eventEndDate: new Date(),
    selectedDate: new Date(),
    isScheduled: false,
    isVideoUrlEnabled: false,
    videoUrl: '',
    activeStatus: 'Live',
  });

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    dispatch(getWallCategories('Live'));
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);

  const validate = (values) => {
    if (values.supportingMedia === 'image' && values.wallFiles.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Please upload image(s)',
        type: 'error',
      });
      return false;
    }
    if (
      !values.isVideoUrlEnabled &&
      values.supportingMedia === 'video' &&
      values.wallFiles.length === 0
    ) {
      setNotify({
        isOpen: true,
        message: 'Please upload a video',
        type: 'error',
      });
      return false;
    }
    if (values.supportingMedia === 'audio' && values.wallFiles.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Please upload an audio',
        type: 'error',
      });
      return false;
    }

    if (values.isVideoUrlEnabled && values.videoUrl?.length < 1) {
      setErrorSchema((s) => ({ ...s, isVideoLink: true }));
      return false;
    }

    return true;
  };

  const handlePostType = () => {
    setState((s) => ({ ...s, isEvent: !state.isEvent }));
  };

  const validationSchema = yup.object({
    caption: yup.string().required('caption is required'),
  });

  const createPost = (post, activeStatus) => {
    if (!post.id) dispatch(createWallPost({ ...post, activeStatus }));
    setNotify({
      isOpen: true,
      message: 'Created Successfully',
      type: 'success',
    });
    setTimeout(() => {
      history.push({
        pathname: wallPath,
        tab: state.isEvent ? 3 : 0,
      });
    }, 1200);
  };

  const onDiscard = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setTimeout(() => {
      history.push({
        pathname: wallPath,
        tab: state.isEvent ? 3 : 0,
      });
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Discarded',
      type: 'warning',
    });
  };

  return (
    <>
      <BackHandler title={`Create New Test`} tab={0} />
      <CreateTestContainer>
        <Formik
          initialValues={state || []}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (validate(values)) {
              createPost(values, 'Live');
              resetForm();
            }
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue }) => (
            <>
              <div className='CreateTest'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Question Details</h6>
                  <Grid container direction='row' justify='space-between'>
                    <Grid item style={{ width: '48%' }}>
                      <Controls.Input
                        label='Test Name'
                        name='eventTitle'
                        style={{ width: '100%' }}
                        value={values.eventTitle}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item style={{ width: '48%' }}>
                      <FormControl className={classes.root} style={{ width: '100%' }}>
                        <Autocomplete
                          multiple
                          id='wallCategories'
                          name='wallCategories'
                          getOptionLabel={(option) => option?.name}
                          options={categories ?? []}
                          onChange={(e, value) => {
                            setFieldValue('wallCategories', value !== null ? value : categories);
                          }}
                          value={values.wallCategories}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Select Category'
                              name='wallCategories'
                              variant='outlined'
                              error={
                                touched.wallCategories &&
                                Boolean(values.wallCategories.length === 0)
                              }
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Paste Video URL'
                      name='videoUrl'
                      style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}
                      value={values.videoUrl}
                      error={errorSchema.isVideoLink}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid container direction='row' justify='space-between' style={{ width: '100%' }}>
                    <Grid item style={{ width: '48%' }}>
                      <Controls.Select
                        label='Testimonial Origin'
                        name='testimonialOrigin'
                        size='100%'
                        onChange={handleChange}
                        options={[]}
                      />
                    </Grid>
                    <Grid item style={{ width: '48%' }}>
                      <Controls.Select
                        label='Testimonial Origin'
                        name='testimonialOrigin'
                        size='100%'
                        onChange={handleChange}
                        options={[]}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    style={{ width: '100%', margin: '1rem 0' }}
                  >
                    <Grid item style={{ width: '48%' }}>
                      <MultipleFileUploadField name='wallFiles' fileType='image' />
                    </Grid>
                    <Grid item style={{ width: '48%' }}>
                      <Controls.Input
                        label='Test instructions..'
                        value={values.caption}
                        name='caption'
                        onChange={handleChange}
                        error={touched.caption && Boolean(errors.caption)}
                        multiline
                        className={classes.captionStyle}
                        rows={6}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction='row'
                    justify='space-between'
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
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Schedule Data & Time'
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
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Schedule Data & Time'
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
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Schedule Data & Time'
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
                        value={values.selectedDate}
                        disablePast
                        name='selectedDate'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('selectedDate', val);
                        }}
                        label='Schedule Data & Time'
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                  <ButtonsContainer>
                    <Button
                      color='primary'
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to discard this post?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDiscard();
                          },
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Controls.Button
                      text='Submit'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px', marginLeft: 30 }}
                      type='submit'
                    />
                  </ButtonsContainer>
                </Form>
              </div>
            </>
          )}
        </Formik>
      </CreateTestContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};

export default CreateTest;
