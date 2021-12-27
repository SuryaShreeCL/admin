import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export const SelectDropDown = props => {
  const { label, name, items, value, handleChange, disabled } = props;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel
        htmlFor={name}
        shrink={value ? true : false}
        style={{ background: "#FFFFFF", padding: "0px 8px" }}
      >
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value}
        onChange={handleChange}
        label={label}
        disabled={disabled}
      >
        {items !== undefined &&
          items.map(item => {
            return <MenuItem value={item.id}>{item.title}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
};
