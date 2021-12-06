import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { TopTab, TopTabs, WebinarTabContainer } from '../Assets/Styles/WallStyles';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Controls from '../../Utils/controls/Controls';
import { FieldArray, Field } from 'formik';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { listWallWebinars } from '../../../Actions/WallActions';
import moment from 'moment';
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
});

const PreprationContainer = React.memo(({ values, setFieldValue }) => {
  const [tabCount, setTabCount] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(listWallWebinars());
  }, [dispatch]);

  const { loading, webinars } = useSelector((state) => state.wallWebinarListReducer);

  //fitering out archived & expired webinars
  let availableWebinars = webinars.content?.filter(
    (webinar) => webinar.activeStatus !== 'Archive' && webinar.activeStatus !== 'Expired'
  );

  //getting the webinar ids to filter out and show in the UI
  let storeWebinarIds = values.linkedWebinars?.map((webinar) => webinar.webinarId);

  // Combining the availableWebinars with linkedWebinarsLists for ease
  // of access to both the arrays& for validation
  let combinedWebinars = [...availableWebinars, ...(values?.linkedWebinarsLists || [])];
  // Removing duplicates by ids if any.
  let uniqueCombinedWebinars = [
    ...new Map(combinedWebinars?.map((item) => [item['id'], item])).values(),
  ];

  const WebinarTab = () => {
    return (
      <WebinarTabContainer>
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <FieldArray
            name='linkedWebinars'
            render={(arrayHelpers) => (
              <>
                {availableWebinars.length > 0 &&
                  values.linkedWebinars?.map((_, index) => (
                    <div key={index} className={classes.webinarInput}>
                      <div
                        style={{
                          width: '100%',
                        }}
                      >
                        <Autocomplete
                          disable={loading}
                          onChange={(e, value) => {
                            setFieldValue(
                              `linkedWebinars.${index}.webinarId`,
                              value !== null ? value.id : availableWebinars
                            );
                          }}
                          id='linkedWebinars'
                          getOptionLabel={(option) => option?.eventTitle}
                          options={availableWebinars ?? []}
                          renderInput={(params) => (
                            <TextField {...params} label='Select Webinar' variant='outlined' />
                          )}
                        />
                      </div>
                      <Controls.ActionButton onClick={() => arrayHelpers.remove(index)}>
                        <RemoveCircleIcon fontSize='large' color='secondary' />
                      </Controls.ActionButton>
                    </div>
                  ))}
                {availableWebinars.length > 0 && (
                  <Controls.ActionButton
                    onClick={() =>
                      arrayHelpers.push({
                        webinarId: '',
                      })
                    }
                  >
                    <AddBoxIcon fontSize='large' color='primary' />
                  </Controls.ActionButton>
                )}
              </>
            )}
          />
        </div>

        {availableWebinars.length === 0 && (
          <Alert severity='warning'>No Live Or Scheduled Webinars were found to +Add!</Alert>
        )}

        {storeWebinarIds.length > 0 && (
          <h6
            style={{
              marginTop: '1.2rem',
            }}
          >
            Webinar List
          </h6>
        )}

        <div className='webinarCards'>
          {/* filtering out webinars selected by the user */}
          {uniqueCombinedWebinars
            ?.filter((webinar) => storeWebinarIds?.includes(webinar.id))
            ?.map(({ eventTitle, eventDate, eventEndDate }) => {
              return (
                <div className='wcard'>
                  <h6>{eventTitle}</h6>
                  <div className='winfo'>
                    <span>
                      <CalendarTodayIcon color='primary' />
                      <p> {moment(eventDate).format('Do MMMM YYYY')}</p>
                    </span>
                    <span>
                      <ScheduleIcon color='primary' />
                      <p>
                        {`${moment(eventDate).format('LT')} - ${moment(eventEndDate).format('LT')}`}
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </WebinarTabContainer>
    );
  };

  const LinkedTestTap = () => {
    if (values?.linkedTest === null)
      return (
        <div
          style={{
            marginTop: '2rem',
          }}
        >
          <Alert severity='info'>No Linked Test!</Alert>
        </div>
      );
    return (
      <WebinarTabContainer>
        <div className='webinarCards'>
          <div className='wcard'>
            <h6>{values?.linkedTest.caption}</h6>
            <div className='winfo'>
              <span>
                <CalendarTodayIcon color='primary' />
                <p> {moment(values?.linkedTest?.eventDate).format('Do MMMM YYYY')}</p>
              </span>
              <span>
                <ScheduleIcon color='primary' />
                <p>{`${moment(values?.linkedTest?.eventDate).format('LT')} - ${moment(
                  values?.linkedTest.eventEndDate
                ).format('LT')}`}</p>
              </span>
            </div>
          </div>
        </div>
      </WebinarTabContainer>
    );
  };

  const SelfPrepTab = () => {
    return (
      <WebinarTabContainer>
        <FieldArray
          name='linkedSelfPrepVideos'
          render={(arrayHelpers) => (
            <div>
              {values?.linkedSelfPrepVideos?.map((_, index) => (
                <div key={index} className={classes.input}>
                  <div
                    style={{
                      width: '100%',
                    }}
                  >
                    <h6
                      style={{
                        color: '#052A4E',
                      }}
                    >
                      Video Name
                    </h6>
                    <Field
                      className={classes.spacer}
                      name={`linkedSelfPrepVideos.${index}.videoName`}
                    />
                  </div>
                  <div
                    style={{
                      width: '100%',
                    }}
                  >
                    <h6
                      style={{
                        color: '#052A4E',
                      }}
                    >
                      Video Link
                    </h6>
                    <Field
                      className={classes.spacer}
                      name={`linkedSelfPrepVideos.${index}.videoLink`}
                    />
                  </div>
                  <Controls.ActionButton onClick={() => arrayHelpers.remove(index)}>
                    <RemoveCircleIcon fontSize='large' color='secondary' />
                  </Controls.ActionButton>
                </div>
              ))}
              <Controls.ActionButton
                onClick={() =>
                  arrayHelpers.push({
                    videoName: null,
                    videoLink: null,
                  })
                }
              >
                <AddBoxIcon fontSize='large' color='primary' /> Add more videos
              </Controls.ActionButton>
            </div>
          )}
        />
      </WebinarTabContainer>
    );
  };

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return WebinarTab();
      } else if (value === 1) {
        // Note: return a function (func()) not a component (<func/>) to avoid lose of input focus on each input.
        return SelfPrepTab();
      } else if (value === 2) {
        return LinkedTestTap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <h6
          style={{
            marginBottom: '1rem',
          }}
        >
          Add Preparation Content
        </h6>
        <TopTabs
          value={tabCount}
          textColor={'inherit'}
          onChange={(e, value) => setTabCount(value)}
          aria-label='tabs'
        >
          <TopTab label='Webinar' />
          <TopTab label='Self Prep Video' />
          <TopTab label='Linked Drive Test' />
        </TopTabs>
      </Grid>
      <Grid item md={12}>
        {renderContent(tabCount)}
      </Grid>
    </Grid>
  );
});

export default PreprationContainer;
