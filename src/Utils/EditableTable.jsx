import React, { useState } from "react";
import MaterialTable, {MTableAction} from "material-table";
import { tableIcons } from "./TableRefs";
import AddIcon from "@material-ui/icons/AddAlarm";
import { IconButton } from "@material-ui/core";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
export default function Editable() {
  const { useState } = React;
  const tableRef = React.createRef();
  const addActionRef = React.useRef();

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname'},
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: "",
      field: "internal_action",
      editable: false,
      render: (rowData) =>
        rowData && (
          <IconButton
            color="secondary"
            onClick={() => addActionRef.current.click()}
          >
            <AddCircleRoundedIcon />
          </IconButton>
        ),
        // cellStyle: {
        //   backgroundColor: '#039be5',
        //   color: '#FFF'
        // },
    }
   
  ]);

  const [data, setData] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017},
  ]);

  return (
    <MaterialTable
      title=""
      columns={columns}
      icons={tableIcons}
      components={{
        Action: (props) => {
          //If isn't the add action
          console.log(props.action);
          if (
            typeof props.action === typeof Function ||
            props.action.tooltip !== "Add"
          ) {
            return <MTableAction {...props} />;
          } else {
            return <div ref={addActionRef} onClick={props.action.onClick} />;
          }
        }
      }}
      data={data}
      options={{
        actionsColumnIndex: -1,
        search : false,
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataUpdate = [...data];
        //       const index = oldData.tableData.id;
        //       dataUpdate[index] = newData;
        //       setData([...dataUpdate]);

        //       resolve();
        //     }, 1000)
        //   }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
  )
}
