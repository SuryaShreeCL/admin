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
import { Button, Checkbox, ListItemText } from '@material-ui/core';
import { array, object, string } from 'yup';
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';

const CreatePost = () => {
  const [state, setState] = useState({
    category: [],
    caption: '',
    postType: 'images',
    images: [],
    video: [],
    videoLink: null,
    redirection: { link: '', buttonText: '' },
    videoURLEnabled: false,
    audio: [],
    comments: false,
    selectedDate: new Date(),
    isScheduled: false,
  });

  const ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const Categories = ['All', '3rd Year', '4th Year', 'Profile Builder'];

  const handleCategory = (event) => {
    setState((s) => ({ ...s, category: event.target.value }));
  };

  const handlePostTypeChange = (event) => {
    setState((s) => ({ ...s, postType: event.target.value }));
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

  const handleComments = () => {
    setState((s) => ({ ...s, comments: !state.comments }));
  };

  return (
    <>
      <BackHandler title='Create New Post' />
      <CreatePostContainer>
        <Formik
          initialValues={state}
          validationSchema={object({
            state: array(
              object({
                url: string().required(),
              })
            ),
          })}
          onSubmit={(values, { resetForm }) => {
            // addOrEdit(values, resetForm);
            resetForm();
            console.log('values', values);
            return new Promise((res) => setTimeout(res, 2000));
          }}
          enableReinitialize
        >
          {({ handleSubmit, resetForm, errors, handleChange, isValid, isSubmitting, values }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} noValidate autoComplete='off'>
                  <h6>Post Type</h6>
                  <RadioGroup
                    style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
                    aria-label='type'
                    name='postType'
                    value={values.postType}
                    onChange={handlePostTypeChange}
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
                  <FormControl style={{ width: '80%' }}>
                    <InputLabel id='mutiple-name-label'>Select Category</InputLabel>
                    <Select
                      labelId='mutiple-name-label'
                      id='mutiple-name'
                      multiple
                      name='category'
                      value={state.category}
                      onChange={handleCategory}
                      input={<Input />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {Categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          <Checkbox checked={state.category.indexOf(category) > -1} />
                          <ListItemText primary={category} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Grid item>
                    <Controls.Input
                      label='Type caption here..'
                      name='caption'
                      value={values.caption}
                      onChange={(event) => {
                        setState((s) => ({ ...s, caption: event.target.value }));
                      }}
                      value={values.caption}
                      multiline
                      style={{
                        width: '80%',
                        marginTop: 20,
                        marginBottom: 15,
                      }}
                      rows={6}
                      required
                    />
                  </Grid>
                  {values.postType === 'video' && (
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
                  {state.videoURLEnabled && values.postType === 'video' && (
                    <Grid item>
                      <Controls.Input
                        label='Paste Video URL'
                        name='videoLink'
                        style={{ width: '80%', marginTop: '10px' }}
                        value={values.videoLink}
                        onChange={(event) => {
                          setState((s) => ({ ...s, videoLink: event.target.value }));
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <Controls.Input
                      label='Paste the Redirection Link'
                      name='redirection.link'
                      style={{ width: '80%', marginTop: '10px' }}
                      value={values.redirection.link}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Enter Button Text Here'
                      name='redirection.buttonText'
                      style={{ width: '80%', marginTop: '10px', marginBottom: '10px' }}
                      value={values.redirection.buttonText}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid container direction='column' style={{ width: '80%' }}>
                    {values.postType === 'images' && (
                      <MultipleFileUploadField
                        name='images'
                        type='image/*'
                        folderName='app-images'
                      />
                    )}
                    {values.postType === 'video' && !state.videoURLEnabled && (
                      <MultipleFileUploadField
                        name='video'
                        type='video/*'
                        folderName='app-videos'
                      />
                    )}
                    {values.postType === 'audio' && (
                      <MultipleFileUploadField name='audio' type='audio/*' folderName='app-audio' />
                    )}
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    style={{ marginTop: '10px', width: '80%' }}
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
                          checked={state.comments}
                          onChange={handleComments}
                          name={values.comments}
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
                      disabled={!isValid || isSubmitting}
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
