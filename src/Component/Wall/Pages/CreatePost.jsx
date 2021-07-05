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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import { Formik, Form } from 'formik';
import Controls from '../../Utils/controls/Controls';
import { Button } from '@material-ui/core';
import { array, object, string } from 'yup';
import { Grid } from '@material-ui/core';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';

const CreatePost = () => {
  const [state, setState] = useState({
    category: '',
    caption: '',
    postType: 'images',
    images: [],
    video: [],
    videoLink: null,
    audio: [],
    comments: false,
    selectedDate: new Date(),
    isScheduled: false,
  });

  const Categories = [
    { id: '1', title: 'Science' },
    { id: '2', title: 'Arts' },
    { id: '3', title: 'Commerce' },
    { id: '4', title: 'Machine Learning' },
  ];

  const handlePostTypeChange = (event) => {
    setState((s) => ({ ...s, postType: event.target.value }));
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
          {({ handleSubmit, resetForm, errors, isValid, isSubmitting, values }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit}>
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
                  <Controls.Select
                    label='Select Category'
                    name='category'
                    size='80%'
                    value={values.category}
                    onChange={(event) => {
                      setState((s) => ({ ...s, category: event.target.value }));
                    }}
                    options={Categories}
                  />
                  <Grid item>
                    {/* <TextareaAutosize
                    style={{
                      width: '80%',
                      marginTop: 20,
                      marginBottom: 10,
                      border: '1px solid lightgrey',
                      borderRadius: '4px',
                    }}
                    rowsMin={6}
                    value={values.caption}
                    onChange={(event) => {
                      setState((s) => ({ ...s, caption: event.target.value }));
                    }}
                    placeholder='Type caption here..'
                    name='caption'
                  /> */}
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
                        marginBottom: 20,
                      }}
                      rows={6}
                    />
                  </Grid>
                  <Grid container direction='column' style={{ width: '80%' }}>
                    {values.postType === 'images' && (
                      <MultipleFileUploadField name='images' type='image/*' />
                    )}
                    {values.postType === 'video' && (
                      <MultipleFileUploadField name='video' type='video/*' />
                    )}
                    {values.postType === 'audio' && (
                      <MultipleFileUploadField name='audio' type='audio/*' />
                    )}
                  </Grid>
                  <Grid container direction='column' style={{ marginTop: '10px' }}>
                    <Grid item>
                      <span style={{ fontSize: '1rem' }}>
                        Schedule Post for Later
                        <Switch
                          checked={state.isScheduled}
                          onChange={handleScheduled}
                          color='primary'
                          value={values.isScheduled}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </span>
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
                    <Grid item>
                      <span style={{ fontSize: '1rem' }}>
                        Disable Comments
                        <Switch
                          checked={state.comments}
                          onChange={handleComments}
                          name={values.comments}
                          color='primary'
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </span>
                    </Grid>
                  </Grid>

                  <pre>{JSON.stringify({ values }, null, 4)}</pre>

                  <ButtonsContainer>
                    <Controls.Button
                      text='Preview'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px' }}
                    />
                    <Button color='primary'>Discard Post</Button>
                    <Button color='primary'>Save as Draft</Button>
                    <Controls.Button
                      text='Post'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px' }}
                      disabled={!isValid || isSubmitting}
                      type='submit'
                    />
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
