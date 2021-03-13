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
import { viewTermsAndConReports, viewCvReport, viewMarkSheetReport, viewMydetailsReport, viewTechTestReport ,} from "../Actions/Reports";
import React from "react";
import { connect } from "react-redux";
import ReactExport from "react-export-excel";
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
    props.viewTechTestReport("Technical Test Mechanical")
    props.viewTechTestReport("Technical Test Computer")
  }, []);
  console.log(props.techTestCseReport);

// if(props.techTestMechReport.length !== 0){
//   props.techTestMechReport.map(someElement=>{
//     if(someElement.technicaltest !== null){
//       console.log(someElement.technicaltest.['\" Which of the following statements is/are true for mechanisms?\"'])

//     }
//   })
// }
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
                          label="Email ID"
                          value="Email ID"
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
                {/* Technical test mechanical */}
                <TableRow>
                <TableCell align="left">{"5"}</TableCell>
                  <TableCell align="left">{"Technical Test Mechanical Report"}</TableCell>
                  <TableCell align="left">
                  <ExcelFile
                      filename={"Technical Test Mechanical Report"}
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
                      <ExcelSheet data={props.techTestMechReport} name="Technical Test Mechanical Report">
                        <ExcelColumn
                          label="Student ID"
                          value="Student ID"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Date submitted"
                          value="Date submitted"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Last page"
                          value="Last page"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Start language"
                          value="Start language"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Seed"
                          value="Seed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Please enter your registered email id:"
                          value="Please enter your registered email id:"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="1. The universal gas constant (or molar constant) of a gas is the product of:"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['The universal gas constant (or molar constant) of a gas is the product of:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label="2. The value of bulk modulus of a fluid is required to determine"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['The value of bulk modulus of a fluid is required to determine']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label="3. The metacentric heights of two floating bodies A and B are 1 m and 1.5 m respectively. Select the correct statement."
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['The metacentric heights of two floating bodies A and B are 1 m and 1.5 m respectively. Select the correct statement.']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                        <ExcelColumn
                          label="4. The acme threads are usually found on:"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['The acme threads are usually found on:']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                         <ExcelColumn
                          label="5. When cut-off ratio is __________ the efficiency of Diesel cycle approaches to Otto cycle efficiency"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['When cut-off ratio is __________ the efficiency of Diesel cycle approaches to Otto cycle efficiency']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="6. In a stress-strain diagram for mild steel, as shown in the below figure, the point A represents,"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                                return null
                              //  return col.technicaltest.['']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="7. A spur gear with 20° full depth teeth is transmitting 20 kW at 200 rad/s. The pitch circle diameter of the gear is 100 mm. The magnitude of the force applied on the gear in the radial direction is"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                                return null
                              //  return col.technicaltest.['']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="8. During a non-flow thermodynamic process (1-2) executed by a perfect gas, the heat interaction is equal to the work interaction (Q1-2 = W1-2) when the process is:"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                                return null
                              //  return col.technicaltest.['']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="9. As per common design practice, the three types of hydraulic turbines, in descending order of flow rate, are:"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['As per common design practice, the three types of hydraulic turbines, in descending order of flow rate, are:']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="10. Consider an ideal vapor compression refrigeration cycle. If the throttling process is replaced by an isentropic expansion process, keeping all the other processes unchanged, which one of the following statements is true for the modified cycle?"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['Consider an ideal vapor compression refrigeration cycle. If the throttling process is replaced by an isentropic expansion process, keeping all the other processes unchanged, which one of the following statements is true for the modified cycle?']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="11. The length, width and thickness of a steel sample are 400 mm, 40 mm and 20 mm, respectively. Its thickness needs to be uniformly reduced by 2 mm in a single pass by using horizontal slab milling. The milling cutter (diameter: 100 mm, width: 50 mm) has 20 teeth and rotates at 1200 rpm. The feed per tooth is 0.05 mm. The feed direction is along the length of the sample. If the over-travel distance is the same as the approach distance, the approach distance and time taken to complete the required machining task are"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['" The length, width and thickness of a steel sample are 400 mm, 40 mm and 20 mm, respectively. Its thickness needs to be uniformly reduced by 2 mm in a single pass by using horizontal slab milling. The milling cutter (diameter: 100 mm, width: 50 mm) has 20 teeth and rotates at 1200 rpm. The feed per tooth is 0.05 mm. The feed direction is along the length of the sample. If the over-travel distance is the same as the approach distance, the approach distance and time taken to complete the required machining task are"']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="12. What will be the change in specific entropy of an ideal gas when it is throttled from 10 bar, 298 k to 4 bars? (approximately) (Tape R = 287 J/(kg-k))"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['" What will be the change in specific entropy of an ideal gas when it is throttled from 10 bar,298 k to 4 bars? (approximately)(Tape R = 287 J/(kg-k)"']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="13. Which of the following is the correct statement of the second law of thermodynamics?"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['Which of the following is the correct statement of the second law of thermodynamics?']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="14. During steady flow compression of a gas with mass flow rate of 2 kg/s, increase in specific enthalpy is 15 KJ/Kg and decrease in kinetic energy is 2 KJ/Kg . The rate of heat rejection to the environment is 3 kW. The power required to drive the compressor is __________."
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['During steady flow compression of a gas with mass flow rate of 2 kg/s, increase in specific enthalpy is 15 KJ/Kg and decrease in kinetic energy is 2 KJ/Kg . The rate of heat rejection to the environment is 3 kW. The power required to drive the compressor is __________.']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="15. A thin steel rule (E = 200 GPa) having thickness 20 mm and it is bent by couples Mo at the ends into a circular arc of length 25 cm subtending a central angle of 60o. What is maximum stress in the beam __________ (MPa)."
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['A thin steel rule (E = 200 GPa) having thickness 20 mm and it is bent by couples Mo at the ends into a circular arc of length 25 cm subtending a central angle of 60o. What is maximum stress in the beam __________ (MPa).']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="16. Which of the following statements is/are true for mechanisms?"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.[' Which of the following statements is/are true for mechanisms?']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                          <ExcelColumn
                          label="17. A cycle consisting of one constant pressure, one constant volume and two isentropic processes is known as"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.[' A cycle consisting of one constant pressure, one constant volume and two isentropic processes is known as']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                         <ExcelColumn
                          label="18. Which of the following factors increases hardenability of a metal?"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['Which of the following factors increases hardenability of a metal?']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                         <ExcelColumn
                          label="19. The ratio of the actual damping coefficient to the critical damping coefficient is called damping factor."
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.['The ratio of the actual damping coefficient to the critical damping coefficient is called damping factor.']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                         <ExcelColumn
                          label="20. A shaft has an attached disc at the center of its length. The disc has its center of gravity located at a distance of 2 mm from the axis of the shaft. When the shaft is allowed to vibrate in its natural bow-shaped mode, it has a frequency of vibration of 10 rad/s. When the shaft is rotated at 300 r.p.m., it will whirl with a radius of"
                          value={
                            (col)=>{
                              if(col.technicaltest !== null){
                               return col.technicaltest.[' A shaft has an attached disc at the center of its length. The disc has its center of gravity located at a distance of 2 mm from the axis of the shaft. When the shaft is allowed to vibrate in its natural bow-shaped mode, it has a frequency of vibration of 10 rad/s. When the shaft is rotated at 300 r.p.m., it will whirl with a radius of']
                              }else{
                                return null
                              }
                            }
                          }                        ></ExcelColumn>
                      </ExcelSheet>
                    </ExcelFile>
                  </TableCell>
                </TableRow>
                {/* cse */}
                <TableRow>
                  <TableCell align="left">{"6"}</TableCell>
                  <TableCell align="left">{"Technical Test Computer"}</TableCell>
                  <TableCell align="left">
                    <ExcelFile
                      filename={"Technical Test Computer"}
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
                        data={props.techTestCseReport}
                        name="Technical Test Computer"
                      >
                        <ExcelColumn
                          label="Student ID"
                          value="Student ID"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Date submitted"
                          value="Date submitted"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Last page"
                          value="Last page"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Start language"
                          value="Start language"
                        ></ExcelColumn>
                        <ExcelColumn label="uid__id" value="uid__id"></ExcelColumn>
                        <ExcelColumn
                          label="Seed"
                          value="Seed"
                        ></ExcelColumn>
                        <ExcelColumn
                          label="Please enter your registered email id:"
                          value="Please enter your registered email id:"
                        ></ExcelColumn>
                        <ExcelColumn label="notes" value="notes"></ExcelColumn>
                        <ExcelColumn
                          label="1. Heap is an example of"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Heap is an example of:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label="1. What is (void*)0?"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['What is (void*)0?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                          <ExcelColumn
                          label="2.Which of the following cannot be checked in a switch-case statement?"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Which of the following cannot be checked in a switch-case statement?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label="3.Which one of the below is not divide and conquer approach?"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Which one of the below is not divide and conquer approach?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label="4.Six files Fl, F2, F3, F4, F5 and F6 have 100,200,50,80, 120, 150 number of records respectively. In what order should they be stored so as to optimize access time? Assume each file is accessed with the same frequency."
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Six files Fl, F2, F3, F4, F5 and F6 have 100,200,50,80, 120, 150 number of records respectively. In what order should they be stored so as to optimize access time? Assume each file is accessed with the same frequency.:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label="5.The concept of order (Big O) is important because"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['The concept of order (Big O) is important because:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label="6.The concept of order (Big O) is important because"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['The concept of order (Big O) is important because:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label="7.Which operator performs pattern matching"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Which operator performs pattern matching:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label="8.Which of the following can be used to add data to a database table?"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Which of the following can be used to add data to a database table?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label=" 9.Which of the following are also known as “inner join?"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Which of the following are also known as “inner join”?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label=" 10.Hiding the complexity is known as"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Hiding the complexity is known as”?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                      
                         <ExcelColumn
                          label="11.For Cat and Animal class, correct way of inheritance is"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['For Cat and Animal class, correct way of inheritance is”?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label="12.Which C++ oops feature is related to re-usability?"
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['Which C++ oops feature is related to re-usability?:']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label='How many times will "CareerLabs" get printed?#include int main() { int x; for(x=-1; x&lt;=10; x++) { if(x &lt; 5) continue; else break; printf("Careerlabs"); } return 0; }'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.["How many times will 'CareerLabs' get printed?:"]
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label='15.How many times the while loop will get executed if a short int is 2 byte wide?#include int main() {int j=1;while(j &lt;= 255){printf("%c %d\n", j, j);j++;}return 0; }'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['How many times the while loop will get executed if a short int is 2 byte wide?']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         <ExcelColumn
                          label='16.What does the following function do for a given Linked List with first node as head? void fun1(struct node* head) {if(head == NULL)return;fun1(head-&gt;next);printf("%d", head-&gt;data); }'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['What does the following function do for a given Linked List with first node as head?']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         
                        <ExcelColumn
                          label='18.Stack is also called as'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.["Stack is also called as "]
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label='19.________ is a pile in which items are added at one end and removed from the other.'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['________ is a pile in which items are added at one end and removed from the other']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                         
                         <ExcelColumn
                          label='20.What is the output of this program? int main() {static char *s[] = violet;char **ptr[] = s + 3, s + 2, s + 1, s, ***p;p = ptr;++p;printf("%s", **p+1);return 0; }'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['What is the output of this program?']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        <ExcelColumn
                          label='21.A pointer is'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['A pointer is']
                              }else{
                                return null
                              }
                            }
                          }
                        ></ExcelColumn>
                        
                        <ExcelColumn
                          label='22.If the two strings are identical, then strcmp() function returns'
                          value={
                            (col)=>{
                              if(col.computertest !== null){
                               return col.computertest.['If the two strings are identical, then strcmp() function returns']
                              }else{
                                return null
                              }
                            }
                          }
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
    myDetailsReport : state.ReportReducer.myDetailsReport,
    techTestMechReport : state.ReportReducer.techTestMechReport,
    techTestCseReport :state.ReportReducer.techTestCseReport
  };
};
export default connect(mapStateToProps, {
  viewTermsAndConReports,
  viewCvReport,
  viewMarkSheetReport,
   viewMydetailsReport,
   viewTechTestReport,
   
})(ReportHome);
