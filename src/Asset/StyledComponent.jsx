import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

export const useStyle = makeStyles({});

export const FilterText = styled.div`
  font-size: 16px;
  letter-spacing: 0.42px;
  color: #999999;
  text-transform: capitalize;
  white-space: nowrap;
`;

export const DialogSubText = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  letter-spacing: 0.42px;
  color: #000000;
  text-transform: capitalize;
  height: 100%;
`;

export const DialogContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 188px;
  bottom: 77px;
  padding: 10px 24px;
  overflow: auto;
`;

export const DialogRelativeBox = styled.div`
  position: relative;
  height: 100vh;
`;

export const DialogHeader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;
`;

export const HeaderText = styled.div`
  font-size: 18px;
  letter-spacing: 0.47px;
  color: #000000;
  text-transform: capitalize;
  padding: 20px 24px;
  border-bottom: 1px solid #e7e7e7;
`;

export const DialogFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const FlexView = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SelectedBox = styled.div`
  background: #e2e2e2;
  border-radius: 16px;
  font-size: 12px;
  letter-spacing: 0.36px;
  color: #000000;
  padding: 6px 15px;
`;

export const DetailsBox = styled.div`
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  padding: 15px;
`;

export const JustifyFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LeftText = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.42px;
  color: #18202c;
  padding-left: 5px;
`;

export const StyledDetailsButton = styled(Button)`
  border: ${({ outlined }) =>
    outlined ? '1px solid #343b89 !important' : 'none'};
  border-radius: 31px !important;
  text-transform: none !important;
  font-size: 12px !important;
  letter-spacing: 0.31px;
  color: ${({ outlined }) =>
    outlined ? '#343b89 !important' : '#ffffff !important'};
  background: ${({ outlined }) => (outlined ? 'none' : '#343b89 !important')};
`;

export const StyledCloseButton = styled(Button)`
  float: right;
  border-radius: 31px !important;
  text-transform: none !important;
  font-size: 14px !important;
  letter-spacing: 0.31px;
  color: #18aae7 !important;
  background: transparent !important;
  margin: 20px 30px;
`;

export const BottomContainer = styled.div`
  border-top: 1px solid #e7e7e7;
  border-radius: 0px 0px 10px 10px;
`;
