import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DropDown from "../../Controls/DropDown";
import TextFieldComponent from "../../Controls/TextField";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    border: "2px solid #488DFF",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BlueTable({ data, focusList, handleFocusChange }) {
  const classes = useStyles();

  const renderContent = (
    type,
    name,
    focusNo,
    planId,
    ind,
    index,
    fontColor
  ) => {
    if (type === "TEXT") {
      return <Typography style={{ color: fontColor }}>{name}</Typography>;
    } else if (type === "OBJECT") {
      return (
        <DropDown
          id="combo-box-demo"
          options={focusList}
          value={name}
          onChange={(e, newValue) =>
            handleFocusChange(newValue, focusNo, planId, name, ind, index)
          }
          getOptionLabel={(option) => option.activity}
          renderInput={(params) => (
            <TextFieldComponent
              {...params}
              label="Focus Name"
              variant="standard"
            />
          )}
        />
      );
    }
  };
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        {data.map((eachRow, ind) => {
          return (
            <TableRow>
              {eachRow.map((eachData, index) => {
                return (
                  <TableCell align={"center"} className={classes.tableCell}>
                    {renderContent(
                      eachData.type,
                      eachData.name,
                      eachData.focusNo,
                      eachData.planId,
                      ind,
                      index,
                      eachData.frontColorCode
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </Table>
    </TableContainer>
  );
}
