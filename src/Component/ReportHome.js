import {
  Grid,
  TableCell,
  TableRow,
  Typography,
  Button,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { viewTermsAndConReports, viewCvReport, viewMarkSheetReport } from "../Actions/Reports";
import React from "react";
import { connect } from "react-redux";
import ReactExport from "react-data-export";
import ExcelExporter from "./Table/StudentDetail/Utils/ExcelExporter";

function ReportHome(props) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  React.useEffect(() => {
    props.viewTermsAndConReports();
    props.viewCvReport();
    // props.viewMarkSheetReport()
  }, []);
  console.log(props.markSheetReport);
  if(props.cvReport.length !== 0){
    console.log(Object.keys(props.cvReport[0]).length)
  }
  const theme = createMuiTheme({
    overrides : {

    }
  })
  return (
    <div>
      
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h6">Reports</Typography>
        </Grid>
        <Grid item md={12} align="center">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography variant="subtitle1">{"S.NO"}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="subtitle1">{"Report Name"}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="subtitle1">{"Action"}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Terms and con */}
                <TableRow>
                  <TableCell align="left">{"1"}</TableCell>
                  <TableCell align="left">{"T&C Report"}</TableCell>
                  <TableCell align="left">
                    <ExcelFile
                      filename={"Terms & Condition Report"}
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
                        data={props.termsAndConReport}
                        name="Terms and condition report"
                      >
                        <ExcelColumn
                          label="STUDENT_ID"
                          value="studentID"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="created"
                          value="created"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="completed"
                          value="completed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="in_draft"
                          value="in_draft"
                        ></ExcelColumn>
                        <ExcelColumn label="uid__id" value="uid__id"></ExcelColumn>
                        <ExcelColumn
                          label="uid__title"
                          value="uid__title"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="entity_id"
                          value="entity_id"
                        ></ExcelColumn>
                        <ExcelColumn label="notes" value="notes"></ExcelColumn>
                        <ExcelColumn
                          label="tcackstatus__Accept"
                          value="tcackstatus__Accept"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="tcackstatus__Reject"
                          value="tcackstatus__Reject"
                        ></ExcelColumn>
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow>
                {/* CV Report */}
                <TableRow>
                  <TableCell align="left">{"2"}</TableCell>
                  <TableCell align="left">{"CV Rating Report"}</TableCell>
                  <TableCell align="left">
                    <ExcelFile
                      filename={"CV Rating Report"}
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
                      <ExcelSheet data={props.cvReport} name="CV Rating Report">
                        <ExcelColumn
                          label="Submitted by: Title"
                          value="submittedByTitle"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Created"
                          value="created"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Completed"
                          value="completed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Changed"
                          value="changed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Is draft"
                          value="isDraft"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Submitted by: Title"
                          value="submittedByTitle"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="I understand and am ready to begin"
                          value="question"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Rate Your CV Building Experience"
                          value="rate"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="cv_cxemail"
                          value="pafCfEmail"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="CV Link"
                          value="cvLink"
                        ></ExcelColumn>
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow>
                {/* Marksheet Report */}
                {/* <TableRow>
                <TableCell align="left">{"3"}</TableCell>
                  <TableCell align="left">{"MarksheetReport"}</TableCell>
                  <TableCell align="left">
                  <ExcelFile
                      filename={"Marksheet Report"}
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
                      <ExcelSheet data={props.markSheetReport} name="Marksheet Report">
                        <ExcelColumn
                          label="ID"
                          value="id"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Created"
                          value="created"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Completed"
                          value="completed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Changed"
                          value="changed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Is draft"
                          value="isDraft"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Submitted by: Title"
                          value="submittedByTitle"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Do you want to upload now ?"
                          value="upload"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Select All Academic Qualification Applicable To You"
                          value="academicQualification"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Class 10"
                          value="class10"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Class 12"
                          value="class12"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Diploma"
                          value="diploma"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="UG Transcript"
                          value="ugTranscript"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="PG Marks Sheet"
                          value="pgMarksSheet"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="I Understand and will submit documents as soon as possible"
                          value="submit"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="msu_email_ct"
                          value="msuEmailCt"
                        ></ExcelColumn>
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow> */}
                {/* My Details Report */}
                {/* <TableRow>
                <TableCell align="left">{"4"}</TableCell>
                  <TableCell align="left">{"My Details Report"}</TableCell>
                  <TableCell align="left">
                  <ExcelFile
                      filename={"My Details Report"}
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
                      <ExcelSheet data={props.cvReport} name="My Details Report">
                        <ExcelColumn
                          label="STUDENT_ID"
                          value="submittedByTitle"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Created"
                          value="created"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Completed"
                          value="completed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Changed"
                          value="changed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Is draft"
                          value="isDraft"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Submitted by: ID"
                          value="submittedByTitle"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Submitted by: Title"
                          value="question"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Notes"
                          value="rate"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="I understand and am ready to begin"
                          value="pafCfEmail"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="First Name"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Last Name"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Phone Number"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Alt.Phone Number"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Alt.Email ID"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="UG Degree"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="College Name"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Department"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="No.of Active Backlogs"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="No.of Cleared Backlogs"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="University"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="UG GPA Scale"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="UG-GPA"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Present Semester"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Year of Graduation"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Are you planning to pursue Higher Education"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Which of the below fields would you choose to pursue your higher education in?"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Which of the following tests do you intend to take?"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="ALREADY TAKEN ?"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Test Details"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Taken GRE?"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Date of Exam"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Quant"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Verbal"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="AWA"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Total"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Taken GMAT?"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Expected Date of Exam"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Verbal"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="AWA"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Total"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Integrated Reasoning"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Taken TOEFL?"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Date of Exam"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Reading"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Listening"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Speaking"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Writing"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Total"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Taken IELTS?"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Date of Exam"
                          value="cvLink"
                        ></ExcelColumn>
                           <ExcelColumn
                          label="Reading"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Listening"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Speaking"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Writing"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Total"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="GATE Rank"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Branch"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Nos of Schools"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Term"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Year"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Degree"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Field of Study"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Where do you want to apply"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="List of Dream Colleges"
                          value="cvLink"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Area of Specialization"
                          value="cvLink"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="paf_cxemail"
                          value="cvLink"
                        ></ExcelColumn>
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow> */}
                {/* Testing Excel */}
                {/* <TableRow>
                <TableCell align="left">{"4"}</TableCell>
                  <TableCell align="left">{"Testing Component"}</TableCell>
                  <TableCell align="left">
                      <ExcelExporter data={props.cvReport} fileName={"Testiing Component"} noOfColumns={props.cvReport.length !== 0 ? Object.keys(props.cvReport[0]).length : null} />
                  </TableCell>
                </TableRow> */}
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
    termsAndConReport: state.ReportReducer.termsAndConReport,
    cvReport: state.ReportReducer.cvReport,
    markSheetReport: state.ReportReducer.markSheetReport,
  };
};
export default connect(mapStateToProps, {
  viewTermsAndConReports,
  viewCvReport,
  viewMarkSheetReport
})(ReportHome);
