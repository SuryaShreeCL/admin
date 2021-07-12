import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
export const ThemedTabs = withStyles({
    root: {
      borderBottom: '2px solid #E5E5E5',
    },
    indicator: {
      backgroundColor: '#1890ff',
      height : "5px",
      borderRadius : "6px 6px 0px 0px"
    },
    
  })(Tabs);


  export const ThemedTab = withStyles((theme) => ({
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
    selected: {
       
    },
  }))((props) => <Tab disableRipple {...props} />);
