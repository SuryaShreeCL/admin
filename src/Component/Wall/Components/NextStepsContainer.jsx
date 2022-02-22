import React, { useState } from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { NextStepsContainerStyle } from '../Assets/Styles/WallStyles';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../Utils/controls/Controls';
import Popup from '../../Utils/Popup';
import { FieldArray, Field } from 'formik';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import DynamicFormContainer from './DynamicForm';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CheckCircle from '@material-ui/icons/CheckCircle';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { uploadPostTestStatusByStepId } from '../../../Actions/TestActions';

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
  addStepBtn: {
    borderRadius: '26px',
  },
  fieldStep: {
    border: '1px solid #dbdadab9',
    marginBottom: '1rem',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
  },
  fieldlabel: { color: '#052A4E', fontSize: '0.8rem' },
});

const NextStepsContainer = React.memo(({ values, setFieldValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);

  //to handle the form popup where it will open just once based on the index
  const [formPopIdx, setFormPopIdx] = useState(0);

  const [statusFileUploadDisabled, setStatusFileUploadDisabled] = useState(false);

  const onStatusUpload = (value, index) => {
    setFieldValue(`wallSteps.${index}.isStatusUploaded`, value);
  };

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

  const handlePremiumUsersSheetUpload = async (e, stepId, formFieldsData) => {
    // if(formFieldsData?.premiumUsersCategories[0]?.name == "4th Year Premium"){
    const file = e.currentTarget.files[0];
    const fileType = e.currentTarget.files[0].name;
    setStatusFileUploadDisabled(true);
    // File type must be sheet, .xlsx, .xls
    if (fileType.includes('.xlsx') || fileType.includes('.xls')) {
      let formData = new FormData();
      formData.append('file', e.currentTarget.files[0]);
      dispatch(
        uploadPostTestStatusByStepId(formData, stepId, (response) => {
          if (response.message == 'Upload Success') {
            setStatusFileUploadDisabled(false);
          } else if (response.message == 'Invalid Details Found') {
            setStatusFileUploadDisabled(false);
          } else {
            setStatusFileUploadDisabled(false);
          }
        })
      );
    } else {
      setStatusFileUploadDisabled(false);
    }
  };

  const StepFields = () => {
    return (
      <NextStepsContainerStyle>
        <h6
          style={{
            marginBottom: '1rem',
            fontWeight: 'bold',
          }}
        >
          Next Steps
        </h6>
        <FieldArray
          name='wallSteps'
          render={(arrayHelpers) => (
            <div>
              {values?.wallSteps?.map((val, index) => (
                <div className={classes.fieldStep}>
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
                      value='todo'
                      control={<Radio color='primary' />}
                      label='Todo'
                    />
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
                    {/* {index === 0 && (
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <h6 className={classes.fieldlabel}>Google Form Link</h6>
                        <Field className={classes.spacer} name={`wallSteps.${index}.url`} />
                      </div>
                    )} */}
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
                  <div>
                    {!val?.form?.id && (
                      <FormControlLabel
                        disabled={statusFileUploadDisabled}
                        // value='uploadStatusFile'
                        control={
                          <input
                            hidden
                            type='file'
                            onChange={(e) => handlePremiumUsersSheetUpload(e, index, values)}
                            onClick={(e) => (e.currentTarget = null)}
                          />
                        }
                        label={[
                          <CloudUploadIcon
                            fontSize='small'
                            style={{
                              color: 'green',
                            }}
                          />,
                          !statusFileUploadDisabled ? ' Upload Status File' : ' Uploading...',
                        ]}
                      />
                    )}

                    {!val?.form?.id ? (
                      <Controls.ActionButton
                        disabled={false}
                        onClick={() => {
                          setFormPopIdx(index);
                          setOpenPopup(true);
                        }}
                      >
                        <AddBoxIcon fontSize='small' color='primary' /> &nbsp; Add Form
                      </Controls.ActionButton>
                    ) : (
                      <>
                        <Controls.ActionButton>
                          <CheckCircle
                            fontSize='small'
                            style={{
                              color: 'green',
                            }}
                          />
                          &nbsp; Form Created
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          onClick={() => {
                            setFormPopIdx(index);
                            setOpenPopup(true);
                          }}
                        >
                          <EditOutlinedIcon fontSize='small' color='primary' /> &nbsp;Edit Form
                        </Controls.ActionButton>
                      </>
                    )}
                    <Controls.ActionButton disabled={!val?.form?.id}>
                      <CloudDownloadIcon
                        fontSize='small'
                        style={{
                          color: val?.form?.id ? 'green' : 'gray',
                        }}
                      />
                      &nbsp; Download
                    </Controls.ActionButton>
                  </div>
                  <Popup
                    title='Add or Edit Form'
                    openPopup={openPopup && index === formPopIdx}
                    setOpenPopup={setOpenPopup}
                  >
                    <DynamicFormContainer
                      formValues={val.form}
                      //passing the index to show the state as per the index object
                      formIdx={index}
                      setFieldValue={setFieldValue}
                      setOpenPopup={setOpenPopup}
                    />
                  </Popup>
                </div>
              ))}
              <Controls.Button
                text='Add Step'
                variant='contained'
                color='primary'
                startIcon={<AddIcon />}
                className={classes.addStepBtn}
                onClick={() =>
                  arrayHelpers.push({
                    status: 'todo',
                    heading: '',
                    subText: '',
                    message: '',
                    url: '',
                    isStatusUploaded: '',
                    form: {
                      formQuestions: [
                        {
                          type: 'TEXT',
                          formQuestionsChoices: [],
                          questionText: '',
                        },
                      ],
                    },
                  })
                }
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
        {StepFields()}
      </Grid>
    </Grid>
  );
});

export default NextStepsContainer;
