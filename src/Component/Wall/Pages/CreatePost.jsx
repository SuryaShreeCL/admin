import React, { useState } from 'react';
import { ButtonsContainer, CreatePostContainer } from '../Assets/Styles/CreatePostStyles';
import { createMuiTheme } from '@material-ui/core/styles';
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
import { Grid } from '@material-ui/core';

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 30,
        marginBottom: 30,
        maxWidth: '80%',
        border: '1px solid lightgrey',
        height: '250px',
        padding: '5px',
        borderRadius: '4px',
      },
    },
  },
});

const CreatePost = () => {
  const [state, setState] = useState({
    category: '',
    caption: '',
    postType: 'Image',
    posters: [],
    video: '',
    audio: '',
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
          onSubmit={(values, { resetForm }) => {
            // addOrEdit(values, resetForm);
            resetForm();
          }}
          enableReinitialize
        >
          {({ handleChange, handleSubmit, resetForm, setFieldValue, values }) => (
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
                    value='Video'
                    control={<Radio color='primary' />}
                    label='Video'
                  />
                  <FormControlLabel
                    value='Image'
                    control={<Radio color='primary' />}
                    label='Image'
                  />
                  <FormControlLabel value='Text' control={<Radio color='primary' />} label='Text' />
                  <FormControlLabel
                    value='Audio'
                    control={<Radio color='primary' />}
                    label='Audio'
                  />
                </RadioGroup>
                {/* <h5>Select Category</h5> */}
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
                {/* <h5>Caption</h5> */}
                <Grid item>
                  <TextareaAutosize
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
                  />
                </Grid>
                <Grid container direction='column'>
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
                <pre>{JSON.stringify({ state }, null, 4)}</pre>

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
                  />
                </ButtonsContainer>
              </Form>
            </div>
          )}
        </Formik>

        <Preview state={state} />
      </CreatePostContainer>
    </>
  );
};

export default CreatePost;
