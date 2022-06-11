import { Backdrop, Box, Divider, Grid } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCustomData,
  getDocumentModelBySubStageId,
  getDownloadByDocumentId,
  getMiscellaneousList,
  getSchoolList,
  uploadDocumentBySubStageId,
  uploadFileBySubStageId,
} from "../../Actions/ApplicationStage";
import {
  getStepsBySubStageId,
  getStudentStageByProductId,
} from "../../Actions/Student";
import { ReactComponent as EmptySchool } from "../../Asset/icons/empty-school.svg";
import {
  customTheme,
  StyledStaticButton,
  useStyles,
} from "../../Asset/StyledComponents/Styles";
import PdfViewer from "../../Utils/PdfViewer";
import MySnackBar from "../MySnackBar";
import { CommentBoxPopper } from "../Utils/controls/CommentBoxPopper";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";
import Loader from "../Utils/controls/Loader";
import { StyledButton, Typo } from "../Utils/controls/Styles";
import {
  bytesToMegaBytes,
  getSubStageByStage,
  isImageURL,
  textToDownloadFile,
} from "../Utils/Helpers";
import DocumentComponent from "./DocumentComponent";
import { PopperMenu } from "./MiscellaneousPopover";

const FILE_FORMAT_ERROR = "Invalid file format";
const FILE_SIZE_ERROR = "Please check the file size";
const FILE_UPLOAD_ERROR = "Please select a file";
const UPLOADED_SUCCESS = "Uploaded Successfully";
const REQUIRED_ERROR = "Please fill the required field";

