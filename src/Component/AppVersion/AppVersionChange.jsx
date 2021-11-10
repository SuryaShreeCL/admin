import React, { useState, useEffect } from 'react';
import { CreatePostContainer } from '../Wall/Assets/Styles/CreatePostStyles';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Controls from '../Utils/controls/Controls';
import ConfirmDialog from '../Utils/ConfirmDialog';
import ConfirmSubmit from '../Utils/ConfirmSubmit';
import Notification from '../Utils/Notification';
import Loader from '../Utils/controls/Loader';
import { getCurrentAppVersion, updateAppVersion } from '../../Actions/AppVersionAction';
import { wallPath } from '../RoutePaths';
import { Alert } from '@material-ui/lab';

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
    width: '50%',
    marginTop: '1rem',
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: '1.3rem',
  },
});

const AppVersionChange = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({
    type: 'ELEV8',
    latestVersion: '',
    iosStoreUrl: 'https://testflight.apple.com/join/3hubYSJQ',
    androidStoreUrl: 'https://play.google.com/store/apps/details?id=com.careerlabs',
    hardUpdateBelowVersion: '',
  });

  const { loading, version, error } = useSelector((state) => state.getAppVersionReducer);

  console.log(version);

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const [confirmSubmit, setConfirmSubmit] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  useEffect(() => {
    dispatch(getCurrentAppVersion());
  }, [dispatch]);

  //Checks for version number which contains 2 dots and 3 integers (Ex: 1.2.1)
  const versionRegex = /^(\d{1}.\d{1}.\d{1}$)/;

  const validationSchema = yup.object({
    latestVersion: yup
      .string()
      .test(
        'validAppVersion',
        'version must be valid & greater than current version',
        (latestVersion) =>
          versionRegex.test(latestVersion) && latestVersion >= version.latestVersion
      ),
    hardUpdateBelowVersion: yup
      .string()
      .test(
        'validHardUpdateAppVersion',
        'version must be valid & greater than hard update below version',
        (hardUpdateBelowVersion) =>
          versionRegex.test(hardUpdateBelowVersion) &&
          hardUpdateBelowVersion >= version.hardUpdateBelowVersion
      ),
    iosStoreUrl: yup
      .string()
      .url()
      .required(),
    androidStoreUrl: yup
      .string()
      .url()
      .required(),
  });

  const onDiscard = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setTimeout(() => {
      history.push({
        pathname: wallPath,
      });
    }, 1200);
    setNotify({
      isOpen: true,
      message: 'Cancelled',
      type: 'warning',
    });
  };

  if (loading) return <Loader />;
  if (error) return <Alert severity='error'>{error}</Alert>;

  return (
    <>
      <CreatePostContainer>
        <Formik
          initialValues={state || []}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            setConfirmSubmit({
              isOpen: true,
              title: 'Confirm Submission',
              subTitle: 'Are you sure you want to submit this data?',
              onConfirm: () => {
                dispatch(updateAppVersion(values));
                setConfirmSubmit({
                  ...confirmDialog,
                  isOpen: false,
                });
                setNotify({
                  isOpen: true,
                  message: 'Version Updated',
                  type: 'success',
                });
                setTimeout(() => {
                  dispatch(getCurrentAppVersion());
                }, 1200);
                resetForm();
              },
            });
          }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <div>
                    <h6>
                      Current App Version: <mark>{version.latestVersion}</mark>
                    </h6>
                    <h6>
                      Current Hard Update Below Version:{' '}
                      <mark>{version.hardUpdateBelowVersion} </mark>
                    </h6>
                  </div>
                  <hr />
                  <h6>App Version Change Details</h6>
                  <Grid item>
                    <Controls.Input
                      label='Enter Latest Version'
                      name='latestVersion'
                      className={classes.spacer}
                      value={values.latestVersion}
                      helperText={touched.latestVersion && errors.latestVersion}
                      error={touched.latestVersion && Boolean(errors.latestVersion)}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Hard Update Below Version'
                      name='hardUpdateBelowVersion'
                      className={classes.spacer}
                      value={values.hardUpdateBelowVersion}
                      onChange={handleChange}
                      helperText={touched.hardUpdateBelowVersion && errors.hardUpdateBelowVersion}
                      error={
                        touched.hardUpdateBelowVersion && Boolean(errors.hardUpdateBelowVersion)
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='iOS Store URL'
                      name='iosStoreUrl'
                      className={classes.spacer}
                      value={values.iosStoreUrl}
                      onChange={handleChange}
                      helperText={touched.iosStoreUrl && errors.iosStoreUrl}
                      error={touched.iosStoreUrl && Boolean(errors.iosStoreUrl)}
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Play Store Url'
                      name='androidStoreUrl'
                      className={classes.spacer}
                      value={values.androidStoreUrl}
                      onChange={handleChange}
                      helperText={touched.androidStoreUrl && errors.androidStoreUrl}
                      error={touched.androidStoreUrl && Boolean(errors.androidStoreUrl)}
                    />
                  </Grid>

                  {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                  <div className={classes.btnContainer}>
                    <Button
                      color='primary'
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to cancel this update?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDiscard();
                          },
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Controls.Button
                      text='Submit'
                      variant='contained'
                      color='primary'
                      style={{ borderRadius: '26px', marginLeft: '2rem' }}
                      type='submit'
                    />
                  </div>
                </Form>
              </div>
            </>
          )}
        </Formik>
      </CreatePostContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <ConfirmSubmit confirmSubmit={confirmSubmit} setConfirmSubmit={setConfirmSubmit} />
    </>
  );
};

export default AppVersionChange;
