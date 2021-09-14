import React from "react";
import { makeStyles } from "@material-ui/core";
import { TableCells, Head, HeadCell } from "../../Assets/StyledTableComponents";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Pagination } from "@material-ui/lab";
import PaginationComponent from "../../Utils/PaginationComponent";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "./Popover";

const useStyles = makeStyles({
  leftAlign: {
    textAlign: "left",
  },
});

const columns = ["#Day", "Topic", "No. of Tasks", "Time Required", ""];

export default function DataTable(props) {
  const classes = useStyles();

  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const { item } = props;

  React.useEffect(() => {
    setEnd(10);
  }, [item]);

  console.log(item);
  if (item)
    return (
      <React.Fragment>
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
                  <TableRow
                  // style={{ border: "0 0 0 0" }}
                  >
                    <TableCells>Day {month.day}</TableCells>
                    <TableCells>{month.topicName}</TableCells>
                    <TableCells style={{ textAlign: "center" }}>
                      {month.noOfTask}
                    </TableCells>
                    <TableCells style={{ textAlign: "center" }}>
                      {month.duration} min
                    </TableCells>
                    <TableCells style={{ textAlign: "center" }}>
                      {/* <Popover options={['Edit']} /> */}
                    </TableCells>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <PaginationComponent
          variant="outlined"
          pageCount={Math.ceil(item.length / 10)}
          onPageChange={(e, page) => {
            // setStart(start * 10);
            setEnd(page * 10);
          }}
          shape="rounded"
        />
      </React.Fragment>
    );

  return <></>;
}
