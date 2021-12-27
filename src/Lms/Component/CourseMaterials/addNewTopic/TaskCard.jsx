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
const TASK_TYPES = [
  { id: "TEXT", title: "Text" },
  { id: "VIDEO", title: "Video" },
  { id: "TEXT_VIDEO", title: "Text and Video" },
];

export class TaskCard extends Component {
  constructor(props) {
    super(props);
  }

  renderTaskBody = props => {
    switch (props.type) {
      case "TEXT":
        return (
          <TinyEditor
            data={props.content !== null ? props.content : ""}
            onEditorChange={props.richEditorChange}
          />
        );
        break;

      case "VIDEO":
        return (
          <InputTextField
            name="name"
            // value={inputItem.name}
            // onChange={taskProperties}
            label="Task Name"
            placeholder="Task Name"
            fullWidth
          />
        );

      default:
        return null;
    }
  };
  render() {
    const {
      index,
      tabId,
      inputItem,
      taskProperties,
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
                  placeholder="Task Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <SelectDropDown
                  label="Task Type"
                  name="contentType"
                  items={TASK_TYPES}
                  value={inputItem.contentType}
                  handleChange={taskProperties}
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
                    placeholder="Approximate time"
                    endAdornment={
                      <InputAdornment position="end">mins</InputAdornment>
                    }
                    labelWidth={145}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </InputCard>

          <div className="task-body">
            {this.renderTaskBody({
              type: inputItem.contentType,
              richEditorChange,
              content: inputItem.content,
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}
