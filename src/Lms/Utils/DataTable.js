import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import SortIcon from "../Assets/icons/unfold.svg";
import UnsortedIcon from "../Assets/icons/unsorted.svg";

const useStyles = makeStyles({
  root: {
    border: "none",
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      padding: "0 !important",
      fontWeight: 600,
      fontSize: "18px",
      color: "#052A4E",
    },
  },
  cell: {
    border: "none !important",
    color: "#052A4E",
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
  const { rows, columns } = props.dataTable;
  const classes = useStyles();

  const columnsMap = columns.map((column) =>
    Object.assign({}, column, {
      headerClassName: classes.hideRightSeparator,
    })
  );

  return (
    <div style={{ height: 700, width: "100%", padding: 10, paddingLeft: 15 }}>
      <DataGrid
        sortingOrder={["desc", "asc", null]}
        rows={rows}
        columns={columnsMap}
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
