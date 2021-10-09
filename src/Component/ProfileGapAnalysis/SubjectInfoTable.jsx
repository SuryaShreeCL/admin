import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, makeStyles } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { saveCopyData } from '../../Actions/HelperAction';

  function SubjectInfoTable(props) {
    const useStyles = makeStyles((theme) => ({
      tableRow: {
        backgroundColor: "#f1f1f1",
      },
    }));

    const { copiedData }  = useSelector(state => state.HelperReducer)
    const classes = useStyles();
    const dispatch = useDispatch()
    const handleCopy = (data) =>{
      dispatch(saveCopyData(data))
    }
    console.log(props, "____________________-")
    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>Subjext Code</TableCell>
              <TableCell align={"center"}>Subject Name</TableCell>
              <TableCell align={"center"}>Max Marks</TableCell>
              <TableCell align={"center"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.studentSubjectDetails && props.studentSubjectDetails.map((row, index) => (
              <TableRow
                className={index % 2 !== 0 && classes.tableRow}
                // key={row.subjectDetails && row.subjectDetails.subjectCode}
              >
                <TableCell align={"center"}>{row.subjectDetails && row.subjectDetails.subjectCode}</TableCell>
                <TableCell align={"center"}>{row.subjectDetails && row.subjectDetails.subjectName}</TableCell>
                <TableCell align={"center"}>{row.subjectDetails && row.subjectDetails.maximumMarks}</TableCell>
                <TableCell align={"center"}>
                  <Button size={"small"} variant={"outlined"} onClick={()=>handleCopy(row)} color={"primary"}>
                    Copy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


export default SubjectInfoTable
