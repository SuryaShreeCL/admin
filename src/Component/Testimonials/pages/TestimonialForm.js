import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LabelledOutline from '../components/controls/LabelledOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/styles';
import { Formik, FieldArray, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getBranches, getAllColleges } from '../../../Actions/College';
import { viewCollege } from '../../../Actions/Aspiration';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const genderItems = [
  { id: '1', title: 'Male' },
  { id: '2', title: 'Female' },
];

const Tags = () => [
  { id: '1', title: 'Good' },
  { id: '2', title: 'Moderate' },
  { id: '3', title: 'Excellent' },
];

const getOrigin = () => [
  { id: '1', title: 'Careerlabs' },
  { id: '2', title: 'Quora' },
  { id: '3', title: 'Facebook' },
  { id: '4', title: 'Email' },
  { id: '5', title: 'WhatsApp' },
];

const getProducts = () => [
  { id: '1', title: 'GMAT' },
  { id: '2', title: 'GRE' },
  { id: '3', title: 'MBA Admission' },
  { id: '4', title: 'Profile Builder' },
  { id: '5', title: 'ACS' },
];

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' },
  spacer: {
    padding: '1rem',
    margin: theme.spacing(1),
    borderRadius: '5px',
    width: '200px',
    border: '1px solid gray',
  },
  shortSpacer: {
    width: '100px',
    padding: '1rem 5px',
    margin: theme.spacing(1),
    borderRadius: '5px',
    border: '1px solid gray',
  },
}));

const initialValues = {
  studentName: '',
  avatar: '',
  scores: { gre: 0, gmat: 0 },
  mixedTag: '',
  yearOfPassing: 0,
  testimonialOrigin: '',
  graduatingCollege: { name: '', logo: '' },
  company: { name: '', workExp: 0, logo: '' },
  program: { name: '', acronym: '' },
  textTestimonial: { tagLine: '', fullTestimonial: '' },
  videoTestimonial: { tagLine: '', videoLink: '' },
  gender: '',
  admitCollege: { name: '', logo: '', country: '🇺🇸', intake: 0 },
  interviewCallsFrom: [{ name: '', logo: '' }],
  companyCalls: [{ name: '', logo: '' }],
  products: '',
  department: '',
  testimonialDate: new Date(),
};

