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
import { ExistingMedia } from '../../Wall/Components/Upload/ExistingMedia';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getWallCategories, listWallPosts } from '../../../Actions/WallActions';
import { updateTest, getTestDetails } from '../../../Actions/TestActions';
import Notification from '../../Utils/Notification';
import { useHistory, useLocation } from 'react-router-dom';
import { testPath } from '../../RoutePaths';
import Loader from '../../Utils/controls/Loader';
import { Alert } from '@material-ui/lab';
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
  spacer: {
    width: '80%',
    marginTop: '10px',
  },
  topSpacer: {
    marginTop: '1.2rem',
  },
});

const EditTest = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { testId, testType } = location;

  const [state, setState] = useState({
    wallCategory: [],
    name: '',
    type: 'EVENT',
    description: [],
    testSection: [{ duration: '', noOfQuestions: '' }],
    descriptionTitle: '',
    nameDescription: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    score: 0,
    wallFiles: [],
  });

  let questionID = window.sessionStorage.getItem('questionSetId');
  const [testCreated, setTestCreated] = useState(false);

  const durations = [
    { id: '1', title: 10 },
    { id: '2', title: 20 },
    { id: '3', title: 30 },
    { id: '4', title: 40 },
  ];

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    dispatch(getWallCategories('Live'));
    dispatch(getTestDetails(testId));
    dispatch(listWallPosts('Live', true));
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { posts } = useSelector((state) => state.wallPostListReducer);
  const { test, loading, error } = useSelector((state) => state.testDetailsReducer);
  const filterEventFromId = posts?.filter((post) => post?.id === test?.wallPost?.linkedEvent?.id);

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

  const onTestUpdate = (test, status) => {
    dispatch(updateTest({ ...test, status }));
    setNotify({
      isOpen: true,
      message: 'Updated Successfully',
      type: 'success',
    });
    setTimeout(() => {
      history.push({
        pathname: testPath,
        tab: 0,
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
      {!loading && <BackHandler title={`Edit Test`} tab={1} path={testPath} />}
      {loading && <Loader />}
      {error && <Alert severity='error'>{error}</Alert>}
      {!loading && (
        <CreateTestContainer>
          <Formik
            initialValues={test || state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // onTestUpdate({ ...values, testType, wallFiles: [...(values.wallFilesUpdate ?? [])] });
              onTestUpdate(values, testType);
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
                            name='wallCategory'
                            getOptionLabel={(option) => option?.name}
                            options={categories ?? []}
                            disabled
                            onChange={(e, value) => {
                              setFieldValue('wallCategory', value !== null ? value : categories);
                            }}
                            value={
                              values?.wallPost?.linkedEvent?.wallCategories ||
                              values.wallPost?.wallCategories
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='Select Category'
                                name='wallCategory'
                                variant='outlined'
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
                          disabled
                          defaultValue={filterEventFromId[0]}
                          onChange={(e, value) => {
                            setFieldValue('eventPost.id', value !== null ? value.id : posts);
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
                      <Grid item style={{ width: '30%' }}>
                        <Controls.Select
                          label='Score'
                          name='score'
                          size='100%'
                          value={values.score}
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
                        {/* <MultipleFileUploadField name='wallFilesUpdate' fileType='image' /> */}
                        {values?.wallPost?.wallFiles?.map((media) => (
                          <ExistingMedia media={media} wallFiles={values?.wallPost?.wallFiles} />
                        ))}
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
                        text='Update'
                        variant='contained'
                        color='primary'
                        style={{ borderRadius: '26px', marginLeft: 30 }}
                        type='submit'
                      />
                    </Grid>
                    <h6 style={{ marginTop: '2.2rem' }}>
                      {!values.questions?.length > 0
                        ? 'List Of Questions'
                        : 'Questions Uploaded Successfully'}
                    </h6>
                    {!values.questions?.length > 0 && (
                      <Grid item style={{ width: '100%', marginTop: '1.2rem' }}>
                        <QuestionsUploadField
                          name='Questions'
                          fileType='image'
                          testCreated={!testCreated}
                          questionUpload={{
                            id: values?.id,
                            questionSectionId: values?.testSection?.map((id) => id.id),
                          }}
                        />
                      </Grid>
                    )}
                    {testType === 'Draft' && (
                      <Controls.Button
                        text='Schedule It'
                        variant='contained'
                        color='primary'
                        disabled={!values.questions?.length > 0}
                        onClick={() => {
                          onTestUpdate(values, 'Scheduled');
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
                    )}
                    {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </CreateTestContainer>
      )}
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
};

export default EditTest;
