import React, { useState } from 'react';
import { ButtonsContainer, CreatePostContainer } from '../Assets/Styles/CreatePostStyles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import BackHandler from '../Components/BackHandler';
import Preview from '../Components/Preview';
import MUIRichTextEditor from 'mui-rte';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import Controls from '../../Utils/controls/Controls';
import { Button } from '@material-ui/core';

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
    postType: '',
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

  const onRTEChange = (event) => {
    const plainText = event.getCurrentContent().getPlainText(); // for plain text
    setState((s) => ({ ...s, caption: plainText }));
  };

  return (
    <>
      <BackHandler title='Create New Post' />
      <CreatePostContainer>
        <div className='CreatePost'>
          <h6>Post Type</h6>
          <RadioGroup
            style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}
            aria-label='type'
            name='postType'
            value={state.postType}
            onChange={handlePostTypeChange}
          >
            <FormControlLabel value='Video' control={<Radio color='primary' />} label='Video' />
            <FormControlLabel value='Image' control={<Radio color='primary' />} label='Image' />
          </RadioGroup>

          {/* <h5>Select Category</h5> */}
          <Controls.Select
            label='Select Category'
            name='state.category'
            size='80%'
            value={state.category}
            onChange={(category) => setState((s) => ({ ...s, category: category.id }))}
            options={Categories}
          />
          {/* <h5>Caption</h5> */}
          <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              controls={['bold', 'italic', 'underline', 'numberList', 'bulletList', 'undo', 'redo']}
              label='Type caption here...'
              onChange={onRTEChange}
            />
          </MuiThemeProvider>
          <span style={{ fontSize: '1rem' }}>
            Schedule Post for Later
            <Switch
              checked={state.isScheduled}
              onChange={handleScheduled}
              color='primary'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </span>
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
                value={state.selectedDate}
                style={{ maxWidth: '80%', margin: '10px 0px' }}
                disablePast
                inputVariant='outlined'
                onChange={handleDateChange}
                label='Schedule Data & Time'
                showTodayButton
              />
            </MuiPickersUtilsProvider>
          )}
          <span style={{ fontSize: '1rem' }}>
            Disable Comments
            <Switch
              checked={state.comments}
              onChange={handleComments}
              color='primary'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </span>

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
        </div>
        <Preview state={state} />
      </CreatePostContainer>
    </>
  );
};

export default CreatePost;
