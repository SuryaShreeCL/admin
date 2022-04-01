import { Button, createTheme, makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles((theme) => ({
  stageBoxLayoutStyle: {
    borderStyle: "groove",
    borderRadius: "10px",
    marginTop: "10px",
  },
  dividerStyle: {
    backgroundColor: "#D2D2D2",
  },
  iconButtonStyle: {
    padding: "2px !important",
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
