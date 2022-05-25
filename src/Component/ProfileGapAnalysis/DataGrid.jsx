import React from "react";
import { DataGrid as DataTable, GridColDef } from "@material-ui/data-grid";

const Table = ({
  data,
  pgaCallStatus,
  ppgaCallStatus,
  action,
  page,
  pageSize,
  rowCount,
  onPageChange,
  onPageSizeChange,
}) => {
  const col = [
    {
      field: "id",
      headerName: "id",
      width: 200,
      hide: true,
    },
    {
      field: "clsId",
      headerName: "CLS ID",
      width: 180,
    },
    {
      field: "fullName",
      headerName: "Client Name",
      width: 200,
      renderCell: (params) => {
        return <h6>{params.row.firstName + " " + params.row.lastName}</h6>;
      },
    },
    {
      field: "emailId",
      headerName: "Email Address",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "pgaCallStatus",
      headerName: "PGA Call Status",
      width: 200,
      renderCell: (params) => pgaCallStatus(params.row),
    },
    {
      field: "ppgaCallStatus",
      headerName: "PPGA Call Status",
      width: 200,
      renderCell: (params) => ppgaCallStatus(params.row),
    },
    {
      field: "",
      headerName: "Action",
      width: 200,
      renderCell: (params) => action(params.row),
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
        pagination={true}
        paginationMode={"server"}
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        rowsPerPageOptions={[10, 20, 40, 80]}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default Table;
