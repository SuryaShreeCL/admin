import styled from 'styled-components';
import {
  withStyles,
  Switch as MuiSwitch,
  Radio as MuiRadio,
  IconButton as MuiIconButton,
  // Checkbox as MuiCheckBox,
} from '@material-ui/core';

export const H1 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
  padding-bottom: 32px;
`;

export const H2 = styled.span`
  font-style: normal;
  font-weight: ${props => (props.checked ? 600 : 'normal')};
  font-size: 18px;
  line-height: 22px;
  color: ${props => (props.checked ? '#1093ff' : '#052A4E')};
`;

export const Div1 = styled.div`
  display: grid;
  justify-content: start;
  align-items: center;
  grid-auto-flow: column;
  grid-column-gap: 16px;
`;

export const Switch = withStyles(theme => ({
  root: {
    width: '32px',
    height: '16px',
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: '#ffffff',
    transform: 'translate(0px,-1px)',

    '&$checked': {
      transform: 'translate(14px,-1px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#1093ff',
        borderColor: '#1093ff',
      },
    },
  },
  thumb: {
    width: '14px',
    height: '14px',
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: '#646464',
  },
  checked: {},
}))(MuiSwitch);

export const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AnswerDiv = styled.div`
  margin-top: 34px;
`;

export const Radio = withStyles({
  colorPrimary: {
    color: '#646464',
  },
  checked: {
    color: '#1093ff',
  },
})(MuiRadio);

export const Label = styled.div`
  font-style: normal;
  font-weight: ${props => (props.active ? 600 : 'normal')};
  font-size: 16px;
  line-height: 20px;
  color: ${props => (props.active ? ' #052A4E' : '#646464')};
`;

export const T1 = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 114.7%;
  color: #000000;
  padding: 8px;
  background: #f6f6f6;
  border-radius: 5px;
  margin-right: 16px;
`;

export const C1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  margin: 6px;
`;
