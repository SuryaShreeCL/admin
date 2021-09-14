import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import LiveTest from './Pages/LiveTest';
import DraftTest from './Pages/DraftTest';
import ScheduledTest from './Pages/ScheduledTest';
import { Container, TopTab, TopTabs } from './Assets/Styles/WallStyles';
import { useLocation } from 'react-router-dom';
import PreviousTest from './Pages/PreviousTest';

const TestLanding = () => {
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <LiveTest />;
      } else if (value === 1) {
        return <DraftTest />;
      } else if (value === 2) {
        return <ScheduledTest />;
      } else if (value === 3) {
        return <PreviousTest />;
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
            <TopTab label='Live Tests' />
            <TopTab label='Draft Tests' />
            <TopTab label='Scheduled Tests' />
            <TopTab label='Previous Tests' />
          </TopTabs>
        </Grid>
        <Grid item md={12}>
          {renderContent(tabCount)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TestLanding;
