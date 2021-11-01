import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AddButton } from "./StyledComponents";
import { useStyles } from "../Styles/Index";
import { useDispatch } from "react-redux";
import { saveCourse } from "../../../Actions/HelperAction";
import { colors } from "../../../Constant/Variables";

function CourseListTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddClick = (data) => {
    dispatch(saveCourse(data));
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Title</TableCell>
            <TableCell align="center">Level</TableCell>
            <TableCell align="center">Program Type</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow className={index % 2 === 0 && classes.tableRowColor}>
              <TableCell>{row.courseTitle}</TableCell>
              <TableCell align="center">{row.level}</TableCell>
              <TableCell align="center">{row.programType}</TableCell>
              <TableCell align="center">
                {" "}
                <AddButton
                  color={
                    props.selectedCourse.filter((el) => el.id === row.id)
                      .length !== 0
                      ? colors.green
                      : colors.primaryColor
                  }
                  onClick={() => handleAddClick(row)}
                >
                  {props.selectedCourse.filter((el) => el.id === row.id)
                    .length !== 0
                    ? "Added"
                    : "Add"}
                </AddButton>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CourseListTable;
