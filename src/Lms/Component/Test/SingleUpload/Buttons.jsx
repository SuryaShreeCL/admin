import { Button, ThemeProvider } from "@material-ui/core";
import React from "react";
import { ButtonBox, buttonTheme } from "../../../Assets/StyledTest";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";

function Buttons(props) {
  const { handleSaveClick, handleCancelClick } = props;
  return (
    <ButtonBox>
      <ThemeProvider theme={buttonTheme}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={
            <PlayArrowOutlinedIcon
              fontSize="large"
              style={{ fontSize: "2.1875rem" }}
            />
          }
        >
          Preview
        </Button>
        <Button variant="outlined" color="primary" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </ThemeProvider>
    </ButtonBox>
  );
}

export default Buttons;
