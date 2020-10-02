import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from '@material-ui/core/CardActions'
import { Typography } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import "../../Asset/RengineNew.css";
import { connect } from "react-redux";
import {
  getRecommendedCourses,
  getPopularCourses,
  getSimilarCourses,
} from "../../Actions/Course";

export class CarousolSlide extends Component {
  cardTitle = [
    { title: "Recommended Courses", id: "Rec" },
    { title: "Popular Courses", id: "pop" },
  ];

  componentDidMount() {
    console.log(window.sessionStorage.getItem('TestExecutionId'))
    //this.props.getRecommendedCourses();
    this.props.getPopularCourses();
    //this.props.getSimilarCourses();
  }

  cardTheme = () =>
    createMuiTheme({
      overrides: {
        MuiCard: {
          root: {
            height: "68vh",
          },
        },
      },
    });

  render() {    
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      prevArrow: (
        <IconButton
          className={this.props.className}
          onClick={this.props.onClick}
          style={{ ...this.props.style }}
        >
          <ArrowBackRoundedIcon className="nextArrow" />
        </IconButton>
      ),
      nextArrow: (
        <IconButton
          className={this.props.className}
          onClick={this.props.onClick}
          style={{ ...this.props.style }}
        >
          <ArrowForwardRoundedIcon className="prevArrow" />
        </IconButton>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div>
        <div className="r-slide-c">
          <div className="r-card-header">
            <label className="r-card-header-label">Recommended Course</label>
          </div>
          <ThemeProvider theme={this.cardTheme()}>
            <Slider {...settings}>
              {this.props.RecommendedCourseList.map((recommedded) => (
                <Grid item xs={12}>
                  <div className="r-item">
                    <Card className="rengine-card-">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={recommedded.name}
                          height="180"
                          image={recommedded.displayImageURL}
                          title={recommedded.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className="card-header-"
                          >
                            {recommedded.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className="card-paragaraph-"
                          >
                            'description'
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Slider>
          </ThemeProvider>
        </div>

        <div className="r-slide-c">
          <div className="r-card-header">
            <label className="r-card-header-label">Popular Course</label>
          </div>
          <ThemeProvider theme={this.cardTheme()}>
            <Slider {...settings}>
            
              {this.props.PopularCourseList.map((popular) => (
              <Grid item>
                 <Card>               
               <CardMedia
                 className=''
                 image={popular.displayImageURL}
                 title="Paella dish"
                 height= '40vh'
               />
               <CardContent>
                 <Typography variant="body2" color="textSecondary" component="p">
                   This impressive paella is a perfect party dish and a fun meal to cook together with your
                   guests. Add 1 cup of frozen peas along with the mussels, if you like.
                 </Typography>
               </CardContent>
               <CardActions disableSpacing>
                 <IconButton aria-label="add to favorites">
                   
                 </IconButton>
                 <IconButton aria-label="share">
                   
                 </IconButton>        
               </CardActions>      
             </Card>
              </Grid>
              ))}
              
            </Slider>
          </ThemeProvider>
        </div>

        <div className="r-slide-c">
          <div className="r-card-header">
            <label className="r-card-header-label">Similar Course</label>
          </div>
          <ThemeProvider theme={this.cardTheme()}>
            <Slider {...settings}>
              {this.props.SimilarCourseList.map((similar) => (
                <Grid item xs={12}>
                  <div className="r-item">
                    <Card className="rengine-card-">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={similar.name}
                          height="180"
                          image={similar.displayImageURL}
                          title={similar.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className="card-header-"
                          >
                            {similar.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className="card-paragaraph-"
                          >
                            'description'
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Slider>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    RecommendedCourseList: state.CourseReducer.RecommendedCourseList,
    PopularCourseList: state.CourseReducer.PopularCourseList,
    SimilarCourseList: state.CourseReducer.SimilarCourseList,
  };
};

export default connect(mapStateToprops, {
  getRecommendedCourses,
  getPopularCourses,
  getSimilarCourses,
})(CarousolSlide);


