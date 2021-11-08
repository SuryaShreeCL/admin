import React, { useState, useEffect } from 'react';
import { CreatePostContainer, ButtonsContainer } from '../Wall/Assets/Styles/CreatePostStyles';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Controls from '../Utils/controls/Controls';
import ConfirmDialog from '../Utils/ConfirmDialog';
import Notification from '../Utils/Notification';

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
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    wallCategories: [],
    caption: '',
    isEvent: location.type ?? false,
    supportingMedia: location?.postType === 'Webinar' ? 'webinar' : 'image',
    wallFiles: [],
    isWebinar: location?.postType === 'Webinar',
    canComment: false,
    linkedSelfPrepVideos: null,
    totalViews: 0,
    totalLikes: 0,
    linkedTest: null,
    eventTitle: '',
    linkedWebinars: [],
    redirectionUrl: '',
    zoomLink: '',
    buttonText: '',
    createdBy: window.sessionStorage.getItem('department') || '',
    eventDate: new Date(),
    resumeNeeded: false,
    eventEndDate: new Date(),
    selectedDate: new Date(),
    isScheduled: false,
    isVideoUrlEnabled: false,
    videoUrl: '',
  });

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  // useEffect(() => {
  //   dispatch(getWallCategories('Live'));
  // }, [dispatch]);

  const validationSchema = yup.object({
    caption: yup.string().required('caption is required'),
    eventTitle: yup.string().required('title is required'),
    zoomLink: yup.string().required('zoom id is required'),
  });

  // const createPost = (post, activeStatus) => {
  //   if (!post.id) dispatch(createWallPost({ ...post, activeStatus }));
  //   setNotify({
  //     isOpen: true,
  //     message: 'Created Successfully',
  //     type: 'success',
  //   });
  //   setTimeout(() => {
  //     history.push({
  //       pathname: wallPath,
  //       tab: location?.postTypeTab,
  //     });
  //   }, 1200);
  // };

  const onDiscard = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // setTimeout(() => {
    //   history.push({
    //     pathname: wallPath,
    //     tab: location?.postTypeTab,
    //   });
    // }, 1200);
    setNotify({
      isOpen: true,
      message: 'Cancelled',
      type: 'warning',
    });
  };

  return (
    <>
      <CreatePostContainer>
        <Formik
          initialValues={state || []}
          validationSchema={state.isWebinar && validationSchema}
          // onSubmit={(values, { resetForm }) => {
          //   if (validate(values)) {
          //     createPost(values, location?.postType === 'Webinar' ? 'Scheduled' : 'Live');
          //     resetForm();
          //   }
          // }}
          enableReinitialize
        >
          {({ handleSubmit, errors, handleChange, values, touched, setFieldValue }) => (
            <>
              <div className='CreatePost'>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                  <h6>App Version Change Details</h6>
                  <Grid item>
                    <Controls.Input
                      label='Enter Latest Version'
                      name='latestVersion'
                      className={classes.spacer}
                      value={values.eventTitle}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='Hard Update Below Version'
                      name='hardUpdate'
                      className={classes.spacer}
                      value={values.eventTitle}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='iOS Store URL'
                      name='iosurl'
                      className={classes.spacer}
                      value={values.eventTitle}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Controls.Input
                      label='PlayStore Url'
                      name='playurl'
                      className={classes.spacer}
                      value={values.eventTitle}
                      onChange={handleChange}
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
    </>
  );
};

export default AppVersionChange;
