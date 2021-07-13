import { Card, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
// import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/lab/Rating";
import Poor from "../../Asset/Images/poor.svg";
import Unhappy from "../../Asset/Images/unhappy.svg";
import Apathy from "../../Asset/Images/apathy.svg";
import Happy from "../../Asset/Images/happy.svg";
import Love from "../../Asset/Images/love.svg";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "styled-components";

const rate = [
  {
    value: 0,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          // fontWeight: "500",
          // fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
          marginLeft: 50,
        }}
      >
        Very Low
      </p>
    ),
  },
  {
    value: 25,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        Low
      </p>
    ),
  },
  {
    value: 50,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        Medium
      </p>
    ),
  },
  {
    value: 75,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        High
      </p>
    ),
  },
  {
    value: 100,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        Very High
      </p>
    ),
  },
];
const Understands = [
  {
    value: 0,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
          marginLeft: 105,
        }}
      >
        Understands Most
      </p>
    ),
  },
  {
    value: 50,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
          marginLeft: 20,
        }}
      >
        Understands All
      </p>
    ),
  },
  {
    value: 100,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        Understands Nothing
      </p>
    ),
  },
];
const marks = [
  {
    value: 0,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
          marginLeft: 68,
        }}
      >
        V. Pleasant
      </p>
    ),
  },
  {
    value: 25,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
          marginLeft: 50,
        }}
      >
        Pleasant
      </p>
    ),
  },
  {
    value: 50,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        Neutral
      </p>
    ),
  },
  {
    value: 75,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
        }}
      >
        Unpleasant
      </p>
    ),
  },
  {
    value: 100,
    label: (
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontStyle: "normal",
          fontSize: "12px",
          color: "#052A4E",
          marginLeft: 40,
        }}
      >
        V. Unpleasant
      </p>
    ),
  },
];
const customIcons = {
  1: {
    icon: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={Poor} style={{ height: "50px", width: "50px",filter:"grayscale(100%)" }} />{" "}
        <p
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            color: "#686868",
          }}
        >
          Poor
        </p>
      </div>
    ),
    label: "poor",
  },
  2: {
    icon: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={Unhappy} style={{ height: "50px", width: "50px",filter:"grayscale(100%)" }} />
        <p
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            color: "#686868",
          }}
        >
          Unhappy
        </p>
      </div>
    ),
    label: "unhappy",
  },
  3: {
    icon: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={Apathy} style={{ height: "50px", width: "50px",filter:"grayscale(100%)" }} />
        <p
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            color: "#686868",
          }}
        >
          Apathy
        </p>
      </div>
    ),
    label: "apathy",
  },
  4: {
    icon: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={Happy} style={{ height: "50px", width: "50px",filter:"grayscale(100%)" }} />
        <p
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            color: "#686868",
          }}
        >
          Happy
        </p>
      </div>
    ),
    label: "happy",
  },
  5: {
    icon: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={Love} style={{ height: "50px", width: "50px",filter:"grayscale(100%)" }} />
        <p
          style={{
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            color: "#686868",
          }}
        >
          Love
        </p>
      </div>
    ),
    label: "Love",
  },
};
const theme = createMuiTheme({
  overrides: {
    MuiRating: {
      iconHover : {
       color : "grayscale(0%)"
      }  
    }
  },
});
export class rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: -1,
    };
  }

  valuetext(value) {
    return `${value}`;
  }

  valueLabelFormatRate(value) {
    return rate.findIndex((rate) => rate.value === value) + 1;
  }

  valueLabelFormatUnderstand(value) {
    return (
      Understands.findIndex((Understands) => Understands.value === value) + 1
    );
  }

  valueLabelFormatMark(value) {
    return marks.findIndex((marks) => marks.value === value) + 1;
  }
  IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  render() {
    const { root, HeadStyle, textStyle, secondaryHeadStyle } = style;
    return (
      <div style={{padding:15}}>
        {/* <Card style={{padding:25}}> */}
        <Grid container style={{ marginLeft: 0 }}>
          <Grid item md={12}>
            <p style={HeadStyle}>Call and Client Rating</p>
          </Grid>
          <Grid item md={12}>
            <div style={root}>
              <Typography style={textStyle}>
                Expectations of The Client
              </Typography>
              <PrettoSlider
                aria-label="pretto slider"
                marks={rate}
                defaultValue={100}
                step={null}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <div style={root}>
              <Typography style={textStyle}>
                Understanding of the Client
              </Typography>
              <PrettoSlider
                aria-label="pretto slider"
                marks={Understands}
                defaultValue={100}
                step={null}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <div style={root}>
              <Typography style={textStyle}>
                Rate interaction with client
              </Typography>
              <PrettoSlider
                aria-label="pretto slider"
                marks={marks}
                defaultValue={100}
                step={null}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <p style={secondaryHeadStyle}>Rate the customer’s interest level</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "465px",
                justifyContent: "space-evenly",
                marginLeft: -30,
              }}
            >
              {/* <ThemeProvider theme={theme}> */}
              <Rating
                style={{
                  display: "flex",
                  width: "600px",
                  justifyContent: "space-evenly",
                }}
                name="customized-icons"
                defaultValue={2}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={this.IconContainer}
                onChangeActive={(event, newHover) => {
                  this.setState({ hover: newHover });
                }}
              />
              {/* </ThemeProvider> */}
            </div>
          </Grid>
        </Grid>
        {/* </Card> */}
      </div>
    );
  }
}
const style = {
  root: {
    width: 300,
  },
  HeadStyle: {
    fontStyle: "Montserrat",
    // fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#407BFF",
  },
  secondaryHeadStyle: {
    fontStyle: "Montserrat",
    // fontWeight: "500",
    fontStyle: "normal",
    fontSize: "20px",
    color: "#052A4E",
  },
  textStyle: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: "12px",
    color: "#052A4E",
  },
};

const PrettoSlider = withStyles({
  root: {
    color: "#1093FF",
    height: 10,
    width: "314px",
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: "#1093FF",
    border: "3px solid #fff",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 2,
  },
  rail: {
    height: 8,
    borderRadius: 2,
  },
  rail: {
    height: 4,
  },
  track: {
    height:4
  }
})(Slider);

export default rating;
