import React, { useState, useEffect, useRef } from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  getWallCategories,
  listAllWallPosts,
} from '../../../Actions/WallActions';
import { createTest, scheduleIt } from '../../../Actions/TestActions';
import Notification from '../../Utils/Notification';
import moment from 'moment';
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
  const scrollRef = useRef(null);

  const [state, setState] = useState({
    // wallCategory: [],
    name: '',
    type: 'EVENT',
    description: [''],
    testSection: [{ duration: '', noOfQuestions: '' }],
    descriptionTitle: '',
    nameDescription: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    score: 10,
    eventPost: { id: '' },
    wallFiles: [],
    cutOffScore: 5,
  });

  let questionID = window.sessionStorage.getItem('questionSetId');
  let questionUpload = {
    id: JSON.parse(window.sessionStorage.getItem('questionSetId')),
    questionSectionId: JSON.parse(
      window.sessionStorage.getItem('questionSectionId')
    ),
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    //scrolls to top of the page after redirection
    scrollRef.current.scrollIntoView();

    dispatch(getWallCategories('Live'));
    dispatch(listAllWallPosts('Live', true));
    window.sessionStorage.removeItem('questionSetId');
    window.sessionStorage.removeItem('questionSectionId');
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { loading, posts } = useSelector((state) => state.wallPostListReducer);
  const [testCreated, setTestCreated] = useState(false);

  const validate = (values) => {
    //validation of event link
    if (values?.eventPost?.id?.length < 5) {
      setNotify({
        isOpen: true,
        message: 'Please link an event',
        type: 'error',
      });
      return false;
    }

    if (
      moment(values.endDateTime).isSameOrBefore(values.startDateTime) ||
      moment(values.startDateTime).isBefore(moment()) ||
      moment(values.endDateTime).isBefore(moment())
    ) {
      setNotify({
        isOpen: true,
        message: 'Please add proper timing & date',
        type: 'error',
      });
      return false;
    }

    //Validation the score with cutOffScore
    if (
      values.cutOffScore === undefined ||
      values.cutOffScore === NaN ||
      !values.cutOffScore ||
      values.cutOffScore > values.score ||
      values.cutOffScore < 1
    ) {
      setNotify({
        isOpen: true,
        message: 'Invalid Cutoff Score !',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  const validationSchema = yup.object({
    nameDescription: yup.string().required('Test instructions required'),
    descriptionTitle: yup.string().required('Description titlie required'),
    name: yup
      .string()
      .required()
      .matches(
        /^([\w,:\s-]*)$/,
        'Only [-,_] is accepted, any other special characters are not accepted'
      ),
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
    if (
      testData.cutOffScore &&
      testData.cutOffScore < testData.score &&
      testData.cutOffScore >= 1
    ) {
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
    } else {
      setNotify({
        isOpen: true,
        message: 'Invalid Cutoff Score!',
        type: 'error',
      });
    }
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
      <BackHandler
        title={`Create New Test`}
        tab={0}
        path={testPath}
        scrollRef={scrollRef}
      />
      <CreateTestContainer>
        <Formik
          initialValues={state}
          validationSchema={validationSchema}
          onSubmit={(values, errors) => {
            if (validate(values, errors)) {
              submitTestCreation(values, 'Scheduled');
            }
          }}
          enableReinitialize
        >
          {({
            handleSubmit,
            errors,
            handleChange,
            values,
            touched,
            setFieldValue,
          }) => (
            <>
              <div className='CreateTest'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>Question Details</h6>
                  <Grid container direction='row' justify='space-between'>
                    <Grid item style={{ width: '40%' }}>
                      <Controls.Input
                        label='Test Name'
                        name='name'
                        style={{ width: '100%' }}
                        value={values.name}
                        helperText={touched.name && errors.name}
                        error={touched.name && Boolean(errors.name)}
                        onChange={handleChange}
                      />
                    </Grid>
                    {/* <Grid item style={{ width: '30%' }}>
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
                    </Grid> */}
                    <Grid item style={{ width: '55%', zIndex: '77' }}>
                      <Autocomplete
                        options={posts?.content}
                        getOptionLabel={(option) => option.eventTitle}
                        name='eventPost.id'
                        disabled={loading}
                        onChange={(e, value) => {
                          setFieldValue(
                            'eventPost.id',
                            value !== null ? value.id : categories
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant='outlined'
                            label='Select Event'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Description Title'
                      name='descriptionTitle'
                      style={{
                        width: '100%',
                        marginTop: '1.2rem',
                        marginBottom: '10px',
                      }}
                      value={values.descriptionTitle}
                      helperText={
                        touched.descriptionTitle && errors.descriptionTitle
                      }
                      error={
                        touched.descriptionTitle &&
                        Boolean(errors.descriptionTitle)
                      }
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
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Field
                                  className={classes.inputFieldTwo}
                                  placeholder='Description Point'
                                  name={`description.${index}`}
                                />
                                <Controls.ActionButton
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <RemoveCircleIcon
                                    color='secondary'
                                    fontSize='large'
                                  />
                                </Controls.ActionButton>
                              </div>
                            ))}
                            <Controls.ActionButton
                              onClick={() => arrayHelpers.push()}
                            >
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
                    <Grid item style={{ width: '15%' }}>
                      <Controls.Input
                        label='Score'
                        name='score'
                        type='number'
                        style={{ width: '100%' }}
                        value={values.score}
                        onChange={handleChange}
                        error={values.score < 1}
                        helperText={
                          values.score < 1 ? 'Enter Only Positive Values' : ''
                        }
                        inputProps={{
                          pattern: '[0-9]*',
                        }}
                      />
                    </Grid>
                    <Grid item style={{ width: '15%' }}>
                      <Controls.Input
                        label='Cut Off'
                        name='cutOffScore'
                        type='number'
                        style={{ width: '100%' }}
                        value={values.cutOffScore}
                        onChange={handleChange}
                        error={
                          values.cutOffScore < 1 ||
                          values.cutOffScore > values.score
                        }
                        helperText={
                          (values.cutOffScore < 1
                            ? 'Enter Only Positive Values'
                            : '') ||
                          (values.cutOffScore >= values.score
                            ? 'Invalid Cutoff Score'
                            : '')
                        }
                        inputProps={{
                          pattern: '[0-9]*',
                        }}
                      />
                    </Grid>
                    <FieldArray
                      name='testSection'
                      render={(arrayHelpers) => (
                        <div className={classes.wrapper}>
                          {values?.testSection?.map((_, index) => (
                            <div
                              key={index}
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Field
                                className={classes.inputField}
                                placeholder='Duration'
                                type='number'
                                name={`testSection.${index}.duration`}
                              />
                              <Field
                                className={classes.inputField}
                                placeholder='No Of Questions'
                                type='number'
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
                    <Grid item style={{ width: '100%', marginTop: '1.2rem' }}>
                      <Controls.Input
                        label='Test instructions..'
                        value={values.nameDescription}
                        name='nameDescription'
                        onChange={handleChange}
                        helperText={
                          touched.nameDescription && errors.nameDescription
                        }
                        error={
                          touched.nameDescription &&
                          Boolean(errors.nameDescription)
                        }
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CreateTest;
