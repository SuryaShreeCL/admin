import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../FormStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function SemScoreCard(props) {
  // Styles for this component
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardTitle}>
        <Typography className={classes.semTitle}>
          Semester {props.semNumber}
        </Typography>
      </div>
      <div className={classes.cardTableContainer}>
        <TableContainer>
          <Table size={"small"} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Subject Name</TableCell>
                <TableCell align="center">Score Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Rendering subject details and score */}
              {props.subjectDetails.map((row, index) => (
                <TableRow
                  key={row.subjectName}
                  className={index % 2 === 0 && classes.tableRowColor}
                >
                  <TableCell align={"center"}>{row.subjectName}</TableCell>
                  <TableCell align="center">{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default SemScoreCard;
