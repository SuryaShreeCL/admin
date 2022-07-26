import {
  Button,
  createTheme,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  stageBoxLayoutStyle: {
    borderStyle: "groove",
    borderRadius: "10px",
    marginTop: "10px",
    minHeight: "100vh",
  },
  dividerStyle: {
    backgroundColor: "#D2D2D2",
  },
  iconButtonStyle: {
    padding: "2px !important",
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    background: "none",
  },
  rightContainer: {
    border: "1px solid #C8C8C8",
    width: "99.5%",
    height: "100%",
    borderRadius: "4px",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

export const customTheme = createTheme({
  palette: {
    contained: {
      backgroundColor: "#18AAE7",
      color: "#FFFFFF",
    },
    text: {
      color: "#18AAE7",
    },
    outlined: {
      color: "#18AAE7",
      borderColor: "#18AAE7",
    },
    delete: {
      color: "#FD413C",
      borderColor: "#FD413C",
    },
    disabled: {},
  },
});

export const StyledButton = styled(Button)`
  height: ${({ height }) =>
    height ? `${height} !important` : `36px !important`};
  padding: 15px !important;
  text-transform: none !important;
`;

export const StyledStaticButton = styled(Button)`
  min-height: 72px;
  padding: 20px;
  & .MuiButton-label {
    color: ${({ active }) => (active ? "#18AAE7" : "#333333")};
  }
`;

export const StyledCustomStaticTable = styled.table`
  border-collapse: collapse;
  height: 100%;
  width: 100%;
  display: grid !important;

  th,
  td {
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: normal !important;
    padding: 10px;
    width: 25%;
  }

  th {
    padding: 20px 10px;
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

  tr th:last-child,
  tr td:last-child {
    text-align: right;
    padding-right: 20px;
  }

  tr td:first-child,
  tr th:first-child {
    text-align: left;
    padding-left: 38px;
  }

  thead,
  tbody {
    display: block;
  }

  tbody {
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  thead tr {
    background-color: #ffffff !important;
    align-items: unset !important;
    &:first-child:hover {
      background-color: #ffffff !important;
    }
  }

  tr {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
`;

export const StyledList = styled(List)`
  padding: 0;
  display: grid;
  gap: 6px;
`;

export const StyledListItem = styled(ListItem)`
  padding: 12px 16px;
  border-radius: 4px;

  &.MuiListItem-root.Mui-selected {
    background-color: rgb(24, 170, 231);
    color: #ffffff;
  }
`;

export const StyledMenuPaper = styled.div`
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(24, 170, 231, 0.3);
  background: #ffffff;
  right: 3px;
  position: relative;
`;
export const Wrapper = styled.div`
  border: 1px solid #e7e7e7;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const PreferenceDetails = styled.div`
  width: 100%;
  height: 95px;
  background: #e5efff 0% 0% no-repeat padding-box;
  opacity: 1;
`;
export const VerticalTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid #488dff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: auto !important;
  left: 0px;
  ::-webkit-scrollbar {
    width: 8px;
    height: 52px;
  }

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

  tr:last-child th {
    border-bottom: none !important;
  }

  tr:first-child td {
    border-top-left-radius: 10px;
  }
`;
export const VerticalTableHead = styled.th`
  text-align: center;
  font-size: 14px;
  color: #488dff;
  padding: 5px 0px !important;
  width: 400px;
  padding: 14px !important;
`;
export const UniversityName = styled.th`
  text-align: center;
  font-size: 14px;
  color: #488dff;
  padding: 5px 0px !important;
`;
export const TableData = styled.td`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  padding: 9 !important;
  align-items: center;
  width: 20%;
`;
export const AddedData = styled.td`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  padding: 9 !important;
  align-items: center;
  width: 5%;
`;
export const UniversityNameList = styled.td`
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  width: 40%;
`;
export const NoDataFound = styled.td`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  width: 100%;
`;
export const CollegeData = styled.td`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  padding: 14px !important;
`;
export const TableRow = styled.tr``;
export const TableRows = styled.tr`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 50px;
  font-size: 20px;
  z-index: 1;
`;
export const TableHead = styled.th`
  text-align: center;
  font-size: 16px;
  color: #488dff;
  padding: 18px !important;
`;
export const PaddingBottom = styled.div`
  padding-bottom: 1em;
`;
export const PaddingBottomWithAlignment = styled.div`
  padding-bottom: 1em;
`;
export const LeftContainerFlexibility = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  border-top: 1px solid #fff;
`;
export const LeftContainerDataFlexibility = styled.div`
  margin: 1em;
  margin-top: 1em;
`;
export const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: yellow;
  padding: 50px;
  font-size: 20px;
`;
export const Category = styled.td`
  text-align: center;
  font-size: 14px;
  align-items: center;
  width: 10%;
`;
