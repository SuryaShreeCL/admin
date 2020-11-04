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

export default class OtherCourseDetail extends Component {
  render() {
    return (
      <ThemeProvider theme={rootTheme}>
        <div>
          {/* Faq */}
          <Card>
            <CardContent style={cardTheme}>
              <Typography gutterBottom> FAQ </Typography>
            </CardContent>
            <Grid container spacing={3}>
              <Grid item md={6}>
                {/* id */}
                <TextField
                  id={"id"}
                  name={"id"}
                  label="Id"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                {/* question */}
                <TextField
                  id={"question"}
                  name={"question"}
                  label="Queston"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                {/* answer */}
                <TextField
                  id={"answer"}
                  name={"answer"}
                  label="Answer"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Card>

          {/* whyCareerLab */}
          <Card>
            <CardContent style={cardTheme}>
              <Typography gutterBottom> Why CareerLab</Typography>
            </CardContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                {/* title */}
                <TextField
                  id={"wTtile"}
                  name={"wTitle"}
                  label="Title"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                {/* description */}
                <TextField
                  id={"wDescription"}
                  name={"wDescription"}
                  label="Description"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Card>
          {/* testimonial */}
          <Card>
            <CardContent style={cardTheme}>
              <Typography gutterBottom> Testimonials</Typography>
            </CardContent>
            <Grid container spacing={3}>
              <Grid item md={12}>
                {/* url */}
                <TextField
                  id={"tUrl"}
                  name={"tUrl"}
                  label="Url"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item md={12}>
                {/* Description */}
                <TextField
                  id={"tDescription"}
                  name={"tDescription"}
                  label="Description"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          </Card>

          {/* Currikulam */}
          <Card>
          <CardContent style={cardTheme}>
              <Typography gutterBottom> Curriculam</Typography>
            </CardContent>
              <Grid container spacing={3}>
                  <Grid item md={6}>
                  <TextField
                  id={"eligibilty"}
                  name={"eligibilty"}
                  label="Eligibilty"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
                  </Grid>

                  <Grid item md={6}>
                  <CreatableSelect
                  id={"point"}
                  name={"point"}
                  classNamePrefix={'course__select'}
                  placeholder="Point"
                  options={[{label:'sample',value:'sample'}]}
                  isClearable={true}
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  theme={selectTheme}
                  isMulti
                />
                  </Grid>

                  <Grid item md={12}>
                  <TextField
                  id={"currikulam"}
                  name={"currikulam"}
                  label="Currikulam"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />
                  </Grid>
              </Grid>
          </Card>
          {/* ProjectOutCome */}
          <Card>
          <CardContent style={cardTheme}>
              <Typography gutterBottom> Project Out Come</Typography>
            </CardContent>
              <Grid container>
                  <Grid item md={6}>
                  <TextField
                  id={"projectOutCome"}
                  name={"projectOutCome"}
                  label="Project OutCome"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                />                
                  </Grid>

                  <Grid item md={6}>
                  <TextField
                  id={"gifLink"}
                  name={"gifLink"}
                  label="GIF Link"
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
