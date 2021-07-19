import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ExpandMore } from "@material-ui/icons";
import Dropzone from "react-dropzone";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PrimaryButton from "../../Utils/PrimaryButton";
import Warning from "../../Asset/Images/warningImg.png";
import { Link } from "react-router-dom";
import Pencil from "../../Asset/Images/pencil.png";
import {
  getgrescore,
  getgmatscore,
  gettoeflscore,
  getieltsscore,
  updateieltsscore,
  updategrescore,
  updategmatscore,
  updatetoeflscore,
} from "../../Actions/Calldetails";
import { connect } from "react-redux";
import Mysnack from '../MySnackBar'
const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "14px",
        whiteSpace: "nowrap",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
      },
    },
  },
});

class GraduateTestResult extends Component {
  constructor() {
    super();
    var today = new Date(),
      date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();

    this.state = {
      disable: false,
      date: null,
      show: false,
      files: [],
      gmatshow: false,
      toeflshow: false,
      ieltsshow: false,
      gredate: null,
      gmatdate: null,
      toefldate: null,
      ieltsdate: null,
      greattempt: {},
      grequan: "",
      greverbal: "",
      gretotal: "",
      greanalytic: "",
      gmatattempt: {},
      gmatquan: "",
      gmatanalytic: "",
      gmatint: "",
      gmatverb: "",
      gmatscore: "",
      toeflattempt: {},
      toeflread: "",
      toeflscore: "",
      toeflwrite: "",
      toefllis: "",
      toeflspeak: "",
      ieltsattempt: {},
      ieltsread: "",
      ieltsscore: "",
      ieltswrite: "",
      ieltslis: "",
      ieltsspeak: "",
      greid : "",
      gmatid : "",
      toeflid :  "",
      ieltsid : "",
      snackmsg  : "",
      snackVariant : "",
      snackopen : false
    };
  }
  componentDidMount() {
    this.props.getgrescore(this.props.match.params.studentId);
    this.props.getgmatscore(this.props.match.params.studentId);
    this.props.getieltsscore(this.props.match.params.studentId);
    this.props.gettoeflscore(this.props.match.params.studentId);
  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.updategrescoreList !== prevProps.updategrescoreList){
      this.props.getgrescore(this.props.match.params.studentId);
    }
    if(this.props.updategmatscoreList !== prevProps.updategmatscoreList){
      this.props.getgmatscore(this.props.match.params.studentId);
    }
    if(this.props.updatetoeflscoreList !== prevProps.updatetoeflscoreList){
      this.props.gettoeflscore(this.props.match.params.studentId);
    }
    if(this.props.updateieltsscoreList !== prevProps.updateieltsscoreList){
      this.props.getieltsscore(this.props.match.params.studentId);
    }
  }
  handleClick(data) {
    console.log(data);
    this.setState({
      show: true,
      greattempt: {title : data.attempt},
      gredate: data.completedExamDate,
      grequan: data.quantitativeReasoning,
      greverbal: data.verbalReasoning,
      greanalytic: data.analyticalWriting,
      gretotal: data.score,
      greid : data.id
    });
  }
  handleGmatclick = (data) => {
    console.log(data);
    this.setState({
      gmatshow: true,
      gmatattempt:{title : data.attempt},
      gmatquan: data.quantitativeVerbal,
      gmatverb: "",
      gmatint: data.integratedReasoning,
      gmatscore: data.score,
      gmatanalytic: data.analyticalAssessment,
      gmatdate: data.completedExamDate,
      gmatid : data.id
    });
  };
  handletoeflClick = (data) => {
    console.log(data);
    this.setState({
      toeflshow: true,
      toeflspeak: data.speaking,
      toeflattempt:{title : data.attempt},
      toefllis: data.listening,
      toeflread: data.reading,
      toeflwrite: data.writing,
      toefldate: data.completedExamDate,
      toeflscore: data.score,
      toeflid : data.id
    });
  };
  handleIeltsClick = (data) => {
    console.log(data);
    this.setState({
      ieltsshow: true,
      ieltsspeak: data.speakingScore,
      ieltsattempt:{title : data.attempt},
      ieltslis: data.listeningScore,
      ieltsread: data.readingScore,
      ieltswrite: data.writingScore,
      ieltsdate: data.completedExamDate,
      ieltsscore: data.totalScore,
      ieltsid : data.id
    });
  };
  handleSave = (data) => {
    console.log(data);
    if(data === "GRE"){
      let date = new Date(this.state.gredate).getDate()
      let month =new Date(this.state.gredate).getMonth()
      let year = new Date(this.state.gredate).getFullYear()
      let time = new Date(this.state.gredate).toLocaleTimeString()
      console.log(time)
      let obj = {
        "attempt": this.state.greattempt.title,
        "expectedExamDate": null,
        "verbalReasoning":this.state.greverbal,
        "quantitativeReasoning": this.state.grequan,
        "analyticalWriting":this.state.greanalytic,
        "score":this.state.gretotal,
        "completedExamDate":this.state.gredate
    }
    console.log(obj)
    this.props.updategrescore(this.state.greid,obj)
    this.setState({
      snackmsg  : "Updated Successfully",
      snackVariant : "Success",
      snackopen : true,
      show : false
    })
    }
    if(data === "GMAT"){
      let obj ={
          "attempt": this.state.gmatattempt.title,
          "expectedExamDate": null ,
          "quantitativeVerbal": this.state.gmatquan,
          "integratedReasoning":this.state.gmatint,
          "analyticalAssessment":this.state.gmatanalytic,
          "score":this.state.gmatscore,
          "completedExamDate": this.state.gmatdate
          }
          console.log(obj)
          this.props.updategmatscore(this.state.gmatid,obj)
          this.setState({
            snackmsg  : "Updated Successfully",
            snackVariant : "Success",
            snackopen : true,
            gmatshow :false
          })
    }
    if(data === "TOEFL"){
      let obj = {
        "attempt": this.state.toeflattempt.title,
        "reading":this.state.toeflread,
        "listening":this.state.toefllis,
        "writing":this.state.toeflwrite,
        "speaking":this.state.toeflspeak,
        "score":this.state.toeflscore,
        "completedExamDate":this.state.toefldate,
        "expectedExamDate": null
    }
    console.log(obj)
    this.props.updatetoeflscore(this.state.toeflid,obj)
    this.setState({
      snackmsg  : "Updated Successfully",
      snackVariant : "Success",
      snackopen : true,
      toeflshow :false
    })
    }
    if(data === "IELTS"){
      let obj ={
        "attempt": this.state.ieltsattempt.title,
        "readingScore":this.state.ieltsread,
        "listeningScore":this.state.ieltslis,
        "speakingScore":this.state.ieltsspeak,
        "writingScore":this.state.ieltswrite,
        "totalScore":this.state.ieltsscore,
        "completedExamDate":this.state.ieltsdate,
        "expectedExamDate":null
    }
    console.log(obj)
    this.props.updateieltsscore(this.state.ieltsid,obj)
    this.setState({
      snackmsg  : "Updated Successfully",
      snackVariant : "Success",
      snackopen : true,
      ieltsshow : false
    })
    }
  };
  attempt = [
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },
  ];
  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <ThemeProvider theme={theme}>
        <div style={{ padding: 25 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "18%",
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
                Graduate Test Details
              </p>
              <img
                src={Warning}
                height={17}
                width={17}
                style={{ position: "realative", top: 5 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.getgrescoreList.length !== 0 ? "GRE" : null}
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  {this.props.getgrescoreList.length !== 0 && (
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
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
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Verbal Reasoning
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Analytical Writing
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Quantitative Reasoning
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Transcripts
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      ></TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {this.props.getgrescoreList !== null &&
                    this.props.getgrescoreList.map((eachdata) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month = new Date(
                        eachdata.completedExamDate
                      ).getMonth();
                      let year = new Date(
                        eachdata.completedExamDate
                      ).getFullYear();
                      let examdate = year + "/" + month + "/" + date;
                      return (
                        <TableRow>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.attempt}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {examdate}
                          </TableCell>

                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.verbalReasoning}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.analyticalWriting}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.quantitativeReasoning}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.score}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{ borderBottom: "none", cursor: "pointer" }}
                            onClick={() => console.log("hello")}
                          >
                            <div
                              style={{
                                color: "#407BFF",
                                fontSize: 18,
                                fontStyle: "italic",
                              }}
                            >
                              <Link>Access Here</Link>
                            </div>
                          </TableCell>
                          <TableCell style={{ borderBottom: "none" }}>
                            <IconButton
                              onClick={() => this.handleClick(eachdata)}
                            >
                              <img src={Pencil} height={17} width={17} />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            style={{ borderBottom: "none" }}
                          ></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.getgmatscoreList.length > 0 ? "GMAT" : null}
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  {this.props.getgmatscoreList.length !== 0 && (
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
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
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Quantitative
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                          width: 20,
                        }}
                      >
                        Analytical Writing Assessment
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                          width: 20,
                        }}
                      >
                        Verbal Reasoning
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                          width: 20,
                        }}
                      >
                        Integrated Reasoning
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Transcripts
                      </TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {this.props.getgmatscoreList !== null &&
                    this.props.getgmatscoreList.map((eachdata) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month = new Date(
                        eachdata.completedExamDate
                      ).getMonth();
                      let year = new Date(
                        eachdata.completedExamDate
                      ).getFullYear();
                      let examdate = year + "/" + month + "/" + date;
                      return (
                        <TableRow>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.attempt}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {examdate}
                          </TableCell>

                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.quantitativeVerbal}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.analyticalAssessment}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {60}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.integratedReasoning}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.score}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{ borderBottom: "none" }}
                          >
                            <div style={{ color: "#407BFF", fontSize: 18 }}>
                              <div
                                style={{
                                  color: "#407BFF",
                                  fontSize: 18,
                                  fontStyle: "italic",
                                }}
                              >
                                <Link>Access Here</Link>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => this.handleGmatclick(eachdata)}
                            >
                              <img src={Pencil} height={17} width={17} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.gettoeflscoreList.length !== 0 ? "TOEFL" : null}
              </div>
              <div>
                {/* <IconButton onClick={() => this.setState({ toeflshow: true })}>
                <img src={Pencil} height={17} width={17} />
              </IconButton> */}
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  {this.props.gettoeflscoreList.length !== 0 && (
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
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
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Reading
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Writing
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Speaking{" "}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Listening
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Transcripts
                      </TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {this.props.gettoeflscoreList.length !== 0 &&
                    this.props.gettoeflscoreList.map((eachdata) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month = new Date(
                        eachdata.completedExamDate
                      ).getMonth();
                      let year = new Date(
                        eachdata.completedExamDate
                      ).getFullYear();
                      let examdate = year + "/" + month + "/" + date;
                      return (
                        <TableRow>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.attempt}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {examdate}
                          </TableCell>

                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.reading}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.writing}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.speaking}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {eachdata.listening}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{
                              color: "#000000",
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: "Montserrat",
                              borderBottom: "none",
                            }}
                          >
                            {" "}
                            {eachdata.score}
                          </TableCell>
                          <TableCell
                            align="center"
                            contentEditable={this.state.disable}
                            style={{ borderBottom: "none" }}
                          >
                            <div
                              style={{
                                color: "#407BFF",
                                fontSize: 18,
                                fontStyle: "italic",
                              }}
                            >
                              <div
                                style={{
                                  color: "#407BFF",
                                  fontSize: 18,
                                  fontStyle: "italic",
                                }}
                              >
                                <Link>Access Here</Link>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => this.handletoeflClick(eachdata)}
                            >
                              <img src={Pencil} height={17} width={17} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.getieltsscoreList.length !== 0 ? "IELTS" : null}
              </div>
              <div>
                {/* <IconButton onClick={() => this.setState({ ieltsshow: true })}>
                <img src={Pencil} height={17} width={17} />
              </IconButton> */}
              </div>
            </div>
            <TableContainer>
              {this.props.getieltsscoreList.length !== 0 && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
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
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Reading
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Writing
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Speaking{" "}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Listening
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Transcripts
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.getieltsscoreList.length !== 0 &&
                      this.props.getieltsscoreList.map((eachdata) => {
                        let date = new Date(
                          eachdata.completedExamDate
                        ).getDate();
                        let month = new Date(
                          eachdata.completedExamDate
                        ).getMonth();
                        let year = new Date(
                          eachdata.completedExamDate
                        ).getFullYear();
                        let ieltsdate = year + "/" + month + "/" + date;
                        return (
                          <TableRow>
                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {eachdata.attempt}
                            </TableCell>
                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {ieltsdate}
                            </TableCell>

                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {eachdata.readingScore}
                            </TableCell>
                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {eachdata.writingScore}
                            </TableCell>
                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {eachdata.speakingScore}
                            </TableCell>
                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {eachdata.listeningScore}
                            </TableCell>
                            <TableCell
                              align="center"
                              contentEditable={this.state.disable}
                              style={{
                                color: "#000000",
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Montserrat",
                                borderBottom: "none",
                              }}
                            >
                              {eachdata.totalScore}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ borderBottom: "none" }}
                            >
                              <div
                                style={{
                                  color: "#407BFF",
                                  fontSize: 18,
                                  fontStyle: "italic",
                                }}
                              >
                                <Link>Access Here</Link>
                              </div>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => this.handleIeltsClick(eachdata)}
                              >
                                <img src={Pencil} height={17} width={17} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              )}
            </TableContainer>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "5%",
              }}
            >
              <PrimaryButton
                variant={"contained"}
                color={"primary"}
                style={{ textTransform: "none" }}
              >
                Save Changes
              </PrimaryButton>
            </div>
            <Dialog
              open={this.state.show}
              onClose={() => this.setState({ show: false })}
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        color: "#052A4E",
                        fontWeight: 600,
                      }}
                    >
                      GRE Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      fullWidth
                      options={this.attempt}
                      value={this.state.greattempt}
                      onChange={(e, newValue) =>
                        this.setState({ greattempt: newValue })
                      }
                      getOptionLabel={(option) => {
                        console.log(option);
                        return option.title;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Attempt"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <KeyboardDatePicker
                      margin="normal"
                      disableFuture
                      id="date-picker-dialog"
                      label="Exam Date"
                      format="MM/dd/yyyy"
                      fullWidth
                      value={this.state.gredate}
                      onChange={(e, newValue) =>
                        this.setState({ gredate: newValue })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Quantative Reasoning"
                      fullWidth
                      value={this.state.grequan}
                      onChange={(e) =>
                        this.setState({
                          grequan: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Verbal Reasoning "
                      fullWidth
                      value={this.state.greverbal}
                      onChange={(e) =>
                        this.setState({
                          greverbal: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Total"
                      fullWidth
                      value={this.state.gretotal}
                      onChange={(e) =>
                        this.setState({
                          gretotal: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Analytical Writing"
                      fullWidth
                      value={this.state.greanalytic}
                      onChange={(e) =>
                        this.setState({
                          greanalytic: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                              fontSize: "12px",
                            }}
                          >
                            Marksheet / Trasncripts
                          </p>
                          <div
                            style={{
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              border: "1px dashed #1093FF",
                            }}
                            {...getRootProps({ className: "dropzone" })}
                          >
                            <input {...getInputProps()} />
                            <PublishRoundedIcon color="primary" />
                          </div>

                          <aside>
                            <p
                              style={{
                                color: "#686868",
                                fontFamily: "Montserrat",
                              }}
                            >
                              File size: less than 1MB | Format: PDF
                            </p>

                            {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"contained"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.handleSave("GRE")}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"outlined"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.setState({ show: false })}
                    >
                      Cancel
                    </PrimaryButton>
                    {/* </div> */}
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.gmatshow}
              onClose={() => this.setState({ gmatshow: false })}
            >
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        color: "#052A4E",
                        fontWeight: 600,
                      }}
                    >
                      GMAT Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      fullWidth
                      options={this.attempt}
                      value={this.state.gmatattempt}
                      onChange={(e,newValue) => {
                        this.setState({ gmatattempt: newValue })
                      }
                       }
                      getOptionLabel={(option) => {
                        console.log(option);
                        return option.title;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Attempt"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <KeyboardDatePicker
                      margin="normal"
                      disableFuture
                      id="date-picker-dialog"
                      label="Exam Date"
                      format="MM/dd/yyyy"
                      fullWidth
                      value={this.state.gmatdate}
                      // disabled
                      onChange={(e, newValue) =>
                        this.setState({ gmatdate: newValue })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Quantative Verbal Reasoning"
                      fullWidth
                      value={this.state.gmatquan}
                      onChange={(e) =>
                        this.setState({ gmatquan: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Analytical Writing Assessment"
                      fullWidth
                      value={this.state.gmatanalytic}
                      onChange={(e) =>
                        this.setState({ gmatanalytic: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Integrated Reasoning"
                      fullWidth
                      value={this.state.gmatint}
                      onChange={(e) =>
                        this.setState({ gmatint: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="number"
                      label="Verbal Reasoning"
                      fullWidth
                      value={this.state.gmatverb}
                      onChange={(e) =>
                        this.setState({ gmatverb: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="number"
                      label="Total"
                      fullWidth
                      value={this.state.gmatscore}
                      onChange={(e) =>
                        this.setState({ gmatscore: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                              fontSize: "12px",
                            }}
                          >
                            Marksheet / Trasncripts
                          </p>
                          <div
                            style={{
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              border: "1px dashed #1093FF",
                            }}
                            {...getRootProps({ className: "dropzone" })}
                          >
                            <input {...getInputProps()} />
                            <PublishRoundedIcon color="primary" />
                          </div>

                          <aside>
                            <p
                              style={{
                                color: "#686868",
                                fontFamily: "Montserrat",
                              }}
                            >
                              File size: less than 1MB | Format: PDF
                            </p>

                            {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"contained"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.handleSave("GMAT")}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"outlined"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.setState({ gmatshow: false })}
                    >
                      Cancel
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.toeflshow}
              onClose={() => this.setState({ toeflshow: false })}
            >
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        color: "#052A4E",
                        fontWeight: 600,
                      }}
                    >
                      TOEFL Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      fullWidth
                      // disabled={this.state.disable}
                      options={this.attempt}
                      value={this.state.toeflattempt}
                      onChange={(e,newValue) => {
                        this.setState({ toeflattempt: newValue })
                      }
                       }
                      getOptionLabel={(option) => {
                        console.log(option);
                        return option.title;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Attempt"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Exam Date"
                      disableFuture
                      format="MM/dd/yyyy"
                      fullWidth
                      value={this.state.toefldate}
                      // disabled
                      onChange={(e, newValue) =>
                        this.setState({ toefldate: newValue })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Reading"
                      fullWidth
                      value={this.state.toeflread}
                      onChange={(e) =>
                        this.setState({ toeflread: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Writing"
                      fullWidth
                      value={this.state.toeflwrite}
                      onChange={(e) =>
                        this.setState({ toeflwrite: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Speaking"
                      fullWidth
                      value={this.state.toeflspeak}
                      onChange={(e) =>
                        this.setState({ toeflspeak: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="number"
                      label="Listening"
                      fullWidth
                      value={this.state.toefllis}
                      onChange={(e) =>
                        this.setState({ toefllis: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="number"
                      label="Total"
                      fullWidth
                      value={this.state.toeflscore}
                      onChange={(e) =>
                        this.setState({ toeflscore: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                              fontSize: "12px",
                            }}
                          >
                            Marksheet / Trasncripts
                          </p>
                          <div
                            style={{
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              border: "1px dashed #1093FF",
                            }}
                            {...getRootProps({ className: "dropzone" })}
                          >
                            <input {...getInputProps()} />
                            <PublishRoundedIcon color="primary" />
                          </div>

                          <aside>
                            <p
                              style={{
                                color: "#686868",
                                fontFamily: "Montserrat",
                              }}
                            >
                              File size: less than 1MB | Format: PDF
                            </p>

                            {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"contained"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.handleSave("TOEFL")}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"outlined"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.setState({ toeflshow: false })}
                    >
                      Cancel
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.ieltsshow}
              onClose={() => this.setState({ ieltsshow: false })}
            >
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        color: "#052A4E",
                        fontWeight: 600,
                      }}
                    >
                      IELTS Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      fullWidth
                      options={this.attempt}
                      value={this.state.ieltsattempt}
                      onChange={(e,newValue) => {
                        console.log(newValue)
                        this.setState({ ieltsattempt: newValue })
                      }
                      }
                      getOptionLabel={(option) => {
                        console.log(option);
                        return option.title;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Attempt"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <KeyboardDatePicker
                      disableFuture
                      margin="normal"
                      id="date-picker-dialog"
                      label="Exam Date"
                      format="MM/dd/yyyy"
                      fullWidth
                      value={this.state.ieltsdate}
                      onChange={(newValue) =>
                        this.setState({ ieltsdate: newValue })
                      }
                      onChange={(e, newValue) =>
                        this.setState({ ieltsdate: newValue })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Reading"
                      fullWidth
                      value={this.state.ieltsread}
                      onChange={(e) =>
                        this.setState({ ieltsread: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Writing"
                      fullWidth
                      value={this.state.ieltswrite}
                      onChange={(e) =>
                        this.setState({ ieltswrite: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type="number"
                      label="Speaking"
                      fullWidth
                      value={this.state.ieltsspeak}
                      onChange={(e) =>
                        this.setState({ ieltsspeak: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="number"
                      label="Listening"
                      fullWidth
                      value={this.state.ieltslis}
                      onChange={(e) =>
                        this.setState({ ieltslis: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      type="number"
                      label="Total"
                      fullWidth
                      value={this.state.ieltsscore}
                      onChange={(e) =>
                        this.setState({ ieltsscore: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                              fontSize: "12px",
                            }}
                          >
                            Marksheet / Trasncripts
                          </p>
                          <div
                            style={{
                              height: "100px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              border: "1px dashed #1093FF",
                            }}
                            {...getRootProps({ className: "dropzone" })}
                          >
                            <input {...getInputProps()} />
                            <PublishRoundedIcon color="primary" />
                          </div>

                          <aside>
                            <p
                              style={{
                                color: "#686868",
                                fontFamily: "Montserrat",
                              }}
                            >
                              File size: less than 1MB | Format: PDF
                            </p>

                            {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"contained"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.handleSave("IELTS")}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"outlined"}
                      style={{ width: "130px", textTransform: "none" }}
                      onClick={() => this.setState({ ieltsshow: false })}
                    >
                      Cancel
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </MuiPickersUtilsProvider>
        </div>
        <Mysnack
           snackMsg={this.state.snackmsg}
           snackVariant={this.state.snackVariant}
           snackOpen={this.state.snackopen}
           onClose={() => this.setState({ snackopen: false })}
        /> 
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getgrescoreList: state.CallReducer.getgrescore,
    getieltsscoreList: state.CallReducer.getieltsscore,
    gettoeflscoreList: state.CallReducer.gettoeflscore,
    getgmatscoreList: state.CallReducer.getgmatscore,
    updateieltsscoreList: state.CallReducer.updateieltsscore,
    updategmatscoreList: state.CallReducer.updategmatscore,
    updategrescoreList: state.CallReducer.updategrescore,
    updatetoeflscoreList: state.CallReducer.updatetoeflscore,
  };
};

export default connect(mapStateToProps, {
  getgrescore,
  getgmatscore,
  gettoeflscore,
  getieltsscore,
  updateieltsscore,
  updategrescore,
  updategmatscore,
  updatetoeflscore,
})(GraduateTestResult);
