import { DialogActions, DialogContent } from '@material-ui/core';
import React from 'react';
import {
  customTheme,
  DialogBox,
  DialogHeaderTitle,
  StyledButton,
  useStyles,
} from './Styles.js';

function CustomPopup({
  open,
  title,
  variant,
  width,
  leftButtonText,
  rightButtonText,
  handleLeftButton,
  handleRightButton,
  handleClose,
  dialogContent,
}) {
  const classes = useStyles();
  return (
    <DialogBox
      open={open}
      maxWidth={variant ? variant : 'sx'}
      width={width}
      onClose={handleClose}
    >
      <DialogHeaderTitle>{title}</DialogHeaderTitle>
      <DialogContent className={classes.dialogContent}>
        {dialogContent}
      </DialogContent>
      <DialogActions className={classes.dialogBottomContainer}>
        <StyledButton
          variant={'text'}
          style={customTheme.palette.text}
          onClick={handleLeftButton}
        >
          {leftButtonText}
        </StyledButton>
        {rightButtonText && (
          <StyledButton
            variant={'contained'}
            style={customTheme.palette.contained}
            onClick={handleRightButton}
          >
            {rightButtonText}
          </StyledButton>
        )}
      </DialogActions>
    </DialogBox>
  );
}

export default CustomPopup;
