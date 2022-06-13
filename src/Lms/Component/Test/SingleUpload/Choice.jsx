import {
  Box,
  Button,
  createTheme,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import { AddRounded, DeleteRounded } from "@material-ui/icons";
import React from "react";
import CheckedIcon from "../../../Assets/icons/Checked.svg";
import UnCheckedIcon from "../../../Assets/icons/UnChecked.svg";
import { C1, Checkbox, FormControlLabel, T1 } from "../../../Assets/StyledTest";
import TextEditor from "../../../Utils/TextEditor";
import DeleteIcon from "@material-ui/icons/Delete";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const aedept = window.sessionStorage.getItem("department");

function Choice(props) {
  const {
    handleCheckBoxes,
    handleAddOption,
    handleImageUpload,
    bucketArray,
    activeTab,
    handleDeleteIconClick,
    handleTextChange,
    answerType,
    handleDeleteChoiceClick,
  } = props;
  if (answerType) {
    return (
      <div>
        {bucketArray[activeTab].choices.map((choice, index) => {
          return (
            <C1>
              {answerType !== "SUBJECTIVE" && <T1>{LETTERS[index]}</T1>}
              {/* <InputBox
                choice={choice}
                image={choice.image}
                handleImageUpload={handleImageUpload}
                index={index}
                handleDeleteIconClick={handleDeleteIconClick}
                handleTextChange={handleTextChange}
                answerType={answerType}
              /> */}
              <Box flex={1}>
                <TextEditor
                  data={choice.text}
                  onChange={(e, editorDate) =>
                    handleTextChange(
                      { target: { value: editorDate.getData() } },
                      index
                    )
                  }
                  key={index}
                />
              </Box>
              <FormControlLabel
                disabledRipple
                control={
                  <Checkbox
                    value={index}
                    checked={choice.selected}
                    onChange={(e) => handleCheckBoxes(e)}
                    disableRipple
                    icon={<img src={UnCheckedIcon} alt="" />}
                    checkedIcon={<img src={CheckedIcon} alt="" />}
                  />
                }
              />
              {aedept==="assessment_engine_admin" ? 

              <IconButton color="secondary" onClick={()=> handleDeleteChoiceClick(index)} style={{marginTop : "-9px"}}>
                <DeleteRounded />
              </IconButton>:<></>}
            </C1>
          );
        })}
        {answerType !== "SUBJECTIVE" && (
          <ThemeProvider theme={buttonTheme}>
            <Button
              variant="text"
              startIcon={<AddRounded />}
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </ThemeProvider>
        )}
      </div>
    );
  } else return null;
}

const buttonTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "16px",
        textAlign: "right",
        background: "white",
        color: "#1093FF",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "white",
        },
        marginLeft: "40px",
        marginTop: "26px",
      },
    },
  },
});

export default Choice;
