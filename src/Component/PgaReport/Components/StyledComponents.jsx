import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 90vh;
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
