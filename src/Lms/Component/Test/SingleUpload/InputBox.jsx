import React from "react";
// import { TextField } from '@material-ui/core';
import { OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import ImageIcon from "../../../Assets/icons/Image.svg";
import DeleteIcon from "@material-ui/icons/Delete";

function InputBox(props) {
  const {
    handleImageUpload,
    index,
    handleDeleteIconClick,
    choice,
    handleTextChange,
    answerType,
  } = props;
  if (choice.image === null)
    return (
      <OutlinedInput
        style={{ height: "48px  " }}
        fullWidth
        value={choice.text}
        onChange={(e) => handleTextChange(e, index)}
        endAdornment={
          answerType !== "SUBJECTIVE" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                component="label"
              >
                <img src={ImageIcon} alt="Image icon" />
                <input
                  hidden
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    );
  else
    return (
      <div className="display-selected-image-div">
        <img src={choice.image.imageUrl} className="choice-image-style" />
        <span>
          <IconButton>
            <DeleteIcon
              style={{ fill: " #FF3511" }}
              onClick={() => handleDeleteIconClick(index)}
            />
          </IconButton>
        </span>
      </div>
    );
}

export default InputBox;
