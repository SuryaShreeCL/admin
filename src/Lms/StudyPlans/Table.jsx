import React from "react";
import { makeStyles } from "@material-ui/core";
import { TableCells, Head, HeadCell } from "../Assets/StyledTableComponents";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles({
  leftAlign: {
    textAlign: "left",
  },
});

const columns = ["#Day", "Topic", "No. of Tasks", "Time Required"];

export default function DataTable(props) {
  const classes = useStyles();
  const { item } = props;
  console.log(props.item);
  return (
    <React.Fragment>
      <Table>
        <Head>
          <TableRow >
            {columns.map((item, index) => (
              <HeadCell 
              style={{textAlign:"left"}}
              >
                {item}
              </HeadCell>
            ))}
          </TableRow>
        </Head>
        <TableBody>
         
            {item.data && item.data[0].map((month,index)=>{
              return(
                <TableRow 
                // style={{ border: "0 0 0 0" }}
                >
                  <TableCells >Day {month.day}</TableCells>
                  <TableCells>{month.topicName}</TableCells>
                  <TableCells style={{textAlign:"center"}}>{month.noOfTask}</TableCells>
                  <TableCells style={{textAlign:"center"}}>{month.duration} min</TableCells>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}
