import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";
import { getQuestions } from "../../Actions/Questions";

export class CareerInterest3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: "",
      choices: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getQuestions("CareerInterestCategory");
  }

  handleClick = (e, option) => {
    if (this.state.choices.indexOf(option.id) === -1) {
      let choiceId = this.state.choices.concat(option.id);
      this.setState({ choices: choiceId });
    } else {
      let removeArr = this.state.choices.filter((el) => el !== option.id);
      this.setState({ choices: removeArr });
    }
  };

  render() {
    let questionId = this.props.QuestionList.map((q) => {
      return q.id;
    });
    let CareerInterestCategory1 = {
      questionId: questionId[0],
      choices: this.state.choices,
      studentId: window.sessionStorage.getItem("studentId"),
    };
    if (this.state.questionId != null && this.state.choices != null) {
      window.sessionStorage.setItem(
        "CareerInterestCategory1",
        JSON.stringify(CareerInterestCategory1)
      );
    }

    var questionList = this.props.QuestionList;
    return (
      <div>
        {questionList != "" &&
        questionList != null &&
        questionList != undefined ? (
          <>
            {questionList.map((qus) => (
              <>
                <div className="item-header">
                  <label className="item-header-label">
                    Career Interest Category
                  </label>
                  <label className="item-header-question">{qus.question}</label>
                </div>
                <div className="item-body">
                  <FormControl component="fieldset">
                    <FormGroup>
                      {qus.choices.slice(4, 8).map((option) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              value={option.id}
                              onClick={(e) => this.handleClick(e, option)}
                            />
                          }
                          label={option.text}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </div>
              </>
            ))}
          </>
        ) : null}
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  //console.log(state.QuestionsReducer.QuestionList);
  return { QuestionList: state.QuestionsReducer.QuestionList };
};

export default connect(mapStateToprops, { getQuestions })(CareerInterest3);
