import React, { useState } from 'react';
import { CreatePostContainer } from '../Assets/Styles/WallStyles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import BackHandler from '../Components/BackHandler';
import Preview from '../Components/Preview';
import Select from 'react-select';
import MUIRichTextEditor from 'mui-rte';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';

// pick a date util library
import MomentUtils from '@date-io/moment';

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%',
        maxWidth: '70%',
        border: '1px solid lightgrey',
        height: '250px',
        padding: '5px',
        borderRadius: '4px',
      },
    },
  },
});

const Categories = [
  { value: '', label: 'Select Category' },
  { value: 'Science', label: 'Science' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Commerce', label: 'Commerce' },
  { value: 'Mechanical', label: 'Mechanical' },
];

const CreatePost = () => {
  const [state, setState] = useState({
    category: '',
    caption: '',
    postType: '',
    comments: false,
    selectedDate: new Date(),
    isScheduled: false,
  });

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
          <Select
            options={Categories}
            className='select-category'
            isSearchable={false}
            defaultValue={Categories[0]}
            onChange={(category) => setState((s) => ({ ...s, category: category.value }))}
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
            Schedule Post Later
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
                style={{ maxWidth: '70%', margin: '10px 0px' }}
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
        </div>
        <Preview />
      </CreatePostContainer>
    </>
  );
};

export default CreatePost;
