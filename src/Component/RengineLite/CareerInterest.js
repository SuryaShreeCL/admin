import React, { Component } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import $ from "jquery";
import b1 from "../../Asset/Images/b1.png";
import b2 from "../../Asset/Images/b2.png";
import b3 from "../../Asset/Images/b3.png";
import b4 from "../../Asset/Images/b4.png";
import a5 from "../../Asset/Images/a5.png";
import { connect } from "react-redux";
import { getQuestions } from "../../Actions/Questions";

export class CareerInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: "",
      choices: [],
      active: ",",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  careercardTheme = () =>
    createTheme({
      overrides: {
        MuiCard: {
          root: {
            width: "30vh",
            textAlign: "center",
            height: "30vh",
            marginLeft: 15,
            border: "1px solid #80808047",
            "&:hover": {
              transform: "scale(1.1)",
            },
            borderRadius: 10,
          },
        },
        MuiCardContent: {
          root: {
            fontSize: 14,
            textAlign: "left",
          },
        },
        MuiCardMedia: {
          img: {
            width: 20,
          },
        },
      },
    });

  componentDidMount() {
    this.props.getQuestions("CareerInterestRole");
    $(document).ready(function() {
      $(".career-interest-card-button").click(function() {
        var id = this.id;
        $(".career-interest-card-button").removeClass("p-card-active");
        $("#" + id).addClass("p-card-active");
      });
    });
  }
  handleClick = (e, option) => {
    this.state.choices.pop();
    let choiceId = this.state.choices.concat(option.id);
    this.setState({ choices: choiceId });
    if (this.state.active === option.id) {
      this.setState({ active: "" });
    } else {
      this.setState({ active: option.id });
    }
  };

  render() {
    let questionId = this.props.QuestionList.map((q) => {
      return q.id;
    });
    let stuData = JSON.parse(
      window.sessionStorage.getItem("careerInterestRole")
    );
    if (stuData != null) {
      if (stuData.choices.length !== 0) {
        if (this.state.choices.length === 0) {
          this.state.choices = stuData.choices;
          this.state.active = this.state.choices[0];
        }
      }
    }
    let careerInterestRole = {
      questionId: questionId[0],
      choices: this.state.choices,
      studentId: window.sessionStorage.getItem("studentId"),
    };
    if (this.state.questionId != null && this.state.choices != null) {
      window.sessionStorage.setItem(
        "careerInterestRole",
        JSON.stringify(careerInterestRole)
      );
    }

    var questionList = this.props.QuestionList;
    return (
      <ThemeProvider theme={this.careercardTheme()}>
        <div>
          {questionList != "" &&
          questionList != null &&
          questionList != undefined ? (
            <>
              {questionList.map((qus) => (
                <>
                  <div className="item-header">
                    <label className="item-header-label">Career Interest</label>
                    <label className="item-header-question">
                      {qus.question}
                    </label>
                  </div>
                  <div className="item-body">
                    <div className="career-interest-body">
                      {qus.choices.map((card) => (
                        <>
                          <Card
                            className={
                              this.state.active === card.id
                                ? "career-interest-card-button p-card-active"
                                : "career-interest-card-button"
                            }
                            id={card.id}
                            onClick={(e) => this.handleClick(e, card)}
                          >
                            <CardActionArea>
                              <div className="career-interest-img-container">
                                <img
                                  src={b1}
                                  className="career-interest-card-img"
                                />
                              </div>
                              <CardContent className="career-interest-content">
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                  className="career-interest-message"
                                >
                                  {card.text}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </>
                      ))}
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : null}
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToprops = (state) => {
  return { QuestionList: state.QuestionsReducer.QuestionList };
};

export default connect(mapStateToprops, { getQuestions })(CareerInterest);
