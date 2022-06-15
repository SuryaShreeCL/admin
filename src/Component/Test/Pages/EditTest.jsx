import React, { useState, useEffect } from 'react';
import { CreateTestContainer } from '../Assets/Styles/CreateTestStyles';
import BackHandler from '../Components/BackHandler';
import { Formik, Form, FieldArray, Field } from 'formik';
import Controls from '../../Utils/controls/Controls';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  getWallCategories,
  listAllWallPosts,
} from '../../../Actions/WallActions';
import {
  updateTest,
  getTestDetails,
  scheduleIt,
} from '../../../Actions/TestActions';
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
    width: 250,
    margin: '1rem .5rem 1rem 0',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    padding: '1rem',
  },
  inputFieldTwo: {
    width: '100%',
    margin: '1rem 1rem 1rem 0',
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
    cutOffScore: 0,
  });

  const [testCreated, setTestCreated] = useState(false);
  let payload = {};

  const durations = [
    { id: '1', title: 20 },
    { id: '2', title: 30 },
    { id: '3', title: 40 },
    { id: '4', title: 50 },
  ];
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
    dispatch(getWallCategories('Live'));
    dispatch(getTestDetails(testId));
    dispatch(listAllWallPosts('Live', true));
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { posts } = useSelector((state) => state.wallPostListReducer);
  const { test, loading, error } = useSelector(
    (state) => state.testDetailsReducer
  );
  // const filterEventFromId = posts?.content?.filter(
  //   (post) => post?.id === test?.wallPost?.linkedEvent?.id
  // );

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
    // cutOffScore: yup
    //   .number()
    //   .typeError('Cut off score is a required field')
    //   .min(1, 'Negative number not allowed')
    //   .max(state.score, `Cut off score cannot be higher than ${state.score} for the test.`),
  });

  const onTestUpdate = (data, status) => {
    dispatch(updateTest(data));
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
      {!loading && (
        <BackHandler
          title={`Edit Test`}
          tab={testType === 'Draft' ? 1 : 2}
          path={testPath}
        />
      )}
      {loading && <Loader />}
      {error && <Alert severity='error'>{error}</Alert>}
      {!loading && (
        <CreateTestContainer>
          <Formik
            initialValues={test || state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (
                values.cutOffScore &&
                values.cutOffScore < values.score &&
                values.cutOffScore >= 1
              ) {
                payload = {
                  id: values.id,
                  name: values.name,
                  type: 'EVENT',
                  description: values.description,
                  descriptionTitle: values.descriptionTitle,
                  nameDescription: values.nameDescription,
                  startDateTime: values.startDateTime,
                  endDateTime: values.endDateTime,
                  score: values.score,
                  cutOffScore: values.cutOffScore,
                  wallCategory:
                    values?.wallPost?.linkedEvent?.wallCategories ||
                    values.wallPost?.wallCategories,
                  wallFiles: [],
                  testSections: values.testSection,
                };
                onTestUpdate(payload, testType);
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
                        <FormControl
                          className={classes.root}
                          style={{ width: '100%' }}
                        >
                          <Autocomplete
                            multiple
                            name='wallCategory'
                            getOptionLabel={(option) => option?.name}
                            options={categories ?? []}
                            disabled
                            onChange={(e, value) => {
                              setFieldValue(
                                'wallCategory',
                                value !== null ? value : categories
                              );
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
                          options={posts?.content}
                          getOptionLabel={(option) => option.eventTitle}
                          name='eventPost.id'
                          disableClearable
                          disabled
                          // defaultValue={filterEventFromId[0]}
                          onChange={(e, value) => {
                            setFieldValue(
                              'eventPost.id',
                              value !== null ? value.id : posts?.content
                            );
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
                        style={{
                          width: '100%',
                          marginTop: '1.2rem',
                          marginBottom: '10px',
                        }}
                        value={values.descriptionTitle}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid container direction='row'>
                      <Grid item>
                        <FieldArray
                          name='description'
                          render={(arrayHelpers) => (
                            <div className={classes.inputWrapper}>
                              {values?.description?.map((_, index) => (
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
                    >
                      <Grid item style={{ width: '15%' }}>
                        <Controls.Input
                          label='Score'
                          name='score'
                          style={{ width: '100%' }}
                          value={values.score}
                          onChange={handleChange}
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
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
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
                      <Grid item style={{ width: '100%', marginTop: '1.2rem' }}>
                        <Controls.Input
                          label='Test instructions..'
                          value={values.nameDescription}
                          name='nameDescription'
                          onChange={handleChange}
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
                            questionSectionId: values?.testSection?.map(
                              (id) => id.id
                            ),
                          }}
                        />
                      </Grid>
                    )}
                    <Grid
                      item
                      container
                      direction='row'
                      style={{
                        width: '100%',
                        marginTop: '1.5rem',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Controls.Button
                        variant='outlined'
                        style={{ borderRadius: '26px' }}
                        color='primary'
                        text='Cancel'
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
                      />
                      {testType === 'Draft' && (
                        <Controls.Button
                          text='Schedule It'
                          variant='contained'
                          color='primary'
                          disabled={!values.Questions?.success}
                          onClick={() => {
                            scheduleIt(values.id);
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
                          }}
                        />
                      )}
                      <Controls.Button
                        text='Update'
                        variant='outlined'
                        color='primary'
                        style={{ borderRadius: '26px' }}
                        type='submit'
                      />
                    </Grid>
                    {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </CreateTestContainer>
      )}
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default EditTest;
