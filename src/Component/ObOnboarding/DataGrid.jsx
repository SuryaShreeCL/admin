import { DataGrid as DataTable } from "@material-ui/data-grid";
import React from "react";

const Table = ({
  data,
  obCallStatus,
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
      width: 200,
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
      field: "obCallStatus",
      headerName: "OB Call Status",
      width: 200,
      renderCell: (params) => obCallStatus(params.row),
    },
    {
      field: "percentage",
      headerName: "Stage Completion",
      width: 200,
      renderCell: (params) => `${params.row.percentage}%`,
    },
    {
      field: "",
      headerName: "Action",
      width: 300,
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
