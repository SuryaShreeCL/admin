import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useForm, Form } from '../components/useForm';
import LabelledOutline from '../components/LabelledOutline';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
];

const getDepartmentCollection = () => [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' },
];

const getOriginCollection = () => [
  { id: '1', title: 'Careerlabs' },
  { id: '2', title: 'Quora' },
  { id: '3', title: 'Facebook' },
  { id: '4', title: 'Email' },
];

const careerlabsProducts = ['ACS', 'GMAT', 'GRE'];

// const [initialFValues, setinitialFValues] = useState({
//   studentName: '',
//   avatar: '',
//   scores: { gre: '', gmat: '' },
//   mixedTag: '',
//   yearOfPassing: '',
//   testimonialOrigin: '',
//   graduatingCollege: { name: '', logo: '' },
//   company: { name: '', workExp: '' },
//   program: { name: '', acronym: '' },
//   textTestimonial: { tagLine: '', fullTestimonial: '' },
//   videoTestimonial: { tagLine: '', videoLink: '' },
//   gender: '',
//   admitCollege: { name: '', logo: '', country: '', intake: '' },
//   interviewCallsFrom: [{ name: '', logo: '' }],
//   products: [],
//   department: '',
//   testimonialDate: new Date(),
// });

const initialFValues = {
  studentName: '',
  avatar: '',
  scores: { gre: '', gmat: '' },
  mixedTag: '',
  yearOfPassing: '',
  testimonialOrigin: '',
  graduatingCollege: { name: '', logo: '' },
  company: { name: '', workExp: '' },
  program: { name: '', acronym: '' },
  textTestimonial: { tagLine: '', fullTestimonial: '' },
  videoTestimonial: { tagLine: '', videoLink: '' },
  gender: '',
  admitCollege: { name: '', logo: '', country: '', intake: '' },
  interviewCallsFrom: [{ name: '', logo: '' }],
  products: [],
  department: '',
  testimonialDate: new Date(),
};

