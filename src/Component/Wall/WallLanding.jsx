import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import LivePost from './Pages/LivePost';
import DraftPost from './Pages/DraftPost';
import ScheduledPost from './Pages/ScheduledPost';
import { Container, TopTab, TopTabs } from './Assets/Styles/WallStyles';

const WallLanding = (props) => {
  const [tabCount, setTabCount] = useState(0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <LivePost {...props} />;
      } else if (value === 1) {
        return <DraftPost {...props} />;
      } else if (value === 2) {
        return <ScheduledPost {...props} />;
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
          </TopTabs>
        </Grid>
        <Grid item md={12}>
          {renderContent(tabCount)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WallLanding;
