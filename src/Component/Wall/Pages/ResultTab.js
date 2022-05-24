import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getStudentEventStatus } from '../../../Actions/WallActions';
import { Container, TopTab, TopTabs } from '../../Test/Assets/Styles/WallStyles';
import Result from './Result';

const ResultTab = () => {
  const { id } = useParams();
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getStudentEventStatus(id, (response) => {
        console.log(response);
        setUsers(response);
      })
    );
  }, []);

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
          color: '#001D3A',
        }}
      >
        {users?.data?.eventName}
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
