import React, { useState, useEffect } from 'react';
import { CreateTestContainer } from '../Assets/Styles/CreateTestStyles';
import BackHandler from '../Components/BackHandler';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Formik, Form, FieldArray, Field } from 'formik';
import Controls from '../../Utils/controls/Controls';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormControl from '@material-ui/core/FormControl';
import { MultipleFileUploadField } from '../../Wall/Components/Upload/MultipleFileUploadField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getWallCategories, listWallPosts } from '../../../Actions/WallActions';
import { createTest, scheduleIt } from '../../../Actions/TestActions';
import Notification from '../../Utils/Notification';
import { useHistory } from 'react-router-dom';
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
    width: '69%',
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  captionStyle: {
    width: '100%',
  },
  inputField: {
    width: '100%',
    margin: '0 1rem',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    padding: '1rem',
  },
  inputFieldTwo: {
    width: 250,
    margin: '1rem .5rem 1rem 0',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    padding: '1rem',
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
  const history = useHistory();

  const [state, setState] = useState({
    wallCategory: [],
    name: '',
    type: 'EVENT',
    description: [''],
    testSection: [{ duration: '', noOfQuestions: '' }],
    descriptionTitle: '',
    nameDescription: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    score: 0,
    wallFiles: [],
  });

  let questionID = window.sessionStorage.getItem('questionSetId');
  let questionUpload = {
    id: JSON.parse(window.sessionStorage.getItem('questionSetId')),
    questionSectionId: JSON.parse(window.sessionStorage.getItem('questionSectionId')),
  };

  const durations = [
    { id: '1', title: 20 },
    { id: '2', title: 30 },
    { id: '3', title: 40 },
    { id: '4', title: 50 },
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
    window.sessionStorage.removeItem('questionSetId');
    window.sessionStorage.removeItem('questionSectionId');
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { loading, error, posts } = useSelector((state) => state.wallPostListReducer);
  const [testCreated, setTestCreated] = useState(false);

  const validate = (values) => {
    if (values.wallFiles.length === 0) {
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
    nameDescription: yup.string().required('test instructions required'),
  });

  const submitTestCreation = (testData, status) => {
    dispatch(createTest({ ...testData, status }));
    setNotify({
      isOpen: true,
      message: 'Saved Successfully',
      type: 'success',
    });
    setTestCreated(true);
  };

  const draftTest = (testData, status) => {
    dispatch(createTest({ ...testData, status }));
    setNotify({
      isOpen: true,
      message: 'Drafted Successfully',
      type: 'success',
    });
    setTimeout(() => {
      history.push({
        pathname: testPath,
        tab: 1,
      });
    }, 1200);
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
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (validate(values)) {
              submitTestCreation(values, 'Scheduled');
            }
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
                          id='wallCategory'
                          name='wallCategory'
                          disabled={values?.eventPost?.id.length > 1}
                          getOptionLabel={(option) => option?.name}
                          options={categories ?? []}
                          onChange={(e, value) => {
                            setFieldValue('wallCategory', value !== null ? value : categories);
                          }}
                          value={values.wallCategory}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Select Category'
                              variant='outlined'
                              name='wallCategory'
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item style={{ width: '30%', zIndex: '77', cursor: 'no-drop' }}>
                      <Autocomplete
                        options={posts}
                        getOptionLabel={(option) => option.eventTitle}
                        name='eventPost.id'
                        disabled={loading || values.wallCategory.length > 0}
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
                      label='Description Title'
                      name='descriptionTitle'
                      style={{ width: '100%', marginTop: '1.2rem', marginBottom: '10px' }}
                      value={values.descriptionTitle}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item>
                      <FieldArray
                        name='description'
                        render={(arrayHelpers) => (
                          <div className={classes.inputWrapper}>
                            {values.description.map((_, index) => (
                              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <Field
                                  className={classes.inputFieldTwo}
                                  placeholder='Description Point'
                                  name={`description.${index}`}
                                />
                                <Controls.ActionButton onClick={() => arrayHelpers.remove(index)}>
                                  <RemoveCircleIcon color='secondary' fontSize='large' />
                                </Controls.ActionButton>
                              </div>
                            ))}
                            <Controls.ActionButton onClick={() => arrayHelpers.push()}>
                              <AddBoxIcon color='primary' fontSize='large' />
                            </Controls.ActionButton>
                          </div>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                    style={{ marginTop: '1rem' }}
                  >
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
                      name='testSection'
                      render={(arrayHelpers) => (
                        <div className={classes.wrapper}>
                          {values?.testSection?.map((_, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                              <Field
                                className={classes.inputField}
                                placeholder='Duration'
                                name={`testSection.${index}.duration`}
                              />
                              <Field
                                className={classes.inputField}
                                placeholder='No Of Questions'
                                name={`testSection.${index}.noOfQuestions`}
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

                    <Grid item style={{ width: '58%', marginTop: '1.2rem' }}>
                      <Controls.Input
                        label='Test instructions..'
                        value={values.nameDescription}
                        name='nameDescription'
                        onChange={handleChange}
                        error={touched.nameDescription && Boolean(errors.nameDescription)}
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
                    style={{ width: '100%', marginTop: '1.5rem' }}
                  >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        style={{ width: '30%' }}
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
                        style={{ width: '30%' }}
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

                    <Button
                      color='primary'
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to discard this test?',
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
                      text='Save Test'
                      variant='contained'
                      color='primary'
                      disabled={questionID}
                      style={{ borderRadius: '26px', marginLeft: 30 }}
                      type='submit'
                    />
                    <Button
                      color='primary'
                      onClick={() => {
                        if (validate(values)) draftTest(values, 'Draft');
                      }}
                    >
                      Save as Draft
                    </Button>
                  </Grid>
                  <h6 style={{ marginTop: '2.2rem' }}>List Of Questions</h6>
                  <Grid item style={{ width: '100%', marginTop: '1.2rem' }}>
                    <QuestionsUploadField
                      name='Questions'
                      fileType='image'
                      testCreated={testCreated}
                      questionUpload={questionUpload}
                    />
                  </Grid>
                  <Controls.Button
                    text='Done'
                    variant='contained'
                    color='primary'
                    disabled={!values.Questions?.success}
                    onClick={() => {
                      scheduleIt(questionUpload.id);
                      setNotify({
                        isOpen: true,
                        message: 'Scheduled Successfully',
                        type: 'success',
                      });
                      setTimeout(() => {
                        history.push({
                          pathname: testPath,
                          tab: 2,
                        });
                      }, 1200);
                    }}
                    style={{
                      borderRadius: '26px',
                      marginTop: 20,
                      marginLeft: '45%',
                    }}
                  />
                  {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
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