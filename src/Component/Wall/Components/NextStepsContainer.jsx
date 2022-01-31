import React, { useState, useEffect } from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { WebinarTabContainer } from '../Assets/Styles/WallStyles';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../Utils/controls/Controls';
import { FieldArray, Field } from 'formik';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    gap: '2rem',
    height: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webinarInput: {
    height: '20%',
    display: 'flex',
    width: '30%',
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
  const [tabCount, setTabCount] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // dispatch(listAllWallWebinars());
  }, [dispatch]);

  const StepFields = () => {
    return (
      <WebinarTabContainer>
        <FieldArray
          name='nextSteps'
          render={(arrayHelpers) => (
            <div>
              {values?.nextSteps?.map((_, index) => (
                <>
                  <RadioGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '10px',
                      alignItems: 'center',
                    }}
                    aria-label='type'
                    disabled
                    name={`nextSteps.${index}.status`}
                    onChange={(e, value) => {
                      setFieldValue(`nextSteps.${index}.status`, value);
                    }}
                  >
                    <h6 style={{ marginRight: '1rem', fontWeight: 'bold' }}>Step {index + 1}:</h6>
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

                  <div key={index} className={classes.input}>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Heading</h6>
                      <Field className={classes.spacer} name={`nextSteps.${index}.heading`} />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Sub Heading</h6>
                      <Field className={classes.spacer} name={`nextSteps.${index}.subheading`} />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Message</h6>
                      <Field className={classes.spacer} name={`nextSteps.${index}.message`} />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Google Form Link</h6>
                      <Field className={classes.spacer} name={`nextSteps.${index}.formLink`} />
                    </div>
                    <Controls.ActionButton onClick={() => arrayHelpers.remove(index)}>
                      <RemoveCircleIcon fontSize='large' color='secondary' />
                    </Controls.ActionButton>
                  </div>
                </>
              ))}
              <Controls.ActionButton
                onClick={() =>
                  arrayHelpers.push({
                    status: '',
                    heading: '',
                    subheading: '',
                    message: '',
                    formLink: '',
                  })
                }
              >
                <AddBoxIcon fontSize='large' color='primary' /> Next Step
              </Controls.ActionButton>
            </div>
          )}
        />
      </WebinarTabContainer>
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
