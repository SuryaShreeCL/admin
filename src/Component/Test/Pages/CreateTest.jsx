import React, { useState, useEffect } from 'react';
import { ButtonsContainer, CreateTestContainer } from '../Assets/Styles/CreateTestStyles';
import BackHandler from '../Components/BackHandler';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import { Formik, Form, FieldArray, Field } from 'formik';
import Controls from '../../Utils/controls/Controls';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormControl from '@material-ui/core/FormControl';
import { MultipleFileUploadField } from '../Components/Upload/MultipleFileUploadField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getWallCategories, listWallPosts } from '../../../Actions/WallActions';
import { createTest } from '../../../Actions/TestActions';
import Notification from '../../Utils/Notification';
import { useHistory, useLocation } from 'react-router-dom';
import { testPath } from '../../RoutePaths';
import ConfirmDialog from '../../Utils/ConfirmDialog';
import { QuestionsUploadField } from '../Components/QuestionsUpload/QuestionsUploadField';

const useStyles = makeStyles({
  root: {
    '& .MuiSelect-root': {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      padding: '1rem',
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  captionStyle: {
    width: '100%',
  },
  inputField: {
    padding: '1rem',
    margin: '0 1rem',
    borderRadius: '5px',
    width: '50%',
    border: '1px solid gray',
  },
  spacer: {
    width: '80%',
    marginTop: '10px',
  },
  topSpacer: {
    marginTop: '1.2rem',
  },
});

const CreateTest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    type: 'EVENT',
    description: [],
    testSections: [{ duration: '', noOfQuestions: '' }],
    descriptionTitle: '',
    nameDescription: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    eventPost: { id: '' },
    score: 0,
    wallCategories: [],
    wallFiles: [],
  });

  const durations = [
    { id: '1', title: 10 },
    { id: '2', title: 20 },
    { id: '3', title: 30 },
    { id: '4', title: 40 },
  ];

  const noOfQuestionsList = [
    { id: '1', title: 10 },
    { id: '2', title: 15 },
    { id: '3', title: 20 },
    { id: '4', title: 25 },
  ];

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    dispatch(getWallCategories('Live'));
    dispatch(listWallPosts('Live', true));
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { loading, error, posts } = useSelector((state) => state.wallPostListReducer);

  const validate = (values) => {
    if (values.supportingMedia === 'image' && values.wallFiles.length === 0) {
      setNotify({
        isOpen: true,
        message: 'Please upload image(s)',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  const validationSchema = yup.object({
    caption: yup.string().required('caption is required'),
  });

  const submitTestCreation = (test, status) => {
    if (!test.id) dispatch(createTest({ ...test, status }));
    setNotify({
      isOpen: true,
      message: 'Created Successfully',
      type: 'success',
    });
    // setTimeout(() => {
    //   history.push({
    //     pathname: wallPath,
    //     tab: state.isEvent ? 3 : 0,
    //   });
    // }, 1200);
  };

  const onDiscard = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setTimeout(() => {
      history.push({
        pathname: testPath,
        tab: 0,
      });
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Discarded',
      type: 'warning',
    });
  };

  return (
    <>
      <BackHandler title={`Create New Test`} tab={0} path={testPath} />
      <CreateTestContainer>
        <Formik
          initialValues={state}
          // validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // if (validate(values)) {
            submitTestCreation(values, 'Draft');
            // resetForm();
            // }
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue }) => (
            <>
              <div className='CreateTest'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Question Details</h6>
                  <Grid container direction='row' justify='space-between'>
                    <Grid item style={{ width: '30%' }}>
                      <Controls.Input
                        label='Test Name'
                        name='name'
                        style={{ width: '100%' }}
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item style={{ width: '30%' }}>
                      <FormControl className={classes.root} style={{ width: '100%' }}>
                        <Autocomplete
                          multiple
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
                              // error={
                              //   touched.wallCategories &&
                              //   Boolean(values.wallCategories.length === 0)
                              // }
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item style={{ width: '30%', zIndex: '77' }}>
                      <Autocomplete
                        options={posts}
                        getOptionLabel={(option) => option.eventTitle}
                        name='eventPost.id'
                        disableClearable
                        disabled={loading}
                        onChange={(e, value) => {
                          setFieldValue('eventPost.id', value !== null ? value.id : categories);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant='outlined'
                            label='Select Event'
                            margin='normal'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Description'
                      name='descriptionTitle'
                      style={{ width: '100%', marginTop: '1.2rem', marginBottom: '10px' }}
                      value={values.descriptionTitle}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    style={{ width: '100%', marginTop: '1.2rem' }}
                  >
                    {/* <Grid item style={{ width: '30%' }}>
                      <Controls.Select
                        label='Number Of Questions'
                        name='testSections.0.noOfQuestions'
                        size='100%'
                        onChange={handleChange}
                        options={noOfQuestionsList}
                      />
                    </Grid> */}
                    {/* <Grid item style={{ width: '30%' }}>
                      <Controls.Select
                        label='Duration'
                        name='testSections.0.duration'
                        size='100%'
                        onChange={handleChange}
                        options={durations}
                      />
                    </Grid> */}
                    <Grid item style={{ width: '30%' }}>
                      <Controls.Select
                        label='Score'
                        name='score'
                        size='100%'
                        onChange={handleChange}
                        options={durations}
                      />
                    </Grid>
                    <FieldArray
                      name='testSections'
                      render={(arrayHelpers) => (
                        <div className={classes.wrapper}>
                          {values.testSections.map((_, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                              <Field
                                className={classes.inputField}
                                placeholder='Duration'
                                name={`testSections.${index}.duration`}
                              />
                              <Field
                                className={classes.inputField}
                                placeholder='No Of Questions'
                                name={`testSections.${index}.noOfQuestions`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    style={{ width: '100%', margin: '1rem 0' }}
                  >
                    <Grid item style={{ width: '38%', marginTop: '1.2rem' }}>
                      <MultipleFileUploadField name='wallFiles' fileType='image' />
                    </Grid>
                    <Grid item style={{ width: '38%', marginTop: '1.2rem' }}>
                      <QuestionsUploadField
                        name='wallFiles'
                        fileType='image'
                        questionSetId='e7a46a42-c8e1-46d8-8469-f1726930c58c'
                        questionSectionId='f3c9536c-cea6-4b73-9731-f02c11cbc495'
                      />
                    </Grid>
                    <Grid item style={{ width: '58%', marginTop: '1.2rem' }}>
                      <Controls.Input
                        label='Test instructions..'
                        value={values.nameDescription}
                        name='nameDescription'
                        onChange={handleChange}
                        // error={touched.caption && Boolean(errors.caption)}
                        multiline
                        className={classes.captionStyle}
                        rows={8}
                      />
                    </Grid>
                  </Grid>
                  <h6>Schedule Details</h6>
                  <Grid
                    item
                    container
                    direction='row'
                    justify='space-between'
                    style={{ width: '50%', marginTop: '1.5rem' }}
                  >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EventIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.startDateTime}
                        disablePast
                        name='startDateTime'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('startDateTime', val);
                        }}
                        label='Start Date & Time'
                      />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <ScheduleIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={values.endDateTime}
                        disablePast
                        name='endDateTime'
                        inputVariant='outlined'
                        onChange={(val) => {
                          setFieldValue('endDateTime', val);
                        }}
                        label='End Date & Time'
                      />
                    </MuiPickersUtilsProvider>
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
                      Cancel
                    </Button>
                    <Controls.Button
                      text='Submit'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px', marginLeft: 30 }}
                      type='submit'
                    />
                  </ButtonsContainer>
                </Form>
              </div>
            </>
          )}
        </Formik>
      </CreateTestContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};

export default CreateTest;
