import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, TopTab, TopTabs } from '../Test/Assets/Styles/WallStyles';
import LiveTest from './Test';

const AppTestLanding = () => {
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <LiveTest />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4>Test</h4>
      <Container>
        <Grid container>
          <Grid item md={12}>
            <TopTabs
              value={tabCount}
              textColor={'inherit'}
              onChange={(e, value) => setTabCount(value)}
              aria-label='tabs'
            >
              <TopTab label='Test List' />
            </TopTabs>
          </Grid>
          <Grid item md={12}>
            {renderContent(tabCount)}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AppTestLanding;
