import React from 'react';
// import { TextField } from '@material-ui/core';
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import ImageIcon from '../../../Assets/icons/Image.svg';

function InputBox(props) {
  const { boxType, inputValue, handleInputChange, handleImageUpload } = props;
  // console.log(handleImageUpload);
  if (boxType === 'text')
    return (
      <OutlinedInput
        style={{ height: '48px  ' }}
        fullWidth
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              //   onClick={handleClickShowPassword}
              //   onMouseDown={handleMouseDownPassword}
              edge='end'
              component='label'
            >
              <img src={ImageIcon} alt='Image icon' />
              <input
                // accept='image/*'
                hidden
                // style={{ display: 'none' }}
                // id='contained-button-file'
                type='file'
                onChange={e => handleImageUpload(e)}
                // disabled={
                //   this.props.monthResponse &&
                //   this.props.monthResponse.data.filter(
                //     item => !item.studyPlanCreated
                //   ).length === 0
                // }
              />
            </IconButton>
          </InputAdornment>
        }
      />
    );
  else if (boxType === 'image') return <div></div>;
  else return null;
}

export default InputBox;
