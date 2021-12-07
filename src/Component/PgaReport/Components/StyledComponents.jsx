import { Button, ListItemText } from '@material-ui/core';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Pentagon } from '../../../Asset/icons/pentagon.svg';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const PageWrapper = styled.div`
  height: 90vh;
  overflow-y: auto;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

export const PageWrap = styled.div`
  height: 98vh;
  overflow-y: auto;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

export const AddButton = styled.button`
  color: ${props => props.color};
  background-color: transparent;
  padding: 2px 15px;
  border: 2px solid;
  border-color: ${props => props.color};
  border-radius: 5px;
  min-width: 80px;
  cursor: pointer;
`;

export const SaveContainer = styled.div`
  width: 100%;
  position: absolute;
  padding: 12px 30px;
  border-top: 2px solid #f1f1f1;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
`;

export const ListingDiv = styled.div`
  width: 100%;
  display: flex;
  background-color: ${props => props.color};
  padding: 15px;
`;

export const DeleteContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
`;

export const DeleteLeftWrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #f1f1f1;
`;

export const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoShoolContainer = styled.div`
  height: 35vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const TableCellContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;
`;

export const FlexView = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 10px;
`;

export const StyledButton = styled(Button)`
  color: ${({ isOutlined }) =>
    isOutlined ? '#2f9be5 !important' : '#FFFFFF !important'};
  background: ${({ isOutlined }) => !isOutlined && '#2f9be5 !important'};
  padding: 2px 15px;
  border: ${({ isOutlined }) => isOutlined && '2px solid #2f9be5 !important'};
  border-radius: 5px;
`;

export const WhiteBox = styled.div`
  display: block;
  position: relative;
  width: 240px;
  height: 280px;
`;

export const searchAnimation = keyframes`
  25% {
    top: 102px;
    left: 140px;
  }
  50% {
    top: 180px;
    left: 82px;
  }
  75% {
    top: 180px;
    left: 82px;
  }
  100% {
    top: 102px;
    left: 25px;
  }
`;

export const TransitionImg = styled.img`
  width: 75px;
  height: 75px;
  display: block;
  position: relative;
  user-select: none;
  top: 25px;
  left: 82px;
  animation-name: ${searchAnimation};
  animation-duration: 4s;
  animation-delay: 1s;
`;

export const ListText = styled(ListItemText)`
  color: #333333;
  .MuiTypography-body1 {
    font-size: 18px !important;
    font-weight: 500 !important;
  }
`;

export const QuestionText = styled.div`
  font-size: 14px;
  letter-spacing: 0.36px;
  color: #333333;
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const BorderBox = styled.div`
  letter-spacing: 0.36px;
  color: ${({ selected }) => (selected ? '#ffffff' : '#333333')};
  padding: 15px 20px;
  font-size: 14px;
  background: ${({ selected }) => (selected ? '#343b89' : '#FFFFFF')};
  border-radius: 4px;
  border: ${({ selected }) => (selected ? 'none' : '1px solid #E7E7E7')};
  height: 100%;
  cursor: ${({ cursor }) => (cursor ? 'pointer' : 'default')};
  user-select: none;
  text-align: center;
  align-items: center;
  display: grid;
  overflow-wrap: anywhere;
`;

export const BoldText = styled.div`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #333333;
  padding-right: 15px;
`;

export const BottomBox = styled.div`
  background: #ffffff;
  border-top: 1px solid #d2d2d2;
  padding: 15px 30px;
`;

export const StyledMediumButton = styled(Button)`
  color: ${({ isOutlined }) =>
    isOutlined ? '#18AAE7 !important' : '#FFFFFF !important'};
  background: ${({ isOutlined }) => !isOutlined && '#18AAE7 !important'};
  padding: 5px 15px;
  border: ${({ isOutlined }) => isOutlined && '2px solid #18AAE7 !important'};
  border-radius: 5px;
  font-size: 14px !important;
`;

export const CenteredText = styled.div`
  font-size: 18px;
  letter-spacing: 0.6px;
  color: #000000;
  text-align: center;
  max-width: 380px;
  margin: 0 auto;
`;

export const CenteredIcon = styled(Pentagon)`
  width: 87px;
  height: 83px;
  stroke: #666666;
  fill: none;
  display: block;
  margin: 150px auto 20px;
  & circle {
    fill: #666666;
  }
`;

