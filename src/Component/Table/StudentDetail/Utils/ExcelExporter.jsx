import React from 'react'
import ReactExport from "react-data-export";
import {Button} from "@material-ui/core"
function ExcelExporter(props) {
    const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const renderExcelColumn = () =>{
      if(props.data[0] !== undefined && props.data[0] !== undefined){
        let objectKeys = Object.keys(props.data[0])
        for (let i=0; i<=objectKeys.length; i++){
            console.log(i)
            console.log(props.data[0])
            // if(props.data[0] !== undefined && props.data[0] !== undefined){
            //     console.log(Object.keys(props.data[0]))
            //     console.log(objectKeys[i])
            //       return (
            //           <ExcelColumn
            //           label={objectKeys[i]}
            //           value={objectKeys[i]}
            //         ></ExcelColumn>
            //       )
            // }   
           
        }
      }
      
  }
  console.log(props.data, "data.......")
  console.log(props.noOfColumns, "length.......")
  console.log(props.fileName, "file Name.......")
  let singleData = props.data[0]
  console.log(singleData)
    return (
        <div>
             <ExcelFile
                      filename={props.fileName}
                      element={
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          Download
                        </Button>
                      }
                    >
                      <ExcelSheet
                        data={props.data}
                        name={props.fileName}
                      >
                          {renderExcelColumn()}
                      </ExcelSheet>
                    </ExcelFile>
                    
        </div>
    )
}
export default ExcelExporter
