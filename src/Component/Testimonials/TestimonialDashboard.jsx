import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Testimonials from './Testimonials';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function TestimonialDashboard(props) {
  return (
    <ThemeProvider theme={theme}>
      <Testimonials {...props} />
    </ThemeProvider>
  );
}

export default TestimonialDashboard;
