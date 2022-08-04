import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./Rec_lite/Asset/Cardview.css";
//import Grid from '@material-ui/core/Grid';
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import { red } from "@material-ui/core/colors";
import Image from "./Rec_lite/Asset/images/header.jpg";
import First from "./Rec_lite/Asset/images/first.png";
import Second from "./Rec_lite/Asset/images/second.png";
import Third from "./Rec_lite/Asset/images/third.png";
import Fourth from "./Rec_lite/Asset/images/fourth.png";
import Fifth from "./Rec_lite/Asset/images/fifth.png";
import Sixth from "./Rec_lite/Asset/images/six.png";

export class CardView extends Component {
  getMuitheme = () =>
    createTheme({
      overrides: {
        MuiCard: {
          root: {
            width: "255px",
            height: "406px",
          },
        },
      },
    });
  render() {
    return (
      <ThemeProvider theme={this.getMuitheme()}>
        <div className="right-header" background-color="#263C9A">
          <h2>hii</h2>
        </div>

        <img src={Image} width="100%" height="25%" />

        <div>
          <div className="cardview" align="center">
            <Grid container component="main">
              <Grid item xs={3} sm={3} md={4} elevation={6} square>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Embedded Systems"
                      height="180"
                      image={First}
                      title="Embedded Systems"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Embedded Systems
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        The Embedded Systems course content is well structured
                        and mapped with leading industry requirements and their
                        standards. This course trains you to build strong skills
                        to get placed in Bluechip Tech & Product companies.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Internet of Things & Data Science"
                      height="180"
                      image={Second}
                      title="Internet of Things & Data Science"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Internet of Things & Data Science
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Practically learn the concepts of IoT from the basics by
                        building projects like smart irrigation system and home
                        automation system.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={3} sm={3} md={4} elevation={6} square>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="VLSI Design and Verification"
                      height="180"
                      image={Third}
                      title="VLSI Design and Verification"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        VLSI Design and Verification
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        This course empowers you with the ability to design
                        efficient hardware and perform high-level HDL
                        simulations.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>

                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt=" Data Science "
                      height="180"
                      image={Fourth}
                      title=" Data Science "
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Data Science
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Data Science is all about extracting meaningful insights
                        from gigabytes of data. This online data science program
                        revolves around the concepts of Python, Machine
                        Learning, Data Cleaning and Data Analysis.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </Grid>

              <Grid item xs={3} sm={3} md={4} elevation={6} square>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Full Stack Web Development"
                      height="180"
                      image={Fifth}
                      title="Full Stack Web Development"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Full Stack Web Development
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        The focus of this program is on developing web apps. It
                        takes you from being a programmer to a developer. The
                        journey enables you to think of an idea and convert it
                        to a web application.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>

                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="UI/UX Development"
                      height="180"
                      image={Sixth}
                      title="UI/UX Development"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        UI/UX Development
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        In this program, learn to design and create prototypes
                        for Android and iOS mobile apps, web apps and smart
                        watches.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default CardView;
