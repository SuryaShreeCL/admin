import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Controls from '../../Utils/controls/Controls';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { data } from './SampleData';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { CloudCircleOutlined } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

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
})((props) => (
  <Checkbox
    // checkedIcon={
    //   <CloseIcon
    //     style={{
    //       backgroundColor: '#8B0303',
    //       color: '#fff',
    //       borderRadius: '4px',
    //       height: 20,
    //       width: 20,
    //     }}
    //   />
    // }
    color='default'
    {...props}
  />
));

export default function Result() {
  const classes = useStyles();

  const selector_Data = [
    {
      name: 'All',
    },
    {
      name: 'Accepted',
    },
    {
      name: 'Rejected',
    },
  ];

  const validationSchema = yup.object({
    studentSelector: yup
      .object()
      .nullable()
      .required(),
    rounds: yup
      .object()
      .nullable()
      .required(),
    reason: yup.string().required(),
  });

  const handleSave = () => {};

  const formik = useFormik({
    initialValues: {
      rounds: [],
      studentSelector: [],
      reason: [],
    },
    validationSchema: validationSchema,
    onSubmit: handleSave,
  });

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
    <>
      <div>
        <Grid container spacing={3} direction='row' className={classes.main}>
          <Grid item md={1}></Grid>
          <Grid item md={3}>
            <FormControl className={classes.width}>
              <Autocomplete
                id='rounds'
                name='rounds'
                getOptionLabel={(option) => option?.stepName}
                options={data.data.stepDetailsModelList ?? []}
                onChange={(e, value) => {
                  setFieldValue('rounds', value);
                }}
                value={values.rounds}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Rounds'
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
                }}
                value={values.studentSelector}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    contentEditable={false}
                    label='Student Selector'
                    name='studentSelector'
                    variant='outlined'
                    error={
                      touched.studentSelector && Boolean(errors.studentSelector)
                    }
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
                          control={<GreenCheckbox name='checkedG' />}
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
                        />
                      </div>
                    </TableCell>

                    <TableCell className={classes.heading}>User Name</TableCell>
                    <TableCell className={classes.heading}>Email</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ color: 'transparent' }}>
                      ugyuuyiuhij
                    </TableCell>
                    <TableCell style={{ color: 'transparent' }}>
                      ugyuuyiuhij
                    </TableCell>
                    <TableCell style={{ color: 'transparent' }}>
                      ugyuuyiuhij
                    </TableCell>
                  </TableRow>
                </TableHead>
                <ThemeProvider theme={tableTheme}>
                  <TableBody>
                    {data.data.stepDetailsModelList.map((steps) => {
                      return (
                        <>
                          {steps.studentList.map((item) => {
                            return (
                              <TableRow>
                                <TableCell className={classes.box}>
                                  <FormControlLabel
                                    className={classes.transparent}
                                    control={<GreenCheckbox name='checkedG' />}
                                  />
                                  <FormControlLabel
                                    className={classes.transparent}
                                    control={<RedCheckbox name='checkedB' />}
                                  />
                                </TableCell>

                                <TableCell className={classes.color}>
                                  {item.studentName}
                                </TableCell>
                                <TableCell className={classes.color}>
                                  {item.studentEmailId}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      );
                    })}
                  </TableBody>
                </ThemeProvider>
              </Table>
              <Grid container>
                <Grid item md={11}></Grid>
                <Grid item md={1}>
                  <Controls.Button
                    text='Submit'
                    type='submit'
                    color='primary'
                    className={classes.newButton}
                    variant='contained'
                    onClick={handleSubmit}
                  />
                </Grid>
              </Grid>
            </TableContainer>
            <Grid container>
              <Grid item md={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item md={9}></Grid>
              <Grid item md={3}>
                <Controls.Button
                  text='Update'
                  type='submit'
                  color='primary'
                  className={classes.newButton1}
                  variant='contained'
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
  },
  newButton1: {
    borderRadius: '24px',
    width: 130,
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
  main: { marginTop: '1%' },
});
