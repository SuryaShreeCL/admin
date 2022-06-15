import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { Container, TopTab, TopTabs } from './Assets/Styles/WallStyles';
import Drives from './Pages/Drives';
import { useLocation } from 'react-router-dom';

// Note: Events are considered as Drives

const PlacementDrives = () => {
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <Drives />;
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
            <TopTab label='Events' />
          </TopTabs>
        </Grid>
        <Grid item md={12} overflow='auto'>
          {renderContent(tabCount)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlacementDrives;
