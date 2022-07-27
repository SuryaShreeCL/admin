import { LinearProgress, Typography, withStyles } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { FileHeaderContainer } from "../../Assets/css/FileHeaderStyles";
import Controls from "../../../Component/Utils/controls/Controls";
import Spinner from "../../Assets/images/Blue-spin.gif";
import { bytesToSize } from "../../../Component/Utils/Helpers";

const BorderLinearProgress = withStyles((theme) => ({
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
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);
export function FileProgress({ file, onDelete, url, progress }) {
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img
          src={progress < 100 || !Boolean(url) ? Spinner : url}
          alt={"upload-img"}
          width='60px'
        />
      </div>
      <div className='img-details'>
        <Typography variant='caption' color='textSecondary'>
          {file.name}
        </Typography>
        <div className='img-progress'>
          <BorderLinearProgress variant='determinate' value={progress} />
        </div>
        <div className='img-info'>
          <Typography variant='caption' color='textSecondary'>
            {/* {bytesToSize(file.size)} */}
          </Typography>
          {!isNaN(Math.round(progress)) && (
            <Typography variant='caption' color='textSecondary'>{`${Math.round(
              progress
            )}%`}</Typography>
          )}
        </div>
      </div>
      <Controls.ActionButton onClick={() => onDelete(file)}>
        <DeleteIcon fontSize='small' color='secondary' />
      </Controls.ActionButton>
    </FileHeaderContainer>
  );
}
