import React from 'react';
import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

//Options Banner
export const TopTabs = withStyles({
  root: {
    borderBottom: '1px solid lightgrey',
  },
  indicator: {
    background: '#1093FF',
    borderRadius: '8px 8px 0px 0px',
    height: '3px',
  },
})(Tabs);

export const TopTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightLight,
    marginRight: theme.spacing(3),
    fontSize: '1rem',
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
      '"Poppins',
    ].join(','),
    '&:hover': {
      color: '#1093FF',
      opacity: 1,
    },
    '&$selected': {
      color: '#1093FF',
      fontWeight: theme.typography.fontWeightBold,
    },
    '&:focus': {
      color: '#1093FF',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export const Container = styled.section`
  background: #fff;
  padding: 2rem;
  box-shadow: 0px 3px 20px rgba(0, 65, 130, 0.15);
  border-radius: 12px;

  .MuiPaper-elevation1 {
    box-shadow: none;
  }
`;
export const DrawerContainer = styled.section`
  background: #fff;
  padding: 1rem 3rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;