function Index(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const { studentId, productId } = params;
  const [state, setState] = useState({
    steps: [],
    documentList: [],
    activeTabValue: null,
    sectionId: null,
    open: false,
    comment: null,
    upcomingFileName: null,
    fileName: null,
    fileNameHelperText: "",
    commentHelperText: "",
    file: null,
    snackMsg: "",
    snackOpen: false,
    snackVariant: "",
    status: null,
    anchorEl: null,
    popoverComment: null,
    schoolSteps: [],
    miscellaneousSteps: [],
    schoolId: null,
    schoolType: null,
    schoolName: null,
    miscellaneousAnchorEl: null,
    miscellaneousSelectedValue: null,
    programLink: null,
    deadline: null,
    completedStagesList: [],
  });

  const {
    steps,
    documentList,
    sectionId,
    activeTabValue,
    open,
    comment,
    fileName,
    fileNameHelperText,
    commentHelperText,
    file,
    snackMsg,
    snackOpen,
    snackVariant,
    upcomingFileName,
    status,
    anchorEl,
    popoverComment,
    schoolSteps,
    miscellaneousSteps,
    schoolId,
    schoolType,
    schoolName,
    miscellaneousAnchorEl,
    miscellaneousSelectedValue,
    programLink,
    deadline,
    completedStagesList,
  } = state;

  const {
    loading,
    schoolList,
    documentModel,
    fileUploadStatus,
    documentUpdateStatus,
    downloadFileResponse,
    miscellaneousList,
  } = useSelector((state) => state.ApplicationStageReducer);

  const { studentStages, subStageSteps, completedStages } = useSelector(
    (state) => state.StudentReducer
  );

  useEffect(() => {
    dispatch(getStudentStageByProductId(studentId, productId));
  }, []);

  useEffect(() => {
    if (completedStages) {
      if (completedStages.success) {
        setState({
          ...state,
          completedStagesList: completedStages.data || [],
        });
      } else {
        setState({
          ...state,
          completedStagesList: [],
        });
      }
    }
  }, [completedStages]);

  useEffect(() => {
    if (studentStages) {
      if (studentStages.success) {
        const { data } = studentStages;
        let subStage = getSubStageByStage(
          data,
          "Application Stage",
          "Upload Documents"
        );
        if (subStage.length !== 0) {
          dispatch(
            getStepsBySubStageId(
              studentId,
              productId,
              subStage[0]["id"],
              "applicationStage"
            )
          );
        }
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: studentStages.message,
        });
      }
    }
  }, [studentStages]);

  useEffect(() => {
    if (subStageSteps) {
      if (subStageSteps.success) {
        let arr = subStageSteps.data;
        if (arr.length !== 0) {
          arr.sort(function(a, b) {
            return a.rank - b.rank;
          });
          setState({
            ...state,
            steps: arr,
            activeTabValue: arr.length !== 0 && arr[0]["sectionName"],
            sectionId: arr.length !== 0 && arr[0]["id"],
          });
        }
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: subStageSteps.message,
        });
      }
    }
  }, [subStageSteps]);

  useEffect(() => {
    if (sectionId) {
      dispatch(getSchoolList(studentId, productId, sectionId));
      dispatch(getMiscellaneousList(studentId, productId, sectionId));
    }
  }, [sectionId, activeTabValue]);

  useEffect(() => {
    if (schoolId) {
      dispatch(
        getDocumentModelBySubStageId(
          studentId,
          productId,
          sectionId,
          schoolId,
          schoolType
        )
      );
    }
  }, [schoolId]);

  useEffect(() => {
    if (schoolList) {
      if (schoolList.success) {
        const { data } = schoolList;
        let schoolObj = data.length !== 0 ? { ...data[0] } : null;
        if (schoolObj) {
          setState({
            ...state,
            schoolSteps: data,
            schoolId: schoolObj.id,
            schoolType: schoolObj.type,
            schoolName: schoolObj.name,
          });
        } else {
          setState({ ...state, schoolSteps: [] });
        }
      } else {
        // setState({
        //   ...state,
        //   snackOpen: true,
        //   snackVariant: "error",
        //   snackMsg: schoolList.message,
        //   schoolSteps: [],
        //   schoolId: null,
        //   schoolType: null,
        //   schoolName: null,
        // });
      }
      dispatch(clearCustomData("schoolList"));
    }
  }, [schoolList]);

  useEffect(() => {
    if (miscellaneousList) {
      if (miscellaneousList.success) {
        const { data } = miscellaneousList;
        setState({ ...state, miscellaneousSteps: data });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: miscellaneousList.message,
        });
      }
      dispatch(clearCustomData("miscellaneousList"));
    }
  }, [miscellaneousList]);

  useEffect(() => {
    if (documentModel) {
      if (documentModel.success) {
        const { data } = documentModel;
        setState({
          ...state,
          upcomingFileName: data.fileName,
          status: data.stepStatus,
          documentList: data.content || [],
          deadline: data?.schoolDetails?.deadLine,
          programLink: data?.schoolDetails?.programLink,
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: documentModel.message,
          documentList: [],
          status: null,
          upcomingFileName: null,
        });
      }
      dispatch(clearCustomData("documentModel"));
    }
  }, [documentModel]);

  useEffect(() => {
    if (fileUploadStatus) {
      if (fileUploadStatus.success) {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "success",
          snackMsg: UPLOADED_SUCCESS,
        });
        let requestBody = {
          id: fileUploadStatus.data?.id,
          uploadedBy: "admin",
          status: "Review Completed",
          comment: comment,
          fileName: fileName,
        };
        dispatch(
          uploadDocumentBySubStageId(
            studentId,
            productId,
            sectionId,
            schoolId,
            schoolType,
            requestBody
          )
        );
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: fileUploadStatus.message,
        });
      }
      dispatch(clearCustomData("fileUploadStatus"));
    }
  }, [fileUploadStatus]);

  useEffect(() => {
    if (documentUpdateStatus) {
      if (documentUpdateStatus.success) {
        setState({
          ...state,
          file: null,
          fileName: null,
          comment: null,
          fileNameHelperText: "",
          commentHelperText: "",
          open: false,
        });
        dispatch(
          getDocumentModelBySubStageId(
            studentId,
            productId,
            sectionId,
            schoolId,
            schoolType
          )
        );
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: documentUpdateStatus.message,
        });
      }
      dispatch(clearCustomData("documentUpdateStatus"));
    }
  }, [documentUpdateStatus]);

  useEffect(() => {
    if (downloadFileResponse) {
      if (downloadFileResponse.success) {
        textToDownloadFile(
          downloadFileResponse.data,
          downloadFileResponse.fileName,
          downloadFileResponse.fileName.split(".").pop()
        );
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: downloadFileResponse.message,
        });
      }
      dispatch(clearCustomData("downloadFileResponse"));
    }
  }, [downloadFileResponse]);

  const handleCancel = () => {
    setState({
      ...state,
      file: null,
      fileName: null,
      comment: null,
      fileNameHelperText: "",
      commentHelperText: "",
      open: false,
    });
  };

  const handleUpload = () => {
    let error = false;
    if (!file) {
      error = true;
      setState({
        ...state,
        snackOpen: true,
        snackMsg: FILE_UPLOAD_ERROR,
        snackVariant: "error",
      });
    } else if (!(fileName && fileName.trim().length !== 0)) {
      error = true;
      setState({ ...state, fileNameHelperText: REQUIRED_ERROR });
    } else if (!(comment && comment.trim().length !== 0)) {
      error = true;
      setState({ ...state, commentHelperText: REQUIRED_ERROR });
    }
    if (!error && sectionId) {
      var fileObj = file;
      var newFileName = fileName;
      var newFileType = fileObj.path.split(".").pop();
      var blob = new Blob([fileObj], { type: newFileType });
      var newFile = new File([blob], `${newFileName}.${newFileType}`, {
        type: newFileType,
      });
      let uploadFormData = new FormData();
      uploadFormData.append("file", newFile);
      dispatch(
        uploadFileBySubStageId(
          studentId,
          productId,
          sectionId,
          schoolId,
          schoolType,
          uploadFormData
        )
      );
    }
  };

  const handleUploadClick = () => {
    setState({ ...state, open: true });
  };

  const handleDrop = (fileArray) => {
    if (fileArray.length !== 0) {
      if (bytesToMegaBytes(fileArray[0]["size"]) > 5) {
        setState({
          ...state,
          snackOpen: true,
          snackMsg: FILE_SIZE_ERROR,
          snackVariant: "error",
        });
      } else {
        setState({
          ...state,
          file: fileArray[0],
          fileName: upcomingFileName || fileArray[0]["name"],
        });
      }
    } else {
      setState({
        ...state,
        snackOpen: true,
        snackMsg: FILE_FORMAT_ERROR,
        snackVariant: "error",
      });
    }
  };

  const handleComment = (comment, e) => {
    setState({
      ...state,
      popoverComment: comment,
      anchorEl: e.currentTarget,
    });
  };

  const handleDownload = (path, id, e) => {
    dispatch(getDownloadByDocumentId(studentId, sectionId, path,schoolId));
  };

  const handleDelete = (id, path, e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, [`${name}HelperText`]: null });
  };

  const isStageCompleted = () => {
    return completedStagesList.includes("Application Stage");
  };

  const renderComponent = () => {
    const renderProps = {
      open: open,
      stepName: schoolName,
      handleCancel: handleCancel,
      handleUpload: handleUpload,
      handleUploadClick: handleUploadClick,
      onDrop: handleDrop,
      handleComment: handleComment,
      handleDownload: handleDownload,
      handleDelete: handleDelete,
      tableData: documentList,
      handleChange: handleChange,
      fileName: fileName,
      comment: comment,
      fileNameHelperText: fileNameHelperText,
      commentHelperText: commentHelperText,
      file: file,
      isDisabledFileName: false,
      ...props,
    };
    if (miscellaneousSelectedValue) {
      let arr = miscellaneousSteps.filter(
        ({ name }) => name === miscellaneousSelectedValue
      );
      let newUrl = arr.length !== 0 ? arr[0]["url"] : null;

      if (isImageURL(newUrl)) {
        return (
          <Box height={"100vh"} overflow={"auto"}>
            <img
              width={"100%"}
              src={newUrl}
              className={classes.fullImageStyle}
              alt={"Not Supported"}
            />
          </Box>
        );
      } else {
        return (
          <Box>
            <PdfViewer cvUrl={newUrl} />
          </Box>
        );
      }
    } else
      return schoolSteps.length === 0 ? (
        <Box
          margin={"150px 0px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <EmptySchool />
          <Typo padding={"10px 0px"} variant={"h6"}>
            {"No School added"}
          </Typo>
        </Box>
      ) : (
        <DocumentComponent {...renderProps} />
      );
  };

  const handleTabChange = (e, newValue) => {
    let arr = steps.filter(({ sectionName }) => sectionName === newValue);
    let newSectionId = arr.length !== 0 ? arr[0]["id"] : null;

    setState({
      ...state,
      activeTabValue: newValue,
      sectionId: newSectionId,
      miscellaneousSelectedValue: null,
    });
  };

  const handleSchoolTabChange = (e, newValue) => {
    let arr = schoolSteps.filter(({ id }) => id === newValue);
    let newSchoolType = arr.length !== 0 ? arr[0]["type"] : null;
    let newSchoolName = arr.length !== 0 ? arr[0]["name"] : null;
    setState({
      ...state,
      schoolId: newValue,
      schoolType: newSchoolType,
      schoolName: newSchoolName,
    });
  };

  const renderTabs = () => {
    return steps.length !== 0
      ? steps.map(({ sectionName, id }, index) => (
          <CustomTab
            value={sectionName}
            label={sectionName}
            id={`${id}${index}`}
            minHeight={"72px"}
          />
        ))
      : null;
  };

  const renderSchoolTab = () => {
    return schoolSteps.length !== 0
      ? schoolSteps.map(({ name, id }, index) => (
          <CustomTab
            value={id}
            label={name}
            id={`${id}${index}`}
            minHeight={"32px"}
            style={{ fontSize: "18px" }}
          />
        ))
      : null;
  };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackVariant: "", snackMsg: "" });
  };

  const handleClickAway = () => {
    setState({
      ...state,
      anchorEl: null,
      popoverComment: null,
      miscellaneousAnchorEl: null,
    });
  };

  const handleMiscellaneous = (e) => {
    setState({ ...state, miscellaneousAnchorEl: e.currentTarget });
  };

  const handleListItemClick = (val) => {
    setState({
      ...state,
      miscellaneousSelectedValue: val,
      activeTabValue: null,
      miscellaneousAnchorEl: null,
      documentList: [],
      schoolSteps: [],
    });
  };

  const popperMenuProps = {
    anchorEl: miscellaneousAnchorEl,
    handleClickAway: handleClickAway,
    placement: "bottom-end",
    lists: miscellaneousSteps,
    handleListItemClick: handleListItemClick,
    selectedValue: miscellaneousSelectedValue,
  };

  const isMiscellaneous = Boolean(miscellaneousSelectedValue);
  const disabledUploadButton = isStageCompleted() || documentList.length === 0;

  return (
    <div className={classes.stageBoxLayoutStyle}>
      <Grid container>
        <Grid item lg={12}>
          <Box display={"flex"} alignItems={"center"}>
            <Box flex={1}>
              <CustomTabs value={activeTabValue} onChange={handleTabChange}>
                {renderTabs()}
              </CustomTabs>
            </Box>
            <StyledStaticButton
              active={isMiscellaneous}
              color={"primary"}
              onClick={handleMiscellaneous}
              disabled={miscellaneousSteps.length === 0}
            >
              {"Miscellaneous / Handouts"}
            </StyledStaticButton>
          </Box>
          <Divider className={classes.dividerStyle} />
        </Grid>
        <Grid item lg={12}>
          {schoolSteps.length !== 0 && !isMiscellaneous && (
            <Box>
              <Box margin={"30px 15px 0px 15px"}>
                <CustomTabs
                  indicatorColor={"primary"}
                  value={schoolId}
                  variant={"scrollable"}
                  onChange={handleSchoolTabChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#18AAE7",
                      height: "3px",
                    },
                  }}
                >
                  {renderSchoolTab()}
                </CustomTabs>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                margin={"36px 20px 0px 30px"}
              >
                <Box flex={1}>
                  <Typo color={"#999999"}>
                    <Box marginRight={"8px"} component={"span"}>
                      {"Program Link:"}
                    </Box>
                    <Typo color={"#004CFE"} component={"span"} fontWeight={500}>
                      {programLink ? (
                        <a
                          href={
                            programLink.indexOf("http") > -1
                              ? programLink
                              : `https://${programLink}`
                          }
                          target="_blank"
                        >
                          {"Program Link"}
                        </a>
                      ) : (
                        "NA"
                      )}
                    </Typo>
                    <Box margin={"0px 15px 0px 40px"} component={"span"}>
                      {"Deadline:"}
                    </Box>
                    <Typo component={"span"} fontWeight={500} color={"#333333"}>
                      {deadline ? (
                        <u>
                          {moment(new Date(deadline)).format("DD MMMM YYYY")}
                        </u>
                      ) : (
                        "NA"
                      )}
                    </Typo>
                  </Typo>
                </Box>
                <Box>
                  <StyledButton
                    variant={"contained"}
                    style={
                      customTheme["palette"][
                        disabledUploadButton ? "disabled" : "contained"
                      ]
                    }
                    onClick={handleUploadClick}
                    disabled={disabledUploadButton}
                  >
                    {"Upload"}
                  </StyledButton>
                </Box>
              </Box>
            </Box>
          )}

          {renderComponent()}
        </Grid>
      </Grid>
      <PopperMenu {...popperMenuProps} />
      <CommentBoxPopper
        handleClickAway={handleClickAway}
        anchorEl={anchorEl}
        popperComment={popoverComment}
      />
      <MySnackBar
        onClose={handleSnackClose}
        snackOpen={snackOpen}
        snackVariant={snackVariant}
        snackMsg={snackMsg}
      />
      <Backdrop className={classes.backdrop} open={loading}>
        <Loader />
      </Backdrop>
    </div>
  );
}

export default Index;
