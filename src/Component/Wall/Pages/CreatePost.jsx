import React, { useState, useEffect } from 'react';
import {
  ButtonsContainer,
  CreatePostContainer,
} from '../Assets/Styles/CreatePostStyles';
import BackHandler from '../Components/BackHandler';
import Preview from '../Components/Preview';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import { Formik, Form } from 'formik';
import Controls from '../../Utils/controls/Controls';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  createWallPost,
  getWallCategories,
} from '../../../Actions/WallActions';
import Notification from '../../Utils/Notification';
import { useHistory, useLocation } from 'react-router-dom';
import { wallPath } from '../../RoutePaths';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import PreprationContainer from '../Components/PreparationContainer';

const useStyles = makeStyles({
  root: {
    '& .MuiSelect-root': {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      padding: '1rem',
    },
  },
  captionStyle: {
    width: '80%',
    marginTop: 20,
    marginBottom: 15,
  },
  spacer: {
    width: '80%',
    marginTop: '10px',
  },
});

const CreatePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    wallCategories: [],
    caption: '',
    isEvent: location.type ?? false,
    supportingMedia: location?.postType === 'Webinar' ? 'webinar' : 'image',
    wallFiles: [],
    isWebinar: location?.postType === 'Webinar',
    canComment: false,
    linkedSelfPrepVideos: null,
    totalViews: 0,
    totalLikes: 0,
    linkedTest: null,
    eventTitle: '',
    linkedWebinars: [],
    redirectionUrl: '',
    zoomLink: '',
    buttonText: '',
    createdBy: window.sessionStorage.getItem('department') || '',
    eventDate: new Date(),
    resumeNeeded: false,
    eventEndDate: new Date(),
    selectedDate: new Date(),
    isScheduled: false,
    isVideoUrlEnabled: false,
    videoUrl: '',
    jobRole: '',
  });

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    dispatch(getWallCategories('Live'));
  }, [dispatch]);

  const { categories } = useSelector(state => state.getWallCategoriesReducer);

  const validate = values => {
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

    if (values.isWebinar || values.isEvent) {
      if (
        moment(values.eventEndDate).isSameOrBefore(values.eventDate) ||
        moment(values.eventDate).isBefore(moment()) ||
        moment(values.eventEndDate).isBefore(moment())
      ) {
        setNotify({
          isOpen: true,
          message: 'Please add proper timing & date',
          type: 'error',
        });
        return false;
      }
    }

    if (values.isVideoUrlEnabled && values.videoUrl?.length < 1) {
      setErrorSchema(s => ({ ...s, isVideoLink: true }));
      return false;
    }

    return true;
  };

  const handlePostType = () => {
    setState(s => ({ ...s, isEvent: !state.isEvent }));
  };

  const validationSchema = yup.object({
    caption: yup.string().required('caption is required'),
    eventTitle: yup.string().required('title is required'),
    zoomLink: yup.string().required('zoom id is required'),
    jobRole: yup.string().required('Job role id is required')
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
        tab: location?.postTypeTab,
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
        tab: location?.postTypeTab,
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
      <BackHandler
        title={`Create New ${location?.postType ?? 'Post'}`}
        tab={location?.postTypeTab}
      />
      <CreatePostContainer>
        <Formik
          initialValues={state || []}
          validationSchema={state.isWebinar && validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (validate(values)) {
              createPost(
                values,
                location?.postType === 'Webinar' ? 'Scheduled' : 'Live'
              );
              resetForm();
            }
          }}
          enableReinitialize
        >
          {({
            handleSubmit,
            errors,
            handleChange,
            values,
            touched,
            setFieldValue,
          }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Post Type</h6>
                  <Grid
                    component='label'
                    container
                    alignItems='center'
                    spacing={1}
                  >
                    <Grid item>Wall Post</Grid>
                    <Grid item>
                      <Switch
                        checked={state.isEvent}
                        onChange={handlePostType}
                        name={values.isEvent}
                        disabled
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Grid>
                    <Grid item>Event</Grid>
                  </Grid>
                  <RadioGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '10px',
                    }}
                    aria-label='type'
                    disabled
                    name='supportingMedia'
                    value={values.supportingMedia}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='video'
                      control={<Radio color='primary' />}
                      label='Video'
                      disabled={values.isWebinar}
                    />
                    <FormControlLabel
                      value='image'
                      control={<Radio color='primary' />}
                      label='Image'
                      disabled={values.isWebinar}
                    />
                    <FormControlLabel
                      value='text'
                      control={<Radio color='primary' />}
                      label='Text'
                      disabled={values.isWebinar}
                    />
                    <FormControlLabel
                      value='audio'
                      control={<Radio color='primary' />}
                      label='Audio'
                      disabled={values.isWebinar}
                    />
                    {values.isWebinar && !values.isEvent && (
                      <FormControlLabel
                        value='webinar'
                        control={<Radio color='primary' />}
                        label='Webinar'
                      />
                    )}
                  </RadioGroup>
                  <FormControl
                    className={classes.root}
                    style={{ width: '80%' }}
                  >
                    <Autocomplete
                      multiple
                      id='wallCategories'
                      name='wallCategories'
                      getOptionLabel={option => option?.name}
                      options={categories ?? []}
                      onChange={(e, value) => {
                        setFieldValue(
                          'wallCategories',
                          value !== null ? value : categories
                        );
                      }}
                      value={values.wallCategories}
                      renderInput={params => (
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
                  {values.isEvent && (
                    <Grid item>
                      <Controls.Input
                        label='Enter Event Title'
                        name='eventTitle'
                        style={{ width: '80%', marginTop: '18px' }}
                        value={values.eventTitle}
                        onChange={handleChange}
                      />
                      <Controls.Input
                        label='Enter Job Role'
                        name='jobRole'
                        error={
                          values.jobRole?.length < 2 &&
                          touched.jobRole && Boolean(errors.jobRole)
                        }
                        style={{
                          width: '80%',
                          marginTop: '18px',
                        }}
                        value={values.jobRole}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}
                  {values.supportingMedia === 'webinar' ? (
                    <Grid item>
                      <Controls.Input
                        label='Enter Webinar Title'
                        name='eventTitle'
                        error={touched.eventTitle && Boolean(errors.eventTitle)}
                        style={{ width: '80%', marginTop: '18px' }}
                        value={values.eventTitle}
                        onChange={handleChange}
                      />
                    </Grid>
                  ) : (
                    <Grid item>
                      <Controls.Input
                        label='Type caption here..'
                        value={values.caption}
                        name='caption'
                        onChange={handleChange}
                        error={touched.caption && Boolean(errors.caption)}
                        multiline
                        className={classes.captionStyle}
                        rows={6}
                      />
                    </Grid>
                  )}
                  {!values.isEvent && !values.isWebinar && (
                    <Grid item>
                      <Controls.Input
                        label='Host Name'
                        name='hostName'
                        style={{
                          width: '80%',
                          marginTop: '10px',
                          marginBottom: '10px',
                        }}
                        value={values.hostName}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}
                  {values.supportingMedia === 'webinar' && (
                    <Grid item>
                      <Controls.Input
                        label='Type description here..'
                        value={values.caption}
                        name='caption'
                        onChange={handleChange}
                        error={touched.caption && Boolean(errors.caption)}
                        multiline
                        className={classes.captionStyle}
                        rows={5}
                      />
                    </Grid>
                  )}
                  {values.supportingMedia === 'video' && (
                    <Grid item>
                      <span style={{ fontSize: '1rem' }}>
                        Video URL Available
                        <Switch
                          checked={values.isVideoUrlEnabled}
                          name='isVideoUrlEnabled'
                          onChange={handleChange}
                          color='primary'
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </span>
                    </Grid>
                  )}
                  {values.supportingMedia === 'video' &&
                    values.isVideoUrlEnabled && (
                      <Grid item>
                        <Controls.Input
                          label='Paste Video URL'
                          name='videoUrl'
                          style={{
                            width: '80%',
                            marginTop: '10px',
                            marginBottom: '10px',
                          }}
                          value={values.videoUrl}
                          error={errorSchema.isVideoLink}
                          onChange={handleChange}
                        />
                      </Grid>
                    )}
                  {values.isWebinar && (
                    <Grid item>
                      <Controls.Input
                        label='Zoom Webinar ID'
                        name='zoomLink'
                        type='number'
                        error={touched.zoomLink && Boolean(errors.zoomLink)}
                        style={{
                          width: '80%',
                          marginTop: '10px',
                          marginBottom: '14px',
                        }}
                        value={values.zoomLink}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}
                  {!values.isEvent && !values.isWebinar && (
                    <>
                      <Grid item>
                        <Controls.Input
                          label='Paste the Redirection Link'
                          name='redirectionUrl'
                          className={classes.spacer}
                          value={values.redirectionUrl}
                          onChange={handleChange}
                          error={
                            values.redirectionUrl.length > 5 &&
                            !values.redirectionUrl.includes('http')
                          }
                          helperText={
                            values.redirectionUrl.length > 5 &&
                            !values.redirectionUrl.includes('http') &&
                            'Enter Full link Ex:https://www.example.com/'
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Controls.Input
                          label='Enter Button Text Here'
                          name='buttonText'
                          error={
                            values.redirectionUrl?.length > 1 &&
                            values.buttonText?.length < 1 &&
                            Boolean(true)
                          }
                          style={{
                            width: '80%',
                            marginTop: '18px',
                            marginBottom: '14px',
                          }}
                          value={values.buttonText}
                          onChange={handleChange}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid container direction='column' style={{ width: '80%' }}>
                    {values.supportingMedia === 'image' && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        fileType='image'
                      />
                    )}
                    {values.supportingMedia === 'video' &&
                      !values.isVideoUrlEnabled && (
                        <MultipleFileUploadField
                          name='wallFiles'
                          fileType='video'
                        />
                      )}
                    {values.supportingMedia === 'audio' && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        fileType='audio'
                      />
                    )}
                  </Grid>
                  {!values.isEvent && !values.isWebinar && (
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      className={classes.spacer}
                    >
                      <Grid item>
                        <h6 style={{ fontSize: '1rem' }}>
                          Schedule Post for Later
                          <Switch
                            checked={values.isScheduled}
                            onChange={handleChange}
                            name='isScheduled'
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </h6>
                      </Grid>
                      <Grid item>
                        <h6 style={{ fontSize: '1rem' }}>
                          Disable Comments
                          <Switch
                            checked={values.canComment}
                            onChange={handleChange}
                            name='canComment'
                            color='primary'
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </h6>
                      </Grid>
                    </Grid>
                  )}
                  {values.isEvent && (
                    <Grid item>
                      <h6 style={{ fontSize: '1rem' }}>
                        Resume Required?
                        <Switch
                          checked={values.resumeNeeded}
                          onChange={handleChange}
                          name='resumeNeeded'
                          color='primary'
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </h6>
                    </Grid>
                  )}
                  {values.isEvent && (
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      className={classes.spacer}
                    >
                      <Grid item>
                        <h6 style={{ fontSize: '1rem' }}>Event Start Date </h6>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.eventDate}
                            style={{ width: '100%', margin: '10px 0px' }}
                            disablePast
                            name='eventDate'
                            inputVariant='outlined'
                            onChange={val => {
                              setFieldValue('eventDate', val);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item>
                        <h6 style={{ fontSize: '1rem' }}>Event End Date </h6>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.eventEndDate}
                            style={{ width: '100%', margin: '10px 0px' }}
                            disablePast
                            name='eventEndDate'
                            inputVariant='outlined'
                            onChange={val => {
                              setFieldValue('eventEndDate', val);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  )}
                  {values.isWebinar && (
                    <Grid
                      container
                      direction='row'
                      justify='space-between'
                      className={classes.spacer}
                    >
                      <Grid item>
                        <h6 style={{ fontSize: '1rem' }}>
                          Webinar Start Date{' '}
                        </h6>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.eventDate}
                            style={{ width: '400px', margin: '10px 0px' }}
                            disablePast
                            name='eventDate'
                            inputVariant='outlined'
                            onChange={val => {
                              setFieldValue('eventDate', val);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item>
                        <h6 style={{ fontSize: '1rem' }}>Webinar End Date </h6>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.eventEndDate}
                            style={{ width: '400px', margin: '10px 0px' }}
                            disablePast
                            name='eventEndDate'
                            inputVariant='outlined'
                            onChange={val => {
                              setFieldValue('eventEndDate', val);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item>
                    {values.isScheduled && (
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
                          style={{ width: '80%', margin: '10px 0px' }}
                          disablePast
                          name='selectedDate'
                          inputVariant='outlined'
                          onChange={val => {
                            setFieldValue('selectedDate', val);
                          }}
                          label='Schedule Data & Time'
                        />
                      </MuiPickersUtilsProvider>
                    )}
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
                      Discard Post
                    </Button>
                    <Controls.Button
                      text='Post'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px' }}
                      type='submit'
                    />
                    {!values.isWebinar && !values.isEvent && (
                      <Button
                        color='primary'
                        onClick={() => {
                          if (validate(values)) createPost(values, 'Draft');
                        }}
                      >
                        Save as Draft
                      </Button>
                    )}
                  </ButtonsContainer>
                </Form>
                {values.isWebinar ? null : <Preview state={values} />}
              </div>
              {values.isEvent && (
                <PreprationContainer
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
            </>
          )}
        </Formik>
      </CreatePostContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CreatePost;
