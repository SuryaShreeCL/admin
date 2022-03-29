import { TableCell, TableHead } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import styled from "styled-components";

export const Head = withStyles({
  root: {
    borderBottom: "1px solid #CCCCCC",
  },
})(TableHead);

export const HeadCell = withStyles({
  root: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#052A4E",
    textAlign: "center",
    border: "none",
  },
})(TableCell);

export const BodyCell = withStyles({
  root: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#052A4E",
    textAlign: "center",
    borderBottom: "none",
  },
})(TableCell);

export const BlueCell = withStyles({
  root: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#0A66C2",
    textAlign: "center",
    borderBottom: "none",
  },
})(TableCell);

export const TableCells = withStyles({
  root: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#052A4E",
    borderBottom: "none",
  },
})(TableCell);

export const TableBox = styled.div`
  overflow: auto;
  width: 100%;
  /* height: 692px; */
  margin-top: 40px;
`;

export const HeadInline = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
`;

export const BoldCell = withStyles({
  root: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#052A4E",
    textAlign: "left",
    borderBottom: "none",
  },
})(TableCell);

export const typographyStyle = {
  cursor: "pointer",
  fontWeight: "600",
  marginLeft: "10px",
};

export const BreadCrumpContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

export const useStyles = makeStyles((them) => ({
  imgStyle: {
    cursor: "pointer",
    marginTop: "-10px",
  },
  textSTyle: {
    cursor: "pointer",
    fontWeight: "600",
  },
}));
