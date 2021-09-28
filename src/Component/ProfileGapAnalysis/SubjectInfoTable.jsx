import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, makeStyles } from "@material-ui/core"
function SubjectInfoTable() {
    const useStyles = makeStyles((theme)=>({
        tableRow : {
            backgroundColor : "#f1f1f1"
        }
    }))
    function createData(subCode, subName, maxMarks) {
        return { subCode, subName, maxMarks };
      }
      
      const rows = [
        createData( "159", 'Frozen yoghurt',4),
        createData("159", 'Frozen yoghurt',4),
        createData("159", 'Frozen yoghurt',4),
      ];
      const classes = useStyles()
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
            {rows.map((row, index) => (
              <TableRow className={index % 2 !== 0 && classes.tableRow } key={row.subCode}>
                <TableCell align={"center"}>
                  {row.subCode}
                </TableCell>
                <TableCell align={"center"}>{row.subName}</TableCell>
                <TableCell align={"center"}>{row.maxMarks}</TableCell>
                <TableCell align={"center"}>
                    <Button
                    size={"small"}
                    variant={"outlined"}
                    color={"primary"}
                    >
                    Copy
                    </Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SubjectInfoTable
