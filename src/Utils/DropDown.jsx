import React from "react";
import {
  createTheme,
  FormControl,
  InputLabel,
  Select,
  ThemeProvider,
  MenuItem,
  withStyles,
} from "@material-ui/core";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const DropDownIcon = withStyles({
  root: {
    fill: "#323232",
  },
})(ArrowDropDownIcon);

const selectTheme = createTheme({
  overrides: {
    MuiFormControl: {
      root: {
        display: "flex",
        flexGrow: 1,
        height: "48px",
      },
    },
    MuiInputBase: {
      root: {
        height: "48px",
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "rgba(5, 42, 78, 0.05)",
        },
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#052A4E",
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: "translate(14px, -6px) scale(0.75)",
      },
      formControl: {
        transform: "translate(8px, 18px) scale(1)",
      },
    },
    MuiListItem: {
      root: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#052A4E",
      },
    },
  },
});
export default function DropDown(props) {
  const { label, items, value } = props;
  if (props.items)
    return (
      <React.Fragment>
        <ThemeProvider theme={selectTheme}>
          <FormControl>
            <InputLabel id={label}>{label}</InputLabel>

            <Select
              fullWidth
              variant="outlined"
              labelId={label}
              label={label}
              value={value}
              key={value}
              IconComponent={DropDownIcon}
              {...props}
            >
              {props.items !== undefined &&
                props.items.map(item => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </ThemeProvider>
      </React.Fragment>
    );
  else return null;
}
