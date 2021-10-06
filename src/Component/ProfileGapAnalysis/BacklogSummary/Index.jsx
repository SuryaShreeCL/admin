import React, { useState } from 'react'
import Editable from '../../../Utils/EditableTable'

function Index(props) {
    const [ data, setData ] = useState([
        {sem : "1", semGpa : "9", activeBacklog : "Hello", actBacklogSub : "World", clearBacklog : "2", clearBacklogSub : "Wind"},
        {sem : "1", semGpa : "9", activeBacklog : "Hello", actBacklogSub : "World", clearBacklog : "2", clearBacklogSub : "Wind"},
        {sem : "1", semGpa : "9", activeBacklog : "Hello", actBacklogSub : "World", clearBacklog : "2", clearBacklogSub : "Wind"},
    ])
    const columns = [
        {title : "Semester", field : "sem"},
        {title : "Semester GPA", field : "semGpa"},
        {title : "# Active Backlog", field : "activeBacklog"},
        {title : "Backlog Subjects", field : "actBacklogSub"},
        {title : "Cleared Backlog", field : "clearBacklog"},
        {title : "Cleared Backlog Subjects", field : "clearBacklogSub"},
    ]
    const handleRowAdd = (newData) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            setData([...data, newData]);
            resolve();
          }, 1000);
        });
      };

    const handleRowDelete = (oldData) =>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          });
    }
    return (
      <Editable
        data={data}
        columns={columns}
        onRowDelete={handleRowDelete}
        onRowAdd={handleRowAdd}
      />
    )
}

export default Index
