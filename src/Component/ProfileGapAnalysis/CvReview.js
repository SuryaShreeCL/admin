import {
  Backdrop,
  ClickAwayListener,
  Grid,
  IconButton,
  Popper,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCustomData,
  cvDownload,
  cvUpload,
  getStudentCvList,
  reviewCompleted,
} from "../../Actions/CvReview";
import { ReactComponent as CommentIcon } from "../../Asset/icons/comment.svg";
import {
  Container,
  ContentWrapper,
  customTheme,
  FlexEndView,
  FlexJustifyView,
  Paper,
  StyledButton,
  StyledTable,
  Typo,
  useStyles,
  Wrapper,
} from "../../Asset/StyledComponents/CvReview";
import MySnackBar from "../MySnackBar";
import DropzoneComponent from "../Utils/controls/CustomDropZone";
import CustomPopup from "../Utils/controls/CustomPopup";
import Loader from "../Utils/controls/Loader";
import CvViewer from "./CvViewer";

const CV_UPLOAD_MESSAGE = "CV Uploaded Successfully";
const CV_REVIEW_MESSAGE = "CV Review Completed Successfully";
const FILE_REQUIRED_MESSAGE = "Please select a file";
const FILE_SELECT_INVALID =
  "Please select a valid format (.doc/.docx/.pdf)  file";

