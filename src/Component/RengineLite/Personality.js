import React, { Component } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import a1 from "../../Asset/Images/a1.png";
import a2 from "../../Asset/Images/a2.png";
import a3 from "../../Asset/Images/a3.png";
import a4 from "../../Asset/Images/a4.png";
import a5 from "../../Asset/Images/a5.png";
import $ from "jquery";
import { getQuestions } from "../../Actions/Questions";
import { connect } from "react-redux";
export class Personality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: "",
      choices: [],
      active: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  careercardTheme = () =>
    createMuiTheme({
      overrides: {
        MuiCard: {
          root: {
            width: "18vh",
            height: "22vh",
            marginLeft: 15,
            border: "1px solid #80808047",
            "&:hover": {
              transform: "scale(1.1)",
            },
          },
        },
        MuiCardContent: {
          root: {
            fontSize: 12,
            textAlign: "center",
            padding: 0,
            paddingTop: 20,
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
    this.props.getQuestions("YourPersonality");

    $(document).ready(function() {
      $(".card-button").click(function() {
        var id = this.id;
        $(".card-button").removeClass("p-card-active");
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
    let stuData = JSON.parse(window.sessionStorage.getItem("personality"));
    if(stuData !=null){
      if (stuData.choices.length !== 0) {
        if(this.state.choices.length===0){
          this.state.choices = stuData.choices;
          this.state.active=this.state.choices[0];
        }
      }
    }
    let personality = {
      questionId: questionId[0],
      choices: this.state.choices,
      studentId: window.sessionStorage.getItem("studentId"),
    };
    if (this.state.questionId != null && this.state.choices != null) {
      window.sessionStorage.setItem("personality", JSON.stringify(personality));
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
                    <label className="item-header-label">
                      Your personality
                    </label>
                    <label className="item-header-question">
                      {qus.question}
                    </label>
                  </div>
                  <div className="item-body">
                    <div className="card-body">
                      {qus.choices.map((option) => (
                        <Card
                          className={
                            this.state.active === option.id
                              ? "card-button p-card-active"
                              : "card-button"
                          }
                          id={option.id}
                          onClick={(e) => this.handleClick(e, option)}
                        >
                          <button className="card-btn">
                            <div className="item-img">
                              <img src={a1} />
                            </div>
                            <CardContent>{option.text}</CardContent>
                          </button>
                        </Card>
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
  console.log(state.QuestionsReducer.QuestionList);
  return { QuestionList: state.QuestionsReducer.QuestionList };
};

export default connect(mapStateToprops, { getQuestions })(Personality);
