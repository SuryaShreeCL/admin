import React, { Component } from "react";
import "../../../Asset/Course.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Footer from "../Footer";

export default class CourseContent extends Component {
  render() {
    return (
      <ThemeProvider theme={rootTheme()}>
        <div>
          {/* Course Content  */}
          <Card>
            <CardContent style={cardTheme}>
              <Typography gutterBottom> Course Content </Typography>
            </CardContent>
            <Grid container spacing={3}>
              {/* secondary Title */}

              <Grid item md={6}>
                <TextField
                  id={"primaryTitle"}
                  name={"primaryTitle"}
                  label="Primary Title"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id={"totalTime"}
                  name={"totalTime"}
                  label="Total Time"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={12} style={noPadding}>
                <CardContent style={cardTheme}>
                  <Typography gutterBottom> Secondary title </Typography>
                </CardContent>
              </Grid>
              <Grid item md={4}>
                <TextField
                  id={"secondaryTitle"}
                  name={"secondaryTitle"}
                  label="Title"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  id={"videoURL"}
                  name={"videoURL"}
                  label="Video Url"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  id={"time"}
                  name={"time"}
                  label="Time"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>

          {/* advisor */}
          <Card>
            <CardContent style={cardTheme}>
              <Typography gutterBottom> Course Advisor </Typography>
            </CardContent>
            <Grid container spacing={3}>
              <Grid item md={6}>
                {/* Name */}
                <TextField
                  id={"advisorName"}
                  name={"advisorName"}
                  label="advisorName"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* Linkdin */}
                <TextField
                  id={"linkedIn"}
                  name={"linkedIn"}
                  label="LinkedIn"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* Profile */}
                <TextField
                  id={"profile"}
                  name={"profile"}
                  label="Profile"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* Designation */}
                <TextField
                  id={"designation"}
                  name={"designation"}
                  label="Time"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                {/* Description */}
                <TextField
                  id={"description"}
                  name={"description"}
                  label="Description"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Card>

          {/* related Course */}
          <Card>
          <CardContent style={cardTheme}>
              <Typography gutterBottom> Related Course </Typography>
            </CardContent>

            <Grid container spacing={3}>              
              <Grid item md={6}>
                {/* title */}
                <TextField
                  id={"relatedCourseTitle"}
                  name={"relatedCourseTitle"}
                  label="Related Course Title"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>
              <Grid item md={6}>
                {/* sub heading */}
                <TextField
                  id={"subHeading"}
                  name={"subHeading"}
                  label="Sub Heading"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>
              <Grid item md={6}>
                {/* target */}
                <TextField
                  id={"target"}
                  name={"target"}
                  label="Target"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>
              <Grid item md={6}>
                {/* learners */}
                <TextField
                  id={"learners"}
                  name={"learners"}
                  label="Learners"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>
              <Grid item md={6}>
                {/* img */}
                <TextField
                  id={"img"}
                  name={"img"}
                  label="Image"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>
              <Grid item md={6}>
                {/* type */}
                <TextField
                  id={"type"}
                  name={"type"}
                  label="Type"
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>
            </Grid>
          </Card>

          {/* reviews */}
          <Card>
            <CardContent style={cardTheme}>
              <Typography gutterBottom> Reviewer </Typography>
            </CardContent>
            <Grid container spacing={3}>
              <Grid item md={6}>
                {/* Reviewer */}
                <TextField
                  id={"reviewer"}
                  name={"reviewer"}
                  label="Reviewer"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* Review */}
                <TextField
                  id={"review"}
                  name={"review"}
                  label="Review"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Card>          

          <Card>
            <Footer
              buttonName={"save"}
              buttonText={"Save"}
              onSave={(e) => console.log(e)}
              onCancel={(e) => console.log(e)}
            />
          </Card>
        </div>
      </ThemeProvider>
    );
  }
}

// Theme

export const rootTheme = () =>
  createMuiTheme({
    overrides: {
      MuiCard: {
        root: {
          padding: 10,
          margin: 10,
          boxShadow: "none",
        },
      },
      MuiGrid: {
        item: {
          padding: "10px 0px",
        },
      },
    },
  });

//   react select theme override
const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    //   primary25: 'hotpink',
    primary: "#3f51b5",
  },
});

const cardTheme = {
  color: "black",
  padding: 4,
};

const noPadding = {
  padding: "0px 10px",
};
