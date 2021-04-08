import { Grid, Button, TableContainer, Table, Paper, TableCell, TableBody, TableRow, TableHead } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import TableComponent from "./TableComponent/TableComponent";
import { viewTermsAndConReports } from "../Actions/Reports";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class TermsAndConReport extends Component {
  componentDidMount() {
    this.props.viewTermsAndConReports();
  }
  componentDidUpdate(prevProps, prevState) {}
  column = [
    { title: 'Student ID', fieldName:'studentID'},
    { title: 'Created', fieldName:'created'},
    { title: 'Completed', fieldName:'completed'},
    { title: 'In Draft', fieldName:'inDraft'},
    { title: 'UID ID', fieldName:'uidId'},
    { title: 'UID Title', fieldName:'uidTitle'},
    { title: 'Entity Id', fieldName:'entityId'},
    { title: 'Notes', fieldName:'notes'},
    { title: 'TCACK Status Accept', fieldName:'trackstatusAccept'},
    { title: 'TCACK Status Reject', fieldName:'trackstatusReject'},
];
  render() {
    console.log(this.props.termsAndConReport);
    return (
     <div>
         <Grid container>
            <Grid item md={12} align="right">
            <ReactHTMLTableToExcel  
            className="btn btn-info"  
            table="termsAndCoReport"  
            filename="ReportExcel"  
            sheet="Sheet"  
            buttonText="Export excel" />  
            </Grid>
            <Grid item md={12}>
            <TableContainer component={Paper}>
      <Table aria-label="simple table" id="termsAndCoReport">
        <TableHead>
          <TableRow>
          <TableCell align="left">Student Id</TableCell>
            <TableCell align="left">Created</TableCell>
            <TableCell align="left">Completed</TableCell>
            <TableCell align="left">In Draft</TableCell>
            <TableCell align="left">UID ID</TableCell>
            <TableCell align="left">UID Title</TableCell>
            <TableCell align="left">Entity ID</TableCell>
            <TableCell align="left">Notes</TableCell>
            <TableCell align="left">TCACK Status Accept</TableCell>
            <TableCell align="left">TCACK Status Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.termsAndConReport.map((row) => (
            <TableRow key={row.studentID}>
              <TableCell component="th" scope="row" align="left">
                {row.studentID}
              </TableCell>
              <TableCell align="left">{row.created}</TableCell>
              <TableCell align="left">{row.completed}</TableCell>
              <TableCell align="left">{row.inDraft}</TableCell>
              <TableCell align="left">{row.uidId}</TableCell>
              <TableCell align="left">{row.uidTitle}</TableCell>
              <TableCell align="left">{row.entityId}</TableCell>
              <TableCell align="left">{row.notes}</TableCell>
              <TableCell align="left">{row.trackstatusAccept}</TableCell>
              <TableCell align="left">{row.trackstatusReject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Grid>
         </Grid>
    </div>
    )
    
  }
}
const mapStateToProps = (state) => {
  return {
    termsAndConReport: state.ReportReducer.termsAndConReport,
  };
};
export default connect(mapStateToProps, { viewTermsAndConReports })(
  TermsAndConReport
);
