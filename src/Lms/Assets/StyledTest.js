import styled from 'styled-components';
import {
  withStyles,
  Switch as MuiSwitch,
  Radio as MuiRadio,
  IconButton as MuiIconButton,
  Checkbox as MuiCheckBox,
  FormControlLabel as MuiFormControlLable,
  OutlinedInput as MuiOutlinedInput,
  makeStyles,
  createTheme,
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

export const Checkbox = withStyles({
  root: {
    backgroundColor: 'inherit !important',
  },
})(MuiCheckBox);

export const FormControlLabel = withStyles({
  root: {
    marginLeft: '37px',
  },
})(MuiFormControlLable);

export const T2 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #686868;
  mix-blend-mode: normal;
`;

export const T3 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
`;

export const C2 = styled.div`
  // background: rgba(0, 1, 40, 0.02);
  // opacity: 0.02;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  flex-direction: column;
  padding: 34px 0px 24px 0px;
`;

export const T4 = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
  opacity: 1;
`;

export const useStyle = makeStyles({
  textField: {
    '& .MuiOutlinedInput': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '30px',
      color: '#052A4E',
    },
    // fontStyle: 'normal',
    // fontWeight: 'normal',
    // fontSize: '12px',
    // lineHeight: '15px',
    // color: '#686868',
    // border: '1px solid #CCCCCC',
    // // boxSizing: 'border-box',
    // borderRadius: '4px',
  },
});

export const ButtonBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 26px;
  justify-content: flex-start;
  padding-top: 32px;
`;

export const buttonTheme = createTheme({
  palette: {
    primary: { main: '#1093ff' },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '20px',
        width: '162px',
        height: '40px',
      },
    },
  },
});

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const textFieldTheme = createTheme({
  palette: {
    primary: { main: '#1093ff' },
  },
  overrides: {
    MuiInputBase: {
      root: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '30px',
        color: '#052A4E',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#686868',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '15px',
      },
    },
  },
});
