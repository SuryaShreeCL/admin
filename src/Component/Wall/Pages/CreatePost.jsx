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
import { getWallCategories } from '../../../Actions/WallActions';

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
    videoURLEnabled: false,
    videoLink: '',
    activeStatus: 'Live',
  });

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  useEffect(() => {
    dispatch(getWallCategories('Live'));
  }, [dispatch]);

  const { loading, error, categories } = useSelector((state) => state.getWallCategoriesReducer);

  const validate = (values) => {
    if (values.videoURLEnabled && values.wallFiles.url.length < 1) {
      setErrorSchema((s) => ({ ...s, isVideoLink: true }));
      return false;
    }

    return true;
  };

  const handleCategory = (e, values) => {
    setState((s) => ({ ...s, wallCategories: values }));
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
      <BackHandler title='Create New Post' />
      <CreatePostContainer>
        <Formik
          initialValues={state || []}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // addOrEdit(values, resetForm);
            if (validate(values)) {
              resetForm();
              console.log('schema', values);
              return new Promise((res) => setTimeout(res, 2000));
            }
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
                      value='Text'
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
                    {/* <Autocomplete
                      multiple
                      options={categories || []}
                      getOptionLabel={(option) => option?.name}
                      onChange={handleCategory}
                      required
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant='outlined'
                          label='Select Category'
                          name='wallCategories'
                        />
                      )}
                    /> */}
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
                          checked={values.videoURLEnabled}
                          name='videoURLEnabled'
                          onChange={handleChange}
                          color='primary'
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </span>
                    </Grid>
                  )}
                  {values.supportingMedia === 'video' && values.videoURLEnabled && (
                    <Grid item>
                      <Controls.Input
                        label='Paste Video URL'
                        name='videoLink'
                        className={classes.spacer}
                        value={values.videoLink}
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
                      <MultipleFileUploadField
                        name='wallFiles'
                        type='image'
                        folderName='app-images'
                      />
                    )}
                    {values.supportingMedia === 'video' && !values.videoURLEnabled && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        type='video'
                        folderName='app-videos'
                      />
                    )}
                    {values.supportingMedia === 'audio' && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        type='audio'
                        folderName='app-audio'
                      />
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
                    <Button color='primary'>Discard Post</Button>
                    <Controls.Button
                      text='Post'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px' }}
                      type='submit'
                    />
                    <Button color='primary'>Save as Draft</Button>
                  </ButtonsContainer>
                </Form>
              </div>
              <Preview state={values} />
            </>
          )}
        </Formik>
      </CreatePostContainer>
    </>
  );
};

export default CreatePost;
