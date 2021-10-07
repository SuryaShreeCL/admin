import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from '../FormStyles';
function BoardTable(props) {
    const classes = useStyles()
    return (
        <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Class Name</TableCell>
              <TableCell align="center">School Name</TableCell>
              <TableCell align="center">Board Name</TableCell>
              <TableCell align="center">Grade Format</TableCell>
              <TableCell align="center">Year Of Graduation</TableCell>
              <TableCell align="center">Cumulative Result</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.schoolName} className={classes.tableRowColor}>
                <TableCell align={"center"}>
                  {row.className}
                </TableCell>
                <TableCell align="center">{row.schoolName}</TableCell>
                <TableCell align="center">{row.boardName}</TableCell>
                <TableCell align="center">{row.grade}</TableCell>
                <TableCell align="center">{row.year}</TableCell>
                <TableCell align="center">{row.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

const data = [
    {className : "OOO", schoolName : "PPP", boardName : "JJJ", grade : "KKK", year : "MMM", result : "NNN"},
    {className : "OOO", schoolName : "PPP", boardName : "JJJ", grade : "KKK", year : "MMM", result : "NNN"},
    {className : "OOO", schoolName : "PPP", boardName : "JJJ", grade : "KKK", year : "MMM", result : "NNN"},
]

export default BoardTable
