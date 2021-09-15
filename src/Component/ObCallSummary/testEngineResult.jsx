import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PrimaryButton from "../../Utils/PrimaryButton";
import Delete from "../../Asset/Images/delete.png";
import Eye from "../../Asset/Images/eye.png";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import x from "../../Asset/Images/x.png";
import MySnackBar from "../MySnackBar";
import {
  viewresettest,
  viewanswers,
  viewstudentmarkdetails,
} from "../../Actions/StudentMarkDetails";
import { viewscoredetails } from "../../Actions/ScoreDetails";
import { connect } from "react-redux";
import { viewStudentStatus ,updateVerificationStatus } from "../../Actions/AdminAction";
import Status from "../Utils/Status";
import { SECTION } from "../../Constant/Variables";
import Model from "../Utils/SectionModel";
import { ErrorMessage } from "../Validation";


class TestEngineResult extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      show: false,
      showEye: false,
      quesAns: [],
      questionSetName: null,
      testExeId: null,
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      examAttendDate : null,
      sectionStatus: {
        model: false,
        data: null,
        sectionName: "",
      },
    };
  }

  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }
  componentDidMount() {
    // this.props.viewscoredetails(this.props.match.params.id);
    this.props.viewStudentStatus(this.props.match.params.studentId);

    this.props.viewscoredetails(this.props.match.params.studentId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.viewAnswersList !== prevProps.viewAnswersList) {
      if (typeof this.props.viewAnswersList === "object") {
        let quesAnsArr = [];
        for (const property in this.props.viewAnswersList) {
          console.log(`${property}: ${this.props.viewAnswersList[property]}`);
          quesAnsArr.push({
            question: property,
            answer: this.props.viewAnswersList[property],
          });
        }
        this.setState({
          quesAns: quesAnsArr,
        });
      }
    }
    if(this.props.viewReseTestList !== prevProps.viewReseTestList){
      this.setState({
        snackMsg : "Test reseted successfully",
        snackVariant : "success",
        snackOpen : true
      })
      this.props.viewscoredetails(this.props.match.params.studentId)
    }
  }

  handleShowAnswer = (questionSetName,examDate) => {
    this.props.viewanswers(
      this.props.match.params.studentId,
      questionSetName
    );
    let date = new Date(examDate).getDate()
    let month = new Date(examDate).getMonth()+1
    let year = new Date(examDate).getFullYear()
    let newFullDate = date + "/" + month + "/" + year
    this.setState({
      questionSetName: questionSetName,
      showEye: true,
      examAttendDate : newFullDate
    });
  };

  handleResetTest = () => {
    this.setState({
      show: false,
    });
    this.props.viewresettest(
      this.props.match.params.studentId,
      this.state.testExeId,(response => {
        if(response.status === 200){
          this.setState({
            snackMsg : "Test Reseted Successfully",
            snackVariant : "success",
            snackOpen : true
          })
          this.props.viewscoredetails(this.props.match.params.studentId);
        }
        else{
          this.setState({
            snackMsg : ErrorMessage.NetworkError,
            snackVariant : "error",
            snackOpen : true
          })
        }
      })
    );
  };

  getStatus = (sectionName) => {
    if (
      this.props.studentStatus &&
      this.props.studentStatus.length !== 0
    ) {
      const { studentStatus } = this.props;         
      return studentStatus.find((item) => item.sectionName === sectionName);
    } 
  };

  renderModel = () => (
    <Model
      data={this.state.sectionStatus}
      handleClose={() =>
        this.setState({
          sectionStatus: {
            ...this.state.sectionStatus,
            model: false,
          },
        })
      }
      section={this.state.sectionStatus}
      {...this.props}
    />
  );  
  
  render() {
    console.log("test engine props........", this.props);
    console.log("test engine state........", this.state);
    return (
      <div style={{ padding: 25 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "17%",
            }}
          >
            <p
              style={{
                fontStyle: "Poppins",
                fontWeight: "600",
                fontStyle: "normal",
                fontSize: "18px",
                color: "#0081FF",
              }}
            >
              Test Engine Results{" "}
            </p>
            {/* <img
              src={Warning}
              height={17}
              width={17}
              style={{ position: "realative", top: 5 }}
            /> */}
            <Status
                      onClick={() => {
                        this.setState({
                          sectionStatus: {
                            model: true,
                            data: this.getStatus(SECTION.testDetail),
                            sectionName: SECTION.testDetail,
                          },
                        });
                      }}
                      status={
                        this.getStatus(SECTION.testDetail)
                          ? this.getStatus(SECTION.testDetail).status
                          : "notVerified"
                      }
                    />
          </div>
          <IconButton onClick={this.handleClick.bind(this)}>
            <img src={Pencil} height={17} width={17} />
          </IconButton>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                >
                  No
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                >
                  Exam Date
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                >
                  TestSetName
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                >
                  Questions Attempted
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                >
                  Test Score
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.viewScoreDetailsList.length !== 0 &&
                this.props.viewScoreDetailsList.map((eachItem, index) => {
                  let date = new Date(eachItem.examDate).getDate();
                  let month = new Date(eachItem.examDate).getMonth()+1;
                  let year = new Date(eachItem.examDate).getFullYear();
                  let newExamDate = date + "/" + month + "/" + year;
                  return (
                    <TableRow>
                      <TableCell
                        align="center"
                        contentEditable={this.state.disable}
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 16,
                          fontFamily: "Montserrat",
                          borderBottom: "none",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        contentEditable={this.state.disable}
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 16,
                          fontFamily: "Montserrat",
                          borderBottom: "none",
                        }}
                      >
                        {newExamDate}
                      </TableCell>

                      <TableCell
                        align="center"
                        contentEditable={this.state.disable}
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 16,
                          fontFamily: "Montserrat",
                          borderBottom: "none",
                        }}
                      >
                        {eachItem.questionSetName}
                      </TableCell>
                      <TableCell
                        align="center"
                        contentEditable={this.state.disable}
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 16,
                          fontFamily: "Montserrat",
                          borderBottom: "none",
                        }}
                      >
                        {eachItem.noOfQuestionAttempt}
                      </TableCell>
                      <TableCell
                        align="center"
                        contentEditable={this.state.disable}
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 16,
                          fontFamily: "Montserrat",
                          borderBottom: "none",
                        }}
                      >
                        {eachItem.score + "/" + eachItem.total}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        <IconButton
                          onClick={() =>
                            this.handleShowAnswer(eachItem.questionSetName,eachItem.examDate)
                          }
                        >
                          <img
                            src={Eye}
                            height={20}
                            width={20}
                            style={{ top: 5 }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            this.setState({
                              show: true,
                              questionSetName: eachItem.questionSetName,
                              testExeId: eachItem.testExecutionId,
                            })
                          }
                        >
                          <img src={Delete} height={20} width={20} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          maxWidth="xs"
          fullWidth={true}
          open={this.state.show}
          onClose={() => this.setState({ show: false })}
          aria-labelledby="customized-dialog-title"
        >
          <DialogContent>
            <Typography
              style={{ color: "#052A4E", fontSize: 24, fontWeight: "bold" }}
            >
              Reset {this.state.questionSetName} ?
            </Typography>
            <Typography style={{ color: "#052A4E", fontSize: 16 }}>
            Resetting this test will give option to {this.props.getStudentsByIdList && this.props.getStudentsByIdList.fullName !== null ? this.props.getStudentsByIdList.fullName : this.props.getStudentsByIdList.firstName + " " + this.props.getStudentsByIdList.lastName} to retake{" "}
              {this.state.questionSetName}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "25%",
                paddingBottom: 20,
              }}
            >
              <Button
                style={{ width: 150, borderRadius: 20 }}
                variant="contained"
                color="primary"
                onClick={this.handleResetTest}
              >
                Reset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          maxWidth="md"
          open={this.state.showEye}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "center",position : "relative" }}>
              <Typography
                style={{
                  color: "#052A4E",
                  fontSize: 24,
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                 {this.state.questionSetName}
              </Typography>
              <IconButton style={{position: "absolute", top : 0, right : 0}} onClick={() => this.setState({ showEye: false })}>
                <img src={x} height={17} width={17} />
              </IconButton>
            </div>
           
          </DialogTitle>
          <DialogContent style={{ height: "800px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "20px",
                paddingTop: "10px",
              }}
            >
              <Typography style={{ color: "#052A4E", fontSize: 12 }}>
                Test completion Date {this.state.examAttendDate}
              </Typography>
            </div>
            {this.state.quesAns.length !== 0 &&
              this.state.quesAns.map((eachItem, index) => {
                return (
                  <>
                    <div style={{ paddingTop: "10px" }}>
                      <Typography style={{ color: "#052A4E", fontSize: 14 }}>
                        {index+1}.{eachItem.question}
                      </Typography>
                    </div>
                    <div style={{ paddingTop: 10 }}>
                      <Typography style={{ color: "#686868", fontSize: 14 }}>
                        {eachItem.answer}
                      </Typography>
                    </div>
                  </>
                );
              })}
          </DialogContent>
        </Dialog>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <PrimaryButton
            // onClick={() => this.handleSave()}
            style={{ textTransform: "none" }}
            variant={"contained"}
            color={"primary"}
            size={"small"}
          >
            Save Changes
          </PrimaryButton>
        </div>
        <MySnackBar
          snackMsg={this.state.snackMsg}
          snackVariant={this.state.snackVariant}
          snackOpen={this.state.snackOpen}
          onClose={() => this.setState({ snackOpen: false })}
        />
        {this.renderModel()}
        {/* <MySnackBar 
          snackMsg={this.state.snackMsg}
          snackVariant={this.state.snackVariant}
          snackOpen={this.state.snackOpen}        
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewstudentmarkdetailsList:
      state.StudentMarkDetailReducer.viewStudentMarkDetailsList,
    viewReseTestList: state.StudentMarkDetailReducer.viewReseTestList,
    viewAnswersList: state.StudentMarkDetailReducer.viewAnswersList,
    viewScoreDetailsList: state.ScoreReducer.viewScoreDetailsList,
    studentStatus: state.AdminReducer.studentStatusResponse,
    getStudentsByIdList: state.StudentReducer.StudentList,

  };
};

export default connect(mapStateToProps, {
  viewstudentmarkdetails,
  viewresettest,
  viewanswers,
  viewscoredetails,
  viewStudentStatus,
  updateVerificationStatus,
})(TestEngineResult);