import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestions } from "../../Actions/Questions";
import $ from "jquery";

export class CareerInterest1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: "",
      choices: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getQuestions("CareerInterestDomain");

    $(".career-interest-options").on("change", function(evt) {
      if ($(this).siblings(":checked").length >= 3) {
        this.checked = false;
      }
    });
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

    let stuData = JSON.parse(window.sessionStorage.getItem("CareerInterestDomain"));
    if(stuData !=null){
      if (stuData.choices.length !== 0) {
        if(this.state.choices.length===0){this.state.choices = stuData.choices;}
      }
    }
console.log(this.state.choices)

    let CareerInterestDomain = {
      questionId: questionId[0],
      choices: this.state.choices,
      studentId: window.sessionStorage.getItem("studentId"),
    };
    if (this.state.questionId != null && this.state.choices != null) {
      window.sessionStorage.setItem(
        "CareerInterestDomain",
        JSON.stringify(CareerInterestDomain)
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
                    Career Interest Domain
                  </label>
                  <label className="item-header-question">{qus.question}</label>
                </div>
                <div className="item-body">
                  {qus.choices.map((option,i) => (
                    <>
                      <input
                        type="checkbox"
                        name="career-ineterest-one"
                        value={option.id}
                        id={option.id}
                        className="career-interest-options"
                        onClick={(e) => this.handleClick(e, option)}                        
                        checked={(this.state.choices[i]===option.id)?true : null}                                        
                      />
                      <label
                        for={option.id}
                        className="career-interest-option-label"
                      >
                        {option.text}
                      </label>
                    </>
                  ))}
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
  return { QuestionList: state.QuestionsReducer.QuestionList };
};

export default connect(mapStateToprops, { getQuestions })(CareerInterest1);
