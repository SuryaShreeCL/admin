import React, { useState } from 'react';
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
import { Button, Checkbox, ListItemText } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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

const CreatePost = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    wallCategories: [],
    caption: '',
    supportingMedia: 'images',
    wallFiles: [],
    canComment: false,
    totalViews: 0,
    totalLikes: 0,
    redirectionUrl: '',
    buttonText: '',
    selectedDate: new Date(),
    isScheduled: false,
    videoURLEnabled: false,
    activeStatus: 'Live',
  });

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  const ITEM_HEIGHT = 60;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const Categories = ['All', '3rd Year', '4th Year', 'Placements', 'Higher Studies'];

  const validate = (values) => {
    if (values.videoURLEnabled && values.wallFiles.url.length < 1) {
      setErrorSchema((s) => ({ ...s, isVideoLink: true }));
      return false;
    }

    return true;
  };

  const handleCategory = (event) => {
    setState((s) => ({ ...s, wallCategories: event.target.value }));
  };

  const handlePostTypeChange = (event) => {
    setState((s) => ({ ...s, supportingMedia: event.target.value }));
  };

  const handleVideoURL = () => {
    setState((s) => ({ ...s, videoURLEnabled: !state.videoURLEnabled }));
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
          initialValues={state}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // addOrEdit(values, resetForm);
            // if (validate(values)) {
            resetForm();
            console.log('schema', values);
            return new Promise((res) => setTimeout(res, 2000));
            // }
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Post Type</h6>
                  <RadioGroup
                    style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
                    aria-label='type'
                    name='supportingMedia'
                    value={values.supportingMedia}
                    onChange={handlePostTypeChange}
                    required
                  >
                    <FormControlLabel
                      value='video'
                      control={<Radio color='primary' />}
                      label='Video'
                    />
                    <FormControlLabel
                      value='images'
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
                    <InputLabel style={{ left: '10px', top: '10px' }} id='mutiple-name-label'>
                      Select Category
                    </InputLabel>
                    <Select
                      labelId='mutiple-name-label'
                      id='mutiple-name'
                      multiple
                      name='wallCategories'
                      value={values.wallCategories}
                      onChange={handleCategory}
                      required
                      input={<Input />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {Categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          <Checkbox checked={values.wallCategories.indexOf(category) > -1} />
                          <ListItemText primary={category} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Grid item>
                    <Controls.Input
                      label='Type caption here..'
                      value={values.caption}
                      onChange={(event) => {
                        setState((s) => ({ ...s, caption: event.target.value }));
                      }}
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
                          checked={state.videoURLEnabled}
                          onChange={handleVideoURL}
                          color='primary'
                          value={values.videoURLEnabled}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </span>
                    </Grid>
                  )}
                  {state.videoURLEnabled && values.supportingMedia === 'video' && (
                    <Grid item>
                      <Controls.Input
                        label='Paste Video URL'
                        name='wallFiles.url'
                        className={classes.spacer}
                        value={values.wallFiles.url}
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
                        values.redirectionUrl.length > 1 &&
                        values.buttonText.length < 1 &&
                        Boolean(true)
                      }
                      style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }}
                      value={values.buttonText}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid container direction='column' style={{ width: '80%' }}>
                    {values.supportingMedia === 'images' && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        type='image/*'
                        folderName='app-images'
                      />
                    )}
                    {values.supportingMedia === 'video' && !state.videoURLEnabled && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        type='video/*'
                        folderName='app-videos'
                      />
                    )}
                    {values.supportingMedia === 'audio' && (
                      <MultipleFileUploadField
                        name='wallFiles'
                        type='audio/*'
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
