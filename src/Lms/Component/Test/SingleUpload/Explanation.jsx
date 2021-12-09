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
  return (
    <C2>
      <T4>Explanatory Answer</T4>
      <EditorBox>
        <TextEditor
          onChange={(event, editor) => handleExpTextChange(event, editor)}
          data={text}
          // onChange={(event, editor) => {
          //   const data = editor.getData();
          //   console.log({ event, editor, data });
          //   this.setState({ data });
          // }}
        />
      </EditorBox>
      {/* <TextField
          style={{ marginTop: '24px' }}
          variant='outlined'
          label='Answer in detail'
          multiline
          rows={11}
          InputLabelProps={{
            shrink: true,
          }}
          value={text}
          onChange={handleExpTextChange}
        /> */}
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
      {/* <OutlinedInput
        // variant='outlined'
        // fullWidth
        // multiline
        // shrink={true}
        InputLabelProps={{
          shrink: true,
        }}
        // id='outlined-multiline-static'
        // label='Multiline'
        // shrink
        label='Answer in detail'
      /> */}
    </C2>
  );
}

export default Explanation;
