import DateFnsUtils from '@date-io/date-fns';
import {
  Card,
  createMuiTheme,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { ExpandMore } from '@material-ui/icons';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import { Autocomplete } from '@material-ui/lab';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DoccumentCard from '../Utils/DoccumentCard';
import ExamDateCard from '../Utils/ExamDateCard';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import {
  downloadGAT,
  fileuploadGAT,
  getgmatscore,
  getgrescore,
  getieltsscore,
  gettoeflscore,
  updategmatscore,
  updategrescore,
  updateieltsscore,
  updatetoeflscore,
} from '../../Actions/Calldetails';
import {
  proofUplaod,
  getStudentsById,
  getDocumentList,
  getexpecteddate,
  getieltsexam,
} from '../../Actions/Student';
import { connect } from 'react-redux';
import Mysnack from '../MySnackBar';
import { URL } from '../../Actions/URL';
import {
  viewStudentStatus,
  updateVerificationStatus,
} from '../../Actions/AdminAction';
import Status from '../Utils/Status';
import { SECTION } from '../../Constant/Variables';
import Model from '../Utils/SectionModel';
import Pencil from '../../Asset/Images/pencil.png';
import Warning from '../../Asset/Images/warningImg.png';
import PrimaryButton from '../../Utils/PrimaryButton';
import * as moment from 'moment';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        color: '#1093FF',
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: '14px',
        whiteSpace: 'nowrap',
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: '0px',
      },
    },
  },
});

