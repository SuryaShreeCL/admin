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
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const [state, setState] = useState({
    wallCategories: [],
    caption: '',
    supportingMedia: 'image',
    wallFiles: [],
    canComment: false,
    totalViews: 0,
    totalLikes: 0,
    redirectionUrl: '',
    buttonText: '',
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
    if (values.isVideoUrlEnabled && values.wallFiles.url.length < 1) {
      setErrorSchema((s) => ({ ...s, isVideoLink: true }));
      return false;
    }

    return true;
  };

  const handleScheduled = () => {
    setState((s) => ({ ...s, isScheduled: !state.isScheduled }));
  };

  const handleDateChange = () => {
    setState((s) => ({ ...s, selectedDate: state.selectedDate }));
  };

  const handleComment = () => {
    setState((s) => ({ ...s, cancComment: !state.canComment }));
  };

  const validationSchema = yup.object({
    caption: yup.string().required('caption is required'),
  });

  const createPost = (post, activeStatus) => {
    if (!post.id) dispatch(createWallPost({ ...post, activeStatus }));
    setNotify({
      isOpen: true,
      message: 'Post Created Successfully',
      type: 'success',
    });
    setTimeout(() => {
      history.push(wallPath);
    }, 1200);
  };

  const onDiscard = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setTimeout(() => {
      history.push(wallPath);
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Post Discarded',
      type: 'warning',
    });
  };

  return (
    <>
      <BackHandler title='Create New Post' />
      <CreatePostContainer>
        <Formik
          initialValues={state || []}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // if (validate(values)) {
            createPost(values, 'Live');
            resetForm();
            // }
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Post Type</h6>
                  <RadioGroup
                    style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
                    aria-label='type'
                    name='supportingMedia'
                    value={values.supportingMedia}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel
                      value='video'
                      control={<Radio color='primary' />}
                      label='Video'
                    />
                    <FormControlLabel
                      value='image'
                      control={<Radio color='primary' />}
                      label='Image'
                    />
                    <FormControlLabel
                      value='text'
                      control={<Radio color='primary' />}
                      label='Text'
                    />
                    <FormControlLabel
                      value='audio'
                      control={<Radio color='primary' />}
                      label='Audio'
                    />
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
                      value={values.wallCategories}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Select Category'
                          name='wallCategories'
                          variant='outlined'
                        />
                      )}
                    />
                  </FormControl>
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
                        className={classes.spacer}
                        value={values.videoUrl}
                        error={errorSchema.isVideoLink}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <Controls.Input
                      label='Paste the Redirection Link'
                      name='redirectionUrl'
                      className={classes.spacer}
                      value={values.redirectionUrl}
                      onChange={handleChange}
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
                      style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }}
                      value={values.buttonText}
                      onChange={handleChange}
                    />
                  </Grid>
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
                          checked={state.isScheduled}
                          onChange={handleScheduled}
                          color='primary'
                          value={values.isScheduled}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </h6>
                    </Grid>
                    <Grid item>
                      <h6 style={{ fontSize: '1rem' }}>
                        Disable Comments
                        <Switch
                          checked={state.canComments}
                          onChange={handleComment}
                          name={values.canComment}
                          color='primary'
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </h6>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {state.isScheduled && (
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
                          onChange={handleDateChange}
                          label='Schedule Data & Time'
                          showTodayButton
                        />
                      </MuiPickersUtilsProvider>
                    )}
                  </Grid>
                  <pre>{JSON.stringify({ values }, null, 4)}</pre>
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
                    <Button color='primary' onClick={() => createPost(values, 'Draft')}>
                      Save as Draft
                    </Button>
                  </ButtonsContainer>
                </Form>
              </div>
              <Preview state={values} />
            </>
          )}
        </Formik>
      </CreatePostContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};

export default CreatePost;
