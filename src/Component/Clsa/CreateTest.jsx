import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useFormik } from 'formik';
import * as moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import {
  clsaData,
  clsaQuestionsetDelete,
  clsaQuestionsetList,
  clsaQuestionSetUpload,
  createTest,
  updateClsaData,
} from '../../Actions/ClsaActions';
import { clsaPath } from '../RoutePaths';
import { CreateTestContainer } from '../Test/Assets/Styles/CreateTestStyles';
import BackHandler from '../Test/Components//BackHandler';
import Controls from '../Utils/controls/Controls';
import PaginationComponent from '../Utils/CustomPaginationComponent';
import Notification from '../Utils/Notification';
import Loader from '../Utils/controls/Loader';

const useStyles = makeStyles((theme) => ({
  newButton: {
    borderRadius: '26px',
  },
  newButton1: {
    borderRadius: '26px',
    width: 90,
  },
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: '#052A4E',
      backgroundColor: '#F4F7F9;',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
  text: {
    color: '#052A4E',
    fontWeight: '200',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  deleteButton: {
    color: '#E95A1D',
    fontSize: 20,
  },
}));

function CreateTest(props) {
  const scrollRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const hiddenFileInput = React.useRef(null);

  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(20);
  const [testId, setTestId] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    params.id && setLoading(true);
    params.id &&
      clsaData(params.id).then((response) => {
        console.log(response, 'GET');
        if (response.status === 200) {
          setLoading(false);
          let data = response?.data?.data;
          setTestId(data?.id);
          let questionSetData = response?.data?.data?.testQuestionsSets;
          setValues({
            testName: data?.name,
            marks: data?.totalMark,
            duration: data?.duration,
            description: data?.description,
            questions: data?.noOfQuestions,
            date: data?.startDate,
            time: data?.startDateTime,
          });
          // setList(questionSetData);
        }
      });
    params.id &&
      clsaQuestionsetList(0, params.id).then((res) => {
        console.log(res, 'ppppp');
        setTotalPage(res?.data?.data?.totalPages);
        setList(res?.data?.data?.content);
        if (res === 'CLSA Test Question Set List Is Empty') {
          setNotify({
            isOpen: true,
            message: 'CLSA Test Question Set List Is Empty',
            type: 'error',
          });
        }
      });
  }, []);

  const validationSchema = yup.object({
    testName: yup.string().required(),
    marks: yup.string().required(),
    description: yup.string().required(),
  });

  const handleSave = () => {
    if (
      values.time <
      // .toLocaleTimeString({
      //   hour: 'numeric',
      //   hour12: true,
      //   minute: 'numeric',
      // })
      new Date()
      // .toLocaleTimeString({
      //   hour: 'numeric',
      //   hour12: true,
      //   minute: 'numeric',
      // })
    ) {
      setNotify({
        isOpen: true,
        message: 'Please choose the proper timing',
        type: 'error',
      });
    } else {
      console.log(values, '++++++++++');
      const data = {
        name: values.testName,
        totalMark: values.marks,
        duration: values.duration,
        description: values.description,
        noOfQuestions: values.questions,

        startDate: moment(new Date(values.date)).format('yyyy-MM-DD'),
        startDateTime: values.time.toISOString(),
        // .toLocaleTimeString({
        //   hour: 'numeric',
        //   hour12: true,
        //   minute: 'numeric',
        // }),
      };
      console.log(data, '---------------');
      if (params.id) {
        setLoading(true);
        updateClsaData(params.id, data)
          .then((response) => {
            if (response.status === 200) {
              setTestId(response?.data?.data?.id);
              clsaData(response?.data?.data?.id).then((response) => {
                if (response.status === 200) {
                  setLoading(false);
                }
              });
              setNotify({
                isOpen: true,
                message: response?.data?.message,
                type: 'success',
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      } else {
        console.log(data, 'else');
        setLoading(true);
        createTest(data)
          .then((response) => {
            console.log(response, 'jj');
            if (response.status === 200) {
              setTestId(response?.data?.data?.id);
              clsaData(response?.data?.data?.id).then((response) => {
                if (response.status === 200) {
                  setLoading(false);
                }
              });
              setNotify({
                isOpen: true,
                message: response?.data?.message,
                type: 'success',
              });
            }
            if (response === 'Bad Request') {
              setLoading(false);
              setNotify({
                isOpen: true,
                message: response,
                type: 'error',
              });
            }
            if (response === 'CLSA Test Name is Already Exist') {
              setLoading(false);
              setNotify({
                isOpen: true,
                message: response,
                type: 'error',
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    }
  };

  const handleQuestionsetDelete = (id) => {
    setLoading(true);
    clsaQuestionsetDelete(testId, id).then((response) => {
      console.log(response.data.message, 'DELETE');

      if (response.status === 200) {
        clsaData(testId).then((response) => {
          setLoading(false);
          if (response.status === 200) {
            let data = response?.data?.data;
            setTestId(data.id);
            let questionSetData = response?.data?.data?.testQuestionsSets;
            setValues({
              testName: data.name,
              marks: data.totalMark,
              duration: data?.duration,
              description: data.description,
              questions: data.noOfQuestions,
              date: data.startDate,
              time: data?.startDateTime,
            });
            clsaQuestionsetList(0, params.id).then((res) => {
              console.log(res, 'ppppp');
              setTotalPage(res?.data?.data?.totalPages);
              setList(res?.data?.data?.content);
              if (res === 'CLSA Test Question Set List Is Empty') {
                setNotify({
                  isOpen: true,
                  message: 'CLSA Test Question Set List Is Empty',
                  type: 'error',
                });
              }
            });
          }
        });
      }
      if (response.data.message === "Can't  be deleted") {
        setNotify({
          isOpen: true,
          message: "Can't  be deleted",
          type: 'error',
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      testName: '',
      marks: '',
      duration: '',
      description: '',
      questions: '',
      date: new Date(),
      time: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: handleSave,
  });

  const {
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  const handleQuestionsetUpload = (e) => {
    const newFile = new FormData();
    newFile.append('file', e.currentTarget.files[0]);
    clsaQuestionSetUpload(testId, newFile).then((response) => {
      console.log(response, 'bbbbb');
      if (response.status === 200) {
        clsaData(testId).then((response) => {
          if (response.status === 200) {
            let data = response?.data?.data;
            setTestId(data.id);
            let questionSetData = response?.data?.data?.testQuestionsSets;
            setValues({
              testName: data?.name,
              marks: data?.totalMark,
              duration: data?.duration,
              description: data?.description,
              questions: data?.noOfQuestions,
              date: data?.startDate,
              time: data?.startDateTime,
            });
            clsaQuestionsetList(0, params.id).then((res) => {
              setTotalPage(res?.data?.data?.totalPages);
              setList(res?.data?.data?.content);
              if (res === 'CLSA Test Question Set List Is Empty') {
                setNotify({
                  isOpen: true,
                  message: 'CLSA Test Question Set List Is Empty',
                  type: 'error',
                });
              }
            });
          }
        });
      } else {
        setLoading(false);
        setNotify({
          isOpen: true,
          message: 'Unable to upload try again',
          type: 'error',
        });
      }
    });
  };

  const convertTimeFormat = (date) =>
    new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    });

  const handlePageChange = (e, value) => {
    setPage(value - 1);
    setLoading(true);
    clsaQuestionsetList(value - 1, testId).then((res) => {
      setLoading(false);
      setList(res.data.data.content);
      console.log(res, 'resssssss');
    });
  };
  console.log(values, 'values');

  return (
    <>
      <BackHandler
        title={params.id ? `Edit Test` : `Create New Test`}
        tab={0}
        path={clsaPath}
        scrollRef={scrollRef}
      />
      <CreateTestContainer>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item md={5}>
              <Typography className={classes.text}>Test Name</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography className={classes.text}>Total Marks</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography className={classes.text}>Duration</Typography>
            </Grid>
            <Grid item md={5}>
              <Controls.Input
                disabled={params.id ? true : false}
                label='Test Name'
                name='testName'
                style={{ width: '100%' }}
                onChange={handleChange}
                value={values.testName}
                error={touched.testName && Boolean(errors.testName)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={3}>
              <Controls.Input
                label='Enter total marks'
                name='marks'
                style={{ width: '100%' }}
                onChange={handleChange}
                value={values.marks}
                error={touched.marks && Boolean(errors.marks)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item md={3}>
              <Controls.Input
                label='Duration'
                name='duration'
                value={values.duration}
                style={{ width: '100%' }}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item md={5}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography className={classes.text}>
                    Test Description
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Controls.Input
                    name='description'
                    rows={8}
                    multiline
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    value={values.description}
                    error={touched.description && Boolean(errors.description)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography className={classes.text}>
                    Number of question
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Controls.Input
                    label='No of question'
                    name='questions'
                    style={{ width: '100%' }}
                    type='number'
                    value={values.questions}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={12}>
                  <h5 style={{ color: '#052A4E' }}>Schedule Details</h5>
                </Grid>
                <Grid item md={6}>
                  <KeyboardDatePicker
                    name='date'
                    inputVariant='outlined'
                    style={{ width: '100%' }}
                    label={'Start date'}
                    value={values.date}
                    format='dd MMM yyyy'
                    onChange={(value) => setFieldValue('date', value)}
                    id='date-picker-dialog'
                    variant='outlined'
                    disablePast={true}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item md={6}>
                  <KeyboardTimePicker
                    margin='normal'
                    inputVariant='outlined'
                    label='Start time'
                    name='time'
                    value={values.time}
                    onChange={(value) => setFieldValue('time', value)}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    keyboardIcon={<AccessTimeIcon />}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} align='center' style={{ marginTop: 10 }}>
              <Button
                variant='contained'
                color={'primary'}
                className={classes.newButton1}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item md={12}>
              <Divider style={{ backgroundColor: '#1093FF' }} />
            </Grid>
            <Grid item md={9}>
              <h5 style={{ color: '#052A4E' }}>List of Question Set</h5>
            </Grid>
            <Grid item md={3} align='center'>
              <Button
                variant='contained'
                disabled={testId ? false : true}
                color={!uploadDisabled ? 'primary' : 'default'}
                className={classes.newButton}
                onClick={(event) => {
                  hiddenFileInput.current.click();
                }}
              >
                {!uploadDisabled ? '+ Upload Question Set' : 'Uploading ...'}
              </Button>
              <input
                multiple
                accept='.xls,.xlsx, .csv'
                ref={hiddenFileInput}
                type='file'
                onChange={handleQuestionsetUpload}
                style={{ display: 'none' }}
              />
            </Grid>
            <Grid item md={12}>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>#</TableCell> */}
                      <TableCell style={{ width: 750 }}>
                        Name of the file uploaded
                      </TableCell>
                      <TableCell>Uploaded on</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list &&
                      list.map((item, index) => {
                        console.log(item, 'ppp');
                        return (
                          <TableRow>
                            {/* <TableCell>{index + 1}</TableCell> */}
                            <TableCell style={{ color: '#1093FF' }}>
                              {item.testName}
                            </TableCell>
                            <TableCell>
                              {/* {moment(new Date(item.createdOn)).format(
                                'DD MMM yyyy'
                              )}{' '}
                              , {convertTimeFormat(item.createdOn)} */}
                              {/* {item.createdOn} */}
                              {moment(new Date(item.createdOn)).format(
                                'DD MMM yyyy'
                              )}
                            </TableCell>
                            <TableCell>
                              <Controls.Button
                                text='Delete'
                                variant='text'
                                color='#E95A1D'
                                className={classes.deleteButton}
                                onClick={() => handleQuestionsetDelete(item.id)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <PaginationComponent
                page={page + 1}
                pageCount={totalPage}
                onPageChange={handlePageChange}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </CreateTestContainer>
      <Grid container spacing={2} style={{ marginTop: '18px' }}>
        <Grid item md={9}></Grid>
        <Grid item md={1}>
          <Controls.Button
            text='Cancel'
            variant='text'
            color='primary'
            style={{ borderRadius: '26px' }}
            onClick={() => {
              history.push({
                pathname: clsaPath,
              });
            }}
          />
        </Grid>
        <Grid item md={2}>
          <Controls.Button
            text='Submit'
            variant='contained'
            color='primary'
            onClick={() => {
              history.push({
                pathname: clsaPath,
              });
              // setNotify({
              //   isOpen: true,
              //   message: 'Test Created successfully',
              //   type: 'success',
              // });
            }}
            style={{ borderRadius: '26px' }}
            disabled={list?.length == 0}
          />
        </Grid>
      </Grid>
      <div style={{ margin: '2rem auto', width: '60%' }}>
        {loading && <Loader />}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default CreateTest;
