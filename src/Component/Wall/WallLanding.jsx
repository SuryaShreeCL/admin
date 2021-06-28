import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LivePost from './Pages/LivePost';
import DraftPost from './Pages/DraftPost';
import ScheduledPost from './Pages/ScheduledPost';

const TopTabs = withStyles({
  root: {
    borderBottom: '2px solid #A2D3FC',
  },
  indicator: {
    backgroundColor: '#1890ff',
    height: '5px',
    borderRadius: '6px 6px 0px 0px',
  },
})(Tabs);

const TopTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#000',
      fontWeight: theme.typography.fontWeightBold,
    },
    '&:focus': {
      color: '#000',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

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
    <Grid container spacing={2}>
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
  );
};

export default WallLanding;
