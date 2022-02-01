import { Button, createTheme, makeStyles, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ReactComponent as Pentagon } from '../icons/pentagon.svg';

export const useStyles = makeStyles(theme => ({
  toggleButton: {
    border: '1px solid #18AAE7 !important',
    '& .Mui-selected': {
      backgroundColor: '#18AAE7',
      color: '#FFFFFF !important',
      '&:hover': {
        background: '#18AAE7 !important',
      },
    },
    '& .MuiToggleButton-root': {
      border: 'none !important',
      textTransform: 'none !important',
      color: '#18AAE7',
      width: '115px !important',
      height: '32px !important',
      lineHeight: '0 !important',
    },
  },
  title: {
    color: '#333333',
    fontSize: '18px',
  },
  fullHeight: {
    height: '100% !important',
  },
  iconButtonStyle: {
    padding: '2px !important',
  },
  popperContent: {
    paddingTop: '5px !important',
    marginBottom: '10px !important',
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
  detailContainer: {
    padding: '0px 32px 28px 28px !important',
    display: 'flex',
    gap: '40px',
    flexDirection: 'column',
  },
  subDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingRight: '36px !important',
  },
  description: {
    color: '#333333',
    lineHeight: '30px',
  },
  dividerStyle: {
    marginTop: '15px',
    backgroundColor: '#333333 !important',
  },
  editContainer: {
    padding: '17px 22px 18px 17px',
    borderTop: '1px solid #d2d2d2',
    overflow: 'hidden',
    height: '100%',
  },
  contentWrap: {
    height: '100% !important',
    display: 'flex !important',
    flexDirection: 'column !important',
  },
  viewContainer: {
    padding: '17px 0px 0px 17px',
    borderTop: '1px solid #d2d2d2',
    overflow: 'hidden',
    height: '100%',
  },
  infoStyle: {
    marginLeft: '10px',
    paddingBottom: '2px',
  },
  graphLayout: {
    padding: '74px 25px 30px',
  },
  addRemarkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '0px 8px 15px',
  },
  viewRemarkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    paddingBottom: '15px',
  },
  editIconStyle: {
    marginRight: '15px',
    padding: '5px !important',
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
    height ? `${height} !important` : `32px !important`};
  width: ${({ width }) => width && `${width} !important`};
  padding: ${({ padding }) =>
    padding ? `${padding} !important` : `0 20px !important`};
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

export const StyledStaticTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: normal !important;
    padding: 15px;
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
    width: 18% !important;
  }

  tr td:last-child {
    width: 18% !important;
    text-align: right;
    padding-right: 20px;
  }

  tr th:first-child {
    text-align: left;
    padding-left: 20px;
  }

  tr td:first-child {
    text-align: left;
    padding-left: 20px;
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  height: 100%;
  width: 100%;

  th,
  td {
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: normal !important;
    padding: 10px;
  }

  th {
    padding: 5px 10px;
  }

  tr:hover {
    background-color: #ffffff !important;
  }

  tr:nth-child(odd) {
    background-color: #efefef;
  }

  tr:nth-child(odd):hover {
    background-color: #efefef !important;
  }

  tr th:first-child {
    text-align: left;
    padding-left: 20px;
    width: 49% !important;
  }

  tr td:first-child {
    text-align: left;
    padding-left: 20px;
    width: 49% !important;
  }

  tr td:nth-child(2) {
    width: 8% !important;
  }

  tr th:nth-child(2) {
    width: 8% !important;
  }

  tr td:nth-child(3) {
    width: 16% !important;
  }

  tr th:nth-child(3) {
    width: 16% !important;
  }

  tr td:nth-child(4) {
    width: 12% !important;
  }

  tr th:nth-child(4) {
    width: 12% !important;
  }

  tr th:last-child {
    width: 15% !important;
  }

  tr td:last-child {
    width: 15% !important;
  }

  thead,
  tbody {
    display: block;
  }

  tbody {
    height: 88%;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  thead tr {
    background-color: #ffffff !important;
    &:first-child:hover {
      background-color: #ffffff !important;
    }
  }

  tr {
    display: flex;
  }
`;

export const Typo = styled(Typography)`
  color: ${props => props.color};
  opacity: ${props => props.opacity};
  z-index: ${props => props.zIndex};
  text-align: ${props => props.textAlign};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize};
`;

export const Paper = styled.div`
  width: 340px;
  position: relative;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  box-shadow: 0px 0px 6px #00000029;
  padding: 12px 10px 3px 15px;
  border-radius: 10px;
  top: 15px;
  left: -7px;

  &:before {
    content: '';
    position: absolute;
    top: -21px;
    left: 12px;
    z-index: 1;
    border: solid 9px transparent;
    border-bottom-color: #e7e7e7;
  }
  &:after {
    content: '';
    position: absolute;
    top: -17px;
    left: 12px;
    z-index: 1;
    border: solid 9px transparent;
    border-bottom-color: #ffffff;
  }
`;

export const FlexJustifyView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 26px;
`;

export const BottomContainer = styled.div`
  width: 100%;
  padding: 12px 30px;
  border-top: 1px solid #d2d2d2;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const RightContainer = styled.div`
  border: 1px solid #d2d2d2;
  border-radius: 0px 10px 10px 0px;
  height: 100%;
`;

export const GraphHeader = styled.div`
  padding: 22px 16px 15px 16px;
  color: #333333;
  border-bottom: ${({ isBottom }) => isBottom && `1px solid #d2d2d2`};
`;

export const CenteredIcon = styled(Pentagon)`
  width: 87px;
  height: 83px;
  stroke: #666666;
  fill: none;
  display: block;
  margin: 170px auto 20px;
  & circle {
    fill: #666666;
  }
`;

export const CenteredText = styled.div`
  font-size: 18px;
  letter-spacing: 0.6px;
  color: #000000;
  text-align: center;
  max-width: 380px;
  margin: 0 auto 170px;
`;

export const ContentFlexWrapper = styled.div`
  flex-grow: 1;
  padding: ${props => props.padding};
  overflow: hidden;
`;

export const StyledList = styled.ul`
  padding-top: 15px;
  padding-left: 18px;
  margin: 0;
  display: grid;
  gap: 6px;
  li {
    padding-left: 20px;
    color: #333333;
  }
  li::marker {
    color: #333333;
  }
`;

export const FillButtonButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background: ${({ selected }) => (selected ? '#343B89' : '#ffffff')};
  border: ${({ selected }) => (selected ? 'none' : '1px solid #E7E7E7')};
  text-align: center;
  font-size: 14px;
  letter-spacing: 0.36px;
  color: ${({ selected }) => (selected ? '#ffffff' : '#333333')};
  outline: none;
  padding: 0;
  user-select: none;
  transition: all 0.3s;
`;

export const OptionView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
