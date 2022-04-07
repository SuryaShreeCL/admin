import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CvViewer from "../ProfileGapAnalysis/CvViewer";
import { DocumentUploadPopup } from "../Utils/controls/DocumentUploadPopup";
import { customTheme, StyledButton } from "../Utils/controls/Styles";
import { DownloadCvTable } from "../Utils/DownloadCvTable";

function DocumentComponent({
  open,
  stepName,
  handleCancel,
  handleUpload,
  handleUploadClick,
  onDrop,
  handleComment,
  handleDownload,
  handleDelete,
  tableData,
  handleChange,
  comment,
  fileName,
  fileNameHelperText,
  commentHelperText,
  file,
  disabledUploadButton,
  isDisabledFileName,
  ...props
}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box margin={"26px 20px 30px 30px"}>
          <Box textAlign={"right"}>
            <StyledButton
              variant={"contained"}
              style={customTheme.palette.contained}
              onClick={handleUploadClick}
              disabled={disabledUploadButton}
            >
              {"Upload"}
            </StyledButton>
          </Box>
          <Grid item xs={12}>
            <Box>
              <DownloadCvTable
                headers={["Version", "Uploaded date", "Comment", ""]}
                body={tableData}
                handleComment={handleComment}
                handleDownload={handleDownload}
                handleDelete={handleDelete}
              />
            </Box>
          </Grid>
        </Box>
      </Grid>
      <DocumentUploadPopup
        open={open}
        title={`Upload Document | ${stepName}`}
        leftButtonText={"Upload"}
        rightButtonText={"Cancel"}
        handleLeftButton={handleUpload}
        handleRightButton={handleCancel}
        handleClose={handleCancel}
        acceptTypes={".doc, .docx, .xls, .xlsx"}
        onDrop={onDrop}
        handleChange={handleChange}
        comment={comment}
        fileName={fileName}
        fileNameHelperText={fileNameHelperText}
        commentHelperText={commentHelperText}
        file={file}
        isDisabledFileName={isDisabledFileName}
      />
    </Grid>
  );
}

export default DocumentComponent;
