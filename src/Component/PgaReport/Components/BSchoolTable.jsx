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
import { saveSchool } from "../../../Actions/HelperAction";
import { colors } from "../../../Constant/Variables";
function BSchoolTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddClick = (data) => {
    dispatch(saveSchool(data));
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Region</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">B School Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow className={index % 2 === 0 && classes.tableRowColor}>
              <TableCell>{row.region && row.region.name}</TableCell>
              <TableCell align="center">
                {row.country && row.country.name}
              </TableCell>
              <TableCell align="center">
                {row.university && row.university.name}
              </TableCell>
              <TableCell align="center">
                {" "}
                <AddButton
                  color={
                    props.selectedSchool.filter((el) => el.id === row.id)
                      .length !== 0
                      ? colors.green
                      : colors.primaryColor
                  }
                  onClick={() => handleAddClick(row)}
                >
                  {props.selectedSchool.filter((el) => el.id === row.id)
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

export default BSchoolTable;
