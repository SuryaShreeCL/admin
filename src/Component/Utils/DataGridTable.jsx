import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';

function DataGridTable(props) {

    const [rows,setRows] = useState([])
    const [columns,setColumns] = useState([])
    const [filterItems, setFilterItems] = useState([])
   useEffect(()=>{
    
    if(props.columns.length !== 0){
        setColumns(props.columns)
        
    }
    if(props.filterItems.length !== 0){
        setFilterItems(props.filterItems)
    }
   },[])

   useEffect(()=>{
    if(props.rows.length !== 0){
        setRows(props.rows)
    }
   },[props.rows])

   console.log("rows.....", rows)
   console.log("columns.....", columns)
   console.log("props.....", props)
    return (
        <DataGrid
        rows={rows}
        columns={columns}
        pagination
        // pageSize={5}
        // rowCount={100}
        paginationMode="server"
        filterModel={{
            items: filterItems,
          }}
        // onPageChange={handlePageChange}
        // loading={loading}
      />
    )
}

export default DataGridTable
