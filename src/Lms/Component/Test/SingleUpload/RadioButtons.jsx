import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import { Label, Radio, T2 } from "../../../Assets/StyledTest";

function RadioButtons(props) {
  let { checked, handleRadioChange, answerType, editData } = props;
  var aesubject = window.sessionStorage.getItem('department');

  // console.log(editData);
  return (
    <FormControl
      className="radio_group_style"
      component="fieldset"
      // style={{ background: 'purple' }}
    >
      <RadioGroup
        row
        aria-label="choice"
        name="row-radio-buttons-group"
        onChange={handleRadioChange}
        value={answerType}
      >
        <FormControlLabel
          value="SINGLE_SELECT"
          control={<Radio color="primary" />}
          label={
            <Label active={answerType === "SINGLE_SELECT"}>Single Choice</Label>
          }
          disabled={editData}
        />
        {!checked && (
          <>
            <FormControlLabel
              value="MULTI_CHOICE"
              control={<Radio color="primary" />}
              label={
                <Label active={answerType === "MULTI_CHOICE"}>
                  Multi Choice
                </Label>
              }
              disabled={editData}
            />
            {
          aesubject !== "assessment_engine_admin" ?<> 
            <FormControlLabel
              value="SUBJECTIVE"
              control={<Radio color="primary" />}
              label={
                <Label active={answerType === "SUBJECTIVE"}>Subjective</Label>
              }
              disabled={editData}
            /></>:<></>
}  {
aesubject == "assessment_engine_admin" ?<> 
            <FormControlLabel
              value="VIDEO"
              control={<Radio color="primary" />}
              label={
                <Label active={answerType === "VIDEO"}>Video Recording</Label>
              }
              disabled={editData}
            /><FormControlLabel
            value="FILE_UPLOAD"
            control={<Radio color="primary" />}
            label={
              <Label active={answerType === "FILE_UPLOAD"}> File Upload</Label>
            }
            disabled={editData}
          />
            </>:<></>
}
          </>
        )}
      </RadioGroup>
      {answerType!="VIDEO" && <T2>Correct Answer</T2>}
    </FormControl>
  );
}

export default RadioButtons;
