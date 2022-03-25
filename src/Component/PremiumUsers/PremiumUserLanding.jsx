import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { uploadPremiumUsers } from '../../Actions/PremiumUsersActions';
import { getWallCategories } from '../../Actions/WallActions';
import ConfirmDialog from '../Utils/ConfirmDialog';
import Notification from '../Utils/Notification';
import BackHandler from '../Wall/Components/BackHandler';

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

  const [state, setState] = useState({
    premiumUsersCategories: [],
  });
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [data, setData] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(data);
    dispatch(getWallCategories('Live'));
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);

  const handlePremiumUsersSheetUpload = async (e, formFieldsData) => {
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
            function getErrorToast(response) {
              let errMsg = '';
              let msg = 'Operation Failed';
              Object.entries(response).map(([key, value]) => {
                if (Array.isArray(value))
                  errMsg += key + ':' + ' ' + value.join(',') + '\n';
              });
              return msg + '\n' + errMsg;
            }
            setUploadDisabled(false);
            setNotify({
              isOpen: true,
              message: getErrorToast(response),
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

  return (
    <div>
      <BackHandler title={`Upload Premium Users`} tab={location?.postTypeTab} />
      <Formik
        initialValues={state || []}
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
                    style={{ width: '30%' }}
                  >
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
