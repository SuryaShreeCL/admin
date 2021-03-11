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
        objectKeys.map((oneValue,index)=>{
            console.log(oneValue)
            return(
                <ExcelColumn
                label={oneValue}
              value={oneValue}
                >
                </ExcelColumn>  
            )
        })
      }
      
  }
  console.log(props.data, "data.......")
  console.log(props.noOfColumns, "length.......")
  console.log(props.fileName, "file Name.......")
 
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
                          {/* {()=>{
                                let objectKeys = Object.keys(props.data[0])
                                objectKeys.map((oneValue,index)=>{
                                    console.log(oneValue)
                                    return(

                                        <ExcelColumn
                                        label={oneValue}
                                      value={oneValue}
                                        >
                                        </ExcelColumn>  
                                    )
                                })
                          }} */}
                      </ExcelSheet>
                    </ExcelFile>
                    
        </div>
    )
}
export default ExcelExporter
