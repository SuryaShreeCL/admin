import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  radio: {
    "&$checked": {
      color: "#1093FF",
    },
  },
  checked: {},
});

export const RadioButtonsGroup = (props) => {
  const {
    name,
    activeValue,
    activevalue,
    radioItemData,
    handleRadioChange,
    groupName,
    marginRightValue,
    disabled,
  } = props.radioData;
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        style={{
          marginBottom: "-4px",
          position: "relative",
          top: "-5px",
          fontSize: "12px !important",
        }}
      >
        {groupName !== undefined && groupName}
      </FormLabel>
      <RadioGroup
        style={{ flexDirection: "row" }}
        name={name}
        value={activeValue}
        onChange={handleRadioChange}
      >
        {radioItemData.map((item) => {
          return (
            <FormControlLabel
              disabled={disabled !== undefined ? disabled : false}
              style={{
                marginRight: marginRightValue !== undefined && marginRightValue,
              }}
              value={item.id}
              control={
                <Radio
                checked={activevalue}
                  color={"default"}
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label={
                <div
                  style={{
                    fontWeight: activeValue === item.id ? 600 : "normal",
                    fontSize: "16px",
                    color: activeValue === item.id ? "#052A4E" : "#646464",
                  }}
                >
                  {item.label}
                </div>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
