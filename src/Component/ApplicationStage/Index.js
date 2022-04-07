import { Backdrop, Box, Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCustomData,
  getDocumentModelBySubStageId,
  getDownloadByDocumentId,
  uploadDocumentBySubStageId,
  uploadFileBySubStageId,
  getSchoolList,
  getMiscellaneousList,
} from "../../Actions/ApplicationStage";
import {
  getStepsBySubStageId,
  getStudentStageByProductId,
} from "../../Actions/Student";
import { useStyles } from "../../Asset/StyledComponents/Styles";
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

  const { studentStages, subStageSteps } = useSelector(
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
  }, [sectionId]);

  useEffect(() => {
    if (schoolList) {
      if (schoolList.success) {
        const { data } = data;
        setState({ ...state, schoolSteps: data });
        // dispatch(
        //   getDocumentModelBySubStageId(
        //     studentId,
        //     productId,
        //     sectionId,
        //     schoolId,
        //     type
        //   )
        // );
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackVariant: "error",
          snackMsg: schoolList.message,
        });
      }
      dispatch(clearCustomData("schoolList"));
    }
  }, [schoolList]);

  useEffect(() => {
    if (miscellaneousList) {
      if (miscellaneousList.success) {
        const { data } = data;
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
        // dispatch(
        //   getDocumentModelBySubStageId(
        //     studentId,
        //     productId,
        //     sectionId,
        //     schoolId,
        //     type
        //   )
        // );
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
          studentId,
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

  const handleDownload = (path, e) => {
    dispatch(getDownloadByDocumentId(studentId, sectionId, path));
  };

  const handleDelete = (id, path, e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, [`${name}HelperText`]: null });
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
      disabledUploadButton: false,
      isDisabledFileName: false,
      ...props,
    };
    return <DocumentComponent {...renderProps} />;
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
    <div className={classes.stageBoxLayoutStyle}>
      <Grid container>
        <Grid item lg={12}>
          <Box display={"flex"} alignItems={"center"}>
            <Box flex={1}>
              <CustomTabs value={activeTabValue} onChange={handleTabChange}>
                {renderTabs()}
              </CustomTabs>
            </Box>
          </Box>
          <Divider className={classes.dividerStyle} />
        </Grid>
        <Grid item lg={12}>
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
