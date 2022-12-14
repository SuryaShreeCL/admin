import { Backdrop, Box, Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCustomData,
  getDocumentModelBySubStageId,
  getDownloadByDocumentId,
  getFilePath,
  uploadDocumentBySubStageId,
  uploadFileBySubStageId,
} from "../../Actions/StrategySession";
import {
  getStepsBySubStageId,
  getStudentStageByProductId,
} from "../../Actions/Student";
import MySnackBar from "../MySnackBar";
import { CommentBoxPopper } from "../Utils/controls/CommentBoxPopper";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";
import Loader from "../Utils/controls/Loader";
import {
  bytesToMegaBytes,
  getSubStageByStage,
  textToDownloadFile,
} from "../Utils/Helpers";
import DocumentComponent from "./DocumentComponent";
import { useStyles } from "./Styles";
import TestTranscripts from "./TestTranscripts/Index";

const FILE_FORMAT_ERROR = "Invalid file format";
const FILE_SIZE_ERROR = "Please check the file size";
const FILE_UPLOAD_ERROR = "Please select a file";
const UPLOADED_SUCCESS = "Uploaded Successfully";
const REQUIRED_ERROR = "Please fill the required field";

function Index(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const { studentId, productId, subStageId } = params;
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
    completedStagesList,
  } = state;
  const {
    loading,
    documentModel,
    fileUploadStatus,
    documentUpdateStatus,
    downloadFileResponse,
    fileObject,
  } = useSelector((state) => state.StrategySessionReducer);
  console.log(fileObject);

  const { studentStages, subStageSteps, completedStages } = useSelector(
    (state) => state.StudentReducer
  );

  useEffect(() => {
    dispatch(getStudentStageByProductId(studentId, productId));
  }, []);

  useEffect(() => {
    if (studentStages) {
      if (studentStages.success) {
        const { data } = studentStages;
        let subStage = getSubStageByStage(
          data,
          "Strategy Session",
          "Upload Document"
        );
        if (subStage.length !== 0) {
          dispatch(
            getStepsBySubStageId(
              studentId,
              productId,
              subStage[0]["id"],
              "stageSS"
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
      dispatch(getDocumentModelBySubStageId(studentId, productId, sectionId));
    }
  }, [sectionId]);

  useEffect(() => {
    if (documentModel) {
      if (documentModel.success) {
        const { data } = documentModel;
        setState({
          ...state,
          upcomingFileName: data.fileName,
          status: data.stepStatus,
          documentList: data.content || [],
        });
        const index = data.content.length - 1;
        const path =
          data.content.length !== 0 ? data.content[index]["path"] : "";
        dispatch(getFilePath(studentId, sectionId, path));
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
        dispatch(getDocumentModelBySubStageId(studentId, productId, sectionId));
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
        uploadFileBySubStageId(studentId, productId, sectionId, uploadFormData)
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
    dispatch(getDownloadByDocumentId(studentId, sectionId, path));
  };

  const handleDelete = (id, path, e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, [`${name}HelperText`]: null });
  };

  const isStageCompleted = () => {
    return completedStagesList.includes("Strategy Session");
  };

  const renderComponent = () => {
    const renderProps = {
      open: open,
      stepName: activeTabValue,
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
      disabledUploadButton: isStageCompleted() || documentList.length === 0,
      isDisabledFileName: false,
      fileObject: fileObject,
      ...props,
    };
    switch (activeTabValue) {
      case "Test Transcripts":
        return (
          <TestTranscripts {...props} isStageCompleted={isStageCompleted()} />
        );
      default:
        return <DocumentComponent {...renderProps} />;
    }
  };

  const handleTabChange = (e, newValue) => {
    let arr = steps.filter(({ sectionName }) => sectionName === newValue);
    let newSectionId = arr.length !== 0 ? arr[0]["id"] : null;
    setState({ ...state, activeTabValue: newValue, sectionId: newSectionId });
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

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackVariant: "", snackMsg: "" });
  };

  const handleClickAway = () => {
    setState({ ...state, anchorEl: null, popoverComment: null });
  };

  return (
    <div className={classes.preStrategyWorkSheetContainer}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box display={"flex"} alignItems={"center"}>
            <Box flex={1}>
              <CustomTabs value={activeTabValue} onChange={handleTabChange}>
                {renderTabs()}
              </CustomTabs>
            </Box>
          </Box>
          <Divider className={classes.dividerStyle} />
        </Grid>
        <Grid item xs={12} lg={12}>
          {renderComponent()}
        </Grid>
      </Grid>
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
