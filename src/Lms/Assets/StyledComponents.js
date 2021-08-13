import styled from 'styled-components';
import { createTheme, Button } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
  padding: 24px 20px;
`;

export const H1 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #052a4e;
`;

export const ColorScheme = createTheme({
  palette: {
    primary: {
      main: '#052A4E',
    },
    secondary: {
      main: '#1093FF',
    },
  },
});

export const textFieldTheme = createTheme({
  overrides: {
    MuiInputBase: {
      input: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#686868',
        height: '40px',
        background: '#FFFFFF',
        border: '1px solid #CCCCCC',
        boxSizing: 'border-box',
        borderRadius: '4px',
      },
    },
  },
});
