import { Button, createTheme, makeStyles, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(theme => ({
  subTextStyle: {
    fontSize: '18px',
    padding: '20px 0px 6px',
  },
  bottomPad: {
    paddingBottom: '15px',
  },
  iconButtonStyle: {
    padding: '2px !important',
  },
  popperContent: {
    paddingTop: '10px !important',
  },
  flexFlow: {
    flexFlow: 'column !important',
  },
  overflow: {
    overflow: 'auto !important',
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    background: 'none',
  },
  popperContentStyle: {
    maxHeight: '220px !important',
  },
}));

export const customTheme = createTheme({
  palette: {
    contained: {
      backgroundColor: '#18AAE7',
      color: '#FFFFFF',
    },
    text: {
      color: '#18AAE7',
    },
    outlined: {
      color: '#18AAE7',
      borderColor: '#18AAE7',
    },
  },
});

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: ${props => props.padding};
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledButton = styled(Button)`
  height: ${({ height }) =>
    height ? `${height} !important` : `36px !important`};
  padding: 15px !important;
  text-transform: none !important;
`;

export const Container = styled.div`
  padding: 10px 20px 20px 30px;
`;

export const FlexEndView = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: normal !important;
    padding: 12px;
  }

  tr:hover {
    background-color: #ffffff !important;
  }

  tr:nth-child(even) {
    background-color: #efefef;
  }

  tr:nth-child(even):hover {
    background-color: #efefef !important;
  }

  tr th:last-child {
    width: 20% !important;
  }

  tr td:last-child {
    text-align: right;
    padding-right: 20px;
  }

  tr th:first-child {
    text-align: left;
    padding-left: 44px;
  }

  tr td:first-child {
    text-align: left;
    padding-left: 38px;
  }
`;

export const Typo = styled(Typography)`
  color: ${props => props.color};
  opacity: ${props => props.opacity};
  z-index: ${props => props.zIndex};
  text-align: ${props => props.textAlign};
  font-weight: ${props => props.fontWeight};
`;

export const Paper = styled.div`
  width: 440px;
  position: relative;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  padding: 20px 15px;
  top: 5px;

  &:before {
    content: '';
    position: absolute;
    top: -21px;
    z-index: 1;
    border: solid 10px transparent;
    border-bottom-color: #e7e7e7;
  }
  &:after {
    content: '';
    position: absolute;
    top: -19px;
    z-index: 1;
    border: solid 10px transparent;
    border-bottom-color: #ffffff;
  }
`;

export const FlexJustifyView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
`;