export default function TestimonialForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('studentName' in fieldValues)
      temp.studentName = fieldValues.studentName ? '' : 'This field is required.';
    // if ('email' in fieldValues)
    //   temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
    // if ('mobile' in fieldValues)
    //   temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
    // if ('department' in fieldValues)
    //   temp.department = fieldValues.department.length != 0 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item>
          <LabelledOutline id='BSD' label='Basic Details'>
            <Controls.Input
              name='studentName'
              label='Student Name'
              value={values.studentName}
              onChange={handleInputChange}
              error={errors.studentName}
            />
            <Controls.Input
              label='Avatar'
              name='avatar'
              value={values.avatar}
              onChange={handleInputChange}
              error={errors.avatar}
            />
            <Controls.Input
              label='Graduating College Name'
              name='graduatingCollege'
              value={values.graduatingCollege.name}
              onChange={handleInputChange}
            />
            <Controls.Input
              label='Graduating College Logo'
              name='graduatingCollege'
              value={values.graduatingCollege.logo}
              onChange={handleInputChange}
            />
            <Controls.RadioGroup
              name='gender'
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
            <Controls.Input
              label='Year Of Passing'
              name='yearOfPassing'
              value={values.yearOfPassing}
              onChange={handleInputChange}
            />
            <Controls.Select
              name='department'
              label='Department'
              value={values.department}
              onChange={handleInputChange}
              options={getDepartmentCollection()}
              error={errors.department}
            />
            <Controls.Select
              label='Testimonial Origin'
              name='testimonialOrigin'
              value={values.testimonialOrigin}
              onChange={handleInputChange}
              options={getOriginCollection()}
            />
            <Controls.Input
              label='Company'
              name='company'
              value={values.company.name}
              onChange={handleInputChange}
            />
            <Controls.Input
              label='Work Experience'
              name='workExp'
              value={values.company.workExp}
              onChange={handleInputChange}
            />
            <Autocomplete
              multiple
              style={{ width: '400px' }}
              id='checkboxes-tags-demo'
              // onSelect={(e, newValue) => initialFValues.products.push(newValue)}
              options={careerlabsProducts}
              disableCloseOnSelect
              name='products'
              // label='Products'
              value={values.products}
              // onChange={handleInputChange}
              getOptionLabel={(option) => option}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Checkboxes'
                  placeholder='Favorites'
                />
              )}
            />
          </LabelledOutline>
        </Grid>
        <Grid item>
          <LabelledOutline id='PD' label='Program Details'>
            <Controls.Input
              name='program'
              label='Progam'
              value={values.program.name}
              onChange={handleInputChange}
            />
            <Controls.Input
              name='acronym'
              label='Acronym'
              value={values.program.acronym}
              onChange={handleInputChange}
            />
            <Controls.Input
              name='scores'
              label='GRE Score'
              value={values.scores.gre}
              onChange={handleInputChange}
            />
            <Controls.Input
              name='scores'
              label='GMAT Score'
              value={values.scores.gmat}
              onChange={handleInputChange}
            />
            <Controls.Input
              label='Admit College Name'
              name='admitCollege'
              value={values.admitCollege.name}
              onChange={handleInputChange}
            />
            <Controls.Input
              label='Admit College Logo'
              name='admitCollege'
              value={values.admitCollege.logo}
              onChange={handleInputChange}
            />
            <Controls.Input
              label='Admit College Country'
              name='admitCollege'
              value={values.admitCollege.country}
              onChange={handleInputChange}
            />
            <Controls.Input
              label='Admit College intake'
              name='admitCollege'
              value={values.admitCollege.intake}
              onChange={handleInputChange}
            />
            {/* {values.interviewCallsFrom.map((call, i) => {
              return (
                <div key={i}>
                  <Controls.Input
                    label='Interview Calls From'
                    name='interviewCallFrom'
                    value={call.name}
                    onChange={handleInputChange}
                  />
                  <Controls.Input
                    label='Interview Company Logo'
                    name='interviewCallsFrom'
                    value={call.logo}
                    onChange={handleInputChange}
                  />
                </div>
              );
            })} */}
            <Controls.Input
              label='Interview Calls From'
              name='interviewCallFrom'
              value={values.interviewCallsFrom.name}
              onChange={handleInputChange}
              error={errors.avatar}
            />
            <Controls.Input
              label='Interview Company Logo'
              name='interviewCallsFrom'
              value={values.interviewCallsFrom.logo}
              onChange={handleInputChange}
              error={errors.avatar}
            />
            <Controls.Input
              label='Tagging'
              name='mixedTag'
              value={values.mixedTag}
              onChange={handleInputChange}
            />
            <Controls.DatePicker
              name='testimonialDate'
              label='Testimonial Date'
              value={values.testimonialDate}
              onChange={handleInputChange}
            />
          </LabelledOutline>
        </Grid>
        <Grid item xs={6}>
          <LabelledOutline id='VT' label='Video Testimonial'>
            <Controls.Input
              style={{ width: '500px', marginBottom: '10px' }}
              name='videoTestimonial'
              label='Video Tag Line'
              value={values.videoTestimonial.tagLine}
              onChange={handleInputChange}
            />
            <Controls.Input
              style={{ width: '500px', marginBottom: '10px' }}
              label='Video Link'
              name='videoTestimonial'
              value={values.videoTestimonial.videoLink}
              onChange={handleInputChange}
            />
          </LabelledOutline>
        </Grid>
        <Grid item xs={6}>
          <LabelledOutline id='TT' label='Text Testimonial'>
            <Controls.Input
              style={{ width: '500px', marginBottom: '10px' }}
              name='textTestimonial'
              label='Text Tag Line'
              value={values.textTestimonial.tagLine}
              onChange={handleInputChange}
            />
            <Controls.Input
              style={{ width: '500px', marginBottom: '10px' }}
              label='Full Testimonial'
              name='textTestimonial'
              value={values.textTestimonial.fullTestimonial}
              onChange={handleInputChange}
            />
          </LabelledOutline>
        </Grid>
      </Grid>
      <div>
        <Controls.Button type='submit' text='Submit' />
        <Controls.Button text='Reset' color='default' onClick={resetForm} />
      </div>
    </Form>
  );
}