function Index(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    snackOpen: false,
    snackVariant: "",
    snackMsg: "",
    cvReviewList: [],
    cvStatus: null,
    commentText: "",
    popupOpen: false,
    anchorEl: null,
    file: null,
    popperComment: "",
  });
  const {
    snackOpen,
    snackVariant,
    snackMsg,
    cvReviewList,
    cvStatus,
    commentText,
    popupOpen,
    anchorEl,
    file,
    popperComment,
  } = state;
  console.log(cvReviewList);
  const params = useParams();
  const { studentId, productId } = params;
  const dispatch = useDispatch();
  const {
    isLoading,
    studentCvList,
    downloadStatus,
    cvUploadStatus,
    cvReviewStatus,
  } = useSelector((state) => state.CvReviewReducer);
  console.log(cvReviewStatus);

  const handleSnack = (open, color, message) => {
    setState({
      ...state,
      snackOpen: open,
      snackVariant: color,
      snackMsg: message,
    });
  };

  useEffect(() => {
    dispatch(getStudentCvList(studentId, productId));
  }, []);

  useEffect(() => {
    if (studentCvList) {
      if (studentCvList.success) {
        setState({
          ...state,
          cvReviewList: studentCvList.data?.cvData || [],
          cvStatus: studentCvList.data?.status,
        });
      } else {
        handleSnack(true, "error", studentCvList.message);
      }
      dispatch(clearCustomData("studentCvList"));
    }
  }, [studentCvList]);

  useEffect(() => {
    if (downloadStatus) {
      if (!downloadStatus.success) {
        handleSnack(true, "error", downloadStatus.message);
      }
      dispatch(clearCustomData("downloadStatus"));
    }
  }, [downloadStatus]);

  useEffect(() => {
    if (cvUploadStatus) {
      const customProp = {
        snackOpen: true,
        popupOpen: false,
        file: null,
        commentText: "",
      };
      if (cvUploadStatus.success) {
        setState({
          ...state,
          snackVariant: "success",
          snackMsg: CV_UPLOAD_MESSAGE,
          ...customProp,
        });
        dispatch(getStudentCvList(studentId, productId));
        console.log(getStudentCvList);
      } else {
        setState({
          ...state,
          snackVariant: "error",
          snackMsg: cvUploadStatus.message,
          ...customProp,
        });
      }
      dispatch(clearCustomData("cvUploadStatus"));
      console.log(cvUploadStatus);
    }
  }, [cvUploadStatus]);

  useEffect(() => {
    if (cvReviewStatus) {
      if (cvReviewStatus.success) {
        handleSnack(true, "success", CV_REVIEW_MESSAGE);
        dispatch(getStudentCvList(studentId, productId));
      } else {
        handleSnack(true, "error", cvReviewStatus.message);
      }
      dispatch(clearCustomData("cvReviewStatus"));
    }
  }, [cvReviewStatus]);

  const handleDrop = (files) => {
    if (files && files.length !== 0) {
      setState({ ...state, file: files[0] });
    } else {
      setTimeout(() => handleSnack(true, "error", FILE_SELECT_INVALID), 200);
    }
  };

  const handleCancel = () => {
    setState({ ...state, popupOpen: false, file: null, commentText: "" });
  };

  const handlePopupOpen = () => {
    setState({ ...state, popupOpen: true });
  };

  const handleUpload = () => {
    if (file) {
      let uploadFormData = new FormData();
      uploadFormData.append("file", file);
      console.log(uploadFormData);
      dispatch(cvUpload(studentId, productId, uploadFormData, commentText));
      
    } else {
      handleSnack(true, "error", FILE_REQUIRED_MESSAGE);
    }
  };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackVariant: "", snackMsg: "" });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDelete = () => {
    setState({
      ...state,
      file: null,
    });
  };

  const renderDialogContent = () => {
    return (
      <div>
        <DropzoneComponent
          acceptTypes={".pdf, .doc, .docx"}
          onDrop={handleDrop}
        />
        <FlexJustifyView>
          <Typo
            variant={"h6"}
            className={classes.subTextStyle}
            color={"#333333"}
          >
            {"CV Details"}
          </Typo>
          {file?.name && (
            <div>
              <FlexEndView>
                <Typo variant={"caption"} color={"#333333"}>
                  {file.name}
                </Typo>
                <IconButton
                  onClick={handleDelete}
                  className={classes.iconButtonStyle}
                >
                  <DeleteIcon color={"error"} />
                </IconButton>
              </FlexEndView>
            </div>
          )}
        </FlexJustifyView>

        <TextField
          name={"commentText"}
          label={"Comment"}
          placeholder={"Comment"}
          value={commentText}
          className={classes.bottomPad}
          onChange={handleChange}
          fullWidth
        />
      </div>
    );
  };

  const handleClickAway = () => {
    if (document.activeElement.id !== "command_icon")
      setState({ ...state, anchorEl: null, popperComment: "" });
  };

  const renderPopperContent = () => {
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper>
          <Wrapper>
            <Typo variant={"body1"} color={"#18AAE7"}>
              {"Comment"}
            </Typo>
            <ContentWrapper className={classes.popperContentStyle}>
              <Typo
                variant={"body1"}
                color={"#333333"}
                paragraph={true}
                className={classes.popperContent}
              >
                {popperComment}
              </Typo>
            </ContentWrapper>
          </Wrapper>
        </Paper>
      </ClickAwayListener>
    );
  };

  const handleClick = (comment, event) => {
    setState({
      ...state,
      anchorEl: anchorEl === event.currentTarget ? null : event.currentTarget,
      popperComment: comment,
    });
  };

  const handleDownload = (id, cvPath) => {
    dispatch(cvDownload(studentId, id, cvPath));
  };
  const renderTable = () => {
    console.log(cvReviewList);
    return cvReviewList?.length !== 0 ? (
      <StyledTable>
        <tr>
          <th>{"Version"}</th>
          <th>{"Uploaded By"}</th>
          <th>{"Comment"}</th>
          <th></th>
        </tr>
        {cvReviewList.map(
          ({ comment, createdBy, id,path,fileName,versionNo, status, isShow }) =>
            versionNo===1 && status ==="Draft"?(
                <tr>
                <td>{fileName}</td>
                  <td>{createdBy}</td>
                  <td>
                    {comment && comment.trim().length !== 0 && (
                      <IconButton
                        id={"command_icon"}
                        className={classes.iconButtonStyle}
                        onClick={(e) => handleClick(comment, e)}
                      >
                        <CommentIcon />
                      </IconButton>
                    )}
                  </td>
                  <td>
                    <StyledButton
                      height={"25px"}
                      variant={"outlined"}
                      style={customTheme.palette.outlined}
                      onClick={() => handleDownload(id, path)}
                    >
                      {"Download"}
                    </StyledButton>
                  </td>
                </tr>
            ):(
             status === "Editor" ||  isShow === true?  (
              <tr>
                {status === "Editor" ? <td>{fileName}</td> : <td>{fileName}</td>}
                <td>{createdBy}</td>
                <td>
                  {comment && comment.trim().length !== 0 && (
                    <IconButton
                      id={"command_icon"}
                      className={classes.iconButtonStyle}
                      onClick={(e) => handleClick(comment, e)}
                    >
                      <CommentIcon />
                    </IconButton>
                  )}
                </td>
                <td>
                  <StyledButton
                    height={"25px"}
                    variant={"outlined"}
                    style={customTheme.palette.outlined}
                    onClick={() => handleDownload(id, path)}
                  >
                    {"Download"}
                  </StyledButton>
                </td>
              </tr>
            ) : (
              <></>
            )
        ))}
      </StyledTable>
    ) : null;
  };

  const handleReview = () => {
    dispatch(reviewCompleted(studentId, productId));
  };

  let isReview = cvStatus === "REVIEW";
  return (
    <Grid container>
      <Grid item sm={12} md={7}>
        <Container>
          <Grid container spacing={3} className={classes.flexFlow}>
            <Grid item lg={12}>
              <FlexEndView>
                {isReview && (
                  <StyledButton
                    variant={"outlined"}
                    style={customTheme.palette.outlined}
                    onClick={handleReview}
                  >
                    {"Review Completed"}
                  </StyledButton>
                )}
                <StyledButton
                  variant={"contained"}
                  style={
                    isReview
                      ? customTheme.palette.contained
                      : customTheme.palette.primary
                  }
                  onClick={handlePopupOpen}
                  disabled={!isReview}
                >
                  {"Upload CV"}
                </StyledButton>
              </FlexEndView>
            </Grid>
            <Grid item lg={12} className={classes.overflow}>
              {renderTable()}
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item sm={12} md={5}>
        <CvViewer doctype={"cv"} {...props} />
      </Grid>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={"bottom-start"}
      >
        {renderPopperContent()}
      </Popper>
      <CustomPopup
        open={popupOpen}
        title={"CV Upload"}
        width={"600px"}
        leftButtonText={"Cancel"}
        rightButtonText={"Upload"}
        handleLeftButton={handleCancel}
        handleRightButton={handleUpload}
        handleClose={handleCancel}
        dialogContent={renderDialogContent()}
      />
      <MySnackBar
        onClose={handleSnackClose}
        snackOpen={snackOpen}
        snackVariant={snackVariant}
        snackMsg={snackMsg}
      />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <Loader />
      </Backdrop>
    </Grid>
  );
}

export default Index;
