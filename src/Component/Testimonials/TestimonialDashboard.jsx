import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Employees from './pages/Testimonials';

const theme = createMuiTheme({
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

function TestimonialDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Employees />
    </ThemeProvider>
  );
}

export default TestimonialDashboard;
