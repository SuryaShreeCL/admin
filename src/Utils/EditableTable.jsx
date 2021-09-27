import React, { useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "./TableRefs";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import { TextField, IconButton } from "@material-ui/core";
// import PrimaryButton from "./PrimaryButton";
// import DeleteIcon from "@material-ui/icons/Delete";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// export default function Editabletable() {
//   const [data, setData] = useState([
//     createData("Frozen yoghurt", 159, 6.0),
//     createData("Ice cream sandwich", 237, 9.0),
//     createData("Eclair", 262, 16.0),
//     createData("Cupcake", 305, 3.7),
//     createData("Gingerbread", 356, 16.0),
//   ]);
//   function createData(name, calories, fat) {
//     return { name, calories, fat };
//   }

//   const classes = useStyles();

//   const handleAddRow = () => {
//     console.log(data);

//     setData([...data, createData("", "", "")]);
//   };

//   const handleDeleteClick = (index) => {
//     var newArr = data.filter((val, i) => i !== index);
//     setData(newArr);
//   };

//   const handleChange = (e,index) =>{
//     let items = [...data];
//     // 2. Make a shallow copy of the item you want to mutate
//     let item = { ...items[index] };
//     // 3. Replace the property you're intested in
//     item[e.target.name] = e.target.value;
//     // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
//     items[index] = item;
//     // 5. Set the state to our new copy
//     setData(items)
    
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <PrimaryButton
//               color={"primary"}
//               variant={"contained"}
//               onClick={handleAddRow}
//             >
//               Add New Record
//             </PrimaryButton>
//           </TableRow>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//                 <TextField
//                   name={"name"}
//                   onChange={(e)=>handleChange(e,index)}
//                   placeholder={"Name"}
//                   variant={"standard"}
//                   value={row.name}
//                   fullWidth
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   name={"calories"}
//                   onChange={(e)=>handleChange(e,index)}
//                   placeholder={"Calories"}
//                   variant={"standard"}
//                   value={row.calories}
//                   fullWidth
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   name={"fat"}
//                   onChange={(e)=>handleChange(e,index)}
//                   placeholder={"Fat"}
//                   variant={"standard"}
//                   value={row.fat}
//                   fullWidth
//                 />
//               </TableCell>
//               <TableCell>
//                 <IconButton
//                   aria-label="delete"
//                   onClick={() => handleDeleteClick(index)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


export default function Editable() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname'},
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
   
  ]);

  const [data, setData] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017},
  ]);

  return (
    <MaterialTable
      title="Editable Preview"
      columns={columns}
      icons={tableIcons}
      data={data}
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
