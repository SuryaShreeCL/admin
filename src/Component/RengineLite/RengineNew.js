import React, { Component } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import Button from "@material-ui/core/Button";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import f1 from "../../Asset/Images/f1.png";
import rengineHeader from "../../Asset/Images/rengineHeader.png";
import header2 from "../../Asset/Images/header2.png";
import header3 from "../../Asset/Images/header2back.svg";
import First from "../../Asset/Images/first.png";
import "../../Asset/RengineNew.css";
import CarousolSlide from "./CarousolSlide";
import $ from "jquery";

export default class RengineNew extends Component {
  render() {
    
    return (
      <div>
        <div className="Rengine-body">
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <img src={rengineHeader} className="r-header-img-1" />
            </Grid>
          </Grid>
          <div className="r-slider-container">
            <CarousolSlide {...this.props} />
          </div>

          <Grid container className="r-header-2">
            <Grid item xs={12} sm={8} md={8} className="r-header-2-content">
              <label className="r-header-2-label-1">Having some trouble?</label>
              <label className="r-header-2-label-2">
                Connect with our experienced mentors
              </label>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Button variant="primary" className="r-header-2-btn">
                Connect with mentors
              </Button>
            </Grid>
          </Grid>
          <Grid container className="r-header-3">
            <Grid item xs={12} sm={6} md={6}>
              <div className="r-header-3-img-container">
                <img src={header2} className="r-header-3-img" />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="r-header-3-right-container">
                <label className="r-header-3-label-1">
                  Please tell us about your experience
                </label>
                <Button
                  className="r-header-3-btn"
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.history.push("/RengineV2/feedback")}
                >
                  Share your feedback
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
