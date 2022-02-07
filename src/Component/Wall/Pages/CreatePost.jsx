import React, { useState, useEffect } from 'react';
import { ButtonsContainer, CreatePostContainer } from '../Assets/Styles/CreatePostStyles';
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
import { Button, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  createWallPost,
  getWallCategories,
  uploadImage,
  getPlatforms,
} from '../../../Actions/WallActions';
import Notification from '../../Utils/Notification';
import { useHistory, useLocation } from 'react-router-dom';
import { testCreate, wallPath } from '../../RoutePaths';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import PreprationContainer from '../Components/PreparationContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import NextStepsContainer from '../Components/NextStepsContainer';
const AVOID_INPUT = ['E', 'e', '+', '-'];

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
  hostImage: {
    borderRadius: '50%',
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
    wallSteps: [{ status: 'inprogress', heading: '', subText: '', message: '', url: '' }],
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
    hostImageUrl: '',
    banner: '',
    platforms: [],
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
    dispatch(getPlatforms());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { platforms } = useSelector((state) => state.platformsReducer);

  const validate = (values) => {
    /* Validating if the media is uploaded or not */
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
    /* Validating if google form link is added*/
    if (values.isEvent && values.wallSteps.length > 0) {
      if (
        values.wallSteps[0].url.length === 0 ||
        values.wallSteps[0].heading.length === 0 ||
        values.wallSteps[0].subText.length === 0
      ) {
        setNotify({
          isOpen: true,
          message: 'Please add step 1 details with google form link',
          type: 'error',
        });
        return false;
      }
    }
    /* Validating the timings */
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
    /* Validating if the media url is added or not */
    if (values.isVideoUrlEnabled && values.videoUrl?.length < 1) {
      setErrorSchema((s) => ({ ...s, isVideoLink: true }));
      return false;
    }

    return true;
  };

  const handlePostType = () => {
    setState((s) => ({ ...s, isEvent: !state.isEvent }));
  };

  const webinarvalidationSchema = yup.object({
    caption: yup.string().required('caption is required'),
    eventTitle: yup.string().required('title is required'),
    zoomLink: yup.string().required('zoom id is required'),
  });

  const eventvalidationSchema = yup.object({
    caption: yup.string().required('caption is required'),
    eventTitle: yup.string().required('title is required'),
    jobRole: yup.string().required('job role is required'),
  });

  const postvalidationSchema = yup.object({
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
        pathname: state.isEvent ? testCreate : wallPath,
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

  const handleImageUpload = ({ e, type, setFieldValue }) => {
    const fileSize = e.target.files[0].size / 1024 / 1024;
    const fileType = e.target.files[0].type;

    // File size less than 1 MiB && Image file check
    if (fileSize < 1 && fileType.includes('image')) {
      let formData = new FormData();
      formData.append('file', e.target.files[0]);
      dispatch(
        uploadImage(formData, (response) => {
          if (type === 'BANNER') setFieldValue('banner', response.data.imageUrl);
          else setFieldValue('hostImageUrl', response.data.imageUrl);
        })
      );
    } else {
      setNotify({
        isOpen: true,
        message: 'Please upload an image file within 1MB size',
        type: 'error',
      });
    }
  };

  const handleDeleteClick = (setFieldValue) => {
    setFieldValue('banner', '');
  };

  const handleHostDeleteClick = (setFieldValue) => {
    setFieldValue('hostImageUrl', '');
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
          validationSchema={
            state.isWebinar
              ? webinarvalidationSchema
              : state.isEvent
              ? eventvalidationSchema
              : postvalidationSchema
          }
          onSubmit={(values, { resetForm }) => {
            if (validate(values)) {
              createPost(values, location?.postType === 'Webinar' ? 'Scheduled' : 'Live');
              resetForm();
            }
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue, submitForm }) => {
            return (
              <>
                <div className='CreatePost'>
                  <Form onSubmit={handleSubmit} autoComplete='off'>
                    <h6>Post Type</h6>
                    <Grid component='label' container alignItems='center' spacing={3}>
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
                    <FormControl className={classes.root} style={{ width: '80%' }}>
                      <Autocomplete
                        multiple
                        id='wallCategories'
                        name='wallCategories'
                        getOptionLabel={(option) => option?.name}
                        options={categories ?? []}
                        onChange={(e, value) => {
                          setFieldValue('wallCategories', value !== null ? value : categories);
                        }}
                        fullWidth
                        value={values.wallCategories}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Select Category'
                            name='wallCategories'
                            variant='outlined'
                            error={
                              touched.wallCategories && Boolean(values.wallCategories.length === 0)
                            }
                          />
                        )}
                        style={{
                          marginTop: '10px',
                          marginBottom: '10px',
                        }}
                      />
                    </FormControl>
                    {/* Platforms Dropdown */}
                    <FormControl className={classes.root} style={{ width: '80%' }}>
                      <Autocomplete
                        multiple
                        id='platforms'
                        name='platforms'
                        getOptionLabel={(option) => option?.name}
                        options={platforms ?? []}
                        onChange={(e, value) => {
                          setFieldValue('platforms', value !== null ? value : categories);
                        }}
                        fullWidth
                        value={values.platforms}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Select Platforms'
                            name='platforms'
                            variant='outlined'
                            error={touched.platforms && Boolean(values.platforms.length === 0)}
                          />
                        )}
                        style={{
                          marginTop: '10px',
                          marginBottom: '10px',
                        }}
                      />
                    </FormControl>

                    {values.isEvent && (
                      <Grid item>
                        <Controls.Input
                          label='Enter Event Title'
                          name='eventTitle'
                          style={{ width: '80%', marginTop: '18px' }}
                          value={values.eventTitle}
                          error={touched.eventTitle && Boolean(errors.eventTitle)}
                          onChange={handleChange}
                        />
                        <Controls.Input
                          label='Enter Job Role'
                          name='jobRole'
                          style={{
                            width: '80%',
                            marginTop: '18px',
                          }}
                          error={touched.jobRole && Boolean(errors.jobRole)}
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
                          style={{ width: '80%' }}
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
                          fullWidth
                        />
                      </Grid>
                    )}

                    {(!values.isEvent || values.isWebinar) && (
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
                    {values.isWebinar && (
                      <Grid item>
                        {!values.banner ? (
                          <Controls.Input
                            label='Banner image (Banner image should be in 16:9 ratio or 1920 x 1080 resolution)'
                            name='bannerImage'
                            style={{
                              width: '80%',
                              marginTop: '10px',
                              marginBottom: '10px',
                            }}
                            inputProps={{
                              accept: 'image/png, image/jpeg',
                              style: { opacity: '0' },
                            }}
                            value={values.banner}
                            type='file'
                            onInput={(e) =>
                              handleImageUpload({
                                e,
                                type: 'BANNER',
                                setFieldValue,
                              })
                            }
                            onClick={(e) => (e.target.value = null)}
                          />
                        ) : (
                          <Grid container direction='column'>
                            <Typography>Banner image</Typography>

                            <img src={values.banner} height={225} width={400} />
                            <Controls.ActionButton onClick={() => handleDeleteClick(setFieldValue)}>
                              <DeleteIcon fontSize='small' color='secondary' />
                            </Controls.ActionButton>
                          </Grid>
                        )}
                      </Grid>
                    )}

                    {values.isWebinar && (
                      <Grid item>
                        {!values.hostImageUrl ? (
                          <Controls.Input
                            label='Host image'
                            name='hostName'
                            style={{
                              width: '80%',
                              marginTop: '10px',
                              marginBottom: '10px',
                            }}
                            inputProps={{
                              accept: 'image/png, image/jpeg',
                              style: { opacity: '0' },
                            }}
                            value={values.hostImage}
                            type='file'
                            onInput={(e) => handleImageUpload({ e, setFieldValue })}
                            onClick={(e) => (e.target.value = null)}
                          />
                        ) : (
                          <Grid container direction='column'>
                            <Typography>Host image</Typography>
                            <img
                              src={values.hostImageUrl}
                              height={150}
                              width={150}
                              className={classes.hostImage}
                            />
                            <Controls.ActionButton
                              onClick={() => handleHostDeleteClick(setFieldValue)}
                            >
                              <DeleteIcon fontSize='small' color='secondary' />
                            </Controls.ActionButton>
                          </Grid>
                        )}
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

                    {values.supportingMedia === 'video' && values.isVideoUrlEnabled && (
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
                          onKeyDown={(evt) => AVOID_INPUT.includes(evt.key) && evt.preventDefault()}
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
                        <MultipleFileUploadField name='wallFiles' fileType='image' />
                      )}
                      {values.supportingMedia === 'video' && !values.isVideoUrlEnabled && (
                        <MultipleFileUploadField name='wallFiles' fileType='video' />
                      )}
                      {values.supportingMedia === 'audio' && (
                        <MultipleFileUploadField name='wallFiles' fileType='audio' />
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
                              inputProps={{
                                'aria-label': 'primary checkbox',
                              }}
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
                              inputProps={{
                                'aria-label': 'primary checkbox',
                              }}
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
                              onChange={(val) => {
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
                              onChange={(val) => {
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
                          <h6 style={{ fontSize: '1rem' }}>Webinar Start Date </h6>
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
                              onChange={(val) => {
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
                              onChange={(val) => {
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
                            onChange={(val) => {
                              setFieldValue('selectedDate', val);
                            }}
                            label='Schedule Data & Time'
                          />
                        </MuiPickersUtilsProvider>
                      )}
                    </Grid>
                    {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                  </Form>
                  {values.isWebinar ? null : <Preview state={values} />}
                </div>
                {values.isEvent && (
                  <>
                    <NextStepsContainer values={values} setFieldValue={setFieldValue} />
                    <PreprationContainer values={values} setFieldValue={setFieldValue} />
                  </>
                )}
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
                    {`Discard ${location?.postType ?? 'Post'}`}
                  </Button>
                  <Controls.Button
                    text={`Submit ${location?.postType ?? 'Post'}`}
                    variant='contained'
                    color='primary'
                    style={{ borderRadius: '26px' }}
                    type='submit'
                    onClick={submitForm}
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
              </>
            );
          }}
        </Formik>
      </CreatePostContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};

export default CreatePost;
