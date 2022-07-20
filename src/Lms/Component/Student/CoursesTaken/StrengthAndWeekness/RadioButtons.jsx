import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Box } from "../../../../Assets/StyledComponents";

const useStyles = makeStyles({
  radio: {
    "&$checked": {
      color: "#1093FF",
    },
  },
  checked: {},
});

function RadioButton({ activeValue, radioItemData }) {
  const classes = useStyles();
  return (
    <FormControl>
      <RadioGroup row value={activeValue}>
        {radioItemData &&
          radioItemData.map((item) => {
            return (
              <>
                <FormControlLabel
                  value={item.id}
                  control={
                    <Radio
                      color={"default"}
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                      size="medium"
                    />
                  }
                  label={
                    <div
                      style={{
                        fontWeight: activeValue === item.id ? 600 : "normal",
                        fontSize: "20px",

                        color: activeValue === item.id ? "#052A4E" : "#646464",
                      }}
                    >
                      {item.title}
                    </div>
                  }
                />
                <Box>
                  <Typography
                    style={{
                      fontWeight: activeValue === item.id ? 600 : "normal",
                      fontSize: "20px",
                      color: activeValue === item.id ? "#052A4E" : "#646464",
                      marginRight: "100px",
                      marginTop: "5px",
                    }}
                  >
                    {item.count}
                  </Typography>
                </Box>
              </>
            );
          })}
      </RadioGroup>
    </FormControl>
  );
}
export default RadioButton;