export const SideIcon = styled(Pentagon)`
  width: 55px;
  height: 54px;
  stroke: ${({ color }) => color};
  fill: none;
  display: block;
  margin: auto 16px;
  & circle {
    fill: ${({ color }) => color};
  }
  position: relative;
`;

export const ClickableBox = styled.div`
  max-width: 250px;
  height: 100px;
  background: #ffffff;
  border: 1px solid;
  border-color: ${({ active }) => (active ? '#18AAE7' : '#E7E7E7')};
  border-radius: 10px;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  justify-content: space-between;
`;

export const CardRightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px 10px 10px 0px;
  flex: 1;
  overflow: hidden;
`;

export const CardText = styled.div`
  font-size: 14px;
  letter-spacing: 0px;
  color: #333333;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ChartSubTitle = styled.div`
  color: #5c9ccf;
  font-size: 18px;
  padding: 20px 20px 10px;
`;

export const JustifyFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CenteredLoader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
`;

export const PopoverBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e7e7e7;
  padding: 30px;
  padding-right: 15px;
  max-width: 740px;
  height: 100%;
  top: 14px;
  right: -5px;
  border-radius: 10px;
  position: relative;

  & #pad {
    padding: 15px 0px;
  }

  &::before {
    background: #ffffff;
    content: '';
    display: block;
    position: absolute;
    border: 8px solid transparent;
    border-top: 0;
    border-bottom: 16px solid #ffffff;
    top: -1px;
    right: 14px;
  }
`;

export const ParagraphHead = styled.p`
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Paragraph = styled.p`
  font-size: 14px;
  color: #333333;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-bottom: 5px;
`;

export const Bolder = styled.b`
  font-weight: ${({ fontWeight }) => fontWeight};
`;

export const CustomList = styled.ul`
  li {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
  }
`;

export const FloatImage = styled.img`
  float: right;
  position: relative;
  width: 234px;
  height: 216px;
  right: 56px;
`;

export const PositionedArrow = styled(ExpandLessIcon)`
  position: absolute;
  right: 0px;
  top: -27px;
  font-size: 42px;
  font-weight: normal;
  color: #e7e7e796;
  z-index: 0;
  `;

export const ImageFrameIcon = styled.img`
  width: 28px;
  height: 25px;
`;

export const PopupHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  overflow: hidden;
  font-size: 18px;
  letter-spacing: 0.47px;
  color: #000000;
  text-transform: capitalize;
  padding: 20px 24px;
  border-bottom: 1px solid #e7e7e7;
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px 15px;
  margin: 0px 25px;
  border-bottom: 1px solid #e7e7e7;
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
`;

export const ListSubText = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  letter-spacing: 0.42px;
  color: #999999;

  span {
    color: #000000;
    padding-left: 10px;
    font-weight: 600;
  }
`;

export const StyleCloseButton = styled(Button)`
  font-size: 14px !important;
  letter-spacing: 0.31px !important;
  color: #18aae7 !important;
  padding: 0px !important;
  text-transform: none !important;
`;

export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65px;
  overflow: hidden;
  border-top: 1px solid #e7e7e7;
  padding: 20px 48px;
  text-align: right;
`;

export const DialogContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const MainContainer = styled.div`
  position: absolute;
  top: 65px;
  bottom: 65px;
  left: 0;
  right: 0;
  overflow: auto;
  padding: 17px 0px 15px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid #488dff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  tr th,
  tr td {
    border-left: 2px solid #488dff;
    border-bottom: 2px solid #488dff;
    padding: 5px;
  }
  tr th:first-child,
  tr td:first-child {
    border-left: none;
  }
  tr:last-child td {
    border-bottom: none;
  }
  tr:first-child th {
    border-top-left-radius: 10px;
  }
  tr:last-child td {
    border-bottom-left-radius: 10px;
  }

  tr:first-child:hover {
    background: none !important;
  }
`;

export const TableHead = styled.th`
  text-align: center;
  font-size: 16px;
  color: #488dff;
  padding: 20px !important;
`;

export const TableData = styled.td`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  padding: 20px !important;
`;

export const TableContainer = styled.div`
  padding: 30px 50px;
`;
