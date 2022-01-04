import React, { Component, Fragment } from "react";
import TinyEditor from "../../../Utils/textEditor/TinyEditor";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button
} from "@material-ui/core";
import { SelectDropDown } from "../../../Utils/SelectField";
import { InputTextField } from "../../../Utils/TextField";
import { InputCard } from "../../../Assets/StyledComponents";
import { AddButton } from "../../../Utils/Buttons";
import { AddRounded } from "@material-ui/icons";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
const TASK_TYPES = [
  { id: "TEXT", title: "Text" },
  { id: "VIDEO", title: "Video" },
  { id: "TEXT_VIDEO", title: "Text and Video" }
];

const AVOID_INPUT = ["E", "e", "+", "-"];

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
          <>
            {props.contentVideo &&
              props.contentVideo.map((item, index) => {
                return (
                  <>
                    <Grid item>
                      <InputTextField
                        id={index}
                        value={item.title}
                        onChange={props.handleVideoTitleChange}
                        label={`Video ${index + 1} Title`}
                        placeholder="Video Id"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <InputTextField
                        id={index}
                        value={item.videoId}
                        onChange={props.handleVideoContentChange}
                        label={`Video ${index + 1}`}
                        placeholder="Video Id"
                        fullWidth
                      />
                    </Grid>
                  </>
                );
              })}

            <Grid item container justifyContent="space-between">
              <Button
                startIcon={<AddRounded />}
                onClick={this.props.handleVideoContentAdd}
                color="primary"
              >
                Add Video
              </Button>

              <Button
                startIcon={<RemoveRoundedIcon />}
                color="secondary"
                onClick={this.props.handleVideoContentDelete}
              >
                Remove Video
              </Button>
            </Grid>
          </>
        );

      case "TEXT_VIDEO":
        return (
          <>
            {props.contentVideo &&
              props.contentVideo.map((item, index) => {
                return (
                  <>
                    <Grid item>
                      <InputTextField
                        id={index}
                        value={item.title}
                        onChange={props.handleVideoTitleChange}
                        label={`Video ${index + 1} Title`}
                        placeholder="Video Id"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <InputTextField
                        id={index}
                        value={item.videoId}
                        onChange={props.handleVideoContentChange}
                        label={`Video ${index + 1}`}
                        placeholder="Video Id"
                        fullWidth
                      />
                    </Grid>
                  </>
                );
              })}

            <Grid item container justifyContent="space-between">
              <Button
                startIcon={<AddRounded />}
                onClick={this.props.handleVideoContentAdd}
                color="primary"
              >
                Add Video
              </Button>

              <Button
                startIcon={<RemoveRoundedIcon />}
                color="secondary"
                onClick={this.props.handleVideoContentDelete}
              >
                Remove Video
              </Button>
            </Grid>

            <Grid item>
              <TinyEditor
                data={props.content !== null ? props.content : ""}
                onEditorChange={props.richEditorChange}
              />
            </Grid>
          </>
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
      contentVideo
    } = this.props.taskData;

    return (
      <Fragment key={index}>
        <div hidden={tabId !== index + 1}>
          <InputCard>
            <Grid container direction="column" spacing={3}>
              <Grid item container spacing={2}>
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
                      onKeyDown={evt =>
                        AVOID_INPUT.includes(evt.key) && evt.preventDefault()
                      }
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

              {this.renderTaskBody({
                index,
                type: inputItem.contentType,
                richEditorChange,
                content: inputItem.content,
                contentVideo: inputItem.contentVideo,
                handleVideoContentAdd: this.props.handleVideoContentAdd,
                handleVideoContentDelete: this.props.handleVideoContentDelete,
                handleVideoContentChange: this.props.handleVideoContentChange,
                handleVideoTitleChange: this.props.handleVideoTitleChange
              })}
            </Grid>
          </InputCard>
        </div>
      </Fragment>
    );
  }
}
