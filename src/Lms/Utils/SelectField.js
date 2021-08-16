import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export const SelectDropDown = (props) => {
  const { label, name, items, value, onhandleChange } = props;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onhandleChange} label={label}>
        {items.map((item) => (
          <MenuItem value={item.id}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
