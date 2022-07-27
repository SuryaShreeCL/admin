import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  radio: {
    "&$checked": {
      color: "#1093FF",
    },
  },
  checked: {},
});

function RadioGroupContainer({ value, options, name, onChange }) {
  const classes = useStyles();
  return (
    <FormControl component='fieldset'>
      <RadioGroup row value={value} name={name} onChange={onChange}>
        {options &&
          options.length !== 0 &&
          options.map(({ title, count }, index) => {
            return (
              <>
                <FormControlLabel
                  value={index}
                  control={
                    <Radio
                      color={"default"}
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label={
                    <div
                      style={{
                        fontWeight: value === index ? 600 : "normal",
                        fontSize: "16px",
                        color: value === index ? "#052A4E" : "#646464",
                      }}
                    >
                      {title}
                    </div>
                  }
                />
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#052A4E",
                    padding: "8px 0px",
                    marginRight: "70px",
                  }}
                >
                  {count || 0}
                </Typography>
              </>
            );
          })}
      </RadioGroup>
    </FormControl>
  );
}
export default RadioGroupContainer;
