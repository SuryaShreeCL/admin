import { TextField, ThemeProvider } from "@material-ui/core";
import React from "react";
import {
  C2,
  EditorBox,
  T4,
  textFieldTheme,
  useStyle,
} from "../../../Assets/StyledTest";
import TextEditor from "../../../Utils/TextEditor";

function Explanation(props) {
  const classes = useStyle();
  const { text, url, handleExpTextChange, handleUrlChange } = props;
  let deptName = window.sessionStorage.getItem("department");
      
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

      <ThemeProvider theme={textFieldTheme}>
        <TextField
          style={{ marginTop: "24px" }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          label="Video Explanatory Answer"
          value={url}
          onChange={handleUrlChange}
        />
      </ThemeProvider>
    </C2>
  );
}

export default Explanation;
