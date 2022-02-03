import React, { useState } from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { NextStepsContainerStyle } from '../Assets/Styles/WallStyles';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../Utils/controls/Controls';
import { FieldArray, Field } from 'formik';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import axios from 'axios';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    gap: '2rem',
    height: '20%',
    alignItems: 'center',
  },
  spacer: {
    width: '100%',
    marginBottom: '1.2rem',
    padding: '0.5rem',
  },
  fieldlabel: { color: '#052A4E', fontSize: '0.8rem' },
});

const NextStepsContainer = React.memo(({ values, setFieldValue }) => {
  const classes = useStyles();

  const deleteWallStep = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/wallsteps/${id}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const StepFields = () => {
    return (
      <NextStepsContainerStyle>
        <FieldArray
          name='wallSteps'
          render={(arrayHelpers) => (
            <div>
              {values?.wallSteps?.map((val, index) => (
                <>
                  <RadioGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '10px',
                      alignItems: 'center',
                    }}
                    aria-label='type'
                    name={`wallSteps.${index}.status`}
                    value={val.status}
                    onChange={(e, value) => {
                      setFieldValue(`wallSteps.${index}.status`, value);
                    }}
                  >
                    <h6 style={{ marginRight: '10px', fontWeight: 'bold' }}>Step {index + 1}:</h6>
                    <FormControlLabel
                      value='inprogress'
                      control={<Radio color='primary' />}
                      label='In Progress'
                    />
                    <FormControlLabel
                      value='completed'
                      control={<Radio color='primary' />}
                      label='Completed'
                    />
                  </RadioGroup>
                  <div key={`wallSteps.${index}.heading`} className={classes.input}>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Heading</h6>
                      <Field className={classes.spacer} name={`wallSteps.${index}.heading`} />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Sub Heading</h6>
                      <Field className={classes.spacer} name={`wallSteps.${index}.subText`} />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Message</h6>
                      <Field className={classes.spacer} name={`wallSteps.${index}.message`} />
                    </div>
                    {index === 0 && (
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <h6 className={classes.fieldlabel}>Google Form Link</h6>
                        <Field className={classes.spacer} name={`wallSteps.${index}.url`} />
                      </div>
                    )}
                    {/* Step 1 is Mandatory */}
                    {index !== 0 && (
                      <Controls.ActionButton
                        onClick={() => {
                          if (val.id) deleteWallStep(val.id);
                          arrayHelpers.remove(index);
                        }}
                      >
                        <RemoveCircleIcon fontSize='large' color='secondary' />
                      </Controls.ActionButton>
                    )}
                  </div>
                </>
              ))}
              <Controls.ActionButton
                onClick={() =>
                  arrayHelpers.push({
                    status: 'inprogress',
                    heading: '',
                    subText: '',
                    message: '',
                    url: '',
                  })
                }
              >
                <AddBoxIcon fontSize='large' color='primary' /> Add Step
              </Controls.ActionButton>
            </div>
          )}
        />
      </NextStepsContainerStyle>
    );
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <h6
          style={{
            marginBottom: '1rem',
          }}
        >
          Next Steps
        </h6>
      </Grid>
      <Grid item md={12}>
        {StepFields()}
      </Grid>
    </Grid>
  );
});

export default NextStepsContainer;
