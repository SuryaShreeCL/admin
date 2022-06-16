import {
  Box,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import React from "react";
import DropzoneComponent from "./CustomDropZone.js";
import {
  customTheme,
  DialogBox,
  DialogHeaderTitle,
  StyledButton,
  Typo,
  useStyles,
} from "./Styles.js";

function DocumentUploadPopup({
  open,
  title,
  variant,
  width,
  leftButtonText,
  rightButtonText,
  handleLeftButton,
  handleRightButton,
  handleClose,
  acceptTypes,
  onDrop,
  handleChange,
  fileName,
  comment,
  fileNameHelperText,
  commentHelperText,
  file,
  isDisabledFileName,
}) {
  const classes = useStyles();
  return (
    <DialogBox
      open={open}
      maxWidth={variant ? variant : "sx"}
      width={width || "600px"}
      onClose={handleClose}
    >
      <DialogHeaderTitle>{title}</DialogHeaderTitle>
      <DialogContent className={classes.dialogContent}>
        <Box>
          <DropzoneComponent acceptTypes={acceptTypes} onDrop={onDrop} />
          <Box
            margin={"20px 15px 0px 0px"}
            display={"flex"}
            flexDirection={"column"}
            gridGap={"15px"}
          >
            <Typo color={"#333333"} fontSize={"18px"} paddingBottom={"15px"}>
              {"Document Details"}
            </Typo>
            <TextField
              placeholder={"File name"}
              id={"fileName"}
              value={fileName}
              name={"fileName"}
              helperText={fileNameHelperText || " "}
              error={fileNameHelperText && fileNameHelperText.length !== 0}
              onChange={handleChange}
              disabled={Boolean(!file) || isDisabledFileName}
              fullWidth
            />
            <TextField
              placeholder={"Comment"}
              id={"comment"}
              value={comment}
              name={"comment"}
              helperText={commentHelperText || " "}
              error={commentHelperText && commentHelperText.length !== 0}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogBottomContainer}>
        {rightButtonText && (
          <StyledButton
            variant={"contained"}
            style={customTheme.palette.contained}
            onClick={handleLeftButton}
          >
            {leftButtonText}
          </StyledButton>
        )}
        <StyledButton
          variant={"text"}
          style={customTheme.palette.text}
          onClick={handleRightButton}
        >
          {rightButtonText}
        </StyledButton>
      </DialogActions>
    </DialogBox>
  );
}

export { DocumentUploadPopup };
