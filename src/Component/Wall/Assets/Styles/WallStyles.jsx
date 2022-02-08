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
  flex-direction: column;
  justify-content: center;
`;

export const WebinarTabContainer = styled.section`
  padding: 2rem;
  display: flex;
  width: 100%;
  flex-direction: column;

  .webinarCards {
    display: flex;
    flex-wrap: wrap;

    .wcard {
      background: #fff;
      padding: 1rem;
      box-shadow: 0px 0px 8px rgba(1, 20, 70, 0.1);
      border-radius: 8px;
      min-width: 30%;
      max-width: 40%;
      margin: 1rem 1.2rem 1rem 0;

      h6 {
        overflow-wrap: break-word;
      }
    }

    .winfo {
      display: flex;
      justify-content: space-between;

      span {
        display: flex;
        align-items: center;
        p {
          margin: 0.3rem;
          color: '#6E7F8F';
        }
      }
    }
  }

  .linkedContainer {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    .linkedInput {
      min-width: 46%;
      margin-top: 1rem;
    }
  }
`;

export const NextStepsContainerStyle = styled.section`
  margin-bottom: 2rem;
`;
