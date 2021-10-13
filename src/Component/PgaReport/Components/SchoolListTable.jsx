import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AddButton } from './StyledComponents';
import { useStyles } from '../Styles/Index';
function SchoolListTable(props) {
    const classes = useStyles()

    const rows = [
        {university : "hello", program : "world"},
        {university : "hello", program : "world"},
        {university : "hello", program : "world"},
        {university : "hello", program : "world"},
    ]
    return (
        <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>University Name</TableCell>
              <TableCell align="center">Program Name</TableCell>
              <TableCell></TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
                <TableRow className={index % 2 === 0 && classes.tableRowColor}>
                <TableCell>{row.university}</TableCell>
                <TableCell align="center">{row.program}</TableCell>
                <TableCell align="center"> <AddButton>Add</AddButton> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default SchoolListTable
