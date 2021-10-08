import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../FormStyles";
function BoardTable(props) {
  // Styles for this component
  const classes = useStyles();
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* Dynamically rendering table column */}
            {props.subjectTableFields.map((eachItem, index) => {
              return <TableCell align="center">{eachItem}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Rendering subject details in table */}
          {props.subjects.map((row) => (
            <TableRow
              key={row.classNameOrSemester}
              className={classes.tableRowColor}
            >
              <TableCell align={"center"}>{row.classNameOrSemester}</TableCell>
              <TableCell align="center">{row.schoolOrCollegeName}</TableCell>
              <TableCell align="center">{row.subjectName}</TableCell>
              <TableCell align="center">{row.gradeFormat}</TableCell>
              <TableCell align="center">{row.cumulativeResult}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BoardTable;
