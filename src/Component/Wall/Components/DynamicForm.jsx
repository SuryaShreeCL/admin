import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../Utils/controls/Controls';
import { ErrorMessage, FieldArray, Field } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Icons
import MULTIPLECHOICE from '@material-ui/icons/ShortTextRounded';
import FILEUPLOAD from '@material-ui/icons/ArrowUpward';
import TEXT from '@material-ui/icons/TextFormatRounded';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    width: '100%',
  },
  actionBtns: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputWidth: { width: '100%' },
  spacer: {
    width: '100%',
    marginBottom: '10px',
    padding: '0.5rem',
  },
  addStepBtn: {
    borderRadius: '26px',
  },
  fieldStep: {
    border: '1px solid #dbdadab9',
    marginBottom: '1rem',
    padding: '14px 1.5rem',
    borderRadius: '10px',
    display: 'flex',
    width: '850px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldlabel: { color: '#052A4E', fontSize: '0.8rem' },
  fieldErr: { color: '#ff150d', fontSize: '0.8rem' },
});

const DynamicFormContainer = React.memo(
  ({ formValues, formIdx, setFieldValue, setOpenPopup, submitForm }) => {
    const classes = useStyles();

    const Types = () => [
      { id: 'TEXT', answerType: 'Text', icon: <TEXT /> },
      { id: 'MULTIPLECHOICE', answerType: 'Multiple Choice', icon: <MULTIPLECHOICE /> },
      { id: 'FILEUPLOAD', answerType: 'File Upload', icon: <FILEUPLOAD /> },
    ];

    const DynamicForm = () => {
      return (
        <>
          <FieldArray
            name={`wallSteps.${formIdx}.form.formQuestions`}
            render={(arrayHelpers) => (
              <div>
                {formValues?.formQuestions?.map((option, index) => (
                  <div className={classes.fieldStep}>
                    <div key={index} className={classes.input}>
                      {(option.type === 'TEXT' || option.type === 'FILEUPLOAD') && (
                        <div className={classes.inputWidth}>
                          <h6 className={classes.fieldlabel}>Enter Your Quesiton</h6>
                          <Field
                            className={classes.spacer}
                            name={`wallSteps.${formIdx}.form.formQuestions.${index}.questionText`}
                          />
                          <ErrorMessage
                            name={`wallSteps.${formIdx}.form.formQuestions.${index}.questionText`}
                            render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                          />
                        </div>
                      )}
                      {option.type === 'MULTIPLECHOICE' && (
                        <div className={classes.inputWidth}>
                          <div className={classes.inputWidth}>
                            <h6 className={classes.fieldlabel}>Enter Your Quesiton</h6>
                            <Field
                              className={classes.spacer}
                              name={`wallSteps.${formIdx}.form.formQuestions.${index}.questionText`}
                            />
                            <ErrorMessage
                              name={`wallSteps.${formIdx}.form.formQuestions.${index}.questionText`}
                              render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                            />
                          </div>
                          <div className={classes.inputWidth}>
                            <h6 className={classes.fieldlabel}>Choice 1</h6>
                            <Field
                              className={classes.spacer}
                              name={`wallSteps.${formIdx}.form.formQuestions.${index}.formQuestionsChoices[0].questionChoice`}
                            />
                            <ErrorMessage
                              name={`wallSteps.${formIdx}.form.formQuestions.${index}.formQuestionsChoices[0].questionChoice`}
                              render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                            />
                          </div>
                          <div className={classes.inputWidth}>
                            <h6 className={classes.fieldlabel}>Choice 2</h6>
                            <Field
                              className={classes.spacer}
                              name={`wallSteps.${formIdx}.form.formQuestions.${index}.formQuestionsChoices[1].questionChoice`}
                            />
                            <ErrorMessage
                              name={`wallSteps.${formIdx}.form.formQuestions.${index}.formQuestionsChoices[1].questionChoice`}
                              render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                            />
                          </div>
                        </div>
                      )}
                      <div style={{ display: 'flex', marginTop: '10px' }}>
                        <Controls.FormSelect
                          label='Answer Type'
                          name={`wallSteps.${formIdx}.form.formQuestions.${index}.type`}
                          size='300px'
                          value={option.type}
                          onChange={(e) => {
                            setFieldValue(
                              `wallSteps.${formIdx}.form.formQuestions.${index}.type`,
                              e.target.value
                            );
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
                  </div>
                ))}
                <div className={classes.actionBtns}>
                  <Controls.Button
                    text='Add Question'
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                    className={classes.addStepBtn}
                    onClick={() =>
                      arrayHelpers.push({
                        type: 'TEXT',
                        formQuestionsChoices: [],
                        questionText: '',
                      })
                    }
                  />
                  {formValues?.formQuestions?.length > 0 && (
                    <Controls.Button
                      text='Save'
                      startIcon={<SaveIcon />}
                      variant='contained'
                      // type='submit'
                      color='primary'
                      // onClick={submitForm}
                      onClick={() => setOpenPopup(false)}
                      className={classes.addStepBtn}
                    />
                  )}
                </div>
              </div>
            )}
          />
        </>
      );
    };

    return (
      <Grid container>
        <Grid item md={12}>
          {DynamicForm()}
        </Grid>
      </Grid>
    );
  }
);

export default DynamicFormContainer;
