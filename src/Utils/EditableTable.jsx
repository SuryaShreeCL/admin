import { makeStyles, withStyles } from "@material-ui/core";
import MaterialTable, { MTableEditRow } from "material-table";
import React from "react";
import { tableIcons } from "./TableRefs";
export default function Editable(props) {
  const StyledEditRow = withStyles((theme) => ({
    root: {
    //h6 is the delete text HTML element that you wanna style
      "& h6": {
        fontSize: "unset",
      },
    },
  }))(MTableEditRow);

  const useStyles = makeStyles((theme) => ({
    actionButtonStyle: {
      marginRight: "-23px",
    },
  }));

  const tableStyle = {
    maxHeight: "450px",
    overflowY: "scroll",
  };

  return (
    <MaterialTable
      style={tableStyle}
      title=""
      columns={props.columns}
      icons={tableIcons}
      {...props}
      //   components={
      //     props.actionComponent
      // }
      components={{ EditRow: (props) => <StyledEditRow {...props} /> }}
      data={props.data}
      options={{
        headerStyle: {
          whiteSpace: "nowrap",   
        },
        //sticky header:,
        fixedColumns: {
        },
        // pageSize: ,
        maxBodyHeight:300 ,

        // actionsColumnIndex: -1,
        search: false,
        rowStyle: (rowData) => {
          if (rowData.tableData.id % 2 === 0) {
            return { backgroundColor: "#f1f1f1" };
          }
          return {};
        },
        paging: false,
      }}
      editable={{
        onRowAdd: props.onRowAdd,
        onRowUpdate: props.onRowUpdate,
        onRowDelete: props.onRowDelete,
      }}
    />
  );
}
