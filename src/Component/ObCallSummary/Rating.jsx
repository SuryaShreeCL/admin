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
// import {updateRating } from '../../Actions/Calldetails';
import { connect } from "react-redux";
import { updateRating , getClientInfo} from '../../Actions/Calldetails';
import PrimaryButton from "../../Utils/PrimaryButton";



const StyledRating = withStyles({
  iconFilled: {
    color: 'red',
  },
  iconHover: {
    color: 'black',
  },
})(Rating);

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

    )
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
          marginLeft: 20,
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
          marginLeft: 20,
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
          margin: 10
        }}
      >
        <img src={Poor} style={{ height: "50px", width: "50px" }} />{" "}
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
          margin: 10
        }}
      >
        <img src={Unhappy} style={{ height: "50px", width: "50px" }} />
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
          margin: 10
        }}
      >
        <img src={Apathy} style={{ height: "50px", width: "50px", }} />
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
          margin: 10
        }}
      >
        <img src={Happy} style={{ height: "50px", width: "50px", }} />
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
          margin: 10
        }}
      >
        <img src={Love} style={{ height: "50px", width: "50px", }} />
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
      iconHover: {
        color: "grayscale(0%)"
      }
    }
  },
});

export class rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: -1,
      ratingOfExpectation: '',
      expRate: '',
      ratingOfUnderstanding: '',
      underRate: '',
      ratingOfInteraction: '',
      interaction: '',
      rating:'',

    };
  }
   componentDidMount() {
    this.props.getClientInfo(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
   }
   componentDidUpdate(prevProps, prevState){
     if(this.props.getClientInfoList !== prevProps.getClientInfoList){
       this.setState({
        underRate: this.props.getClientInfoList.rateOfUnderstand === "Understands Most" ? 0 : this.props.getClientInfoList.rateOfUnderstand === "Understands All" ? 50 : this.props.getClientInfoList.rateOfUnderstand === "Understands Nothing" ? 100 : null,
        interaction: this.props.getClientInfoList.rateOfInteraction === "V Pleasant" ? 0 : this.props.getClientInfoList.rateOfInteraction === "Pleasant" ? 25 : this.props.getClientInfoList.rateOfInteraction === 'Neutral' ? 50 : this.props.getClientInfoList.rateOfInteraction === 'UnPleasant' ? 75 : this.props.getClientInfoList.rateOfInteraction === 'V UnPleasant' ? 100 : null,
        expRate:this.props.getClientInfoList.rateOfExpectations === "Very Low" ? 0 : this.props.getClientInfoList.rateOfExpectations === "Low" ? 25 : this.props.getClientInfoList.rateOfExpectations === 'Medium' ? 50 : this.props.getClientInfoList.rateOfExpectations === 'High' ? 75 : this.props.getClientInfoList.rateOfExpectations === 'Very High' ? 100 : null

       })
     }
   }
  handleSaved = () => {
    // console.log(this.state,'state')
    let obj = {
      ratingOfExpectation: this.state.ratingOfExpectation,
      ratingOfUnderstanding: this.state.ratingOfUnderstanding,
      ratingOfInteraction: this.state.ratingOfInteraction,
      rating: this.state.rating

    }
    console.log(obj, 'sa')
    this.props.updateRating(this.props.match.params.studentId, this.props.match.params.productId, obj)
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
    console.log(this.state)
    const { root, HeadStyle, textStyle, secondaryHeadStyle } = style;
    return (
      <div style={{ padding: 15 }}>
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
                // defaultValue={100}
                step={null}
                value={this.state.expRate}
                // onChange={}
                onChange={(event, value) => {
                  if (value === 0) {
                    this.setState({ ratingOfExpectation: 'Very Low' })


                  } else if (value === 25) {
                    this.setState({ ratingOfExpectation: 'Low' })

                  } else if (value === 50) {
                    this.setState({ ratingOfExpectation: 'Medium' })

                  } else if (value === 75) {
                    this.setState({ ratingOfExpectation: 'High' })

                  } else if (value === 100) {
                    this.setState({ ratingOfExpectation: 'Very High' })

                  }
                  return (
                    // console.log(this.state.ratingOfExpectation)
                    this.setState({ expRate: value })
                  )

                }}
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
                value={this.state.underRate}
                // onChange={}
                onChange={(event, value) => {
                  if (value === 0) {
                    this.setState({ ratingOfUnderstanding: 'Understands Most' })


                  } else if (value === 50) {
                    this.setState({ ratingOfUnderstanding: 'Understands All' })

                  } else if (value === 100) {
                    this.setState({ ratingOfUnderstanding: 'Understands Nothing' })

                  }
                  return (
                    // console.log(this.state.ratingOfExpectation)
                    this.setState({ underRate: value })
                  )



                }}
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
                value={this.state.interaction}
                onChange={(event, value) => {
                  if (value === 0) {
                    this.setState({ ratingOfInteraction: 'V Pleasant' })


                  } else if (value === 25) {
                    this.setState({ ratingOfInteraction: 'Pleasant' })

                  } else if (value === 50) {
                    this.setState({ ratingOfInteraction: 'Neutral' })

                  } else if (value === 75) {
                    this.setState({ ratingOfInteraction: 'UnPleasant' })

                  } else if (value === 100) {
                    this.setState({ ratingOfInteraction: 'V UnPleasant' })

                  }
                  return (
                    // console.log(this.state.ratingOfExpectation)
                    this.setState({ interaction: value })
                  )

                }}
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
              <StyledRating
                style={{
                  display: "flex",
                  width: "600px",
                  // justifyContent: "space-evenly",
                }}
                name="customized-icons"
                defaultValue={0}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={this.IconContainer}
                itemStyle={{ height: 20, width: 20 }}
                itemIconStyle={{ height: 20, width: 20 }}
                onChangeActive={(event, newHover) => {
                  this.setState({ hover: newHover });
                  console.log(newHover)
                }}

              />
              {/* </ThemeProvider> */}
            </div>
          </Grid>
        </Grid>
        {/* </Card> */}
        <PrimaryButton style={{ width: "130px" }} color={"primary"} variant={"contained"} onClick={() => this.handleSaved()}>Save</PrimaryButton>
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
    border: "2px solid #fff",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    "&:after": {
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        content: "",
        position: "absolute",
        borderRadius: "50%",
        border:"2px solid #1093FF"
    }
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
  track: {
    height: 4
  }
})(Slider);

const mapStateToProps = (state) => {
  return {
    updateRatingList: state.CallReducer.updateRating,
    getClientInfoList: state.CallReducer.getClientInfo,
  };
};

export default connect(mapStateToProps, {
  updateRating,
  getClientInfo
})(rating);
