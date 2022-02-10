import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { NextStepsContainerStyle } from '../Assets/Styles/WallStyles';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../Utils/controls/Controls';
import { FieldArray, Field } from 'formik';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    width: '100%',
    marginTop: '1rem',
  },
  inputWidth: { width: '300px' },
  spacer: {
    width: '100%',
    marginBottom: '1.2rem',
    padding: '0.5rem',
  },
  addStepBtn: {
    borderRadius: '26px',
  },
  fieldStep: {
    border: '1px solid #dbdadab9',
    marginBottom: '1rem',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldlabel: { color: '#052A4E', fontSize: '0.8rem' },
});

const DynamicFormContainer = React.memo(({ values, setFieldValue, handleChange }) => {
  const classes = useStyles();

  // const Types = ['Text', 'Multiple Choice', 'File Upload', 'Resume Uplaod'];
  const Types = () => [
    { id: '1', title: 'Text' },
    { id: '2', title: 'Multiple Choice' },
    { id: '3', title: 'File Upload' },
    { id: '4', title: 'Resume Upload' },
  ];

  const DynamicForm = () => {
    return (
      <NextStepsContainerStyle>
        <FieldArray
          name='formFields'
          render={(arrayHelpers) => (
            <div>
              {values?.formFields?.map((option, index) => (
                <div className={classes.fieldStep}>
                  <div key={`formFields.${index}`} className={classes.input}>
                    {option.type === 'Text' && (
                      <div className={classes.inputWidth}>
                        <h6 className={classes.fieldlabel}>Enter Your Quesiton</h6>
                        <Field className={classes.spacer} name={`formFields.${index}.textField`} />
                      </div>
                    )}
                    {option.type === 'File Upload' && (
                      <div className={classes.inputWidth}>
                        <h6 className={classes.fieldlabel}>Enter Your Quesiton</h6>
                        <Field className={classes.spacer} name={`formFields.${index}.uploadText`} />
                      </div>
                    )}
                    {option.type === 'Resume Upload' && (
                      <div className={classes.inputWidth}>
                        <h6 className={classes.fieldlabel}>Enter Your Quesiton</h6>
                        <Field className={classes.spacer} name={`formFields.${index}.resumeText`} />
                      </div>
                    )}
                    {option.type === 'Multiple Choice' && (
                      <div style={{ width: '300px' }}>
                        <div className={classes.inputWidth}>
                          <h6 className={classes.fieldlabel}>Enter Your Quesiton</h6>
                          <Field
                            className={classes.spacer}
                            name={`formFields.${index}.multiText`}
                          />
                        </div>
                        <div className={classes.inputWidth}>
                          <h6 className={classes.fieldlabel}>Choice 1</h6>
                          <Field
                            className={classes.spacer}
                            name={`formFields.${index}.multiChoice.choiceOne`}
                          />
                        </div>
                        <div className={classes.inputWidth}>
                          <h6 className={classes.fieldlabel}>Choice 2</h6>
                          <Field
                            className={classes.spacer}
                            name={`formFields.${index}.multiChoice.choiceTwo`}
                          />
                        </div>
                      </div>
                    )}

                    <Controls.Select
                      label='Answer Type'
                      name={`formFields.${index}.type`}
                      size='300px'
                      value={option.type}
                      onChange={(e) => {
                        setFieldValue(`formFields.${index}.type`, e.target.value);
                      }}
                      options={Types()}
                    />

                    <Controls.ActionButton
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}
                    >
                      <RemoveCircleIcon fontSize='large' color='secondary' />
                    </Controls.ActionButton>
                  </div>
                </div>
              ))}
              <Controls.Button
                text='Add Question'
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                className={classes.addStepBtn}
                onClick={() =>
                  arrayHelpers.push({
                    type: 'Text',
                    textField: '',
                    multiChoice: [{ choiceOne: '', choiceTwo: '' }],
                    multiText: '',
                    uploadText: '',
                    resumeText: '',
                  })
                }
              />
              <Controls.Button
                text='Save'
                variant='contained'
                color='primary'
                className={classes.addStepBtn}
              />
            </div>
          )}
        />
      </NextStepsContainerStyle>
    );
  };

  return (
    <Grid container>
      <Grid item md={12}>
        {DynamicForm()}
      </Grid>
    </Grid>
  );
});

export default DynamicFormContainer;
