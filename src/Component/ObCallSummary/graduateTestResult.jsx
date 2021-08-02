import DateFnsUtils from "@date-io/date-fns";
import {
  createMuiTheme, Dialog,
  DialogContent, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField, ThemeProvider, Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { ExpandMore } from "@material-ui/icons";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import { Autocomplete } from "@material-ui/lab";
import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import {
  downloadGAT,
  fileuploadGAT, getgmatscore, getgrescore, getieltsscore, gettoeflscore, updategmatscore, updategrescore, updateieltsscore, updatetoeflscore
} from "../../Actions/Calldetails";
import {proofUplaod,getStudentsById} from '../../Actions/Student'
import { connect } from "react-redux";
import Mysnack from '../MySnackBar'
import {URL} from '../../Actions/URL'
import { viewStudentStatus ,updateVerificationStatus } from "../../Actions/AdminAction";
import Status from "../Utils/Status";
import { SECTION } from "../../Constant/Variables";
import Model from "../Utils/SectionModel";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";
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
    this.onDrop = (files) => {
      console.log(files)
      this.setState({ files });
    };
    this.gmatonDrop = (files) => {
      console.log(files)
      this.setState({ gmatfiles : files });
    };
    this.toeflonDrop = (files) => {
      console.log(files)
      this.setState({ toeflfiles : files });
    };
    this.ieltsonDrop = (files) => {
      console.log(files)
      this.setState({ ieltsfiles : files });
    };
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
      ieltsdate: new Date(),
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
      snackopen : false,
      files: [],
      fileErr: false,
      finalFile: null,
      gmatfiles: [],
      gmatfileErr: false,
      gmatfinalFile: null,
      toeflfiles: [],
      toeflfileErr: false,
      toeflfinalFile: null,
      ieltsfiles: [],
      ieltsfileErr: false,
      ieltsfinalFile: null,
      grefilename : "",
      gmatfilename : "",
      ieltsfilename : "",
      toeflfilename : "",
      greindex : "",
      gmatindex : "",
      ieltsindex:"",
      toeflindex: "",
      sectionStatus: {
        model: false,
        data: null,
        sectionName: "",
      },
    };
  }
  componentDidMount() {
    this.props.getgrescore(this.props.match.params.studentId);
    this.props.getgmatscore(this.props.match.params.studentId);
    this.props.getieltsscore(this.props.match.params.studentId);
    this.props.gettoeflscore(this.props.match.params.studentId);
    this.props.getStudentsById(this.props.match.params.studentId)
    this.props.viewStudentStatus(this.props.match.params.studentId);

  }
  componentDidUpdate(prevProps,prevState){
    if(this.props.fileuploadGATList !== prevProps.fileuploadGATList){
      this.props.getgrescore(this.props.match.params.studentId)
      this.props.getgmatscore(this.props.match.params.studentId)
      this.props.getieltsscore(this.props.match.params.studentId)
      this.props.gettoeflscore(this.props.match.params.studentId)
    }
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
    if (this.state.files !== prevState.files) {
      console.log(this.state.greattempt)
      console.log(this.state.files[0]);
      var name =
      this.props.getStudentsByIdList.firstName + '_'  +this.props.getStudentsByIdList.lastName + '_' + "GRE"+this.state.greattempt.title;
        console.log(name)
      var file = this.state.files[0];
      console.log(file)
      this.setState({ grefilename : file.name })
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });
      console.log(blob);

      var newFile = new File(
        [blob],
        name
          .concat('.', newFileType)
          .replace(
            'vnd.openxmlformats-officedocument.wordprocessingml.document',
            'docx'
          ),
        { type: newFileType }
      );
      console.log('NEW FILE..................', newFile);
      console.log('NEW FILE TYPE..................', newFileType);
      this.setState({
        finalFile: newFile,
      });
    }
    if (this.state.gmatfiles !== prevState.gmatfiles) {
      console.log(this.state.gmatfiles[0]);
      var name =
        this.props.getStudentsByIdList.firstName + '_'  +this.props.getStudentsByIdList.lastName + '_' + "GMAT"+this.state.gmatattempt.title ;
        console.log(name)
      var file = this.state.gmatfiles[0];
      console.log(file)
      this.setState({ gmatfilename : file.name })
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });
      console.log(blob);

      var newFile = new File(
        [blob],
        name
          .concat('.', newFileType)
          .replace(
            'vnd.openxmlformats-officedocument.wordprocessingml.document',
            'docx'
          ),
        { type: newFileType }
      );
      console.log('NEW FILE..................', newFile);
      console.log('NEW FILE TYPE..................', newFileType);
      this.setState({
        gmatfinalFile: newFile,
      });
    }
    if (this.state.toeflfiles !== prevState.toeflfiles) {
      console.log(this.state.toeflfiles[0]);
      var name =
      this.props.getStudentsByIdList.firstName + '_'  +this.props.getStudentsByIdList.lastName + '_' + "TOEFL"+this.state.toeflattempt.title ;
        console.log(name)
      var file = this.state.toeflfiles[0];
      console.log(file)
      this.setState({ toeflfilename : file.name })
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });
      console.log(blob);

      var newFile = new File(
        [blob],
        name
          .concat('.', newFileType)
          .replace(
            'vnd.openxmlformats-officedocument.wordprocessingml.document',
            'docx'
          ),
        { type: newFileType }
      );
      console.log('NEW FILE..................', newFile);
      console.log('NEW FILE TYPE..................', newFileType);
      this.setState({
        toeflfinalFile: newFile,
      });
    }
    if (this.state.ieltsfiles !== prevState.ieltsfiles) {
      console.log(this.state.ieltsfiles[0]);
      var name =
      this.props.getStudentsByIdList.firstName + '_'  +this.props.getStudentsByIdList.lastName + '_' + "IELTS"+this.state.ieltsattempt.title ;
        console.log(name)
      var file = this.state.ieltsfiles[0];
      console.log(file)
      this.setState({ ieltsfilename : file.name })
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });
      console.log(blob);

      var newFile = new File(
        [blob],
        name
          .concat('.', newFileType)
          .replace(
            'vnd.openxmlformats-officedocument.wordprocessingml.document',
            'docx'
          ),
        { type: newFileType }
      );
      console.log('NEW FILE..................', newFile);
      console.log('NEW FILE TYPE..................', newFileType);
      this.setState({
        ieltsfinalFile: newFile,
      });
    }
  }
  handleClick(data,index) {
    console.log(data,index);
    this.setState({
      show: true,
      greattempt: {title : data.attempt},
      gredate: data.completedExamDate,
      grequan: data.quantitativeReasoning,
      greverbal: data.verbalReasoning,
      greanalytic: data.analyticalWriting,
      gretotal: data.score,
      greid : data.id,
      greindex : index+1
    });
  }
  handleGmatclick = (data) => {
    console.log(data);
    this.setState({
      gmatshow: true,
      gmatattempt:{title : data.attempt},
      gmatquan: data.quantitativeReasoning,
      gmatverb: data.verbalReasoning,
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
  handledownload = (data,index) => {
    console.log(data,index)
    // console.log(this.props.getgrescoreList[index].studentDocument.path)
    if(data === "GRE" && this.props.getgrescoreList[index].studentDocument !== null){
      // console.log("GRE" && this.props.getgrescoreList[index].studentDocument !== null)
     this.props.downloadGAT(this.props.match.params.studentId,this.props.getgrescoreList[index].studentDocument.path)
     window.open(URL+"/api/v1/files/download/"+this.props.match.params.studentId+"/"+this.props.getgrescoreList[index].studentDocument.path)
    }
    if( data ===  "GMAT" && this.props.getgmatscoreList[index].studentDocument !== null){
      this.props.downloadGAT(this.props.match.params.studentId,this.props.getgmatscoreList[index].studentDocument.path)
      window.open(URL+"/api/v1/files/download/"+this.props.match.params.studentId+"/"+this.props.getgmatscoreList[index].studentDocument.path)
    }
    if(data === "TOEFL" && this.props.gettoeflscoreList[index].studentDocument !== null){
      this.props.downloadGAT(this.props.match.params.studentId,this.props.gettoeflscoreList[index].studentDocument.path)
      window.open(URL+"/api/v1/files/download/"+this.props.match.params.studentId+"/"+this.props.gettoeflscoreList[index].studentDocument.path)
    }
    if(data === "IELTS" && this.props.getieltsscoreList[index].studentDocument !== null){
      this.props.downloadGAT(this.props.match.params.studentId,this.props.getieltsscoreList[index].studentDocument.path)
      window.open(URL+"/api/v1/files/download/"+this.props.match.params.studentId+"/"+this.props.getieltsscoreList[index].studentDocument.path)
    }
  }
  Drop = () => {
    let files = this.state.files.map((file) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    this.setState({
      files,
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
    const d = new FormData();
    d.append('file', this.state.finalFile);
    console.log(d);
    this.props.fileuploadGAT(this.props.match.params.studentId,"gre",this.state.greid,d);
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
          "quantitativeReasoning": this.state.gmatquan,
          "integratedReasoning":this.state.gmatint,
          "analyticalAssessment":this.state.gmatanalytic,
          "score":this.state.gmatscore,
          "completedExamDate": this.state.gmatdate,
          "verbalReasoning":"100",
          }

          console.log(obj)
          this.props.updategmatscore(this.state.gmatid,obj)
          const d = new FormData();
          d.append('file', this.state.gmatfinalFile);
          console.log(d);
          this.props.fileuploadGAT(this.props.match.params.studentId,"gmat",this.state.gmatid,d);
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
    const d = new FormData();
    d.append('file', this.state.toeflfinalFile);
    console.log(d);
    this.props.fileuploadGAT(this.props.match.params.studentId,"tofel",this.state.toeflid,d);
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
    const d = new FormData();
    d.append('file', this.state.ieltsfinalFile);
    console.log(this.state.ieltsfinalFile);
    this.props.fileuploadGAT(this.props.match.params.studentId,"ielts",this.state.ieltsid,d);
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
    console.log(this.state);
    console.log(this.props);
    const files =
    this.state.finalFile !== null ? (
      <li key={this.state.finalFile.name}>
        {this.state.finalFile.name} - {this.state.finalFile.size} bytes
      </li>
    ) : null;
    const gmatfiles =
    this.state.gmatfinalFile !== null ? (
      <li key={this.state.gmatfinalFile.name}>
        {this.state.gmatfinalFile.name} - {this.state.gmatfinalFile.size} bytes
      </li>
    ) : null;
    const toeflfiles =
    this.state.toeflfinalFile !== null ? (
      <li key={this.state.toeflfinalFile.name}>
        {this.state.toeflfinalFile.name} - {this.state.toeflfinalFile.size} bytes
      </li>
    ) : null;
    const ieltsfiles =
    this.state.ieltsfinalFile !== null ? (
      <li key={this.state.ieltsfinalFile.name}>
        {this.state.ieltsfinalFile.name} - {this.state.ieltsfinalFile.size} bytes
      </li>
    ) : null;
  const { classes } = this.props;
  if (this.state.finalFile !== null) {
    console.log(this.state.finalFile.name);
  }
  console.log("State.....",this.state)
  console.log(this.props.downloadGATList)
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
                            data: this.getStatus(SECTION.graduateDetail),
                            sectionName: SECTION.graduateDetail,
                          },
                        });
                      }}
                      status={
                        this.getStatus(SECTION.graduateDetail)
                          ? this.getStatus(SECTION.graduateDetail).status
                          : "notVerified"
                      }
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
                    this.props.getgrescoreList.map((eachdata,index) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month = new Date(
                        eachdata.completedExamDate
                      ).getMonth()+1;
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
                              <Link onClick={()=>this.handledownload("GRE",index)}>Access Here</Link>
                            </div>
                          </TableCell>
                          <TableCell style={{ borderBottom: "none" }}>
                            <IconButton
                              onClick={() => this.handleClick(eachdata,index)}
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
                  {this.props.getgmatscoreList !== null &&
                    this.props.getgmatscoreList.map((eachdata,index) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month = new Date(
                        eachdata.completedExamDate
                      ).getMonth()+1;
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
                                <Link onClick={()=>this.handledownload("GMAT",index)}>Access Here</Link>
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
                  {this.props.gettoeflscoreList.length !== 0 &&
                    this.props.gettoeflscoreList.map((eachdata,index) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month = new Date(
                        eachdata.completedExamDate
                      ).getMonth()+1;
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
                                <Link onClick={()=>this.handledownload("TOEFL",index)}>Access Here</Link>
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
                      <TableCell
                        align="center"
                        style={{
                          color: "#000000",
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: "Montserrat",
                        }}
                      >
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.getieltsscoreList.length !== 0 &&
                      this.props.getieltsscoreList.map((eachdata,index) => {
                        let date = new Date(
                          eachdata.completedExamDate
                        ).getDate();
                        let month = new Date(
                          eachdata.completedExamDate
                        ).getMonth()+1;
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
                                <Link onClick={()=>this.handledownload("IELTS",index)}>Access Here</Link>
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
                        this.setState({ gredate:new Date(newValue) })
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
                    <section >
                      <div
                        style={{
                          height: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: '1px dashed #1093FF',
                        }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <input {...getInputProps()} />
                        <PublishRoundedIcon color="primary" />
                      </div>
                      <Typography
                        style={{
                          paddingTop: '5px',
                          display: this.state.fileErr ? 'block' : 'none',
                        }}
                        variant={'body2'}
                        color={'secondary'}
                      >
                        Marksheet/Transcript
                      </Typography>
                      <aside>
                        <p
                          style={{
                            color: '#686868',
                            fontFamily: 'Montserrat',
                          }}
                        >
                          File Size: less than 1MB | Formatted: PDF{' '}
                        </p>
                        {/* <h4>Files</h4> */}
                        <ul>{this.state.finalFile !== null ? files : null}</ul>
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
                        this.setState({ gmatdate: new Date(newValue) })
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
                  <Dropzone onDrop={this.gmatonDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section >
                      <div
                        style={{
                          height: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: '1px dashed #1093FF',
                        }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <input {...getInputProps()} />
                        <PublishRoundedIcon color="primary" />
                      </div>
                      <Typography
                        style={{
                          paddingTop: '5px',
                          display: this.state.gmatfileErr ? 'block' : 'none',
                        }}
                        variant={'body2'}
                        color={'secondary'}
                      >
                        Marksheet/Transcript
                      </Typography>
                      <aside>
                        <p
                          style={{
                            color: '#686868',
                            fontFamily: 'Montserrat',
                          }}
                        >
                          File Size: less than 1MB | Formatted: PDF{' '}
                        </p>
                        {/* <h4>Files</h4> */}
                        <ul>{this.state.gmatfinalFile !== null ? gmatfiles : null}</ul>
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
                        this.setState({ toefldate: new Date(newValue) })
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
                  <Dropzone onDrop={this.toeflonDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section >
                      <div
                        style={{
                          height: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: '1px dashed #1093FF',
                        }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <input {...getInputProps()} />
                        <PublishRoundedIcon color="primary" />
                      </div>
                      <Typography
                        style={{
                          paddingTop: '5px',
                          display: this.state.toeflfileErr ? 'block' : 'none',
                        }}
                        variant={'body2'}
                        color={'secondary'}
                      >
                        Marksheet/Transcript
                      </Typography>
                      <aside>
                        <p
                          style={{
                            color: '#686868',
                            fontFamily: 'Montserrat',
                          }}
                        >
                          File Size: less than 1MB | Formatted: PDF{' '}
                        </p>
                        {/* <h4>Files</h4> */}
                        <ul>{this.state.toeflfinalFile !== null ? toeflfiles : null}</ul>
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
                      // onChange={(e,newValue) =>{
                      //   console.log(newValue)
                      //   this.setState({ ieltsdate: new Date(newValue) })

                      // }
                      // }
                      onChange={(newValue) =>
                        {
                          console.log(newValue)
                          this.setState({ ieltsdate:  newValue })

                        }
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
                  <Dropzone onDrop={this.ieltsonDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section >
                      <div
                        style={{
                          height: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: '1px dashed #1093FF',
                        }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <input {...getInputProps()} />
                        <PublishRoundedIcon color="primary" />
                      </div>
                      <Typography
                        style={{
                          paddingTop: '5px',
                          display: this.state.ieltsfileErr ? 'block' : 'none',
                        }}
                        variant={'body2'}
                        color={'secondary'}
                      >
                        Marksheet/Transcript
                      </Typography>
                      <aside>
                        <p
                          style={{
                            color: '#686868',
                            fontFamily: 'Montserrat',
                          }}
                        >
                          File Size: less than 1MB | Formatted: PDF{' '}
                        </p>
                        {/* <h4>Files</h4> */}
                        <ul>{this.state.ieltsfinalFile !== null ? ieltsfiles : null}</ul>
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
        {this.renderModel()}
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
    proofUplaodlist : state.StudentReducer.proofUplaod,
    getStudentsByIdList : state.StudentReducer.StudentList,
    downloadGATList : state.CallReducer.downloadGAT,
    fileuploadGATList : state.CallReducer.fileuploadGAT,
    studentStatus: state.AdminReducer.studentStatusResponse,

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
  proofUplaod,
  getStudentsById,
  downloadGAT,
  fileuploadGAT,
  updateVerificationStatus,
  viewStudentStatus
})(GraduateTestResult);
