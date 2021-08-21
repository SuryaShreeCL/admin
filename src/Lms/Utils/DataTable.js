import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import SortIcon from "../Assets/icons/unfold.svg";
import UnsortedIcon from "../Assets/icons/unsorted.svg";

const useStyles = makeStyles({
  root: {
    border: "none",
  },
  cell: {
    border: "none !important",
    columnSeparator: {
      display: "none",
    },
  },
  hideRightSeparator: {
    "& > .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },
  },
});

const Ascending = () => {
  return <img src={SortIcon} />;
};

const Descending = () => {
  return <img src={SortIcon} style={{ transform: "rotate(180deg)" }} />;
};

const Unsorted = () => {
  return <img src={UnsortedIcon} style={{ transform: "rotate(180deg)" }} />;
};

export const DataTable = (props) => {
  const { rows } = props.dataTable;
  const classes = useStyles();

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      headerClassName: classes.hideRightSeparator,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "taskName",
      headerName: "Task name",
      sortable: false,
      flex: 1,
      headerClassName: classes.hideRightSeparator,
    },
    {
      field: "topicName",
      headerName: "Topic Name",
      flex: 1,
      headerClassName: classes.hideRightSeparator,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      flex: 1,
      sortable: false,
      headerClassName: classes.hideRightSeparator,
    },
  ];

  return (
    <div style={{ height: 700, width: "100%", padding: 10, paddingLeft: 0 }}>
      <DataGrid
        sortingOrder={["desc", "asc", null]}
        rows={rows}
        columns={columns}
        hideFooter={true}
        disableColumnMenu={true}
        components={{
          ColumnSortedAscendingIcon: Ascending,
          ColumnSortedDescendingIcon: Descending,
          ColumnUnsortedIcon: Unsorted,
        }}
        classes={{
          root: classes.root,
          cell: classes.cell,
          row: classes.cell,
        }}
      />
    </div>
  );
};
