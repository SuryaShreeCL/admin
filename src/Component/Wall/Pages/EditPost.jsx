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
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExistingMedia } from '../Components/Upload/ExistingMedia';
import { createWallPost, getWallCategories, updateWallPost } from '../../../Actions/WallActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { wallPath } from '../../RoutePaths';
import Notification from '../../Utils/Notification';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';

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

const EditPost = () => {
  const classes = useStyles();
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { recordForEdit } = location;
  const [records, setRecords] = useState(recordForEdit);

  const [state, setState] = useState({
    wallCategories: [],
    caption: '',
    supportingMedia: 'image',
    wallFiles: [],
    canComment: false,
    totalViews: 0,
    isEvent: false,
    wallFilesUpdate: [],
    totalLikes: 0,
    redirectionUrl: '',
    buttonText: '',
    selectedDate: new Date(),
    isScheduled: false,
    isVideoUrlEnabled: false,
    videoUrl: '',
    activeStatus: 'Live',
  });

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);

  useEffect(() => {
    dispatch(getWallCategories('Live'));
    //SETTING PRE POPULATED RECORD
    if (records != null)
      setRecords({
        ...recordForEdit,
      });
  }, [recordForEdit, dispatch]);

  const onEditDraft = (post, activeStatus) => {
    if (!post.id) dispatch(createWallPost(post));
    else dispatch(updateWallPost({ ...post, activeStatus }));
    setNotify({
      isOpen: true,
      message: 'Post Drafted Successfully',
      type: 'success',
    });
    setTimeout(() => {
      history.push(wallPath);
    }, 1200);
  };

  const updatePost = (post) => {
    dispatch(updateWallPost(post));
    setNotify({
      isOpen: true,
      message: 'Post Updated Successfully',
      type: 'success',
    });
    setTimeout(() => {
      history.push(wallPath);
    }, 1200);
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

  return (
    <>
      <BackHandler title='Edit Post' />
      <CreatePostContainer>
        <Formik
          initialValues={records || state}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            updatePost({ ...values, wallFiles: [...(values.wallFilesUpdate ?? [])] });
            resetForm();
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Post Type</h6>
                  <Grid component='label' container alignItems='center' spacing={1}>
                    <Grid item>Wall Post</Grid>
                    <Grid item>
                      <Switch
                        checked={values.isEvent}
                        name={values.isEvent}
                        disabled
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Grid>
                    <Grid item>Event</Grid>
                  </Grid>
                  <RadioGroup
                    style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
                    aria-label='type'
                    name='supportingMedia'
                    value={values.supportingMedia}
                    onChange={handleChange}
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
                          error={
                            touched.wallCategories && Boolean(values.wallCategories.length === 0)
                          }
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
                      <MultipleFileUploadField name='wallFilesUpdate' fileType='image' />
                    )}
                    {values.supportingMedia === 'video' && !values.isVideoUrlEnabled && (
                      <MultipleFileUploadField name='wallFilesUpdate' fileType='video' />
                    )}
                    {values.supportingMedia === 'audio' && (
                      <MultipleFileUploadField name='wallFilesUpdate' fileType='audio' />
                    )}
                    <Grid item>
                      {values.wallFiles?.map((media) => (
                        <ExistingMedia media={media} wallFiles={values.wallFiles} />
                      ))}
                    </Grid>
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
                            history.push(wallPath);
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
                    <Button color='primary' onClick={() => onEditDraft(values, 'Draft')}>
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

export default EditPost;
