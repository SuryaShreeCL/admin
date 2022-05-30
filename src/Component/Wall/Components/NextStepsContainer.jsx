import React, { useState } from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { NextStepsContainerStyle } from '../Assets/Styles/WallStyles';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../Utils/controls/Controls';
import { Button } from '@material-ui/core';
import Popup from '../../Utils/Popup';
import { ErrorMessage, FieldArray, Field } from 'formik';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import DynamicFormContainer from './DynamicForm';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { uploadPostTestStatusByStepId } from '../../../Actions/TestActions';
import Notification from '../../Utils/Notification';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    gap: '2rem',
    height: '20%',
    alignItems: 'center',
  },
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
    padding: '1rem 1.5rem',
    borderRadius: '10px',
  },
  fieldlabel: { color: '#052A4E', fontSize: '0.8rem' },
  fieldErr: { color: '#ff150d', fontSize: '0.8rem', marginBottom: '10px' },
});

const NextStepsContainer = React.memo(({ values, setFieldValue, setNotify }) => {
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

  const handlePremiumUsersSheetUpload = async (e, stepId) => {
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
            setNotification({
              isOpen: true,
              message: 'File Upload Successfully Done',
              type: 'success',
            });
          } else if (response.message == 'Invalid Details Found') {
            setStatusFileUploadDisabled(false);
            setNotification({
              isOpen: true,
              message: response.message,
              type: 'error',
            });
          } else {
            setStatusFileUploadDisabled(false);
            setNotification({
              isOpen: true,
              message: 'Please try later! Not able to upload file',
              type: 'error',
            });
          }
        })
      );
    } else {
      setStatusFileUploadDisabled(false);
      setNotification({
        isOpen: true,
        message: 'Please upload an xlsx or xls file',
        type: 'error',
      });
    }
  };

  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

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
                      <ErrorMessage
                        name={`wallSteps.${index}.heading`}
                        render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                      />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Sub Heading</h6>
                      <Field className={classes.spacer} name={`wallSteps.${index}.subText`} />
                      <ErrorMessage
                        name={`wallSteps.${index}.subText`}
                        render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                      />
                    </div>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <h6 className={classes.fieldlabel}>Message</h6>
                      <Field className={classes.spacer} name={`wallSteps.${index}.message`} />
                      <ErrorMessage
                        name={`wallSteps.${index}.message`}
                        render={(msg) => <p className={classes.fieldErr}>{msg}</p>}
                      />
                    </div>

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
                    {/* {val?.id && (
                        <Button
                          variant='contained'
                          component='label'
                          disabled={statusFileUploadDisabled}
                          style={{
                            backgroundColor: '#fff',
                            textTransform: 'none',
                          }}
                        >
                          {
                            <CloudUploadIcon
                              fontSize='small'
                              style={{
                                color: 'green',
                              }}
                            />
                          }
                          &nbsp;&nbsp;&nbsp;
                          {!statusFileUploadDisabled
                            ? 'Upload Status File'
                            : 'Uploading...'}
                          <input
                            hidden
                            type='file'
                            onChange={(e) =>
                              handlePremiumUsersSheetUpload(e, val.id, values)
                            }
                            onClick={(e) => (e.currentTarget = null)}
                          />
                        </Button>
                      )} */}
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
                      <Controls.ActionButton
                        onClick={() => {
                          setFormPopIdx(index);
                          setOpenPopup(true);
                        }}
                      >
                        <EditOutlinedIcon fontSize='small' color='primary' /> &nbsp;Edit Form
                      </Controls.ActionButton>
                    )}
                    <Controls.ActionButton
                      disabled={!val?.form?.id}
                      href={`${process.env.REACT_APP_API_URL}/api/v1/event/${values.id}/wallsteps/${val.id}`}
                    >
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
                      setNotify={setNotify}
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
                    form: null,
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
      <Notification notify={notification} setNotify={setNotification} />
    </Grid>
  );
});

export default NextStepsContainer;
