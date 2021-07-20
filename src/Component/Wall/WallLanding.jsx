import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LivePost from './Pages/LivePost';
import DraftPost from './Pages/DraftPost';
import ScheduledPost from './Pages/ScheduledPost';
import { Container, TopTab, TopTabs } from './Assets/Styles/WallStyles';
import Events from './Pages/Events';
import Restricted from './Components/Restricted';

const WallLanding = () => {
  const [tabCount, setTabCount] = useState(0);
  let isDepartment = window.sessionStorage.getItem('department');
  const hasPermission = isDepartment === 'elev8';

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <LivePost />;
      } else if (value === 1) {
        return <DraftPost />;
      } else if (value === 2) {
        return <ScheduledPost />;
      } else if (value === 3) {
        return <Events />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          <TopTabs
            value={tabCount}
            textColor={'inherit'}
            onChange={(e, value) => setTabCount(value)}
            aria-label='tabs'
          >
            <TopTab label='Live Posts' />
            <TopTab label='Draft Posts' />
            <TopTab label='Scheduled Posts' />
            <TopTab label='Events' />
          </TopTabs>
        </Grid>
        <Grid item md={12}>
          {hasPermission ? renderContent(tabCount) : <Restricted />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WallLanding;
