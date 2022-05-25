import {
  createMuiTheme,
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  withStyles,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { CloudCircleOutlined } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormik } from 'formik';
import Loader from '../../Utils/controls/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getStudentEventStatus, updateStudentEventStatus } from '../../../Actions/WallActions';
import Controls from '../../Utils/controls/Controls';
import Notification from '../../Utils/Notification';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const tableTheme = () =>
  createMuiTheme({
    overrides: {
      MuiTableCell: {
        root: {
          paddingBottom: '-10px !important',
          borderBottom: 'none',
          padding: 0,
        },
      },
      MuiButton: {
        containedPrimary: {
          backgroundColor: '#1093FF',
        },
      },
    },
  });

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#007500',
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const RedCheckbox = withStyles({
  props: {
    MuiCheckbox: {
      checkedIcon: <CloudCircleOutlined />,
    },
  },
  root: {
    '&$checked': {
      color: '#8B0303',
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default function Result() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [selectStatus, setSelectedStatus] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const selector_Data = [
    {
      name: 'All',
      value: null,
    },
    {
      name: 'Accepted',
      value: 'Qualified',
    },
    {
      name: 'Rejected',
      value: 'Not Qualified',
    },
  ];

  const _fetch = () => {
    setIsLoading(true);
    dispatch(
      getStudentEventStatus(id, (response) => {
        setUsers(response);
        setSelectedUsers([
          ...response?.data?.stepDetailsModelList
            ?.map((step) =>
              step.studentList.map((student) => ({
                stepName: step.stepName,
                studentId: student.studentId,
                stepStatus: student.stepStatus,
                userId: student.studentId,
                studentName: student.studentName,
                studentEmailId: student.studentEmailId,
              }))
            )
            .flat(),
        ]);
        setIsLoading(false);
      })
    );
  };

  useEffect(() => {
    _fetch();
  }, []);

  const validationSchema = yup.object({
    rounds: yup
      .object()
      .nullable()
      .required(),
    rejectedReason: yup.string().required(''),
  });

  const _roundUpdate = (data, reason) => {
    // if (reason === '' || reason.length < 5) {
    //   setNotify({
    //     isOpen: true,
    //     message: 'Please fill the reason',
    //     type: 'error',
    //   });
    //   return;
    // }

    setIsLoading(true);

    let filterRounds = selectedUsers.filter((student) => student.stepName === data.stepName);

    let finalStudentsList = filterRounds.map((user) => {
      delete user.userId;
      delete user.stepName;
      return user;
    });

    let payload = {
      eventId: users?.data?.eventId,
      eventName: users?.data?.eventName,
      stepDetailsModelList: [{ ...data, rejectedReason: reason, studentList: finalStudentsList }],
    };

    dispatch(
      updateStudentEventStatus(id, payload, (res) => {
        if (res.success) {
          _fetch();
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'success',
          });
        } else {
          setIsLoading(false);
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'error',
          });
        }
      })
    );
  };

  const _submit = (data) => {
    let payload = {
      eventId: users?.data?.eventId,
      eventName: users?.data?.eventName,
      stepDetailsModelList: data,
    };

    dispatch(
      updateStudentEventStatus(id, payload, (res) => {
        if (res.success) {
          _fetch();
          setNotify({
            isOpen: true,
            message: 'Round Details Submitted',
            type: 'success',
          });
        } else {
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'error',
          });
        }
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      rounds: [],
      studentSelector: [],
      rejectedReason: '',
    },
    validationSchema: validationSchema,
    onSubmit: _roundUpdate,
  });

  const onStatusChange = (isChecked, status, data) => {
    var t = selectedUsers;
    if (status === 'q') {
      if (isChecked) {
        let exist = t.findIndex((el) => el.userId === data.userId);
        if (exist > -1) {
          t.splice(exist, 1);
        }
        t.push({
          ...data,
          stepStatus: 'Qualified',
        });
      } else {
        var deleteIndex = t.findIndex(
          (el) => el.userId === data.userId && el.stepStatus === 'Qualified'
        );
        // t.push({ ...t[deleteIndex], stepStatus: 'NA' });
        t.splice(deleteIndex, 1);
      }
    } else if (status === 'nq') {
      if (isChecked) {
        let exist = t.findIndex((el) => el.userId === data.userId);
        if (exist > -1) {
          t.splice(exist, 1);
        }
        t.push({
          ...data,
          stepStatus: 'Not Qualified',
        });
      } else {
        var deleteIndex = t.findIndex(
          (el) => el.userId === data.userId && el.stepStatus === 'Not Qualified'
        );
        // t.push({ ...t[deleteIndex], stepStatus: 'NA' });
        t.splice(deleteIndex, 1);
      }
    }
    setSelectedUsers([...t]);
  };

  const onStatusAllChange = (isChecked, status) => {
    var t = [];
    var exist = users.data.stepDetailsModelList.find(
      (el) => el.stepName === selectedRound?.stepName
    );
    if (status === 'q') {
      if (isChecked) {
        t = exist.studentList.map((el) => ({
          stepName: exist.stepName,
          studentId: el.studentId,
          stepStatus: 'Qualified',
          userId: el.studentId,
          studentName: el.studentName,
          studentEmailId: el.studentEmailId,
        }));
      } else {
        t = exist.studentList.map((el) => ({
          stepName: exist.stepName,
          studentId: el.studentId,
          stepStatus: 'NA',
          userId: el.studentId,
          studentName: el.studentName,
          studentEmailId: el.studentEmailId,
        }));
      }
    } else if (status === 'nq') {
      if (isChecked) {
        t = exist.studentList.map((el) => ({
          stepName: exist.stepName,
          studentId: el.studentId,
          stepStatus: 'Not Qualified',
          userId: el.studentId,
          studentName: el.studentName,
          studentEmailId: el.studentEmailId,
        }));
      } else {
        t = exist.studentList.map((el) => ({
          stepName: exist.stepName,
          studentId: el.studentId,
          stepStatus: 'NA',
          userId: el.studentId,
          studentName: el.studentName,
          studentEmailId: el.studentEmailId,
        }));
      }
    }
    setSelectedUsers([...t]);
  };

  const _filter = (student, steps) => {
    if (selectedRound && selectStatus?.value) {
      return (
        steps.stepName === selectedRound?.stepName && student.stepStatus === selectStatus?.value
      );
    }
    if (selectedRound) {
      return steps.stepName === selectedRound?.stepName;
    }
    if (selectStatus?.value) {
      return student.stepStatus === selectStatus?.value;
    }
    if (selectStatus?.value === null) {
      return student.stepStatus;
    }
    return student.stepStatus === 'Qualified';
  };

  const {
    values,
    errors,
    handleSubmit,
    touched,
    setFieldError,
    setFieldValue,
    setValues,
    handleChange,
  } = formik;

  return (
    <div>
      <Grid container spacing={3} direction='row' className={classes.main}>
        <Grid item md={3}>
          <FormControl className={classes.width}>
            <Autocomplete
              id='rounds'
              name='rounds'
              getOptionLabel={(option) => option?.stepName}
              options={users?.data?.stepDetailsModelList ?? []}
              onChange={(e, value) => {
                setFieldValue('rounds', value);
                setSelectedRound(value);
              }}
              value={values.rounds}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select Round'
                  name='rounds'
                  variant='outlined'
                  error={touched.rounds && Boolean(errors.rounds)}
                />
              )}
              className={classes.autocompleteTextinput}
            />
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <FormControl className={classes.width}>
            <Autocomplete
              id='studentSelector'
              name='studentSelector'
              getOptionLabel={(option) => option?.name}
              options={selector_Data ?? []}
              onChange={(e, value) => {
                setFieldValue('studentSelector', value);
                setSelectedStatus(value);
              }}
              value={values.studentSelector}
              renderInput={(params) => (
                <TextField
                  {...params}
                  contentEditable={false}
                  label='Student Selector'
                  name='studentSelector'
                  variant='outlined'
                  error={touched.studentSelector && Boolean(errors.studentSelector)}
                />
              )}
              className={classes.autocompleteTextinput}
            />
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <Controls.Input
            label='Enter Rejection Reason'
            name='rejectedReason'
            value={values.rejectedReason}
            onChange={handleChange}
            className={classes.input}
            error={touched.rejectedReason && Boolean(errors.rejectedReason)}
          />
        </Grid>

        <Grid item md={12}>
          <TableContainer>
            <Table>
              {selectedRound && (
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.box}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#007500',
                        }}
                      >
                        <div>Accepted</div>
                        <FormControlLabel
                          className={classes.formLabel}
                          control={<GreenCheckbox name='checkedA' />}
                          disabled={!selectedRound}
                          onChange={(e, isChecked) => {
                            onStatusAllChange(isChecked, 'q');
                          }}
                          checked={
                            users?.data?.stepDetailsModelList.find(
                              (el) => el.stepName === selectedRound?.stepName
                            )?.studentList.length > 0
                              ? selectedUsers.filter(
                                  (el) =>
                                    el.stepName === selectedRound?.stepName &&
                                    el.stepStatus === 'Qualified'
                                ).length ===
                                users?.data?.stepDetailsModelList.find(
                                  (el) => el.stepName === selectedRound?.stepName
                                )?.studentList.length
                              : false
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#8B0303',
                        }}
                      >
                        <div>Rejected</div>
                        <FormControlLabel
                          className={classes.formlabel2}
                          control={<RedCheckbox name='checkedB' />}
                          disabled={!selectedRound}
                          onChange={(e, isChecked) => {
                            onStatusAllChange(isChecked, 'nq');
                          }}
                          checked={
                            users?.data?.stepDetailsModelList.find(
                              (el) => el.stepName === selectedRound?.stepName
                            )?.studentList.length > 0
                              ? selectedUsers.filter(
                                  (el) =>
                                    el.stepName === selectedRound?.stepName &&
                                    el.stepStatus === 'Not Qualified'
                                ).length ===
                                users?.data?.stepDetailsModelList.find(
                                  (el) => el.stepName === selectedRound?.stepName
                                )?.studentList.length
                              : false
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className={classes.heading}>User Name</TableCell>
                    <TableCell className={classes.heading}>Email</TableCell>
                  </TableRow>
                </TableHead>
              )}
              <ThemeProvider theme={tableTheme}>
                <TableBody>
                  {isLoading ? (
                    <div style={{ margin: '2rem auto', width: '60%' }}>
                      <Loader />
                    </div>
                  ) : (
                    selectedRound &&
                    users?.data?.stepDetailsModelList.map((steps) => {
                      return (
                        <>
                          {steps.studentList
                            .filter((student) => _filter(student, steps))
                            .map((item) => {
                              return (
                                <TableRow>
                                  <TableCell className={classes.box}>
                                    <FormControlLabel
                                      className={classes.transparent}
                                      control={<GreenCheckbox name='checkedA' />}
                                      disabled={!selectedRound}
                                      checked={
                                        !selectedRound
                                          ? item.stepStatus === 'Qualified'
                                          : selectedUsers.filter(
                                              (el) =>
                                                el.stepName === steps.stepName &&
                                                el.stepStatus === 'Qualified' &&
                                                el.userId === item.studentId
                                            ).length > 0
                                      }
                                      onChange={(e, isChecked) => {
                                        onStatusChange(isChecked, 'q', {
                                          stepName: steps.stepName,
                                          studentId: steps.studentId,
                                          userId: item.studentId,
                                          ...item,
                                        });
                                      }}
                                    />
                                    <FormControlLabel
                                      className={classes.transparent}
                                      control={<RedCheckbox name='checkedB' />}
                                      disabled={!selectedRound}
                                      checked={
                                        !selectedRound
                                          ? item.stepStatus === 'Not Qualified'
                                          : selectedUsers.filter(
                                              (el) =>
                                                el.stepName === steps.stepName &&
                                                el.stepStatus === 'Not Qualified' &&
                                                el.userId === item.studentId
                                            ).length > 0
                                      }
                                      onChange={(e, isChecked) => {
                                        onStatusChange(isChecked, 'nq', {
                                          stepName: steps.stepName,
                                          studentId: steps.studentId,
                                          userId: item.studentId,
                                          ...item,
                                        });
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell className={classes.color}>
                                    {item.studentName}
                                  </TableCell>
                                  <TableCell className={classes.color}>
                                    {item.studentEmailId}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </>
                      );
                    })
                  )}
                </TableBody>
              </ThemeProvider>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid item md={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid
              item
              md={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 4rem',
              }}
            >
              <Controls.Button
                text='Round Update'
                type='submit'
                disabled={!selectedRound}
                color='primary'
                className={classes.newButton}
                variant='contained'
                onClick={() => _roundUpdate(values.rounds, values.rejectedReason)}
              />
              <Controls.ActionButton
                style={{ marginTop: '1rem' }}
                disabled={!values?.rounds?.stepId}
                href={`${process.env.REACT_APP_API_URL}/api/v1/event/${id}/result/page`}
              >
                <CloudDownloadIcon
                  fontSize='large'
                  style={{
                    color: !values?.rounds?.stepId ? 'gray' : 'green',
                  }}
                />
              </Controls.ActionButton>
              <Controls.Button
                disabled={true}
                // disabled={!selectedRound}
                text='Submit'
                color='primary'
                className={classes.newButton1}
                variant='contained'
                onClick={() => _submit(users.data.stepDetailsModelList)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <pre>{JSON.stringify({ selectedUsers }, null, 4)}</pre> */}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
const useStyles = makeStyles({
  width: {
    width: '100%',
  },
  newButton: {
    borderRadius: '24px',
    marginTop: 20,
    width: 200,
  },
  newButton1: {
    borderRadius: '24px',
    width: 200,
    marginTop: 20,
  },
  box: {
    justifyContent: 'space-evenly',
    display: 'flex',
  },
  formLabel: { flexDirection: 'column', color: '#007500' },
  formlabel2: { flexDirection: 'column', color: '#8B0303' },
  heading: {
    color: '#052A4E',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
  },
  divider: { backgroundColor: '#4383E7', marginTop: 10 },
  color: {
    color: '#1093FF',
  },
  transparent: {
    color: 'transparent',
    flexDirection: 'column',
  },
  input: { width: '100%', marginTop: 8 },
  autocompleteTextinput: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  main: { justifyContent: 'space-evenly', marginTop: '2%', alignItems: 'center', display: 'flex' },
});
