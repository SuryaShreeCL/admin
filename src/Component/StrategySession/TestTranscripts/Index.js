import DateFnsUtils from "@date-io/date-fns";
import { Box, Dialog, ThemeProvider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
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
  getToeflData,
  updateGmatData,
  updateGreData,
  updateIeltsData,
  updateToeflData,
} from "../../../Actions/StrategySession";
import {
  getexpecteddate,
  getieltsexam,
  getStudentsById,
} from "../../../Actions/Student";
import { URL } from "../../../Actions/URL";
import Mysnack from "../../MySnackBar";
import DoccumentCard from "../../Utils/DoccumentCard";
import ExamDateCard from "../../Utils/ExamDateCard";
import Model from "../../Utils/SectionModel";
import { GmatDialogContent } from "./GmatDialogContent";
import { GreDialogContent } from "./GreDialogContent";
import { IeltsDialogContent } from "./IeltsDialogContent";
import { theme, useStyles } from "./Styles";
import { TableComponent } from "./TableComponent";
import { ToelfDialogContent } from "./ToelfDialogContent";

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
    filename: "",
    index: "",
    sectionStatus: {
      model: false,
      data: null,
      sectionName: "",
    },
    toeflDateList: [],
    ieltsDateList: [],
    gmatDateList: [],
    greDateList: [],
    testName: null,
    greScoreList: [],
    ieltsScoreList: [],
    toeflScoreList: [],
    gmatScoreList: [],
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
    filename,
    finalFile,
    index,
    sectionStatus,
    toeflDateList,
    ieltsDateList,
    gmatDateList,
    greDateList,
    testName,
    greScoreList,
    ieltsScoreList,
    toeflScoreList,
    gmatScoreList,
  } = state;

  const { StudentList, getDocumentList } = useSelector(
    (state) => state.StudentReducer
  );
  const {
    uploadFileResponse,
    updateGreResponse,
    greList,
    updateGmatResponse,
    gmatList,
    updateIeltsResponse,
    ieltsList,
    updateToelfResponse,
    toelfList,
  } = useSelector((state) => state.StrategySessionReducer);

  useEffect(() => {
    dispatch(getGreData(studentId));
    dispatch(getGmatData(studentId));
    dispatch(getToeflData(studentId));
    dispatch(getIeltsData(studentId));

    dispatch(getStudentsById(studentId));
    dispatch(
      getexpecteddate("gre", studentId, (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            greDateList: response.data,
          });
        }
      })
    );
    dispatch(
      getexpecteddate("gmat", studentId, (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            gmatDateList: response.data,
          });
        }
      })
    );
    dispatch(
      getexpecteddate("tofel", studentId, (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            toeflDateList: response.data,
          });
        }
      })
    );
    dispatch(
      getieltsexam(studentId, (response) => {
        if (response.status === 200) {
          setState({
            ...state,
            ieltsDateList: response.data,
          });
        }
      })
    );
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
      setState({ ...state, filename: file.name, finalFile: newFile });
    } else {
      setState({ ...state, filename: "", finalFile: null });
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
          gmatScoreList:
            gmatList?.data && Array.isArray(gmatList?.data)
              ? gmatList.data
              : [],
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
          greScoreList:
            greList?.data && Array.isArray(greList?.data) ? greList.data : [],
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
          ieltsScoreList:
            ieltsList?.data && Array.isArray(ieltsList?.data)
              ? ieltsList.data
              : [],
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
    if (toelfList) {
      if (toelfList.success) {
        setState({
          ...state,
          toeflScoreList:
            toelfList?.data && Array.isArray(toelfList?.data)
              ? toelfList.data
              : [],
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: toelfList.message,
        });
      }
      dispatch(clearCustomData("toelfList"));
    }
  }, [toelfList]);

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
    if (updateToelfResponse) {
      if (updateToelfResponse.success) {
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
          snackMsg: updateToelfResponse.message,
        });
      }
      dispatch(clearCustomData("updateToelfResponse"));
    }
  }, [updateToelfResponse]);

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
          case "TOELF": {
            dispatch(getToeflData(studentId));
            break;
          }
          default:
            break;
        }
        setState({ ...state, testName: null });
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

  const customFileFormat = (file) => {
    if (file) {
      return {
        name: file.path,
        size: file.fileSizeInBytes,
      };
    } else return null;
  };

  const handleEdit = (data, indexValue, name) => {
    setState({
      ...state,
      show: true,
      testName: name,
      attempt: { title: data.attempt },
      date: data.completedExamDate,
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
      index: indexValue + 1,
      finalFile: customFileFormat(data.studentDocument),
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
      dispatch(fileUpload(studentId, "gre", id, d));
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
      dispatch(fileUpload(studentId, "gmat", id, d));
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
      dispatch(fileUpload(studentId, "toelf", id, d));
    }
    if (name === "IELTS") {
      let obj = {
        ...commonObj,
        readingScore: reading,
        listeningScore: listening,
        speakingScore: speaking,
        writingScore: writing,
      };

      dispatch(updateIeltsData(studentId, obj));
      dispatch(fileUpload(studentId, "ielts", id, d));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleClose = () => {
    setState({ ...state, show: false, testName: null });
  };

  const renderModel = () => (
    <Model
      data={sectionStatus}
      handleClose={() =>
        setState({
          sectionStatus: {
            ...sectionStatus,
            model: false,
          },
        })
      }
      section={sectionStatus}
      {...props}
    />
  );

  const renderExamDateCards = (data, name) => {
    return data && data.length !== 0 ? (
      <Grid item md={12}>
        <Box>
          <p className={classes.GridStyle}>{name}</p>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {data.map(({ expectedExamDate }, index) => {
              return (
                <Grid key={`${name}-exam-card-${index}`} item md={3}>
                  <ExamDateCard date={expectedExamDate || ""} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    ) : null;
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
      case "TOELF":
        return <ToelfDialogContent {...dialogProp} />;
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
          />
          <TableComponent
            disabled={disable}
            tableData={gmatScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"GMAT"}
          />
          <TableComponent
            disabled={disable}
            tableData={toeflScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"TOEFL"}
          />
          <TableComponent
            disabled={disable}
            tableData={ieltsScoreList}
            handleDownload={handleDownload}
            handleEdit={handleEdit}
            name={"IELTS"}
          />
          <Grid item md={12} container justifyContent={"space-between"}>
            <p className={classes.HeadStyle}>{"Documents Received"}</p>
          </Grid>
          {getDocumentList &&
            getDocumentList.GRE &&
            Array.isArray(getDocumentList.GRE) &&
            getDocumentList.GRE.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12} direction='column'>
                  <p className={classes.GridStyle}>GRE</p>
                </Grid>
                <Grid item={12} container>
                  {getDocumentList.GRE.map((data) => (
                    <Grid
                      item
                      md={4}
                      direction='row'
                      onClick={() => documentClick(data)}
                    >
                      <DoccumentCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentid={studentId}
                        category={"Gre"}
                        id={data.greId}
                        status={true}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          {getDocumentList &&
            getDocumentList.GMAT &&
            Array.isArray(getDocumentList.GMAT) &&
            getDocumentList.GMAT.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12} direction='column'>
                  <p className={classes.GridStyle}>{"GMAT"}</p>
                </Grid>
                <Grid item={12} container>
                  {getDocumentList.GMAT.map((data) => (
                    <Grid
                      item
                      md={4}
                      direction='row'
                      onClick={() => documentClick(data)}
                    >
                      <DoccumentCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentid={studentId}
                        category={"Gmat"}
                        id={data.gmatId}
                        status={true}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          {getDocumentList &&
            getDocumentList.TOEFL &&
            Array.isArray(getDocumentList.TOEFL) &&
            getDocumentList.TOEFL.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12}>
                  <p className={classes.GridStyle}>{"TOEFL"}</p>
                </Grid>
                <Grid item={12} container>
                  {getDocumentList.TOEFL.map((data) => (
                    <Grid
                      item
                      md={4}
                      direction='row'
                      onClick={() => documentClick(data)}
                    >
                      <DoccumentCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentid={studentId}
                        category={"Toefl"}
                        id={data.tofelId}
                        status={true}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          {getDocumentList &&
            getDocumentList.IELTS &&
            Array.isArray(getDocumentList.IELTS) &&
            getDocumentList.IELTS.length !== 0 && (
              <Grid item md={12}>
                <Grid item md={12} direction='column'>
                  <p className={classes.GridStyle}>{"IELTS"}</p>
                </Grid>
                <Grid item={12} container>
                  {getDocumentList.IELTS.map((data) => (
                    <Grid
                      item
                      md={4}
                      direction='row'
                      onClick={() => documentClick(data)}
                    >
                      <DoccumentCard
                        certificate={data.name}
                        date={data.date}
                        path={data.path}
                        studentid={studentId}
                        category={"Ielts"}
                        id={data.ieltsId}
                        status={true}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          <Grid item md={12}>
            <p className={classes.HeadStyle}>{"Exam Date"}</p>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={3}>
              {renderExamDateCards(greDateList, "GRE")}
              {renderExamDateCards(gmatDateList, "GMAT")}
              {renderExamDateCards(toeflDateList, "TOEFL")}
              {renderExamDateCards(ieltsDateList, "IELTS")}
            </Grid>
          </Grid>
          <Dialog open={show} onClose={handleClose} maxWidth={"sm"} fullWidth>
            {renderDialogContent()}
          </Dialog>
        </MuiPickersUtilsProvider>
      </div>
      <Mysnack
        snackMsg={snackMsg}
        snackVariant={snackVariant}
        snackOpen={snackOpen}
        onClose={() => setState({ ...state, snackOpen: false })}
      />
      {renderModel()}
    </ThemeProvider>
  );
}

export default Index;
