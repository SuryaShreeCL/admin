import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Footer from "../Footer";

export default class CourseInformation extends Component {
    constructor(props){
        super(props)       
    }    
  render() {      
    console.log(this.state)
    return (
      <ThemeProvider theme={rootTheme()}>
        <div>
          {/* Name,ShortName,desc,overview  */}
          <Card>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <TextField
                  id={"name"}
                  name={"name"}
                  label="Name"
                  size="small"
                  variant="outlined"                  
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id={"shortName"}
                  name={"ShortName"}
                  label="Short Name"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  id={"description"}
                  name={"description"}                  
                  label="Description"
                  size="small"
                  variant="outlined"
                  multiline
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  id={"overview"}
                  name={"overview"}
                  fullWidth
                  label="Overview"
                  size="small"
                  variant="outlined"
                  multiline
                />
              </Grid>
            </Grid>
          </Card>

          {/* Image Urls */}
          <Card>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <TextField
                  id={"lmsURL"}
                  name={"lmsURL"}
                  label={"Lms Url"}
                  size="small"
                  variant="outlined"
                  fullWidth                  
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id={"thumbnailImageURL"}
                  name={"thumbnailImageURL"}
                  label={"ThumbnailImage Url"}                  
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id={"displayImageURL"}
                  name={"displayImageURL"}
                  label={"Display Image Url"}                  
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>

          {/* Course Provider */}
          <Card>
            <CardContent style={cardTheme}>
                <Typography  gutterBottom> Course Provider</Typography>
            </CardContent>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <TextField
                  id={"partner"}
                  name={"partner"}
                  label={"Partner"}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id={"logo"}
                  name={"logo"}
                  label={"Logo"}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>

          {/* Course Stats */}
          <Card>
          <CardContent style={cardTheme}>
                <Typography  gutterBottom> Course Stats </Typography>
            </CardContent>
            <Grid container spacing={3} >
              <Grid item md={4}>
                <TextField
                  id={"noOfStudent"}
                  name={"noOfStudent"}
                  label={"Number Of student"}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  id={"noOfPlaced"}
                  name={"noOfPlaced"}
                  label={"Number of Placed"}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  id={"avgSalary"}
                  name={"avgSalary"}
                  label={"Average Salary"}
                  size="small"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Card>
          <Card>
          <Footer 
          buttonName={'Add'}
          buttonText={'Add'}
          onSave={(e)=>console.log(e)}
          onCancel={(e)=>console.log(e)}          
          />
          </Card>
        </div>
      </ThemeProvider>
    );
  }
}

// Course Theme
const cardTheme={
    color:'black',
    padding:4,
}
const rootTheme = () =>
  createMuiTheme({
    overrides: {
      MuiCard: {
        root: {
          padding: 10,
          margin: 10,
          boxShadow:'none',
        },        
      },
      MuiTypography:{
          root:{
              color:'unset',
          }
      }
    },
  });
