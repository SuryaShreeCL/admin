import React from 'react';
// import { TextField } from '@material-ui/core';
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import ImageIcon from '../../../Assets/icons/Image.svg';

function InputBox(props) {
  const { boxType, inputValue, handleInputChange } = props;
  if (boxType === 'text')
    return (
      <OutlinedInput
        fullWidth
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              disableRipple
              aria-label='toggle password visibility'
              //   onClick={handleClickShowPassword}
              //   onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              <img src={ImageIcon} alt='Image icon' />
            </IconButton>
          </InputAdornment>
        }
      />
    );
  else if (boxType === 'image') return <div></div>;
  else return null;
}

export default InputBox;
