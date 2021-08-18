import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Table,
  TableBody,
  TableRow,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import {
  BlueCell,
  TableCells,
  Head,
  HeadCell,
  MuiMenu,
} from "../Assets/StyledTableComponents";
import { MoreVertRounded, ViewColumnSharp } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItems from "./Pop";

const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useStyles = makeStyles({
  leftAlign: {
    textAlign: "left",
  },
});

const columns = ["#Day", "Topic", "No. of Tasks", "Time Required"];

const getDateFormat = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDay();
  let month = MONTH[date.getMonth()];
  let year = date.getFullYear();
  return day + " " + month + " " + year;
};

export default function DataTable(props) {
  const classes = useStyles();
  const {
    content: rows,
    anchorEl,
    threeDotId,
    handleThreeDotClick,
    handleClose,
  } = props;
  return (
    <React.Fragment>
      <Table>
        <Head>
          <TableRow>
            {columns.map((item, index) => (
              <HeadCell
                className={(index === 0 || index === 4) && classes.leftAlign}
              >
                {item}
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
          {rows &&
            rows.map((item, index) => {
              return (
                <TableRow style={{ border: "0 0 0 0" }}>
                  <TableCells className={classes.leftAlign}>
                    {index} Add New Study Plan
                  </TableCells>
                  <TableCells>{item}</TableCells>
                  <TableCells>{item}</TableCells>
                  <TableCells>{item}</TableCells>
                  <TableCells className={classes.leftAlign}>
                    {item.uploadedBy}
                  </TableCells>
                  {/* <TableCells>{getDateFormat(item.createdAt)}</TableCells> */}
                  <BlueCell>
                    <IconButton
                      aria-controls={item.id}
                      aria-haspopup="true"
                      onClick={handleThreeDotClick}
                    >
                      <MoreVertRounded style={{ fill: "#1093FF" }} />
                    </IconButton>
                    <MuiMenu
                      id={item.id}
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      onClose={handleClose}
                    >
                      <MenuItems roll={"LMSCHECKER"} />
                    </MuiMenu>
                  </BlueCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
