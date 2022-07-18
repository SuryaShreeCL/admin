import { Box, Button, Grid, TextField, ThemeProvider } from "@material-ui/core";
import { AddRounded, RemoveRounded } from "@material-ui/icons";
import React from "react";
import {
  C2,
  EditorBox,
  T4,
  textFieldTheme,
  useStyle,
} from "../../../Assets/StyledTest";
import TextEditor from "../../../Utils/TextEditor";

const DEPT_NAMES = {
  assessment_engine_admin: "assessment_engine_admin",
};

function Explanation(props) {
  const classes = useStyle();
  const {
    text,
    url,
    handleExpTextChange,
    handleUrlChange,
    handleVideoContentAdd,
    handleVideoContentDelete,
    handleVideoContentChange,
    videoContent = [],
    deptName,
    videoContentLimit,
  } = props;

  const renderExplanationVideoContent = () => {
    return (
      <>
        {videoContent.length !== 0 && (
          <ThemeProvider theme={textFieldTheme}>
            {videoContent.map((item, index) => {
              return (
                <TextField
                  style={{ marginTop: "24px" }}
                  variant={"outlined"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  key={`video-explanatory-${index + 1}`}
                  id={index}
                  label={`Video Explanatory Answer ${index + 1}`}
                  value={item.videoUrl}
                  onChange={handleVideoContentChange}
                />
              );
            })}
          </ThemeProvider>
        )}
        <Box paddingTop={"10px !important"}>
          <Grid item container justifyContent={"space-between"}>
            <Button
              startIcon={<AddRounded />}
              onClick={handleVideoContentAdd}
              color={"primary"}
              disabled={videoContent.length >= videoContentLimit}
            >
              {"Add Video"}
            </Button>

            <Button
              startIcon={<RemoveRounded />}
              color={"secondary"}
              onClick={handleVideoContentDelete}
              disabled={videoContent.length <= 1}
            >
              {"Remove Video"}
            </Button>
          </Grid>
        </Box>
      </>
    );
  };

  return (
    deptName === "assessment_engine_admin" ? <></> :
  
    <C2>
      <T4>Explanatory Answer</T4>
      <EditorBox>
        <TextEditor
          onChange={(event, editor) => handleExpTextChange(event, editor)}
          data={text}
        />
      </EditorBox>
      {deptName === DEPT_NAMES.assessment_engine_admin ? (
        <ThemeProvider theme={textFieldTheme}>
          <TextField
            style={{ marginTop: "24px" }}
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            label='Video Explanatory Answer'
            value={url}
            onChange={handleUrlChange}
          />
        </ThemeProvider>
      ) : (
        renderExplanationVideoContent()
      )}
    </C2>
  );
}

export default Explanation;
