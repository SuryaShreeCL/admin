import { DataGrid as DataTable } from "@material-ui/data-grid";
import React from "react";

const Table = ({ data, action }) => {
  const col = [
    {
      field: "id",
      headerName: "id",
      hide: true,
    },
    {
      field: "clsId",
      headerName: "CLS ID",
      width: 300,
    },
    {
      field: "fullName",
      headerName: "Client Name",
      renderCell: (params) => {
        return <h6>{`${params.row.firstName} ${params.row.lastName}`}</h6>;
      },
      width: 300,
    },
    {
      field: "emailId",
      headerName: "Email Address",
      width: 300,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => action(params.row),
      sortable: false,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataTable
        columns={col}
        rows={data.map((item, i) => {
          return {
            ...item,
            id: i,
          };
        })}
      />
    </div>
  );
};

export default Table;
