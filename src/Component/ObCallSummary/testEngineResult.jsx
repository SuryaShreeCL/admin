import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PrimaryButton from "../../Utils/PrimaryButton";
import Delete from "../../Asset/Images/delete.png";
import Eye from "../../Asset/Images/eye.png";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import x from "../../Asset/Images/x.png";
import Dropzone from "react-dropzone";
import {
  viewresettest,
  viewanswers,
  viewstudentmarkdetails,
} from "../../Actions/StudentMarkDetails";
import { viewscoredetails } from "../../Actions/ScoreDetails";
import { connect } from "react-redux";
class TestEngineResult extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      show: false,
      showEye: false,
      quesAns : [],
      questionSetName : null,
      testExeId : null
    };
  }

  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }

  componentDidMount() {
    this.props.viewscoredetails("8589811a-f8d4-42e9-bd8c-d54db5274f1c");
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.viewAnswersList !== prevProps.viewAnswersList){
      if(typeof this.props.viewAnswersList === "object"){
        let quesAnsArr = []
        for (const property in this.props.viewAnswersList) {
          console.log(`${property}: ${this.props.viewAnswersList[property]}`);
          quesAnsArr.push({
              question: property,
              answer: this.props.viewAnswersList[property],
            })
        }
        this.setState({
          quesAns : quesAnsArr
        })
      }
      
    }
  }

  handleShowAnswer = (questionSetName) =>{

    this.props.viewanswers("8589811a-f8d4-42e9-bd8c-d54db5274f1c",questionSetName)
    this.setState({
      questionSetName : questionSetName,
      showEye : true
    })
  }

  handleResetTest = () =>{
    this.setState({
      show : false
    })
    this.props.viewresettest("8589811a-f8d4-42e9-bd8c-d54db5274f1c",this.state.testExeId)
  }

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
            <img
              src={Warning}
              height={17}
              width={17}
              style={{ position: "realative", top: 5 }}
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
              {this.props.viewScoreDetailsList.length !== 0 && this.props.viewScoreDetailsList.map((eachItem,index)=>{
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
                    {index+1}
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
                    {eachItem.examDate}
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
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <IconButton onClick={()=>this.handleShowAnswer(eachItem.questionSetName)}>
                      <img src={Eye} height={20} width={20} style={{ top: 5 }} />
                    </IconButton>
                    <IconButton onClick={() => this.setState({ show: true, questionSetName : eachItem.questionSetName, testExeId : eachItem.testExecutionId })}>
                      <img src={Delete} height={20} width={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                )
              })}
             
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          maxWidth="xs"
          fullWidth={true}
          // TransitionComponent={Transition}
          open={this.state.show}
          onClose={()=>this.setState({show : false})}
          aria-labelledby="customized-dialog-title"
        >
          <DialogContent>
            <Typography
              style={{ color: "#052A4E", fontSize: 24, fontWeight: "bold" }}
            >
              Reset {this.state.questionSetName} ?
            </Typography>
            <Typography style={{ color: "#052A4E", fontSize: 16 }}>
              Resetting this test will give option to Selva to retake {this.state.questionSetName}
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
                // startIcon={<AddIcon />}
                onClick={this.handleResetTest}
              >
                Reset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          maxWidth="md"
          // fullWidth={true}
          // TransitionComponent={Transition}
          open={this.state.showEye}
          // onClose={this.setState({ showEye: !this.state.disable })}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                style={{
                  color: "#052A4E",
                  fontSize: 24,
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Test Name {this.state.questionSetName}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-6%",
              }}
            >
              <IconButton onClick={() => this.setState({ showEye: false })}>
                <img src={x} height={17} width={17} />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent style={{ height: "800px", width: "700px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "20px",
                paddingTop: "10px",
              }}
            >
              <Typography style={{ color: "#052A4E", fontSize: 12 }}>
                Test completion Date
              </Typography>
            </div>
            {this.state.quesAns.length !== 0 && this.state.quesAns.map((eachItem,index)=>{
              return (
                <>
                <div style={{ paddingTop: "10px" }}>
                <Typography style={{ color: "#052A4E", fontSize: 14 }}>
                  {eachItem.question}
                </Typography>
              </div>
              <div style={{ paddingTop: 10 }}>
                <Typography style={{ color: "#686868", fontSize: 14 }}>
                  {eachItem.answer}
                </Typography>
              </div>
              </>
              )
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
  };
};

export default connect(mapStateToProps, {
  viewstudentmarkdetails,
  viewresettest,
  viewanswers,
  viewscoredetails,
})(TestEngineResult);
