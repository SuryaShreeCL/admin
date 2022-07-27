import { LinearProgress, Typography, withStyles } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { FileHeaderContainer } from "../../Assets/css/FileHeaderStyles";
import Error_image from "../../Assets/images/upload-error.png";
import Controls from "../../../Component/Utils/controls/Controls";
import { bytesToSize } from "../../../Component/Utils/Helpers";

const ErrorLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "100%",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: theme.palette.error.main,
  },
}))(LinearProgress);

export function UploadError({ file, onDelete, error }) {
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img src={Error_image} alt={"error-img"} width='60px' />
      </div>
      <div className='img-details'>
        <Typography variant='caption' color='textSecondary'>
          {file.name}
        </Typography>
        <div className='img-progress'>
          <ErrorLinearProgress
            variant='determinate'
            value={100}
            style={{ width: "100%" }}
          />
        </div>
        <div className='img-info'>
          <Typography variant='caption' color='textSecondary'>
            {/* {bytesToSize(file.size)} */}
          </Typography>
          <div>
            <Typography color='error'>{error?.message}</Typography>
          </div>
          <Typography variant='caption' color='textSecondary'>
            100%
          </Typography>
        </div>
      </div>
      <Controls.ActionButton onClick={() => onDelete(file)}>
        <CloseIcon fontSize='small' color='secondary' />
      </Controls.ActionButton>
    </FileHeaderContainer>
  );
}
