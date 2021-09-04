import { withStyles } from "@material-ui/styles";
import { TableHead, TableCell, Menu } from "@material-ui/core";
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
    textAlign: "left",
  },
})(TableCell);

export const BodyCell = withStyles({
  root: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#052A4E",
    textAlign: "left",
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
    textAlign: "left",
    borderBottom: "none",
  },
})(TableCell);

export const MuiMenu = withStyles({
  paper: {
    background: "#ffffff",
    boxShadow: "0px 4px 11px 1px rgba(55, 143, 233, 0.25)",
    borderRadius: "12px",
    padding: "8px 8px",
    width: "260px",
  },
})(Menu);

// studyplans
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
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeadInline = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #052a4e;
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
