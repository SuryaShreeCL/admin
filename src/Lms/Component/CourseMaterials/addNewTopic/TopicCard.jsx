import React, { Component } from "react";
import { Grid, IconButton, FormControl, InputLabel } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SelectDropDown } from "../../../Utils/SelectField";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { AddButton } from "../../../Utils/Buttons";
import { InputTextField } from "../../../Utils/TextField";
import FileIcon from "../../../Assets/images/fileUpload.png";
import {
  ImageUploadButton,
  InputCard,
  ImageUploadBox,
  ImageContent,
  UploadIcon,
} from "../../../Assets/StyledComponents";

export class TopicCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      courses,
      courseId,
      subjects,
      subjectId,
      concepts,
      conceptId,
      topic,
      topicId,
      url,
      description,
      handleChange,
      AddTask,
      topicSaveButton,
      topicValid,
      topicNameValidate,
    } = this.props.data;
    return (
      <InputCard>
        <Grid container spacing={2} style={{ paddingBottom: "30px" }}>
          <Grid item xs={12} md={4}>
            <SelectDropDown
              label="Course"
              name="courseValue"
              items={courses}
              value={courseId}
              onhandleChange={handleChange}
              disabled={topicId}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{
            paddingBottom: !topicValid ? "30px" : "8px",
          }}
        >
          <Grid item xs={12} md={4}>
            <SelectDropDown
              label="Subject"
              name="subjectValue"
              items={subjects}
              value={subjectId}
              onhandleChange={handleChange}
              disabled={topicId}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectDropDown
              label="Concept"
              name="conceptValue"
              items={concepts}
              value={conceptId}
              onhandleChange={handleChange}
              disabled={topicId}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="topicValue"
              value={topic}
              onChange={handleChange}
              onBlur={topicNameValidate}
              label="Topic name"
              placeholder="Topic name"
              helperText={topicValid ? "Topic name already exists" : ""}
              error={topicValid}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingBottom: "30px" }}>
          <Grid item xs={12} md={8}>
            <InputTextField
              name="descriptionValue"
              onChange={handleChange}
              value={description}
              label="Description"
              placeholder="Description"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                style={{ background: "white", padding: "0px 10px 0px 5px" }}
                shrink
              >
                Topic image
              </InputLabel>
              <ImageUploadBox>
                <ImageUploadButton
                  title={url !== null ? url : "No file chosen"}
                  accept="image/*"
                  name="imageUrl"
                  id="imageUrl"
                  onChange={handleChange}
                  type="file"
                />
                <ImageContent htmlFor="imageUrl">
                  {url !== null ? url : "No file chosen"}
                </ImageContent>
                <UploadIcon src={FileIcon} />
              </ImageUploadBox>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent={"flex-end"}>
          <Grid item>
            <AddButton onClick={topicSaveButton}>Save</AddButton>
          </Grid>
          <Grid item style={{ opacity: !topicId && 0.6 }}>
            <AddButton
              startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
              onClick={AddTask}
            >
              Add New Task
            </AddButton>
          </Grid>
        </Grid>
      </InputCard>
    );
  }
}