export default function TestimonialForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { addOrEdit, recordForEdit } = props;

  const [records, setRecords] = useState(recordForEdit);

  const { BranchList } = useSelector((state) => state.CollegeReducer);
  const { allCollegeList } = useSelector((state) => state.CollegeReducer);
  const { viewCollegeList } = useSelector((state) => state.AspirationReducer);

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getAllColleges());
    dispatch(viewCollege(0, 24, null));

    //SETTING PRE POPULATED RECORD
    if (records != null)
      setRecords({
        ...recordForEdit,
      });
  }, [recordForEdit, dispatch]);

  return (
    <Formik
      initialValues={records || initialValues}
      onSubmit={(values, { resetForm }) => {
        addOrEdit(values, resetForm);
        resetForm();
      }}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, resetForm, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit}>
          {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          <Grid container>
            <Grid item>
              <LabelledOutline id='BSD' label='Basic Details'>
                <Controls.Input
                  name='studentName'
                  label='Student Name'
                  value={values.studentName}
                  onChange={handleChange}
                />
                <Controls.Input
                  label='Avatar Link'
                  name='avatar'
                  value={values.avatar}
                  onChange={handleChange}
                />
                <Autocomplete
                  id='graduatingCollege'
                  name='graduatingCollege.name'
                  getOptionSelected={(option, value) => option.value === value.name}
                  options={allCollegeList.map((clg) => clg.name ?? [])}
                  onChange={(e, value) => {
                    setFieldValue(
                      'graduatingCollege.name',
                      value !== null ? value : initialValues.graduatingCollege.name
                    );
                  }}
                  value={values.graduatingCollege.name}
                  style={{ width: 250, margin: ' .5em 1em' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Grad College?'
                      name='graduatingCollege.name'
                      variant='outlined'
                    />
                  )}
                />
                <Controls.Input
                  label='Grad College Logo'
                  name='graduatingCollege.logo'
                  value={values.graduatingCollege?.logo}
                  onChange={handleChange}
                />
                <Controls.RadioGroup
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                  items={genderItems}
                />
                <Controls.Input
                  label='Year Of Pass'
                  name='yearOfPassing'
                  type='number'
                  style={{ width: '120px' }}
                  value={values.yearOfPassing}
                  onChange={handleChange}
                />
                <Autocomplete
                  value={values.department}
                  onChange={(e, value) => {
                    setFieldValue('department', value !== null ? value : initialValues.department);
                  }}
                  id='department'
                  getOptionSelected={(option, value) => option.name === value.name}
                  options={BranchList.map((branch) => branch.name) ?? []}
                  style={{ width: 220, margin: ' .5em 1em' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Department'
                      name='department'
                      variant='outlined'
                    />
                  )}
                />
                <Controls.Select
                  label='Testimonial Origin'
                  name='testimonialOrigin'
                  value={values.testimonialOrigin}
                  onChange={handleChange}
                  options={getOrigin()}
                />
                <Controls.Input
                  label='Company'
                  name='company.name'
                  value={values.company?.name}
                  onChange={handleChange}
                />
                <Controls.Input
                  label='Company Logo'
                  name='company.logo'
                  value={values.company?.logo}
                  onChange={handleChange}
                />
                <Controls.Input
                  label='Work Exp'
                  type='number'
                  style={{ width: '100px' }}
                  name='company.workExp'
                  value={values.company?.workExp}
                  onChange={handleChange}
                />
              </LabelledOutline>
            </Grid>
            <Grid item>
              <LabelledOutline id='PD' label='Program Details'>
                <Controls.Input
                  name='program.name'
                  label='Progam'
                  value={values.program?.name}
                  onChange={handleChange}
                />
                <Controls.Input
                  name='program.acronym'
                  label='Acronym'
                  value={values.program?.acronym}
                  onChange={handleChange}
                />
                <Controls.Input
                  name='scores.gre'
                  label='GRE Score'
                  type='number'
                  style={{ width: '120px' }}
                  value={values.scores?.gre}
                  onChange={handleChange}
                />
                <Controls.Input
                  name='scores.gmat'
                  label='GMAT Score'
                  type='number'
                  style={{ width: '120px' }}
                  value={values.scores?.gmat}
                  onChange={handleChange}
                />
                <Autocomplete
                  id='admitCollege'
                  name='admitCollege.name'
                  getOptionSelected={(option, value) => option.value === value.name}
                  options={viewCollegeList?.content?.map((clg) => clg.name) ?? []}
                  onChange={(e, value) => {
                    setFieldValue(
                      'admitCollege.name',
                      value !== null ? value : initialValues.admitCollege.name
                    );
                  }}
                  value={values.admitCollege?.name}
                  style={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Admit College Name'
                      name='admitCollege.name'
                      variant='outlined'
                    />
                  )}
                />
                <Controls.Input
                  label='Admit College Logo'
                  name='admitCollege.logo'
                  value={values.admitCollege?.logo}
                  onChange={handleChange}
                />
                <Controls.Input
                  label='Admit College Country'
                  name='admitCollege.country'
                  value={values.admitCollege?.country}
                  onChange={handleChange}
                />
                <Controls.Input
                  label='Admit College intake'
                  name='admitCollege.intake'
                  type='number'
                  value={values.admitCollege?.intake}
                  onChange={handleChange}
                />
                <Controls.Select
                  label='Tagging'
                  name='mixedTag'
                  value={values.mixedTag}
                  onChange={handleChange}
                  options={Tags()}
                />
                <Controls.DatePicker
                  name='testimonialDate'
                  label='Testimonial Date'
                  value={values.testimonialDate}
                  onChange={handleChange}
                />
                <Controls.Select
                  label='Product'
                  name='products'
                  value={values.products}
                  onChange={handleChange}
                  options={getProducts()}
                />
              </LabelledOutline>
            </Grid>
            <Grid item xs={6}>
              <LabelledOutline id='ICF' label='College Interview Calls'>
                <FieldArray
                  name='interviewCallsFrom'
                  render={(arrayHelpers) => (
                    <div className={classes.root}>
                      {values.interviewCallsFrom.map((interview, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                          <Autocomplete
                            onChange={(e, value) => {
                              setFieldValue(
                                `interviewCallsFrom.${index}.name`,
                                value !== null
                                  ? value
                                  : `initialValues.interviewCallsFrom.${index}.name`
                              );
                            }}
                            id='interviewCalls'
                            getOptionSelected={(option, value) => option.name === value.name}
                            options={viewCollegeList?.content?.map((clg) => clg.name) ?? []}
                            style={{ width: 200 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='College Name'
                                name={`interviewCallsFrom.${index}.name`}
                                variant='outlined'
                              />
                            )}
                          />
                          <Field
                            className={classes.spacer}
                            placeholder='College Logo'
                            name={`interviewCallsFrom.${index}.logo`}
                          />
                          <Controls.ActionButton
                            color='secondary'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <RemoveCircleIcon fontSize='large' />
                          </Controls.ActionButton>
                        </div>
                      ))}
                      <Controls.ActionButton
                        color='primary'
                        onClick={() => arrayHelpers.push({ name: '', logo: '' })}
                      >
                        <AddBoxIcon fontSize='large' />
                      </Controls.ActionButton>
                    </div>
                  )}
                />
              </LabelledOutline>
            </Grid>
            <Grid item xs={6}>
              <LabelledOutline id='CC' label='Company Interview Calls'>
                <FieldArray
                  name='companyCalls'
                  render={(arrayHelpers) => (
                    <div className={classes.root}>
                      {values.companyCalls.map((calls, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                          <Field
                            className={classes.spacer}
                            placeholder='Company Name'
                            name={`companyCalls.${index}.name`}
                          />
                          <Field
                            className={classes.spacer}
                            placeholder='Company Logo'
                            name={`companyCalls.${index}.logo`}
                          />
                          <Controls.ActionButton
                            color='secondary'
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <RemoveCircleIcon fontSize='large' />
                          </Controls.ActionButton>
                        </div>
                      ))}
                      <Controls.ActionButton
                        color='primary'
                        onClick={() => arrayHelpers.push({ name: '', logo: '' })}
                      >
                        <AddBoxIcon fontSize='large' />
                      </Controls.ActionButton>
                    </div>
                  )}
                />
              </LabelledOutline>
            </Grid>

            <Grid item xs={6}>
              <LabelledOutline id='VT' label='Video Testimonial'>
                <Controls.Input
                  style={{ width: '500px', marginBottom: '10px' }}
                  name='videoTestimonial.tagLine'
                  label='Video Tag Line'
                  value={values.videoTestimonial?.tagLine}
                  onChange={handleChange}
                />
                <Controls.Input
                  style={{ width: '500px', marginBottom: '10px' }}
                  label='Video Link'
                  name='videoTestimonial.videoLink'
                  value={values.videoTestimonial?.videoLink}
                  onChange={handleChange}
                />
              </LabelledOutline>
            </Grid>
            <Grid item xs={6}>
              <LabelledOutline id='TT' label='Text Testimonial'>
                <Controls.Input
                  style={{ width: '500px', marginBottom: '10px' }}
                  name='textTestimonial.tagLine'
                  label='Text Tag Line'
                  value={values.textTestimonial?.tagLine}
                  onChange={handleChange}
                />
                <TextareaAutosize
                  aria-label='Full Testimonial'
                  style={{ width: '500px', marginBottom: '4px' }}
                  rowsMin={3}
                  value={values.textTestimonial?.fullTestimonial}
                  onChange={handleChange}
                  placeholder='Write testimonial'
                  name='textTestimonial.fullTestimonial'
                />
              </LabelledOutline>
            </Grid>
          </Grid>
          <Grid item xs={12} align='center'>
            <Controls.Button type='submit' text='Submit' />
            {/* <Controls.Button text='Reset' color='default' onClick={resetForm} /> */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