class GraduateTestResult extends Component {
  constructor() {
    super();
    this.onDrop = files => {
      this.setState({ files });
    };
    this.gmatonDrop = files => {
      this.setState({ gmatfiles: files });
    };
    this.toeflonDrop = files => {
      this.setState({ toeflfiles: files });
    };
    this.ieltsonDrop = files => {
      this.setState({ ieltsfiles: files });
    };
    var today = new Date(),
      date =
        today.getFullYear() +
        '/' +
        (today.getMonth() + 1) +
        '/' +
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
      grequan: '',
      greverbal: '',
      gretotal: '',
      greanalytic: '',
      gmatattempt: {},
      gmatquan: '',
      gmatanalytic: '',
      gmatint: '',
      gmatverb: '',
      gmatscore: '',
      toeflattempt: {},
      toeflread: '',
      toeflscore: '',
      toeflwrite: '',
      toefllis: '',
      toeflspeak: '',
      ieltsattempt: {},
      ieltsread: '',
      ieltsscore: '',
      ieltswrite: '',
      ieltslis: '',
      ieltsspeak: '',
      greid: '',
      gmatid: '',
      toeflid: '',
      ieltsid: '',
      snackmsg: '',
      snackVariant: '',
      snackopen: false,
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
      grefilename: '',
      gmatfilename: '',
      ieltsfilename: '',
      toeflfilename: '',
      greindex: '',
      gmatindex: '',
      ieltsindex: '',
      toeflindex: '',
      documentedit: false,
      greDateList: [],
      gmatDateList: [],
      toeflDateList: [],
      ieltsDateList: [],
      sectionStatus: {
        model: false,
        data: null,
        sectionName: '',
      },
    };
  }
  componentDidMount() {
    this.props.getgrescore(this.props.match.params.studentId);
    this.props.getgmatscore(this.props.match.params.studentId);
    this.props.getieltsscore(this.props.match.params.studentId);
    this.props.gettoeflscore(this.props.match.params.studentId);
    this.props.getStudentsById(this.props.match.params.studentId);
    this.props.viewStudentStatus(this.props.match.params.studentId);
    this.props.getexpecteddate(
      'gre',
      this.props.match.params.studentId,
      response => {
        if (response.status === 200) {
          this.setState({
            greDateList: response.data,
          });
        }
      }
    );
    this.props.getexpecteddate(
      'gmat',
      this.props.match.params.studentId,
      response => {
        if (response.status === 200) {
          this.setState({
            gmatDateList: response.data,
          });
        }
      }
    );
    this.props.getexpecteddate(
      'tofel',
      this.props.match.params.studentId,
      response => {
        if (response.status === 200) {
          this.setState({
            toeflDateList: response.data,
          });
        }
      }
    );
    this.props.getieltsexam(this.props.match.params.studentId, response => {
      if (response.status === 200) {
        this.setState({
          ieltsDateList: response.data,
        });
      }
    });
  }
  analyticalArr = [
    { title: '0.5' },
    { title: '1.0' },
    { title: '1.5' },
    { title: '2.0' },
    { title: '2.5' },
    { title: '3.0' },
    { title: '3.5' },
    { title: '4.0' },
    { title: '4.5' },
    { title: '5.0' },
    { title: '5.5' },
    { title: '6.0' },
  ];
  componentDidUpdate(prevProps, prevState) {
    if (this.props.fileuploadGATList !== prevProps.fileuploadGATList) {
      this.props.getgrescore(this.props.match.params.studentId);
      this.props.getgmatscore(this.props.match.params.studentId);
      this.props.getieltsscore(this.props.match.params.studentId);
      this.props.gettoeflscore(this.props.match.params.studentId);
    }
    if (this.props.updategrescoreList !== prevProps.updategrescoreList) {
      this.props.getgrescore(this.props.match.params.studentId);
    }
    if (this.props.updategmatscoreList !== prevProps.updategmatscoreList) {
      this.props.getgmatscore(this.props.match.params.studentId);
    }
    if (this.props.updatetoeflscoreList !== prevProps.updatetoeflscoreList) {
      this.props.gettoeflscore(this.props.match.params.studentId);
    }
    if (this.props.updateieltsscoreList !== prevProps.updateieltsscoreList) {
      this.props.getieltsscore(this.props.match.params.studentId);
    }
    if (this.state.files !== prevState.files) {
      var name =
        this.props.getStudentsByIdList.firstName +
        '_' +
        this.props.getStudentsByIdList.lastName +
        '_' +
        'GRE' +
        this.state.greattempt.title;

      var file = this.state.files[0];

      this.setState({ grefilename: file.name });
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });

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

      this.setState({
        finalFile: newFile,
      });
    }
    if (this.state.gmatfiles !== prevState.gmatfiles) {
      var name =
        this.props.getStudentsByIdList.firstName +
        '_' +
        this.props.getStudentsByIdList.lastName +
        '_' +
        'GMAT' +
        this.state.gmatattempt.title;

      var file = this.state.gmatfiles[0];

      this.setState({ gmatfilename: file.name });
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });

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

      this.setState({
        gmatfinalFile: newFile,
      });
    }
    if (this.state.toeflfiles !== prevState.toeflfiles) {
      var name =
        this.props.getStudentsByIdList.firstName +
        '_' +
        this.props.getStudentsByIdList.lastName +
        '_' +
        'TOEFL' +
        this.state.toeflattempt.title;

      var file = this.state.toeflfiles[0];

      this.setState({ toeflfilename: file.name });
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });

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

      this.setState({
        toeflfinalFile: newFile,
      });
    }
    if (this.state.ieltsfiles !== prevState.ieltsfiles) {
      var name =
        this.props.getStudentsByIdList.firstName +
        '_' +
        this.props.getStudentsByIdList.lastName +
        '_' +
        'IELTS' +
        this.state.ieltsattempt.title;

      var file = this.state.ieltsfiles[0];

      this.setState({ ieltsfilename: file.name });
      var indexOf = file.type.indexOf('/');
      var newFileType = file.type.substr(indexOf + 1);

      var blob = new Blob([file], { type: newFileType });

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

      this.setState({
        ieltsfinalFile: newFile,
      });
    }
  }

  customFileFormat = file => {
    if (file) {
      return {
        name: file.path,
        size: file.fileSizeInBytes,
      };
    } else return null;
  };

  handleClick(data, index) {
    this.setState({
      show: true,
      greattempt: { title: data.attempt },
      gredate: data.completedExamDate,
      grequan: data.quantitativeReasoning,
      greverbal: data.verbalReasoning,
      greanalytic: {
        title: data.analyticalWriting && data.analyticalWriting.toString(),
      },
      gretotal: data.score,
      greid: data.id,
      greindex: index + 1,
      finalFile: this.customFileFormat(data.studentDocument),
    });
  }

  documentClick = data => {
    // this.props.downloadGAT(this.props.match.params.studentId,data.type)
    window.open(
      URL +
        '/api/v1/files/download/' +
        this.props.match.params.studentId +
        '/' +
        data.path
    );
  };

  handleGmatclick = data => {
    this.setState({
      gmatshow: true,
      gmatattempt: { title: data.attempt },
      gmatquan: data.quantitativeReasoning,
      gmatverb: data.verbalReasoning,
      gmatint: data.integratedReasoning,
      gmatscore: data.score,
      gmatanalytic: { title: data.analyticalAssessment.toString() },
      gmatdate: data.completedExamDate,
      gmatid: data.id,
      gmatfinalFile: this.customFileFormat(data.studentDocument),
    });
  };

  handletoeflClick = data => {
    this.setState({
      toeflshow: true,
      toeflspeak: data.speaking,
      toeflattempt: { title: data.attempt },
      toefllis: data.listening,
      toeflread: data.reading,
      toeflwrite: data.writing,
      toefldate: data.completedExamDate,
      toeflscore: data.score,
      toeflid: data.id,
      toeflfinalFile: this.customFileFormat(data.studentDocument),
    });
  };

  handleIeltsClick = data => {
    this.setState({
      ieltsshow: true,
      ieltsspeak: data.speakingScore,
      ieltsattempt: { title: data.attempt },
      ieltslis: data.listeningScore,
      ieltsread: data.readingScore,
      ieltswrite: data.writingScore,
      ieltsdate: data.completedExamDate,
      ieltsscore: data.totalScore,
      ieltsid: data.id,
      ieltsfinalFile: this.customFileFormat(data.studentDocument),
    });
  };

  handledownload = (data, index) => {
    if (
      data === 'GRE' &&
      this.props.getgrescoreList[index].studentDocument !== null
    ) {
      this.props.downloadGAT(
        this.props.match.params.studentId,
        this.props.getgrescoreList[index].studentDocument.path
      );
      window.open(
        URL +
          '/api/v1/files/download/' +
          this.props.match.params.studentId +
          '/' +
          this.props.getgrescoreList[index].studentDocument.path
      );
    }
    if (
      data === 'GMAT' &&
      this.props.getgmatscoreList[index].studentDocument !== null
    ) {
      this.props.downloadGAT(
        this.props.match.params.studentId,
        this.props.getgmatscoreList[index].studentDocument.path
      );
      window.open(
        URL +
          '/api/v1/files/download/' +
          this.props.match.params.studentId +
          '/' +
          this.props.getgmatscoreList[index].studentDocument.path
      );
    }
    if (
      data === 'TOEFL' &&
      this.props.gettoeflscoreList[index].studentDocument !== null
    ) {
      this.props.downloadGAT(
        this.props.match.params.studentId,
        this.props.gettoeflscoreList[index].studentDocument.path
      );
      window.open(
        URL +
          '/api/v1/files/download/' +
          this.props.match.params.studentId +
          '/' +
          this.props.gettoeflscoreList[index].studentDocument.path
      );
    }
    if (
      data === 'IELTS' &&
      this.props.getieltsscoreList[index].studentDocument !== null
    ) {
      this.props.downloadGAT(
        this.props.match.params.studentId,
        this.props.getieltsscoreList[index].studentDocument.path
      );
      window.open(
        URL +
          '/api/v1/files/download/' +
          this.props.match.params.studentId +
          '/' +
          this.props.getieltsscoreList[index].studentDocument.path
      );
    }
  };

  handleSave = data => {
    if (data === 'GRE') {
      let date = new Date(this.state.gredate).getDate();
      let month = new Date(this.state.gredate).getMonth();
      let year = new Date(this.state.gredate).getFullYear();
      let time = new Date(this.state.gredate).toLocaleTimeString();

      let obj = {
        attempt: this.state.greattempt && this.state.greattempt.title,
        expectedExamDate: null,
        verbalReasoning: this.state.greverbal,
        quantitativeReasoning: this.state.grequan,
        analyticalWriting:
          this.state.greanalytic && this.state.greanalytic.title,
        score: this.state.gretotal,
        completedExamDate: this.state.gredate,
      };

      this.props.updategrescore(this.state.greid, obj);
      const d = new FormData();
      d.append('file', this.state.finalFile);

      this.props.fileuploadGAT(
        this.props.match.params.studentId,
        'gre',
        this.state.greid,
        d
      );
      this.setState({
        snackmsg: 'Updated Successfully',
        snackVariant: 'Success',
        snackopen: true,
        show: false,
      });
    }
    if (data === 'GMAT') {
      let obj = {
        attempt: this.state.gmatattempt && this.state.gmatattempt.title,
        expectedExamDate: null,
        quantitativeReasoning: this.state.gmatquan,
        integratedReasoning: this.state.gmatint,
        analyticalAssessment: this.state.gmatanalytic.title,
        score: this.state.gmatscore,
        completedExamDate: this.state.gmatdate,
        verbalReasoning: this.state.gmatverb,
      };

      this.props.updategmatscore(this.state.gmatid, obj);
      const d = new FormData();
      d.append('file', this.state.gmatfinalFile);

      this.props.fileuploadGAT(
        this.props.match.params.studentId,
        'gmat',
        this.state.gmatid,
        d
      );
      this.setState({
        snackmsg: 'Updated Successfully',
        snackVariant: 'Success',
        snackopen: true,
        gmatshow: false,
      });
    }
    if (data === 'TOEFL') {
      let obj = {
        attempt: this.state.toeflattempt && this.state.toeflattempt.title,
        reading: this.state.toeflread,
        listening: this.state.toefllis,
        writing: this.state.toeflwrite,
        speaking: this.state.toeflspeak,
        score: this.state.toeflscore,
        completedExamDate: this.state.toefldate,
        expectedExamDate: null,
      };

      this.props.updatetoeflscore(this.state.toeflid, obj);
      const d = new FormData();
      d.append('file', this.state.toeflfinalFile);

      this.props.fileuploadGAT(
        this.props.match.params.studentId,
        'tofel',
        this.state.toeflid,
        d
      );
      this.setState({
        snackmsg: 'Updated Successfully',
        snackVariant: 'Success',
        snackopen: true,
        toeflshow: false,
      });
    }
    if (data === 'IELTS') {
      let obj = {
        attempt: this.state.ieltsattempt && this.state.ieltsattempt.title,
        readingScore: this.state.ieltsread,
        listeningScore: this.state.ieltslis,
        speakingScore: this.state.ieltsspeak,
        writingScore: this.state.ieltswrite,
        totalScore: this.state.ieltsscore,
        completedExamDate: this.state.ieltsdate,
        expectedExamDate: null,
      };

      this.props.updateieltsscore(this.state.ieltsid, obj);
      const d = new FormData();
      d.append('file', this.state.ieltsfinalFile);

      this.props.fileuploadGAT(
        this.props.match.params.studentId,
        'ielts',
        this.state.ieltsid,
        d
      );
      this.setState({
        snackmsg: 'Updated Successfully',
        snackVariant: 'Success',
        snackopen: true,
        ieltsshow: false,
      });
    }
  };

  attempt = [
    { title: '1' },
    { title: '2' },
    { title: '3' },
    { title: '4' },
    { title: '5' },
    { title: '6' },
    { title: '7' },
    { title: '8' },
    { title: '9' },
    { title: '10' },
  ];

  getStatus = sectionName => {
    if (this.props.studentStatus && this.props.studentStatus.length !== 0) {
      const { studentStatus } = this.props;
      return studentStatus.find(item => item.sectionName === sectionName);
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

  renderScoreCard = file => {
    if (file) {
      const { name, size } = file;
      return <li key={name}>{size ? `${name} - ${size} bytes` : name}</li>;
    } else return null;
  };

  render() {
    const files = this.renderScoreCard(this.state.finalFile);
    const gmatfiles = this.renderScoreCard(this.state.gmatfinalFile);
    const toeflfiles = this.renderScoreCard(this.state.toeflfinalFile);
    const ieltsfiles = this.renderScoreCard(this.state.ieltsfinalFile);

    const { classes } = this.props;

    const { HeadStyle, GridStyle } = style;

    return (
      <ThemeProvider theme={theme}>
        <div style={{ padding: 25 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '18%',
              }}
            >
              <p
                style={{
                  fontStyle: 'Poppins',
                  fontWeight: '600',
                  fontStyle: 'normal',
                  fontSize: '18px',
                  color: '#0081FF',
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
              {/* <Status
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
                    /> */}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.getgrescoreList.length !== 0 ? 'GRE' : null}
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  {this.props.getgrescoreList.length !== 0 && (
                    <TableRow>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Exam Date
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Verbal Reasoning
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Analytical Writing
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Quantitative Reasoning
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Transcripts
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      ></TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      ></TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {this.props.getgrescoreList !== null &&
                    this.props.getgrescoreList.map((eachdata, index) => {
                      console.log(eachdata.expectedExamDate);
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month =
                        new Date(eachdata.completedExamDate).getMonth() + 1;
                      let year = new Date(
                        eachdata.completedExamDate
                      ).getFullYear();
                      let examdate = date + '/' + month + '/' + year;
                      return (
                        <TableRow>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.attempt}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {moment(
                              new Date(eachdata && eachdata.completedExamDate)
                            ).format('MMM yyyy')}
                          </TableCell>

                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.verbalReasoning}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.analyticalWriting}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.quantitativeReasoning}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.score}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{ borderBottom: 'none', cursor: 'pointer' }}
                            // onClick={() => }
                          >
                            <div
                              style={{
                                color: '#407BFF',
                                fontSize: 18,
                                fontStyle: 'italic',
                              }}
                            >
                              <IconButton
                                onClick={() =>
                                  this.handledownload('GRE', index)
                                }
                              >
                                <GetAppIcon />
                              </IconButton>
                              {/* <Link onClick={()=>this.handledownload("GRE",index)}>Access Here</Link> */}
                            </div>
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none' }}>
                            <IconButton
                              onClick={() => this.handleClick(eachdata, index)}
                            >
                              <img src={Pencil} height={17} width={17} />
                            </IconButton>
                          </TableCell>
                          <TableCell
                            style={{ borderBottom: 'none' }}
                          ></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.getgmatscoreList.length > 0 ? 'GMAT' : null}
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  {this.props.getgmatscoreList.length !== 0 && (
                    <TableRow>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Exam Date
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Quantitative
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                          width: 20,
                        }}
                      >
                        Analytical Writing Assessment
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                          width: 20,
                        }}
                      >
                        Verbal Reasoning
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                          width: 20,
                        }}
                      >
                        Integrated Reasoning
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Transcripts
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      ></TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {this.props.getgmatscoreList !== null &&
                    this.props.getgmatscoreList.map((eachdata, index) => {
                      console.log(eachdata);
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month =
                        new Date(eachdata.completedExamDate).getMonth() + 1;
                      let year = new Date(
                        eachdata.completedExamDate
                      ).getFullYear();
                      let examdate = date + '/' + month + '/' + year;
                      return (
                        <TableRow>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.attempt}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {moment(
                              new Date(eachdata && eachdata.completedExamDate)
                            ).format('MMM yyyy')}
                          </TableCell>

                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.quantitativeReasoning}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.analyticalAssessment}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.verbalReasoning}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.integratedReasoning}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.score}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{ borderBottom: 'none' }}
                          >
                            <div style={{ color: '#407BFF', fontSize: 18 }}>
                              <div
                                style={{
                                  color: '#407BFF',
                                  fontSize: 18,
                                  fontStyle: 'italic',
                                }}
                              >
                                <IconButton
                                  onClick={() =>
                                    this.handledownload('GMAT', index)
                                  }
                                >
                                  <GetAppIcon />
                                </IconButton>
                                {/* <Link onClick={()=>this.handledownload("GMAT",index)}>Access Here</Link> */}
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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.gettoeflscoreList.length !== 0 ? 'TOEFL' : null}
              </div>
              <div></div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  {this.props.gettoeflscoreList.length !== 0 && (
                    <TableRow>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Exam Date
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Reading
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Writing
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Speaking{' '}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Listening
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Transcripts
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      ></TableCell>
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {this.props.gettoeflscoreList.length !== 0 &&
                    this.props.gettoeflscoreList.map((eachdata, index) => {
                      let date = new Date(eachdata.completedExamDate).getDate();
                      let month =
                        new Date(eachdata.completedExamDate).getMonth() + 1;
                      let year = new Date(
                        eachdata.completedExamDate
                      ).getFullYear();
                      let examdate = date + '/' + month + '/' + year;
                      return (
                        <TableRow>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.attempt}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {moment(
                              new Date(eachdata && eachdata.completedExamDate)
                            ).format('MMM yyyy')}
                          </TableCell>

                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.reading}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.writing}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.speaking}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {eachdata.listening}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{
                              color: '#000000',
                              fontWeight: 400,
                              fontSize: 14,
                              fontFamily: 'Montserrat',
                              borderBottom: 'none',
                            }}
                          >
                            {' '}
                            {eachdata.score}
                          </TableCell>
                          <TableCell
                            align='center'
                            contentEditable={this.state.disable}
                            style={{ borderBottom: 'none' }}
                          >
                            <div
                              style={{
                                color: '#407BFF',
                                fontSize: 18,
                                fontStyle: 'italic',
                              }}
                            >
                              <div
                                style={{
                                  color: '#407BFF',
                                  fontSize: 18,
                                  fontStyle: 'italic',
                                }}
                              >
                                <IconButton
                                  onClick={() =>
                                    this.handledownload('TOEFL', index)
                                  }
                                >
                                  <GetAppIcon />
                                </IconButton>
                                {/* <Link onClick={()=>this.handledownload("TOEFL",index)}>Access Here</Link> */}
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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingTop: 10,
                }}
              >
                {this.props.getieltsscoreList.length !== 0 ? 'IELTS' : null}
              </div>
              <div></div>
            </div>
            <TableContainer>
              {this.props.getieltsscoreList.length !== 0 && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Attempt #
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Exam Date
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Reading
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Writing
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Speaking{' '}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Listening
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      >
                        Transcripts
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color: '#000000',
                          fontWeight: 400,
                          fontSize: 14,
                          fontFamily: 'Montserrat',
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.getieltsscoreList.length !== 0 &&
                      this.props.getieltsscoreList.map((eachdata, index) => {
                        console.log(eachdata);
                        let date = new Date(
                          eachdata.completedExamDate
                        ).getDate();
                        let month =
                          new Date(eachdata.completedExamDate).getMonth() + 1;
                        let year = new Date(
                          eachdata.completedExamDate
                        ).getFullYear();
                        let ieltsdate = date + '/' + month + '/' + year;
                        return (
                          <TableRow>
                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {eachdata.attempt}
                            </TableCell>
                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {moment(
                                new Date(eachdata && eachdata.completedExamDate)
                              ).format('MMM yyyy')}
                            </TableCell>

                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {eachdata.readingScore}
                            </TableCell>
                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {eachdata.writingScore}
                            </TableCell>
                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {eachdata.speakingScore}
                            </TableCell>
                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {eachdata.listeningScore}
                            </TableCell>
                            <TableCell
                              align='center'
                              contentEditable={this.state.disable}
                              style={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: 'Montserrat',
                                borderBottom: 'none',
                              }}
                            >
                              {eachdata.totalScore}
                            </TableCell>
                            <TableCell
                              align='center'
                              style={{ borderBottom: 'none' }}
                            >
                              <div
                                style={{
                                  color: '#407BFF',
                                  fontSize: 18,
                                  fontStyle: 'italic',
                                }}
                              >
                                <IconButton
                                  onClick={() =>
                                    this.handledownload('IELTS', index)
                                  }
                                >
                                  <GetAppIcon />
                                </IconButton>
                                {/* <Link onClick={()=>this.handledownload("IELTS",index)}>Access Here</Link> */}
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
            <Grid item md={12} container justifyContent={'space-between'}>
              <p style={HeadStyle}>Documents Received</p>
              <IconButton
                onClick={() =>
                  this.setState({ documentedit: !this.state.documentedit })
                }
              >
                <EditRoundedIcon color={'inherit'} />
              </IconButton>
            </Grid>
            {this.props.getAllDocumentList.GRE &&
              this.props.getAllDocumentList.GRE.length !== 0 && (
                <Grid item md={12}>
                  <Grid item md={12} direction='column'>
                    <p style={GridStyle}>GRE</p>
                  </Grid>
                  <Grid item={12} container>
                    {this.props.getAllDocumentList.GRE
                      ? this.props.getAllDocumentList.GRE.map(data => (
                          <Grid
                            item
                            md={4}
                            direction='row'
                            onClick={() => this.documentClick(data)}
                          >
                            <DoccumentCard
                              certificate={data.name}
                              date={data.date}
                              path={data.path}
                              studentid={this.props.match.params.studentId}
                              category='Gre'
                              id={data.greId}
                              status={this.state.documentedit}
                            />
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </Grid>
              )}
            {this.props.getAllDocumentList.GMAT &&
              this.props.getAllDocumentList.GMAT.length !== 0 && (
                <Grid item md={12}>
                  <Grid item md={12} direction='column'>
                    <p style={GridStyle}>GMAT</p>
                  </Grid>
                  <Grid item={12} container>
                    {this.props.getAllDocumentList.GMAT
                      ? this.props.getAllDocumentList.GMAT.map(data => (
                          <Grid
                            item
                            md={4}
                            direction='row'
                            onClick={() => this.documentClick(data)}
                          >
                            <DoccumentCard
                              certificate={data.name}
                              date={data.date}
                              path={data.path}
                              studentid={this.props.match.params.studentId}
                              category='Gmat'
                              id={data.gmatId}
                              status={this.state.documentedit}
                            />
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </Grid>
              )}
            {this.props.getAllDocumentList.TOEFL &&
              this.props.getAllDocumentList.TOEFL.length !== 0 && (
                <Grid item md={12}>
                  <Grid item md={12}>
                    <p style={GridStyle}>TOEFL</p>
                  </Grid>
                  <Grid item={12} container>
                    {this.props.getAllDocumentList.TOEFL
                      ? this.props.getAllDocumentList.TOEFL.map(data => (
                          <Grid
                            item
                            md={4}
                            direction='row'
                            onClick={() => this.documentClick(data)}
                          >
                            <DoccumentCard
                              certificate={data.name}
                              date={data.date}
                              path={data.path}
                              studentid={this.props.match.params.studentId}
                              category='Toefl'
                              id={data.tofelId}
                              status={this.state.documentedit}
                            />
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </Grid>
              )}
            {this.props.getAllDocumentList.IELTS &&
              this.props.getAllDocumentList.IELTS.length !== 0 && (
                <Grid item md={12}>
                  <Grid item md={12} direction='column'>
                    <p style={GridStyle}>IELTS</p>
                  </Grid>
                  <Grid item={12} container>
                    {this.props.getAllDocumentList.IELTS
                      ? this.props.getAllDocumentList.IELTS.map(data => (
                          <Grid
                            item
                            md={4}
                            direction='row'
                            onClick={() => this.documentClick(data)}
                          >
                            <DoccumentCard
                              certificate={data.name}
                              date={data.date}
                              path={data.path}
                              studentid={this.props.match.params.studentId}
                              category='Ielts'
                              id={data.ieltsId}
                              status={this.state.documentedit}
                            />
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </Grid>
              )}
            <Grid item md={12}>
              <p style={HeadStyle}>Exam Date</p>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <p style={GridStyle}>
                      {this.state.greDateList.length > 0 ? 'GRE' : ''}
                    </p>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      {this.state.greDateList &&
                        this.state.greDateList.map(eachdata => {
                          return (
                            <Grid item md={3}>
                              <ExamDateCard date={eachdata.expectedExamDate} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <p style={GridStyle}>
                      {this.state.gmatDateList.length > 0 ? 'GMAT' : ''}
                    </p>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      {this.state.gmatDateList &&
                        this.state.gmatDateList.map(eachdata => {
                          return (
                            <Grid item md={3}>
                              <ExamDateCard date={eachdata.expectedExamDate} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <p style={GridStyle}>
                      {this.state.toeflDateList.length > 0 ? 'TOEFL' : ''}
                    </p>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      {this.state.toeflDateList &&
                        this.state.toeflDateList.map(eachdata => {
                          return (
                            <Grid item md={3}>
                              <ExamDateCard date={eachdata.expectedExamDate} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <p style={GridStyle}>
                      {this.state.toeflDateList.length > 0 ? 'IELTS' : ''}
                    </p>
                  </Grid>
                  <Grid item md={12}>
                    <Grid container spacing={2}>
                      {this.state.ieltsDateList &&
                        this.state.ieltsDateList.map(eachdata => {
                          return (
                            <Grid item md={3}>
                              <ExamDateCard date={eachdata.expectedExamDate} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Dialog
              open={this.state.show}
              onClose={() => this.setState({ show: false })}
              maxWidth='sm'
              fullWidth={true}
            >
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography
                      style={{
                        fontFamily: 'Montserrat',
                        fontSize: 18,
                        color: '#052A4E',
                        fontWeight: 600,
                      }}
                    >
                      GRE Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: '#1093FF' }} />}
                      id='combo-box-demo'
                      fullWidth
                      options={this.attempt}
                      value={this.state.greattempt}
                      onChange={(e, newValue) =>
                        this.setState({ greattempt: newValue })
                      }
                      getOptionLabel={option => {
                        return option.title;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Attempt'
                          variant='standard'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <KeyboardDatePicker
                     
                     
                      id="date-picker-dialog"
                      
                      format="MMM/yyyy"
                     
                     
                      onChange={(newValue) =>
                        this.setState({ gredate: new Date(newValue) })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    /> */}
                    <TextField
                      disableFuture
                      margin='normal'
                      label='Exam Date'
                      value={this.state.gredate}
                      type='month'
                      onChange={e => this.setState({ gredate: e.target.value })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      name='ExamDate'
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Quantative Reasoning (Max Score 170)'
                      fullWidth
                      value={this.state.grequan}
                      onChange={e => {
                        if (parseInt(e.target.value) > 170) {
                          e.preventDefault();
                        } else {
                          this.setState({
                            grequan: e.target.value,
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Verbal Reasoning (Max Score 170)'
                      fullWidth
                      value={this.state.greverbal}
                      onChange={e => {
                        if (parseInt(e.target.value) > 170) {
                          e.preventDefault();
                        } else {
                          this.setState({
                            greverbal: e.target.value,
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Total (Max Score 340)'
                      fullWidth
                      value={this.state.gretotal}
                      onChange={e => {
                        if (parseInt(e.target.value) > 340) {
                          e.preventDefault();
                        } else {
                          this.setState({
                            gretotal: e.target.value,
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    {/* <TextField
                      type="number"
                      label="Analytical Writing"
                      fullWidth
                      value={this.state.greanalytic}
                      onChange={(e) =>
                        this.setState({
                          greanalytic: e.target.value,
                        })
                      }
                    /> */}
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: '#1093FF' }} />}
                      id='combo-box-demo'
                      fullWidth
                      options={this.analyticalArr}
                      value={this.state.greanalytic}
                      onChange={(e, newValue) =>
                        this.setState({ greanalytic: newValue })
                      }
                      getOptionLabel={option => {
                        return option.title;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Analytical Writing (Max Score 6)'
                          variant='standard'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
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
                            <PublishRoundedIcon color='primary' />
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
                              {'File Size: less than 1MB | Format: PDF'}
                            </p>
                            {/* <h4>Files</h4> */}
                            <ul>
                              {this.state.finalFile !== null ? files : null}
                            </ul>
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'contained'}
                      style={{ width: '130px', textTransform: 'none' }}
                      onClick={() => this.handleSave('GRE')}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'outlined'}
                      style={{ width: '130px', textTransform: 'none' }}
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
                        fontFamily: 'Montserrat',
                        fontSize: 18,
                        color: '#052A4E',
                        fontWeight: 600,
                      }}
                    >
                      GMAT Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: '#1093FF' }} />}
                      id='combo-box-demo'
                      fullWidth
                      options={this.attempt}
                      value={this.state.gmatattempt}
                      onChange={(e, newValue) => {
                        this.setState({ gmatattempt: newValue });
                      }}
                      getOptionLabel={option => {
                        return option.title;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Attempt'
                          variant='standard'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disableFuture
                      margin='normal'
                      label='Exam Date'
                      value={this.state.gmatdate}
                      type='month'
                      onChange={e =>
                        this.setState({ gmatdate: e.target.value })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      name='ExamDate'
                    />
                    {/* <KeyboardDatePicker
                      disableFuture
                      margin="normal"
                      id="date-picker-dialog"
                      label="Exam Date"
                      format="MMM/yyyy"
                      fullWidth
                     
                      // disabled
                      onChange={(newValue) => {
                        this.setState({ gmatdate: new Date(newValue) });
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    /> */}
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Quantative Reasoning (Max Score 60)'
                      fullWidth
                      value={this.state.gmatquan}
                      onChange={e => {
                        if (parseInt(e.target.value) > 60) {
                          e.preventDefault();
                        } else {
                          this.setState({ gmatquan: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    {/* <TextField
                      type="number"
                      label="Analytical Writing Assessment"
                      fullWidth
                      value={this.state.gmatanalytic}
                      onChange={(e) =>
                        this.setState({ gmatanalytic: e.target.value })
                      }
                    /> */}
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: '#1093FF' }} />}
                      id='combo-box-demo'
                      fullWidth
                      options={this.analyticalArr}
                      value={this.state.gmatanalytic}
                      onChange={(e, newValue) =>
                        this.setState({ gmatanalytic: newValue })
                      }
                      getOptionLabel={option => {
                        return option.title;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Analytical Writing Assessment (Max Score 6)'
                          variant='standard'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Integrated Reasoning (Max Score 8)'
                      fullWidth
                      value={this.state.gmatint}
                      onChange={e => {
                        if (parseInt(e.target.value) > 8) {
                          e.preventDefault();
                        } else {
                          this.setState({ gmatint: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Verbal Reasoning (Max Score 60)'
                      fullWidth
                      value={this.state.gmatverb}
                      onChange={e => {
                        if (parseInt(e.target.value) > 60) {
                          e.preventDefault();
                        } else {
                          this.setState({ gmatverb: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Total (Max Score 800)'
                      fullWidth
                      value={this.state.gmatscore}
                      onChange={e => {
                        if (parseInt(e.target.value) > 800) {
                          e.preventDefault();
                        } else {
                          this.setState({ gmatscore: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}></Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.gmatonDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
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
                            <PublishRoundedIcon color='primary' />
                          </div>
                          <Typography
                            style={{
                              paddingTop: '5px',
                              display: this.state.gmatfileErr
                                ? 'block'
                                : 'none',
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
                              {'File Size: less than 1MB | Format: PDF'}
                            </p>
                            {/* <h4>Files</h4> */}
                            <ul>
                              {this.state.gmatfinalFile !== null
                                ? gmatfiles
                                : null}
                            </ul>
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'contained'}
                      style={{ width: '130px', textTransform: 'none' }}
                      onClick={() => this.handleSave('GMAT')}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'outlined'}
                      style={{ width: '130px', textTransform: 'none' }}
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
                        fontFamily: 'Montserrat',
                        fontSize: 18,
                        color: '#052A4E',
                        fontWeight: 600,
                      }}
                    >
                      TOEFL Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: '#1093FF' }} />}
                      id='combo-box-demo'
                      fullWidth
                      // disabled={this.state.disable}
                      options={this.attempt}
                      value={this.state.toeflattempt}
                      onChange={(e, newValue) => {
                        this.setState({ toeflattempt: newValue });
                      }}
                      getOptionLabel={option => {
                        return option.title;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Attempt'
                          variant='standard'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disableFuture
                      margin='normal'
                      label='Exam Date'
                      value={this.state.toefldate}
                      type='month'
                      onChange={e =>
                        this.setState({ toefldate: e.target.value })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      name='ExamDate'
                    />
                    {/* <KeyboardDatePicker
                      disableFuture
                      margin="normal"
                      id="date-picker-dialog"
                      label="Exam Date"
                      disableFuture
                      format="MMM/yyyy"
                      fullWidth
                      value={this.state.toefldate}
                      // disabled
                      onChange={(newValue) =>
                        this.setState({ toefldate: new Date(newValue) })
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    /> */}
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Reading (Max Score 30)'
                      fullWidth
                      value={this.state.toeflread}
                      onChange={e => {
                        if (parseInt(e.target.value) > 30) {
                          e.preventDefault();
                        } else {
                          this.setState({ toeflread: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Writing (Max Score 30)'
                      fullWidth
                      value={this.state.toeflwrite}
                      onChange={e => {
                        if (parseInt(e.target.value) > 30) {
                          e.preventDefault();
                        } else {
                          this.setState({ toeflwrite: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Speaking (Max Score 30)'
                      fullWidth
                      value={this.state.toeflspeak}
                      onChange={e => {
                        if (parseInt(e.target.value) > 30) {
                          e.preventDefault();
                        } else {
                          this.setState({ toeflspeak: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Listening (Max Score 30)'
                      fullWidth
                      value={this.state.toefllis}
                      onChange={e => {
                        if (parseInt(e.target.value) > 30) {
                          e.preventDefault();
                        } else {
                          this.setState({ toefllis: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Total (Max Score 120)'
                      fullWidth
                      value={this.state.toeflscore}
                      onChange={e => {
                        if (parseInt(e.target.value) > 120) {
                          e.preventDefault();
                        } else {
                          this.setState({ toeflscore: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}></Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.toeflonDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
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
                            <PublishRoundedIcon color='primary' />
                          </div>
                          <Typography
                            style={{
                              paddingTop: '5px',
                              display: this.state.toeflfileErr
                                ? 'block'
                                : 'none',
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
                              {'File Size: less than 1MB | Format: PDF'}
                            </p>
                            {/* <h4>Files</h4> */}
                            <ul>
                              {this.state.toeflfinalFile !== null
                                ? toeflfiles
                                : null}
                            </ul>
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'contained'}
                      style={{ width: '130px', textTransform: 'none' }}
                      onClick={() => this.handleSave('TOEFL')}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'outlined'}
                      style={{ width: '130px', textTransform: 'none' }}
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
                        fontFamily: 'Montserrat',
                        fontSize: 18,
                        color: '#052A4E',
                        fontWeight: 600,
                      }}
                    >
                      IELTS Score
                    </Typography>
                    <hr />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: '#1093FF' }} />}
                      id='combo-box-demo'
                      fullWidth
                      options={this.attempt}
                      value={this.state.ieltsattempt}
                      onChange={(e, newValue) => {
                        this.setState({ ieltsattempt: newValue });
                      }}
                      getOptionLabel={option => {
                        return option.title;
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Attempt'
                          variant='standard'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disableFuture
                      margin='normal'
                      label='Exam Date'
                      value={this.state.ieltsdate}
                      type='month'
                      onChange={e =>
                        this.setState({ ieltsdate: e.target.value })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      name='ExamDate'
                    />
                    {/* <KeyboardDatePicker
                      disableFuture
                      margin="normal"
                      id="date-picker-dialog"
                      label="Exam Date"
                      format="dd/MM/yyyy"
                      fullWidth
                      value={this.state.ieltsdate}
                      onChange={(newValue) => {
                        this.setState({ ieltsdate: newValue });
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    /> */}
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Reading (Max Score 9)'
                      fullWidth
                      value={this.state.ieltsread}
                      onChange={e => {
                        if (parseInt(e.target.value) > 9) {
                          e.preventDefault();
                        } else {
                          this.setState({ ieltsread: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Writing (Max Score 9)'
                      fullWidth
                      value={this.state.ieltswrite}
                      onChange={e => {
                        if (parseInt(e.target.value) > 9) {
                          e.preventDefault();
                        } else {
                          this.setState({ ieltswrite: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Speaking (Max Score 9)'
                      fullWidth
                      value={this.state.ieltsspeak}
                      onChange={e => {
                        if (parseInt(e.target.value) > 9) {
                          e.preventDefault();
                        } else {
                          this.setState({ ieltsspeak: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Listening (Max Score 9)'
                      fullWidth
                      value={this.state.ieltslis}
                      onChange={e => {
                        if (parseInt(e.target.value) > 9) {
                          e.preventDefault();
                        } else {
                          this.setState({ ieltslis: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      type='number'
                      label='Total (Max Score 9)'
                      fullWidth
                      value={this.state.ieltsscore}
                      onChange={e => {
                        if (parseInt(e.target.value) > 9) {
                          e.preventDefault();
                        } else {
                          this.setState({ ieltsscore: e.target.value });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item md={6}></Grid>
                  <Grid item md={6} sm={5} xs={5}>
                    <Dropzone onDrop={this.ieltsonDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
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
                            <PublishRoundedIcon color='primary' />
                          </div>
                          <Typography
                            style={{
                              paddingTop: '5px',
                              display: this.state.ieltsfileErr
                                ? 'block'
                                : 'none',
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
                              {'File Size: less than 1MB | Format: PDF'}
                            </p>
                            {/* <h4>Files</h4> */}
                            <ul>
                              {this.state.ieltsfinalFile !== null
                                ? ieltsfiles
                                : null}
                            </ul>
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}></Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'contained'}
                      style={{ width: '130px', textTransform: 'none' }}
                      onClick={() => this.handleSave('IELTS')}
                    >
                      Save
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={3}>
                    <PrimaryButton
                      color={'primary'}
                      variant={'outlined'}
                      style={{ width: '130px', textTransform: 'none' }}
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

const style = {
  HeadStyle: {
    paddingTop: '18px',
    fontStyle: 'Poppins',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: '18px',
    color: '#0081FF',
  },
  GridStyle: {
    fontStyle: 'Montserrat',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: '16px',
    color: '#052A4E',
  },
};

const mapStateToProps = state => {
  return {
    getgrescoreList: state.CallReducer.getgrescore,
    getieltsscoreList: state.CallReducer.getieltsscore,
    gettoeflscoreList: state.CallReducer.gettoeflscore,
    getgmatscoreList: state.CallReducer.getgmatscore,
    updateieltsscoreList: state.CallReducer.updateieltsscore,
    updategmatscoreList: state.CallReducer.updategmatscore,
    updategrescoreList: state.CallReducer.updategrescore,
    updatetoeflscoreList: state.CallReducer.updatetoeflscore,
    proofUplaodlist: state.StudentReducer.proofUplaod,
    getStudentsByIdList: state.StudentReducer.StudentList,
    downloadGATList: state.CallReducer.downloadGAT,
    fileuploadGATList: state.CallReducer.fileuploadGAT,
    studentStatus: state.AdminReducer.studentStatusResponse,
    getAllDocumentList: state.StudentReducer.getDocumentList,
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
  viewStudentStatus,
  getDocumentList,
  getexpecteddate,
  getieltsexam,
})(GraduateTestResult);
