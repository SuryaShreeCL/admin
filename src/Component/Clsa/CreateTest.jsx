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
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { clsaPath } from '../RoutePaths';
import { CreateTestContainer } from '../Test/Assets/Styles/CreateTestStyles';
import BackHandler from '../Test/Components//BackHandler';
import Controls from '../Utils/controls/Controls';
import PaginationComponent from '../Utils/CustomPaginationComponent';
import Notification from '../Utils/Notification';

const useStyles = makeStyles((theme) => ({
  newButton: {
    borderRadius: '26px',
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

export default function CreateTest() {
  const scrollRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const hiddenFileInput = React.useRef(null);

  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(20);

  const validationSchema = yup.object({
    testName: yup.string().required(),
    marks: yup.string().required(),
    description: yup.string().required(),
  });

  const handleSave = () => {
    if (fileList.length == 0) {
      setNotify({
        isOpen: true,
        message: 'Please upload a question set',
        type: 'error',
      });
      return false;
    } else {
      history.push({
        pathname: clsaPath,
      });
    }
  };

  const handleQuestionsetDelete = () => {
    console.log('deleted');
  };
  const formik = useFormik({
    initialValues: {
      testName: '',
      marks: '',
      duration: '',
      description: '',
      questions: '',
      date: new Date(),
      time: Date().toLocaleString(),
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

  const handleQuestionsetUpload = (e, val) => {
    fileList.push(e.currentTarget.files[0]);
  };

  const handlePageChange = (e, value) => {
    console.log(value, 'value');
  };

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
                label='Test Name'
                name='testName'
                style={{ width: '100%' }}
                onChange={handleChange}
                value={values.testName}
                error={touched.testName && Boolean(errors.testName)}
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
              />
            </Grid>
            <Grid item md={3}>
              <Controls.Input
                label='Duration'
                name='duration'
                style={{ width: '100%' }}
                onChange={handleChange}
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
                    onChange={handleChange}
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
                  />
                </Grid>
              </Grid>
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
                disabled={uploadDisabled}
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
                accept='.xls,.xlsx'
                ref={hiddenFileInput}
                type='file'
                onChange={(e, val) => handleQuestionsetUpload(e, val)}
                style={{ display: 'none' }}
              />
            </Grid>
            <Grid item md={12}>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell style={{ width: 750 }}>
                        Name of the file uploaded
                      </TableCell>
                      <TableCell>Uploaded on</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell style={{ color: '#1093FF' }}>Set 1</TableCell>
                      <TableCell>25 Jan 2022,3.06pm</TableCell>
                      <TableCell>
                        <Controls.Button
                          text='Delete'
                          variant='text'
                          color='#E95A1D'
                          className={classes.deleteButton}
                          onClick={handleQuestionsetDelete}
                        />
                      </TableCell>
                    </TableRow>
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
        <Grid item md={10}></Grid>
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
        <Grid item md={1}>
          <Controls.Button
            text='Submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            style={{ borderRadius: '26px' }}
          />
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
