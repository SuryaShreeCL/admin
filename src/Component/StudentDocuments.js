import React from "react";
import { getDocumentsByStudentId } from "../Actions/Student";
import { connect } from "react-redux";
import {
  Grid,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
function StudentDocuments(props) {
  React.useEffect(() => {
    // To get the list of documents that belongs to specific student
    props.getDocumentsByStudentId(props.id);
  }, []);
  const filterText = (path) =>{
    var slashIndex = path.indexOf("/")
   var newPath= path.slice(slashIndex+1,path.length)
   return newPath.replace("vnd.openxmlformats-officedocument.wordprocessingml.document","docx")
}

  console.log(typeof props.studentDocumentList);
  return (
    <div>
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
                  <TableCell align="center" colSpan={2}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {typeof props.studentDocumentList !== "string" ? props.studentDocumentList.map(singleDocument=>{
                      return(
                        <TableRow>
                        <TableCell>{filterText(singleDocument.path)}</TableCell>
                        <TableCell align="right">
                          <Button startIcon={<VisibilityRoundedIcon/>} variant="contained" color="primary" size="small">
                            View
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                        <Button startIcon={<GetAppRoundedIcon/>} variant="contained" color="secondary" size="small">
                          Download
                        </Button>
                        </TableCell>
                      </TableRow>
                      )   
                  }) : null}   
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    studentDocumentList: state.StudentReducer.studentDocumentList,
  };
};

export default connect(mapStateToProps, {
  getDocumentsByStudentId,
})(StudentDocuments);
