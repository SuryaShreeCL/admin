import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${params.getValue(
        params.id,
        "lastName"
      ) || ""}`,
  },
];

export const DataTable = (props) => {
  const { rows } = props.dataTable;
  return (
    <div style={{ height: 700, width: "100%", padding: 20, paddingLeft: 0 }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};
