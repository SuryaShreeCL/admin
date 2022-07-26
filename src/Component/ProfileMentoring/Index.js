import { Backdrop, Box, Divider, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import {
  clearCustomData,
  getDocumentModelBySubStageId,
  getDownloadByDocumentId,
  uploadFile,
} from "../../Actions/ProfileMentoring";
import {
  getStepsBySubStageId,
  getStudentStageByProductId,
} from "../../Actions/Student";
import MySnackBar from "../MySnackBar";
import { CommentBoxPopper } from "../Utils/controls/CommentBoxPopper";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";
import Loader from "../Utils/controls/Loader";
import { getVariantStepsById } from "../../Actions/ProductAction"; 
import {
  bytesToMegaBytes,
  getSubStageByStage,
  textToDownloadFile,
} from "../Utils/Helpers";
import DocumentComponent from "./DocumentComponent";
import { useStyles } from "./Styles";
import { getproductstepsCall } from "../../Actions/ProductAction";

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
  const[stageDetails,setStageDetails] = useState("")
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
    cvloader : false
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
    cvloader
  } = state;
  const {
    loading,
    documentModel,
    fileUploadStatus,
    downloadFileResponse,
  } = useSelector((state) => state.ProfileMentoringReducer);

  const { studentStages, subStageSteps, completedStages } = useSelector(
    (state) => state.StudentReducer
  );
  const{getproductsteps} = useSelector(
    (state) => state.ProductReducer
  );

  console.log(getVariantStepsById)

  useEffect(() => {
    dispatch(getStudentStageByProductId(studentId, productId));
    dispatch(getVariantStepsById(productId, (response => {setStageDetails(response) })));
   
  }, []);
  useEffect(() => {
    console.log(stageDetails)
    let id=stageDetails?.steps?.find(el => el.stepName === "Profile Mentoring").id
    console.log(id)
     dispatch(getproductstepsCall(id))
  }, [stageDetails]);

  console.log(stageDetails)
  console.log(getproductsteps)

  useEffect(() => {
    if (studentStages) {
      if (studentStages.success) {
        const { data } = studentStages;
        let subStage = getSubStageByStage(
          data,
          "Profile Mentoring",
          "Completed Cv"
        );
        if (subStage.length !== 0) {
          dispatch(
            getStepsBySubStageId(
              studentId,
              productId,
              subStage[0]["id"],
              "profileMentoring"
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
            activeTabValue: arr.length !== 0 && arr[0]["CV"],
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
    if (sectionId && activeTabValue === "QPMC 1") {
      dispatch(getDocumentModelBySubStageId(studentId, productId, sectionId));
    }
  }, [sectionId]);

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
          upcomingFileName: null,
          status: null,
          documentList: [],
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
          file: null,
          fileName: null,
          comment: null,
          fileNameHelperText: "",
          commentHelperText: "",
          open: false,
          cvloader : true
        });
        dispatch(getDocumentModelBySubStageId(studentId, productId, sectionId));
        
       
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
      dispatch(uploadFile(studentId, productId, uploadFormData, comment));
      
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
    dispatch(getDownloadByDocumentId(studentId, id, path));
  };

  const handleDelete = (id, path, e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, [`${name}HelperText`]: null });
  };

  const isStageCompleted = () => {
    return completedStagesList.includes("Profile Mentoring");
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
      isDisabledFileName: true,
      lastestCVLoading: cvloader,
      ...props,
    };

    if(activeTabValue === "QPMC 1"){
      
      return <DocumentComponent {...renderProps} />;
    }
     if(activeTabValue === "QPMC 2"){

    }
     if(activeTabValue === "School Research"){

     }
    
  };

  const handleTabChange = (e, newValue) => {
    if(newValue === "QPMC 1"){
      let arr = steps.filter(({ sectionName }) => sectionName === newValue);
    let newSectionId = arr.length !== 0 ? arr[0]["id"] : null;
    setState({ ...state, activeTabValue: newValue, sectionId: newSectionId });
    }
    else{
    let Tabsteps = getproductsteps?.steps?.find(el => el.stepName === "Completed Cv").steps;
    let arr = Tabsteps.filter(({ stepName }) => stepName === newValue);
    let newSectionId = arr.length !== 0 ? arr[0]["id"] : null;
    setState({ ...state, activeTabValue: newValue, sectionId: newSectionId });
    }
   
    
  };

  const renderTabs = () => {
    console.log(getproductsteps?.steps?.find(el => el.stepName === "Completed Cv").steps)
    let Tabsteps = getproductsteps?.steps?.find(el => el.stepName === "Completed Cv").steps;
    return Tabsteps !== 0
      ? Tabsteps?.map(({ sectionName, id ,stepName}, index) => (
       
          <CustomTab
            value={stepName}
            label={stepName}
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
        anchorEl={anchorEl}
        handleClickAway={handleClickAway}
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
