import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useForm, Form } from '../components/useForm';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
];

const getDepartmentCollection = () => [
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' },
];

const careerlabsProducts = ['ACS', 'GMAT', 'GRE'];

const initialFValues = {
  studentName: '',
  avatar: '',
  mixedTag: '',
  gender: 'male',
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
        <Grid item xs={6}>
          <Controls.Input
            name='studentName'
            label='Full Name'
            value={values.studentName}
            onChange={handleInputChange}
            error={errors.studentName}
          />
          <Controls.Input
            label='Products'
            name='products'
            value={values.products}
            onChange={handleInputChange}
            error={errors.products}
          />
          <Controls.Input
            label='Avatar'
            name='avatar'
            value={values.avatar}
            onChange={handleInputChange}
            error={errors.avatar}
          />
          <Controls.Input
            label='Tagging'
            name='mixedTag'
            value={values.mixedTag}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='gender'
            label='Gender'
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          {/* <Autocomplete
            multiple
            id='checkboxes-tags-demo'
            onSelect={(e, newValue) => initialFValues.products.push(newValue)}
            options={careerlabsProducts}
            disableCloseOnSelect
            name='products'
            label='Products'
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
          /> */}
          <Controls.Select
            name='department'
            label='Department'
            value={values.department}
            onChange={handleInputChange}
            options={getDepartmentCollection()}
            error={errors.department}
          />
          <Controls.DatePicker
            name='testimonialDate'
            label='Testimonial Date'
            value={values.testimonialDate}
            onChange={handleInputChange}
          />
          {/* <Controls.Checkbox
            name='isPermanent'
            label='Permanent Employee'
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}
          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button text='Reset' color='default' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
