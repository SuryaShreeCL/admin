import DateFnsUtils from "@date-io/date-fns";
import { Dialog, ThemeProvider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { downloadGAT } from "../../../Actions/Calldetails";
import {
  clearCustomData,
  fileUpload,
  getGmatData,
  getGreData,
  getIeltsData,
  getTestTranscriptFiles,
  getToeflData,
  updateGmatData,
  updateGreData,
  updateIeltsData,
  updateToeflData,
} from "../../../Actions/StrategySession";
import { getDocumentList, getStudentsById } from "../../../Actions/Student";
import { URL } from "../../../Actions/URL";
import MySnack from "../../MySnackBar";
import { DocumentListCard } from "./DocumentCardComponent";
import { GmatDialogContent } from "./GmatDialogContent";
import { GreDialogContent } from "./GreDialogContent";
import { IeltsDialogContent } from "./IeltsDialogContent";
import { theme, useStyles } from "./Styles";
import { TableComponent } from "./TableComponent";
import { ToeflDialogContent } from "./ToeflDialogContent";

const ANALYTICAL_OPTIONS = [
  { title: "0.5" },
  { title: "1.0" },
  { title: "1.5" },
  { title: "2.0" },
  { title: "2.5" },
  { title: "3.0" },
  { title: "3.5" },
  { title: "4.0" },
  { title: "4.5" },
  { title: "5.0" },
  { title: "5.5" },
  { title: "6.0" },
];

const ATTEMPT_OPTIONS = [
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

function Index(props) {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { studentId, productId } = params;
  const [state, setState] = useState({
    disable: false,
    show: false,
    files: [],
    date: null,
    attempt: {},
    quantitativeReasoning: "",
    verbalReasoning: "",
    integratedReasoning: "",
    analytical: {},
    total: "",
    reading: "",
    writing: "",
    speaking: "",
    listening: "",
    id: "",
    snackMsg: "",
    snackVariant: "",
    snackOpen: false,
    fileErr: false,
    finalFile: null,
    isFileChanged: false,
    testName: null,
    greScoreList: [],
    ieltsScoreList: [],
    toeflScoreList: [],
    gmatScoreList: [],
    documentList: null,
  });

  const {
    disable,
    show,
    files,
    date,
    attempt,
    quantitativeReasoning,
    verbalReasoning,
    integratedReasoning,
    analytical,
    total,
    reading,
    writing,
    speaking,
    listening,
    id,
    snackMsg,
    snackOpen,
    snackVariant,
    fileErr,
    finalFile,
    testName,
    greScoreList,
    ieltsScoreList,
    toeflScoreList,
    gmatScoreList,
    isFileChanged,
    documentList,
  } = state;

  const { StudentList } = useSelector((state) => state.StudentReducer);
  const {
    uploadFileResponse,
    updateGreResponse,
    greList,
    updateGmatResponse,
    gmatList,
    updateIeltsResponse,
    ieltsList,
    updateToeflResponse,
    toeflList,
    testTranscriptFiles,
  } = useSelector((state) => state.StrategySessionReducer);

  useEffect(() => {
    dispatch(getGreData(studentId));
    dispatch(getGmatData(studentId));
    dispatch(getToeflData(studentId));
    dispatch(getIeltsData(studentId));
    dispatch(getStudentsById(studentId));
    dispatch(getTestTranscriptFiles(studentId, productId));
  }, []);

  useEffect(() => {
    if (files && files.length !== 0) {
      var name = `${StudentList.firstName}_${
        StudentList.lastName
      }_${testName}${attempt?.title || ""}`;
      var file = files[0];
      var indexOf = file.type.indexOf("/");
      var newFileType = file.type.substr(indexOf + 1);
      var blob = new Blob([file], { type: newFileType });
      var newFile = new File(
        [blob],
        name
          .concat(".", newFileType)
          .replace(
            "vnd.openxmlformats-officedocument.wordprocessingml.document",
            "docx"
          ),
        { type: newFileType }
      );
      setState({ ...state, finalFile: newFile, isFileChanged: true });
    } else {
      setState({ ...state, finalFile: null, isFileChanged: false });
    }
  }, [files]);

  const handleDrop = (files) => {
    setState({ ...state, files });
  };

  useEffect(() => {
    if (gmatList) {
      if (gmatList.success) {
        setState({
          ...state,
          gmatScoreList: gmatList.data || [],
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: gmatList.message,
        });
      }
      dispatch(clearCustomData("gmatList"));
    }
  }, [gmatList]);

  useEffect(() => {
    if (greList) {
      if (greList.success) {
        setState({
          ...state,
          greScoreList: greList.data || [],
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: greList.message,
        });
      }
      dispatch(clearCustomData("greList"));
    }
  }, [greList]);

  useEffect(() => {
    if (ieltsList) {
      if (ieltsList.success) {
        setState({
          ...state,
          ieltsScoreList: ieltsList.data || [],
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: ieltsList.message,
        });
      }
      dispatch(clearCustomData("ieltsList"));
    }
  }, [ieltsList]);

  useEffect(() => {
    if (toeflList) {
      if (toeflList.success) {
        setState({
          ...state,
          toeflScoreList: toeflList.data || [],
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: toeflList.message,
        });
      }
      dispatch(clearCustomData("toeflList"));
    }
  }, [toeflList]);

  useEffect(() => {
    if (updateGmatResponse) {
      if (updateGmatResponse.success) {
        setState({
          ...state,
          snackMsg: "Updated Successfully",
          snackVariant: "Success",
          snackOpen: true,
          show: false,
        });
        dispatch(getGmatData(studentId));
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: updateGmatResponse.message,
        });
      }
      dispatch(clearCustomData("updateGmatResponse"));
    }
  }, [updateGmatResponse]);

  useEffect(() => {
    if (updateGreResponse) {
      if (updateGreResponse.success) {
        setState({
          ...state,
          snackMsg: "Updated Successfully",
          snackVariant: "Success",
          snackOpen: true,
          show: false,
        });
        dispatch(getGreData(studentId));
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: updateGreResponse.message,
        });
      }
      dispatch(clearCustomData("updateGreResponse"));
    }
  }, [updateGreResponse]);

  useEffect(() => {
    if (updateIeltsResponse) {
      if (updateIeltsResponse.success) {
        setState({
          ...state,
          snackMsg: "Updated Successfully",
          snackVariant: "Success",
          snackOpen: true,
          show: false,
        });
        dispatch(getIeltsData(studentId));
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: updateIeltsResponse.message,
        });
      }
      dispatch(clearCustomData("updateIeltsResponse"));
    }
  }, [updateIeltsResponse]);

  useEffect(() => {
    if (updateToeflResponse) {
      if (updateToeflResponse.success) {
        setState({
          ...state,
          snackMsg: "Updated Successfully",
          snackVariant: "Success",
          snackOpen: true,
          show: false,
        });
        dispatch(getToeflData(studentId));
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: updateToeflResponse.message,
        });
      }
      dispatch(clearCustomData("updateToeflResponse"));
    }
  }, [updateToeflResponse]);

  useEffect(() => {
    if (uploadFileResponse) {
      if (uploadFileResponse.success) {
        switch (testName) {
          case "GRE": {
            dispatch(getGreData(studentId));
            break;
          }
          case "GMAT": {
            dispatch(getGmatData(studentId));
            break;
          }
          case "IELTS": {
            dispatch(getIeltsData(studentId));
            break;
          }
          case "TOEFL": {
            dispatch(getToeflData(studentId));
            break;
          }
          default:
            break;
        }
        setState({
          ...state,
          testName: null,
          finalFile: null,
          isFileChanged: false,
        });
        dispatch(getTestTranscriptFiles(studentId, productId));
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: uploadFileResponse.message,
        });
      }
      dispatch(clearCustomData("uploadFileResponse"));
    }
  }, [uploadFileResponse]);

  useEffect(() => {
    if (testTranscriptFiles) {
      if (testTranscriptFiles.success) {
        setState({
          ...state,
          documentList: testTranscriptFiles.data,
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: testTranscriptFiles.message,
        });
      }
      dispatch(clearCustomData("testTranscriptFiles"));
    }
  }, [testTranscriptFiles]);

  const customFileFormat = (file) => {
    if (file) {
      return {
        name: file.path,
        size: file.fileSizeInBytes,
      };
    } else return null;
  };

  const handleEdit = (data, name) => {
    setState({
      ...state,
      show: true,
      testName: name,
      attempt: { title: data.attempt },
      date: data.completedExamDate
        ? moment(new Date(data.completedExamDate)).format("YYYY-MM")
        : data.completedExamDate,
      quantitativeReasoning: data.quantitativeReasoning,
      verbalReasoning: data.verbalReasoning,
      integratedReasoning: data.integratedReasoning,
      analytical: {
        title:
          data.analyticalWriting?.toString() ||
          data.analyticalAssessment?.toString(),
      },
      speaking: data.speaking || data.speakingScore,
      listening: data.listening || data.listeningScore,
      reading: data.reading || data.readingScore,
      writing: data.writing || data.writingScore,
      total: data.score || data.totalScore,
      id: data.id,
      finalFile: customFileFormat(data.studentDocument),
      isFileChanged: false,
    });
  };

  const documentClick = (data) => {
    window.open(`${URL}/api/v1/files/download/${studentId}/${data.path}`);
  };

  const handleDownload = (name, index) => {
    if (name === "GRE" && greScoreList?.[index]?.studentDocument) {
      dispatch(
        downloadGAT(studentId, greScoreList[index]["studentDocument"]["path"])
      );
      window.open(
        `${URL}/api/v1/files/download/${studentId}/${greScoreList[index]["studentDocument"]["path"]}`
      );
    } else if (name === "GMAT" && gmatScoreList?.[index]?.studentDocument) {
      dispatch(
        downloadGAT(studentId, gmatScoreList[index]["studentDocument"]["path"])
      );
      window.open(
        `${URL}/api/v1/files/download/${studentId}/${gmatScoreList[index]["studentDocument"]["path"]}`
      );
    } else if (name === "TOEFL" && toeflScoreList?.[index]?.studentDocument) {
      dispatch(
        downloadGAT(studentId, toeflScoreList[index]["studentDocument"]["path"])
      );
      window.open(
        `${URL}/api/v1/files/download/${studentId}/${toeflScoreList[index]["studentDocument"]["path"]}`
      );
    } else if (name === "IELTS" && ieltsScoreList?.[index]?.studentDocument) {
      dispatch(
        downloadGAT(studentId, ieltsScoreList[index]["studentDocument"]["path"])
      );
      window.open(
        `${URL}/api/v1/files/download/${studentId}/${ieltsScoreList[index]["studentDocument"]["path"]}`
      );
    }
  };

  const handleSave = (name) => {
    const commonObj = {
      id: id,
      attempt: attempt?.title,
      expectedExamDate: null,
      completedExamDate: date,
      score: total,
    };

    const d = new FormData();
    d.append("file", finalFile);

    if (name === "GRE") {
      let obj = {
        ...commonObj,
        verbalReasoning: verbalReasoning,
        quantitativeReasoning: quantitativeReasoning,
        analyticalWriting: analytical?.title,
      };
      dispatch(updateGreData(studentId, obj));
      if (isFileChanged) {
        dispatch(fileUpload(studentId, "gre", id, d));
      }
    }
    if (name === "GMAT") {
      let obj = {
        ...commonObj,
        quantitativeReasoning: quantitativeReasoning,
        integratedReasoning: integratedReasoning,
        analyticalAssessment: analytical?.title,
        verbalReasoning: verbalReasoning,
      };

      dispatch(updateGmatData(studentId, obj));
      if (isFileChanged) {
        dispatch(fileUpload(studentId, "gmat", id, d));
      }
    }
    if (name === "TOEFL") {
      let obj = {
        ...commonObj,
        reading: reading,
        listening: listening,
        writing: writing,
        speaking: speaking,
      };
      dispatch(updateToeflData(studentId, obj));
      if (isFileChanged) {
        dispatch(fileUpload(studentId, "tofel", id, d));
      }
    }
    if (name === "IELTS") {
      let obj = {
        ...commonObj,
        readingScore: reading,
        listeningScore: listening,
        speakingScore: speaking,
        writingScore: writing,
        totalScore: total,
      };

      dispatch(updateIeltsData(studentId, obj));
      if (isFileChanged) {
        dispatch(fileUpload(studentId, "ielts", id, d));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleClose = () => {
    setState({
      ...state,
      show: false,
      testName: null,
      finalFile: null,
      isFileChanged: false,
    });
  };

  const renderDialogContent = () => {
    const dialogProp = {
      attemptOptions: ATTEMPT_OPTIONS,
      analyticalOptions: ANALYTICAL_OPTIONS,
      attempt: attempt,
      quantitativeReasoning: quantitativeReasoning,
      date: date,
      analytical: analytical,
      verbalReasoning: verbalReasoning,
      integratedReasoning: integratedReasoning,
      reading: reading,
      writing: writing,
      speaking: speaking,
      listening: listening,
      total: total,
      fileError: fileErr,
      finalFile: finalFile,
      handleSave,
      handleChange,
      handleClose,
      handleDrop,
    };
    switch (testName) {
      case "GRE":
        return <GreDialogContent {...dialogProp} />;
      case "GMAT":
        return <GmatDialogContent {...dialogProp} />;
      case "IELTS":
        return <IeltsDialogContent {...dialogProp} />;
      case "TOEFL":
        return <ToeflDialogContent {...dialogProp} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 25 }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.titleContainer}>
            <p className={classes.titleStyle}>{"Graduate Test Details"}</p>
          </div>
          <TableComponent
            disabled={disable}
            tableData={greScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"GRE"}
            isDisabled={props.isStageCompleted}
          />
          <TableComponent
            disabled={disable}
            tableData={gmatScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"GMAT"}
            isDisabled={props.isStageCompleted}
          />
          <TableComponent
            disabled={disable}
            tableData={toeflScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"TOEFL"}
            isDisabled={props.isStageCompleted}
          />
          <TableComponent
            disabled={disable}
            tableData={ieltsScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"IELTS"}
            isDisabled={props.isStageCompleted}
          />
          <Grid
            item
            md={12}
            container
            justifyContent={"space-between"}
            style={{ paddingBottom: "10px" }}
          >
            <p className={classes.HeadStyle}>{"Documents Received"}</p>
          </Grid>
          {documentList &&
            documentList.GRE &&
            Array.isArray(documentList.GRE) &&
            documentList.GRE.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12} direction='column'>
                  <p className={classes.GridStyle}>GRE</p>
                </Grid>
                <Grid item={12} container>
                  {documentList.GRE.map((data) => (
                    <Grid item md={4} direction='row'>
                      <DocumentListCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentId={studentId}
                        category={"Gre"}
                        id={data.greId}
                        onClick={() => documentClick(data)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          {documentList &&
            documentList.GMAT &&
            Array.isArray(documentList.GMAT) &&
            documentList.GMAT.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12} direction='column'>
                  <p className={classes.GridStyle}>{"GMAT"}</p>
                </Grid>
                <Grid item={12} container>
                  {documentList.GMAT.map((data) => (
                    <Grid
                      item
                      md={4}
                      direction='row'
                      onClick={() => documentClick(data)}
                    >
                      <DocumentListCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentId={studentId}
                        category={"Gmat"}
                        id={data.gmatId}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          {documentList &&
            documentList.TOEFL &&
            Array.isArray(documentList.TOEFL) &&
            documentList.TOEFL.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12}>
                  <p className={classes.GridStyle}>{"TOEFL"}</p>
                </Grid>
                <Grid item={12} container>
                  {documentList.TOEFL.map((data) => (
                    <Grid
                      item
                      md={4}
                      direction='row'
                      onClick={() => documentClick(data)}
                    >
                      <DocumentListCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentId={studentId}
                        category={"Toefl"}
                        id={data.tofelId}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          {documentList &&
            documentList.IELTS &&
            Array.isArray(documentList.IELTS) &&
            documentList.IELTS.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12} direction='column'>
                  <p className={classes.GridStyle}>{"IELTS"}</p>
                </Grid>
                <Grid item={12} container>
                  {documentList.IELTS.map((data) => (
                    <Grid item md={4} onClick={() => documentClick(data)}>
                      <DocumentListCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentId={studentId}
                        category={"Ielts"}
                        id={data.ieltsId}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          <Dialog open={show} onClose={handleClose} maxWidth={"sm"} fullWidth>
            {renderDialogContent()}
          </Dialog>
        </MuiPickersUtilsProvider>
      </div>
      <MySnack
        snackMsg={snackMsg}
        snackVariant={snackVariant}
        snackOpen={snackOpen}
        onClose={() => setState({ ...state, snackOpen: false })}
      />
    </ThemeProvider>
  );
}

export default Index;
