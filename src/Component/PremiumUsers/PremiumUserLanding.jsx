import React, { useState, useEffect } from 'react';
import {
  ButtonsContainer,
  CreatePostContainer,
} from '../Wall/Assets/Styles/CreatePostStyles';
import BackHandler from '../Wall/Components/BackHandler';
import Preview from '../Wall/Components/Preview';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MomentUtils from '@date-io/moment';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Notification from '../Utils/Notification';
import ConfirmDialog from '../Utils/ConfirmDialog';
import Controls from '../Utils/controls/Controls';
import { getWallCategories } from '../../Actions/WallActions';
import { uploadPremiumUsers } from '../../Actions/PremiumUsersActions';

const useStyles = makeStyles({
  root: {
    '& .MuiSelect-root': {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      padding: '1rem',
    },
  },
  captionStyle: {
    width: '80%',
    marginTop: 20,
    marginBottom: 15,
  },
  spacer: {
    width: '80%',
    marginTop: '10px',
  },
  hostImage: {
    borderRadius: '50%',
  },
});

const PremiumUserLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    premiumUsersCategories: [],
  });
  const [uploadDisabled, setUploadDisabled] = useState(false);

  useEffect(() => {
    dispatch(getWallCategories('Live'));
    // dispatch(getPlatforms());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);

  const handlePremiumUsersSheetUpload = async (e, formFieldsData) => {
    console.log('first');
    if (formFieldsData?.premiumUsersCategories[0]?.name == '4th Year Premium') {
      console.log('2');
      const file = e.currentTarget.files[0];
      const fileType = e.currentTarget.files[0].name;
      setUploadDisabled(true);
      // File type must be sheet, .xlsx, .xls
      if (fileType.includes('.csv')) {
        let formData = new FormData();
        formData.append('file', e.currentTarget.files[0]);
        dispatch(
          uploadPremiumUsers(formData, (response) => {
            if (response.message == 'Upload Success') {
              setUploadDisabled(false);
              setNotify({
                isOpen: true,
                message: 'File Upload Successfully Done',
                type: 'success',
              });
            } else if (response.message == 'Invalid Details Found') {
              setUploadDisabled(false);
              setNotify({
                isOpen: true,
                message: response.message,
                type: 'error',
              });
            } else {
              setUploadDisabled(false);
              setNotify({
                isOpen: true,
                message: 'Please try later! Not able to upload file',
                type: 'error',
              });
            }
          })
        );
      } else {
        setUploadDisabled(false);
        setNotify({
          isOpen: true,
          message: 'Please upload an csv file',
          type: 'error',
        });
      }
    } else {
      setUploadDisabled(false);
      setNotify({
        isOpen: true,
        message: "Please select '4th Year Premium' category",
        type: 'error',
      });
    }
  };

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const onDiscard = () => {
    // setConfirmDialog({
    //   ...confirmDialog,
    //   isOpen: false,
    // });
    // setTimeout(() => {
    //   history.push({
    //     pathname: wallPath,
    //     tab: location?.postTypeTab,
    //   });
    // }, 1200);
    // setNotify({
    //   isOpen: true,
    //   message: "Discarded",
    //   type: "warning",
    // });
  };

  return (
    <div>
      <BackHandler title={`Upload Premium Users`} tab={location?.postTypeTab} />
      <Formik
        initialValues={state || []}
        // validationSchema={

        // }
        onSubmit={(values, { resetForm }) => {
          let data = new FormData();
          values.premiumUsersSheet.forEach((premiumUserSheet, index) => {
            data.append(
              `premiumUsersSheet-${index}`,
              values.premiumUsersSheet[index]
            );
          });
        }}
        enableReinitialize
      >
        {({
          handleSubmit,
          errors,
          handleChange,
          values,
          touched,
          setFieldValue,
        }) => {
          return (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <FormControl
                    className={classes.root}
                    style={{ width: '80%' }}
                  >
                    <Grid container direction='row'>
                      <Autocomplete
                        multiple
                        id='premiumUsersCategories'
                        name='premiumUsersCategories'
                        getOptionLabel={(option) => option?.name}
                        options={categories ?? []}
                        onChange={(e, value) => {
                          setFieldValue(
                            'premiumUsersCategories',
                            value !== null ? value : categories
                          );
                        }}
                        value={values.premiumUsersCategories}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='Select Category'
                            name='premiumUsersCategories'
                            variant='outlined'
                            error={
                              touched.premiumUsersCategories &&
                              Boolean(
                                values.premiumUsersCategories.length === 0
                              )
                            }
                          />
                        )}
                        style={{
                          marginTop: '10px',
                          marginBottom: '10px',
                          marginLeft: '10px',
                          width: '70%',
                        }}
                      />
                      <Button
                        variant='contained'
                        component='label'
                        disabled={uploadDisabled}
                        color={!uploadDisabled ? 'primary' : 'default'}
                        style={{
                          margin: 'auto',
                          borderRadius: '26px',
                          width: '200px',
                          height: '50px',
                        }}
                      >
                        {!uploadDisabled ? '+ Upload Sheet' : 'Uploading ...'}
                        <input
                          hidden
                          type='file'
                          onChange={(e) =>
                            handlePremiumUsersSheetUpload(e, values)
                          }
                          onClick={(e) => (e.currentTarget = null)}
                        />
                      </Button>
                    </Grid>
                  </FormControl>
                </Form>
              </div>
            </>
          );
        }}
      </Formik>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};

export default PremiumUserLanding;
