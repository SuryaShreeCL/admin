import React from 'react';
import {
  createTheme,
  FormControl,
  InputLabel,
  Select,
  ThemeProvider,
  MenuItem,
  withStyles,
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const DropDownIcon = withStyles({
  root: {
    fill: '#323232',
  },
})(ArrowDropDownIcon);
// export const ButtonIcon = withStyles({
//   root: {
//     padding: '8px',
//     borderRadius: '4px',
//     // background: '#aqua',
//   },
// })(IconButton);

const selectTheme = createTheme({
  overrides: {
    MuiFormControl: {
      root: {
        display: 'flex',
        flexGrow: 1,
        height: '48px',
        // minWidth: '350px',
      },
    },
    MuiInputBase: {
      root: {
        height: '48px',
      },
    },
    MuiSelect: {
      select: {
        // display: 'flex',
        // width: '350px',
        // height: '48px',
        // minWidth: '350px',
        // maxWidth: '350px',
        '&:focus': {
          backgroundColor: 'rgba(5, 42, 78, 0.05)',
        },
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#052A4E',
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      formControl: {
        transform: 'translate(8px, 18px) scale(1)',
      },
    },
    MuiListItem: {
      root: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#052A4E',
      },
    },

    // MuiListItem:{
    //   button:{
    //     '&:hover':{
    //       backgroundColor:'rgba(16, 147, 255, 0.4)'
    //       // rgba(, 1)

    //     }
    //   },
    //   // root:{
    //   //   selected:{
    //   //     backgroundColor:'blue',
    //   //     // backgroundColor:'rgba(16, 147, 255, 0.8)'
    //   //   },
    //   // },
    //   root:{
    //     backgroundColor:'blue',

    //     // '& .Mui-selected':{
    //     //   backgroundColor:'rgba(5, 42, 78, 0.8)'
    //     //   // '&:hover':{

    //     //   // }
    //     // }
    //   }
    // }
    // MuiInputLabel: {
    //   FormControl: {
    //     // top: '-6px',
    //     // left: '12px',
    //   },
    // },
    // MuiFormLabel: {
    //   root: {
    //     bottom: '6px !important',
    //   },
    // },
  },
});
export default function DropDown(props) {
  // label and items array as props
  const { label, items, value } = props;
  if (props.value !== null || undefined)
    return (
      <React.Fragment>
        <ThemeProvider theme={selectTheme}>
          <FormControl>
            <InputLabel id={label}>{label}</InputLabel>

            <Select
              fullWidth
              variant='outlined'
              labelId={label}
              label={label}
              value={value}
              key={value}
              IconComponent={DropDownIcon}
              {...props}
            >
              {props.items !== undefined &&
                props.items.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </React.Fragment>
    );
  else return null;
}
