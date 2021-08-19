import React, { Component, Fragment } from "react";
import TinyEditor from "../../../Utils/textEditor/TinyEditor";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { SelectDropDown } from "../../../Utils/SelectField";
import { InputTextField } from "../../../Utils/TextField";
import { InputCard } from "../../../Assets/StyledComponents";

export class TaskCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      index,
      tabId,
      inputItem,
      taskProperties,
      richContent,
      richEditorChange,
    } = this.props.taskDatas;
    return (
      <Fragment key={index}>
        <div hidden={tabId !== index + 1}>
          <InputCard>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <InputTextField
                  name="name"
                  value={inputItem.name}
                  onChange={taskProperties}
                  label="Task Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <SelectDropDown
                  label="Task Type"
                  name="contentType"
                  items={[
                    { id: "TEXT", title: "TEXT" },
                    { id: "VIDEO", title: "VIDEO" },
                  ]}
                  value={inputItem.contentType}
                  onhandleChange={taskProperties}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Approximate time</InputLabel>
                  <OutlinedInput
                    type={"number"}
                    value={inputItem.duration}
                    name="duration"
                    onChange={taskProperties}
                    endAdornment={
                      <InputAdornment position="end">mins</InputAdornment>
                    }
                    labelWidth={145}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </InputCard>
          <div style={{ padding: "8px" }}>
            <TinyEditor data={richContent} onEditorChange={richEditorChange} />
          </div>
        </div>
      </Fragment>
    );
  }
}
