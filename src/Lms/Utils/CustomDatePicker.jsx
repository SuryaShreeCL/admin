import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React from "react";

const CustomDatePicker = ({ id, label, format, value, onChange, ...props }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin={"normal"}
        id={id || "date-picker-dialog"}
        label={label || "Date picker"}
        format={format || "dd/MM/yyyy"}
        clearable
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};
export default CustomDatePicker;
