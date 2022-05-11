import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  TopTab,
  TopTabs,
} from '../../Test/Assets/Styles/WallStyles';
import Result from './Result';
import Controls from '../../Utils/controls/Controls';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const ResultTab = () => {
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <Result />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '20px',
          // lineHeight: '24px'
          color: '#001D3A',
        }}
      >
        Merecedes Placement Drive result
      </div>
      <Container style={{ marginTop: '28px' }}>
        <Grid container>
          <Grid item md={12}>
            <TopTabs
              value={tabCount}
              textColor={'inherit'}
              onChange={(e, value) => setTabCount(value)}
              aria-label='tabs'
            >
              <TopTab label='Result' />
              <Grid item md={11}></Grid>
              <Grid item md={1}>
                <Controls.ActionButton
                // disabled={!item.noOfStudentAttempt}
                // href={`${process.env.REACT_APP_API_URL}/api/v1/students/clsa/${item.id}/report`}
                >
                  <CloudDownloadIcon
                    fontSize='small'
                    style={{
                      color: 'green',
                    }}
                  />
                </Controls.ActionButton>
              </Grid>
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

export default ResultTab;
