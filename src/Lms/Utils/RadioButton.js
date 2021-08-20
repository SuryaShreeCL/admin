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
    radioItemData,
    handleRadioChange,
  } = props.radioData;
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">{}</FormLabel> */}
      <RadioGroup
        style={{ flexDirection: "row" }}
        name={name}
        value={activeValue}
        onChange={handleRadioChange}
      >
        {radioItemData.map((item) => {
          return (
            <FormControlLabel
              value={item.id}
              control={
                <Radio
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
