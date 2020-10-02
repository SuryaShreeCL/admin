import React, { Component } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormGroup,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getQuestions } from "../../Actions/Questions";
import { connect } from "react-redux";
import { CareerOption } from "./CareerOption";
import { isEmptyObject } from "jquery";

export class FieldOfStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: "",
      choices: [],
    };
  }
  componentDidMount() {
    this.props.getQuestions("FieldOfStudy");
  }

  handleChange = (e) => {
    this.state.choices.pop();
    let choiceId = this.state.choices.concat(e.target.value);
    this.setState({ choices: choiceId });
  };
  render() {
    let questionId = this.props.QuestionList.map((q) => {
      return q.id;
    });

    let stuData = JSON.parse(window.sessionStorage.getItem("fieldOfStudy"));
    if(stuData !=null){
      if (stuData.choices.length !== 0) {
        if(this.state.choices.length===0){this.state.choices = stuData.choices;}
      }
    }

    let FieldOfStudy = {
      questionId: questionId[0],
      choices: this.state.choices,
      studentId: window.sessionStorage.getItem("studentId"),
    };
    if (this.state.questionId != null && this.state.choices != null) {
      window.sessionStorage.setItem(
        "fieldOfStudy",
        JSON.stringify(FieldOfStudy)
      );
    }

    return (
      <div>
        {this.props.QuestionList.map((qusList) => (
          <>
            <div className="item-header">
              <label className="item-header-label">Field of Study</label>
              <label className="item-header-question">{qusList.question}</label>
            </div>
            <div className="item-body fieldOfstudy-item-body">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={this.props.QuestionList.name}
                  name={this.props.QuestionList.name}
                  onChange={this.handleChange.bind(this)}
                  value={(this.state.choices.length!=0)? this.state.choices[0] :null}
                >
                  {qusList.choices.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio color="primary" key={option.id} />}
                      label={option.text}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </>
        ))}
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  return { QuestionList: state.QuestionsReducer.QuestionList };
};

export default connect(mapStateToprops, { getQuestions })(FieldOfStudy);
