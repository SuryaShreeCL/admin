import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { SelectDropDown } from "../../../Utils/SelectField";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { AddButton } from "../../../Utils/Buttons";
import { InputTextField } from "../../../Utils/TextField";
import { InputCard } from "../../../Assets/StyledComponents";

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
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingBottom: "30px" }}>
          <Grid item xs={12} md={4}>
            <SelectDropDown
              label="Subject"
              name="subjectValue"
              items={subjects}
              value={subjectId}
              onhandleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectDropDown
              label="Concept"
              name="conceptValue"
              items={concepts}
              value={conceptId}
              onhandleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="topicValue"
              value={topic}
              onChange={handleChange}
              label="Topic name"
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="imageUrl"
              onChange={handleChange}
              value={url}
              label="Image Url"
            />
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
