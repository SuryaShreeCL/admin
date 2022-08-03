import {
  TableBody,
  TableCell,
  TableHead,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import styled from "styled-components";

export const CourseContainer = styled.div`
  min-height: 672px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
`;

export const CourseTabs = styled.div`
  min-height: 56px;
  position: relative;
  z-index: 1;
`;

export const CourseTabsDuplicateCard = styled.div`
  height: 50px;
  width: 100%;
  background: #1093ff;
  box-shadow: 0px 0px 7px rgb(183 222 255 / 50%);
  border-radius: 4px;
  position: absolute;
  top: 0;
  z-index: -1;
`;

export const TaskTabs = styled.div`
  height: 100%;
  background: #fafafa;
  width: 210px;
`;

export const LmsTabs = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 4px;
  height: 56px;
  margin-bottom: 16px;
`;

export const CardContainer = styled.div`
  min-height: 100px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
  margin-top: ${({ marginTop }) => marginTop};
`;

// Review Page Components

export const TableHeaderCell = withStyles((theme) => ({
  root: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    color: "#052A4E",
    textAlign: "center",
    border: "0",
    paddingTop: "32px !important",
    background: "#ffffff",
  },
}))(TableCell);

export const TableHeader = withStyles(() => ({
  root: {
    background: "#FFFFFF",
    borderRadius: "0px 12px 12px 12px",
    border: "0 0 0 0",
  },
}))(TableHead);

export const TableBodyStyle = withStyles(() => ({
  root: {
    background: "#FFFFFF",
    borderRadius: "8px",
    paddingTop: "50px !important",
  },
}))(TableBody);

export const TableItemBlue = withStyles(() => ({
  root: {
    fontSize: "16px",
    lineHeight: "20px",
    textAlign: "center",
    color: "#052A4E",
  },
}))(TableCell);

export const TableItem = withStyles(() => ({
  root: {
    fontSize: "16px",
    lineHeight: "20px",
    textAlign: "center",
    color: "#052A4E",
    fontWeight: 400,
    borderBottom: "12px solid #ffffff !important",
    background: "#FBFBFB",
  },
}))(TableCell);

export const TableItemBlack = withStyles(() => ({
  root: {
    fontSize: "16px",
    lineHeight: "20px",
    textAlign: "center",
    color: "#000000",
  },
}))(TableCell);

export const StatusToolTip = withStyles({
  tooltip: {
    backgroundColor: "#ffffff",
    boxShadow: "1px 1px 6px 4px rgba(1, 54, 3, 0.25)",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#052A4E",
    padding: "16px",
  },
  arrow: {
    color: "#ffffff",
  },
})(Tooltip);
