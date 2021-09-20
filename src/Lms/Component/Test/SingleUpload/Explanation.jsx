import React from 'react';
import { C2, T4, useStyle, textFieldTheme } from '../../../Assets/StyledTest';
import { TextField, ThemeProvider } from '@material-ui/core';

function Explanation(props) {
  const classes = useStyle();
  const { text, url, handleExpTextChange, handleUrlChange } = props;
  return (
    <C2>
      <T4>Explanatory Answer</T4>
      <ThemeProvider theme={textFieldTheme}>
        <TextField
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
        />
        <TextField
          style={{ marginTop: '24px' }}
          variant='outlined'
          InputLabelProps={{
            shrink: true,
          }}
          label='Video Explanatory Answer'
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
