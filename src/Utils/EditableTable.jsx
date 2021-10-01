import React, { useState } from "react";
import MaterialTable, {MTableAction} from "material-table";
import { tableIcons } from "./TableRefs";
import AddIcon from "@material-ui/icons/AddAlarm";
import { IconButton } from "@material-ui/core";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { makeStyles } from "@material-ui/core";
export default function Editable(props) {

  const useStyles = makeStyles((theme)=>({
    actionButtonStyle : {
      marginRight : "-23px"
    },
  }))

  const { useState } = React;
  const tableRef = React.createRef();
  const addActionRef = React.useRef();
  const classes = useStyles()

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname'},
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: "",
      field: "internal_action",
      editable: false,
      render: (rowData) =>{
        if(rowData){
          if(rowData.tableData.id + 1 === data.length){
            console.log(rowData, "-------------")
           return (
            <IconButton
              style={{marginRight : "-23px"}}
              color="primary"
              onClick={() => addActionRef.current.click()}
            >
              <AddCircleRoundedIcon />
            </IconButton>
          )
          }
          
        }
      },
        
        cellStyle: {
         textAlign : "right",
        },
    }
   
  ]);

  const [data, setData] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017},
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017},
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017},
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017},

  ]);

  const tableStyle = {
    maxHeight : "450px",
    overflowY : "scroll"
  }

  return (
    <MaterialTable
      style={tableStyle}
      title=""
      columns={props.columns}
      icons={tableIcons}
      components={
        props.actionComponent
      //   {
      //   Action: (props) => {
      //     //If isn't the add action
      //     console.log(props.action);
      //     if (
      //       typeof props.action === typeof Function ||
      //       props.action.tooltip !== "Add"
      //     ) {
      //       return <MTableAction {...props} />;
      //     } else {
      //       return <div ref={addActionRef} onClick={props.action.onClick} />;
      //     }
      //   }
      // }
    }
      data={props.data}
      options={{
        actionsColumnIndex: -1,
        search : false,
        rowStyle :  rowData => {
          if(rowData.tableData.id %2 === 0) {
            return {backgroundColor: '#f1f1f1'};
          }
          return {};
        },
        paging : false
      }}
      editable={{
        onRowAdd:
         props.onRowAdd,
        // newData =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       setData([...data, newData]);
        //       resolve();
        //     }, 1000)
        //   }),
        onRowUpdate: 
        props.onRowUpdate,
        // (newData, oldData) =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataUpdate = [...data];
        //       const index = oldData.tableData.id;
        //       dataUpdate[index] = newData;
        //       setData([...dataUpdate]);

        //       resolve();
        //     }, 1000)
        //   }),
        onRowDelete: 
        props.onRowDelete,
        // oldData =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       const dataDelete = [...data];
        //       const index = oldData.tableData.id;
        //       dataDelete.splice(index, 1);
        //       setData([...dataDelete]);
        //       resolve()
        //     }, 1000)
        //   }),
      }}
    />
  )
}
