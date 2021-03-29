import React, { useState } from "react";
import { getDocumentsByStudentId, getStudentsById } from "../Actions/Student";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
// import aws from 'aws-sdk'
import {
  Grid,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  Snackbar,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {editDocumentsByStudentId, deleteStudentFileById,downloadDocumentByStudentId} from "../Actions/Student"
import { URL } from "../Actions/URL";
///include json file
function StudentDocuments(props) {
  const [file,setFile] = React.useState(null)
    const [snack,setSnack] = React.useState(false)
    const [snackMessage,setSnackMessage] = React.useState(null)
    const [snackColor,setSnackColor] = React.useState(null)
  React.useEffect(() => {
    // To get the list of documents that belongs to specific student
    props.getDocumentsByStudentId(props.id);
  }, [props.deletedFileResponse]);


  const filterText = (path) =>{
    var slashIndex = path.indexOf("/")
   var newPath= path.slice(slashIndex+1,path.length)
   return newPath.replace("vnd.openxmlformats-officedocument.wordprocessingml.document","docx")
}


  console.log(typeof props.studentDocumentList);
  const fileChange=(e)=>{   // console.log(typeof props.viewDocumentList);
console.log(e.target.files[0])
  if(e.target.files[0].size < 5242880){
      var element = document.getElementById(e.target.id);
    console.log("ELEMENT..............",element)
    var file = element.files[0];
    console.log("FILE.........",file)
    console.log("File type........",file.type)
    var blob = new Blob([file],{type : file.type})
    console.log("Blob...........",blob)
    console.log("file name........",file.name)
    console.log(filterText(e.target.name))
    var newFile = new File([blob], filterText(e.target.name), {type: file.type});
    console.log("NEW FILE..................",newFile)
    console.log("NEW FILE TYPE..................",newFile.type)
    if(newFile.type=== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || newFile.type=== "application/msword" || newFile.type=== "application/pdf" || newFile.type === "image/png" || newFile.type === "image/jpg" || newFile.type === "image/jpeg"){
     setFile(newFile)   
    }
  else{
    setSnackColor("error")
    setSnackMessage("Invalid format of documents")
    setSnack(true)
    }
  }else{
    setSnackColor("error")
    setSnackMessage("File size should not be more than 5 MB")
    setSnack(true)
  }
  }  
  const uploadFile = () =>{
    const formData = new FormData();
    formData.append(
      "file",
      file,
    );
    props.editDocumentsByStudentId(props.id,formData)
    setFile(null)
    setSnackColor("success")
  setSnackMessage("File Updated Successfully")
  setSnack(true)
}
console.log(file !== null ?file : "")
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={uploadFile}>
      <Grid container>
        <Grid item md={12}>
          <Typography>Documents</Typography>
        </Grid>
        <Grid item md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell align="center" colSpan={3}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {typeof props.studentDocumentList !== "string" ? props.studentDocumentList.map(singleDocument=>{
                    console.log(singleDocument.id)
                      return(
                        <TableRow>
                        <TableCell>{filterText(singleDocument.path)}</TableCell>
                        <TableCell align="right">
                          <Button startIcon={<VisibilityRoundedIcon/>} variant="contained" color="primary" size="small" 
                          onClick={()=>{
                            window.open(URL+"/api/v1/files/download/"+props.id+"/"+singleDocument.path)
                            // props.downloadDocumentByStudentId(props.id,singleDocument.path)
                          }}> View</Button>
                        </TableCell>
                        {/* <TableCell align="left">
                        <Button startIcon={<GetAppRoundedIcon/>} variant="contained" color="secondary" size="small">
                          Download
                        </Button>
                        </TableCell> */}
                        <TableCell align="center">
                        <label for={singleDocument.path}>
                                <Button
                                startIcon={<EditIcon/>}
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                  size="small"
                                  // onClick={console.log("Edit")
                                    // ()=>props.editDocumentsByStudentId(props.id)
                                  // }
                                >Edit
                                </Button>
                              </label>
                        <input
                                accept=".pdf,.docx,.jpg,.jpeg,.png,.doc"
                                id={singleDocument.path}
                                type="file"
                                name={singleDocument.path}
                                onChange={fileChange}
                                style={{ display: "none" }}
                              />
                        </TableCell>
                        <TableCell align="left">
                        <Button startIcon={<DeleteIcon/>} size="small" 
                        onClick={()=>props.deleteStudentFileById(props.id,singleDocument.path)} 
                        variant="contained" color="secondary">Delete</Button>
                        </TableCell>
                      </TableRow>
                      )   
                  }) : null}   
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={file !== null ? true : false} onClose={(e)=>setFile(null)}>
                <DialogTitle>Are You Sure Want To Update This File</DialogTitle>
                <DialogContent>
                        {/* {file !== null ? file.name : null} */}
                        {file !== null ? filterText(file.name) : null}
                </DialogContent>
                <DialogActions>
                  <Button size={"small"} onClick={(e)=>setFile(null)} variant="contained" color="secondary">
                  No
                  </Button>
                  <Button size={"small"} onClick={uploadFile} variant="contained" color="primary">
                      Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snack} autoHideDuration={6000} onClose={(e)=>setSnack(false)}>
  <Alert onClose={(e)=>setSnack(false)} variant="filled" severity={snackColor}>
    {snackMessage}
  </Alert>
</Snackbar>
</form>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    studentDocumentList: state.StudentReducer.studentDocumentList,
    deletedFileResponse : state.StudentReducer.deletedFileResponse,
    downloadedDocumentResponse : state.StudentReducer.downloadedDocumentResponse
  };
};

export default connect(mapStateToProps, {
  getDocumentsByStudentId,
  editDocumentsByStudentId,
  deleteStudentFileById,
  downloadDocumentByStudentId
})(StudentDocuments);
