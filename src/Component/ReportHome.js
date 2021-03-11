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
import { viewTermsAndConReports, viewCvReport, viewMarkSheetReport, viewMydetailsReport } from "../Actions/Reports";
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
    props.viewMarkSheetReport()
    props.viewMydetailsReport()
  }, []);
  console.log(props.myDetailsReport);

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
                <TableRow>
                <TableCell align="left">{"3"}</TableCell>
                  <TableCell align="left">{"Marksheet Report"}</TableCell>
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
                </TableRow>
                {/* My Details Report */}
                <TableRow>
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
                      <ExcelSheet data={props.myDetailsReport} name="My Details Report">
                        <ExcelColumn
                          label="STUDENT_ID"
                          value="STUDENT_ID"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Created"
                          value="Created"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Completed"
                          value="Completed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Changed"
                          value="Changed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Is draft"
                          value="Is draft"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Submitted by: ID"
                          value="Submitted by: ID"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Submitted by: Title"
                          value="Submitted by: Title"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Notes"
                          value="Notes"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="I understand and am ready to begin"
                          value="I understand and am ready to begin"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="First Name"
                          value="First Name"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Last Name"
                          value="Last Name"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Phone Number"
                          value="Phone Number"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Alt.Phone Number"
                          value="Alt.Phone Number"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Alt.Email ID"
                          value="Alt.Email ID"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="UG Degree"
                          value="UG Degree"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="College Name"
                          value="College Name"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Department"
                          value="Department"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="No.of Active Backlogs"
                          value="No.of Active Backlogs"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="No.of Cleared Backlogs"
                          value="No.of Cleared Backlogs"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="University"
                          value="University"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="UG GPA Scale"
                          value="UG GPA Scale"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="UG-GPA"
                          value="UG-GPA"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Present Semester"
                          value="Present Semester"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Year of Graduation"
                          value="Expected Year of Graduation"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Are you planning to pursue Higher Education"
                          value="Are you planning to pursue Higher Education"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Which of the below fields would you choose to pursue your higher education in?"
                          value="Which of the below fields would you choose to pursue your higher education in?"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Which of the following tests do you intend to take?"
                          value="Which of the following tests do you intend to take?"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="ALREADY TAKEN ?"
                          value="ALREADY TAKEN ?"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Test Details"
                          value="Test Details"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Taken GRE?"
                          value="Taken GRE?"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Date of Exam"
                          value="Expected Date of Exam"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Quant"
                          value="Quant"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Verbal"
                          value="Verbal"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="AWA"
                          value="AWA"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Total"
                          value="Total"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Taken GMAT?"
                          value="Taken GMAT?"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Expected Date of Exam"
                          value="Expected Date of Exam"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Verbal"
                          value="Verbal"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="AWA"
                          value="AWA"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Total"
                          value="Total"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Integrated Reasoning"
                          value="Integrated Reasoning"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Taken TOEFL?"
                          value="Taken TOEFL?"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Date of Exam"
                          value="Expected Date of Exam"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Reading"
                          value="Reading"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Listening"
                          value="Listening"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Speaking"
                          value="Speaking"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Writing"
                          value="Writing"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Total"
                          value="Total"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Taken IELTS?"
                          value="Taken IELTS?"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Expected Date of Exam"
                          value="Expected Date of Exam"
                        ></ExcelColumn>
                           <ExcelColumn
                          label="Reading"
                          value="Reading"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Listening"
                          value="Listening"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Speaking"
                          value="Speaking"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Writing"
                          value="Writing"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Total"
                          value="Total"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="GATE Rank"
                          value="GATE Rank"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Branch"
                          value="Branch"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Nos of Schools"
                          value="Nos of Schools"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="Term"
                          value="Term"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Year"
                          value="Year"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Degree"
                          value="Degree"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Field of Study"
                          value="Field of Study"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Where do you want to apply"
                          value="Where do you want to apply"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="List of Dream Colleges"
                          value="List of Dream Colleges"
                        ></ExcelColumn>
                          <ExcelColumn
                          label="Area of Specialization"
                          value="Area of Specialization"
                        ></ExcelColumn>
                         <ExcelColumn
                          label="paf_cxemail"
                          value="paf_cxemail"
                        ></ExcelColumn>
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow>
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
    myDetailsReport : state.ReportReducer.myDetailsReport
  };
};
export default connect(mapStateToProps, {
  viewTermsAndConReports,
  viewCvReport,
  viewMarkSheetReport,
   viewMydetailsReport
})(ReportHome);
