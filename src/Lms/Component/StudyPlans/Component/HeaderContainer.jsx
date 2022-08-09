import { Box, Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { FlexView } from "../../../Assets/StyledComponents";
import PlusButton from "../../../Utils/PlusButton";

function HeaderContainer({
  courseOptions = [],
  courseValue,
  handleCourseChange,
  handleDownloadTaskList,
  handlePopupOpen,
  buttonName,
}) {
  return (
    <Box display={"flex"}>
      <Box flex={1}>
        <Autocomplete
          id='combo-box-demo'
          options={courseOptions}
          value={courseValue}
          onChange={handleCourseChange}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          handleSnackClose
          renderInput={(params) => (
            <TextField {...params} label='Course' variant='outlined' />
          )}
        />
      </Box>
      <Box>
        <FlexView gap={"40px"}>
          <Button style={buttonStyle} onClick={handleDownloadTaskList}>
            {"Download Task List"}
          </Button>
          <PlusButton
            style={{ width: "200px" }}
            name={buttonName}
            onClick={handlePopupOpen}
          >
            {"Add Study Plan Month"}
          </PlusButton>
        </FlexView>
      </Box>
    </Box>
  );
}

export default HeaderContainer;

const buttonStyle = {
  background: "#1093FF",
  color: "white",
  textTransform: "none",
  minWidth: 160,
  fontWeight: 500,
  fontSize: "14px",
};
