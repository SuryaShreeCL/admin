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
  const [selectedRound, setSelectedRound] = useState(null);
  const [selectStatus, setSelectedStatus] = useState(null);
  const [flag, setFlag] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [confirmedUser, setConfirmedUser] = useState([]);
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
    dispatch(
      getStudentEventStatus(id, (response) => {
        setUsers(response);
        setSelectedUsers([
          ...response?.data?.stepDetailsModelList
            ?.map((step) =>
              step.studentList.map((student) => ({
                stepName: step.stepName,
                stepId: step.stepId,
                stepStatus: student.stepStatus,
                userId: student.studentId,
                studentName: student.studentName,
                studentEmailId: student.studentEmailId,
              }))
            )
            .flat(),
        ]);
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
  });

  const groupBy = (arr) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
      const myAttribute = cval['stepName'];
      acc[myAttribute] = [...(acc[myAttribute] || []), cval];
      return acc;
    }, initialValue);
  };

  const _submit = () => {
    var grouped = groupBy(confirmedUser);
    console.log(grouped);
    var structured = Object.entries(grouped).map(([key, value]) => ({
      stepName: key,
      stepId: value?.length > 0 ? value[0]['stepId'] : '',
      rejectedReason: value[0].rejectedReason,
      studentList:
        value?.length > 0
          ? value.map((el) => ({
              studentId: el.userId,
              studentName: el.studentName,
              studentEmailId: el.studentEmailId,
              stepStatus: el.stepStatus,
            }))
          : [],
    }));

    console.log(structured);

    let payload = {
      eventId: users?.data?.eventId,
      eventName: users?.data?.eventName,
      stepDetailsModelList: structured,
    };

    dispatch(
      updateStudentEventStatus(id, payload, (res) => {
        if (res.success) {
          _fetch();
          setNotify({
            isOpen: true,
            message: 'Data updated succesfully',
            type: 'success',
          });
        }
      })
    );
  };

  // Local Save
  const handleSave = (v) => {
    var exist = selectedUsers;
    var t = exist.map((el) => ({
      ...el,
      rejectedReason: el.stepId == v.rounds.stepId ? v.reason : null,
    }));
    setSelectedUsers(t);
    setConfirmedUser(t);
    setFlag(false);
    setNotify({
      isOpen: true,
      message: 'Data of the Round saved succesfully',
      type: 'success',
    });
  };

  const formik = useFormik({
    initialValues: {
      rounds: [],
      studentSelector: [],
      reason: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSave,
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
        t.push({ ...t[deleteIndex], stepStatus: 'NA' });
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
        t.push({ ...t[deleteIndex], stepStatus: 'NA' });
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
          stepId: exist.stepId,
          stepStatus: 'Qualified',
          userId: el.studentId,
          studentName: el.studentName,
          studentEmailId: el.studentEmailId,
        }));
      } else {
        t = exist.studentList.map((el) => ({
          stepName: exist.stepName,
          stepId: exist.stepId,
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
          stepId: exist.stepId,
          stepStatus: 'Not Qualified',
          userId: el.studentId,
          studentName: el.studentName,
          studentEmailId: el.studentEmailId,
        }));
      } else {
        t = exist.studentList.map((el) => ({
          stepName: exist.stepName,
          stepId: exist.stepId,
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
  console.log(values.rounds);

  return (
    <>
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
              name='reason'
              value={values.reason}
              onChange={handleChange}
              className={classes.imput}
              error={touched.reason && Boolean(errors.reason)}
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
                    {selectedRound &&
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
                                            stepId: steps.stepId,
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
                                            stepId: steps.stepId,
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
                      })}
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
                  color='primary'
                  className={classes.newButton}
                  variant='contained'
                  onClick={_submit}
                />
                <Controls.ActionButton
                  style={{ marginTop: '1rem' }}
                  disabled={!values?.rounds?.stepId}
                  href={`${process.env.REACT_APP_API_URL}/api/v1/event/${id}/wallsteps/${values?.rounds?.stepId}`}
                >
                  <CloudDownloadIcon
                    fontSize='large'
                    style={{
                      color: !values?.rounds?.stepId ? 'gray' : 'green',
                    }}
                  />
                </Controls.ActionButton>
                <Controls.Button
                  disabled={flag}
                  text='Submit'
                  color='primary'
                  className={classes.newButton1}
                  variant='contained'
                  onClick={() => console.log(values)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
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
  imput: { width: '100%', marginTop: 8 },
  autocompleteTextinput: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  main: { justifyContent: 'space-evenly', marginTop: '2%', alignItems: 'center', display: 'flex' },
});
