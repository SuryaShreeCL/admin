import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Head, HeadCell, TableCells } from "../../Assets/StyledTableComponents";
import PaginationComponent from "../../Utils/PaginationComponent";

const useStyles = makeStyles({
  leftAlign: {
    textAlign: "left",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "650px",
  },
});

const columns = ["#Day", "Topic", "Tasks", "Time Required", ""];

export default function DataTable(props) {
  const classes = useStyles();

  const [end, setEnd] = React.useState(10);
  const { item } = props;

  React.useEffect(() => {
    setEnd(10);
  }, [item]);

  if (item)
    return (
      <div className={classes.container}>
        <Table>
          <Head>
            <TableRow>
              {columns.map((item, index) => (
                <HeadCell style={{ textAlign: "left" }}>{item}</HeadCell>
              ))}
            </TableRow>
          </Head>
          <TableBody>
            {item &&
              item.slice(end - 10, end).map((month, index) => {
                return (
                  <TableRow>
                    <TableCells>Day {month.day}</TableCells>
                    <TableCells>{month.topicName}</TableCells>
                    <TableCells>{month.taskName}</TableCells>
                    <TableCells style={{ textAlign: "center" }}>
                      {month.duration} min
                    </TableCells>
                    <TableCells style={{ textAlign: "center" }}></TableCells>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <PaginationComponent
          variant='outlined'
          pageCount={Math.ceil(item.length / 10)}
          onPageChange={(e, page) => {
            setEnd(page * 10);
          }}
          shape='rounded'
        />
      </div>
    );

  return <></>;
}
