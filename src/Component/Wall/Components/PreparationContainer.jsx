import React, { useState } from 'react';
import { FormControl, Grid, TextField } from '@material-ui/core';
import { TopTab, TopTabs, WebinarTabContainer } from '../Assets/Styles/WallStyles';
import { Autocomplete } from '@material-ui/lab';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Controls from '../../Utils/controls/Controls';

const PreprationContainer = ({ values, setFieldValue, handleChange }) => {
  const [tabCount, setTabCount] = useState(0);

  const webinars = [
    {
      id: '1',
      name: 'Webinar Presentation',
      date: '24 October 2021',
      time: '9 a.m. - 11 a.m.',
    },
    { id: '2', name: 'Webinar Presentation 02', date: '24 October 2021', time: '9 a.m. - 11 a.m.' },
    { id: '3', name: 'Webinar Presentation 03', date: '24 October 2021', time: '9 a.m. - 11 a.m.' },
  ];

  const WebinarTab = () => {
    return (
      <WebinarTabContainer>
        <FormControl style={{ width: '50%' }}>
          <Autocomplete
            multiple
            id='webinars'
            name='webinars'
            getOptionLabel={(option) => option?.name}
            options={webinars ?? []}
            onChange={(e, value) => {
              setFieldValue('webinars', value !== null ? value : webinars);
            }}
            value={values.webinars}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select Webinar(s)'
                name='webinars'
                variant='outlined'
                // error={touched.wallCategories && Boolean(values.wallCategories.length === 0)}
              />
            )}
          />
        </FormControl>

        <h6 style={{ marginTop: '1.2rem' }}>Webinar List</h6>

        <div className='webinarCards'>
          {values.webinars?.map(({ name, date, time }) => {
            return (
              <div className='wcard'>
                <h6>{name}</h6>
                <div className='winfo'>
                  <span>
                    <CalendarTodayIcon color='primary' />
                    <p> {date}</p>
                  </span>
                  <span>
                    <ScheduleIcon color='primary' />
                    <p> {time}</p>
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
    if (values.linkedTest === null)
      return <h6 style={{ textAlign: 'center', marginTop: '3rem' }}>No Test Linked</h6>;
    return (
      <WebinarTabContainer>
        <div className='linkedContainer'>
          <div className='linkedInput'>
            <Controls.Input
              label='Test Name'
              name='eventTitle'
              style={{ width: '100%' }}
              onChange={handleChange}
            />
          </div>
          <div className='linkedInput'>
            <Controls.Input
              label='Test Time'
              name='eventTitle'
              style={{ width: '100%' }}
              onChange={handleChange}
            />
          </div>
          <div className='linkedInput'>
            <Controls.Input
              label='Test Date'
              name='eventTitle'
              style={{ width: '100%' }}
              onChange={handleChange}
            />
          </div>
        </div>
      </WebinarTabContainer>
    );
  };

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <WebinarTab />;
      } else if (value === 1) {
        return <LinkedTestTap />;
      } else if (value === 2) {
        return <LinkedTestTap />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <h6 style={{ marginBottom: '1rem' }}>Add Preparation Content</h6>
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
};

export default PreprationContainer;
