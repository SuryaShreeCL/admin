import React, { Component } from "react";
import CollapseContainer from "../Utils/CollapseContainerHeader";
import CollapseContainerBody from "../Utils/CollapseContainerBody";
import { Grid } from "@material-ui/core";
import { getStudentsById } from "../../../../Actions/Student";
import { connect } from "react-redux";
export class Aspiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      rowKey: [],
    };
  }

  componentDidMount() {
    // this.props.getStudentsById(this.props.id);
  }

  renderStudent = () => {
    var Dia = [
      {
        title: "Overall Aptitude Score",
        value: "overallAptitudeScore",
      },
      {
        title: "Numerical Ability",
        value: "numericalAbility",
      },
      {
        title: "Spatial Reasoning",
        value: "spatialReasoning",
      },
      {
        title: "Abstract Reasoning",
        value: "abstractReasoning",
      },
      {
        title: "Logical Reasoning",
        value: "logicalReasoning",
      },
      {
        title: "Data Interpretation",
        value: "dataInterpretation",
      },
      {
        title: "Verbal Reasoning",
        value: "verbalReasoning",
      },
      {
        title: "Reading Comprehension",
        value: "readingComprehension",
      },
      {
        title: "Speaking",
        value: "speaking",
      },
      {
        title: "Writing",
        value: "writing",
      },
      {
        title: "Listening",
        value: "listening",
      },
      {
        title: "Achievement Drive",
        value: "achievementDrive",
      },
      {
        title: "People Skills",
        value: "peopleSkills",
      },
      {
        title: "Locus of Control",
        value: "locusofControl",
      },
      {
        title: "Creativity",
        value: "creativity",
      },
      {
        title: "Finding Problems (Preparation)",
        value: "findingProblems",
      },
      {
        title: "Gathering and Reflecting on Information (Incubation)",
        value: "incubation",
      },
      {
        title: "Problem Exploration (Insight)",
        value: "insight",
      },
      {
        title: "Generating and Evaluating Ideas (Evaluation)",
        value: "evaluation",
      },
      {
        title: "Implementation (Elaboration)",
        value: "elaboration",
      },
      {
        title: "Emotional Intelligence",
        value: "emotionalIntelligence",
      },
      {
        title: "Emotional Intelligence : Emotional Self Awareness (Out of 20)",
        value: "emotional SelfAwareness",
      },
      {
        title: "Emotional Intelligence : Empathy (Score Out of 20)",
        value: "empathy",
      },
      {
        title: "Emotional Intelligence : Positive Outlook (Score Out of 20)",
        value: "positiveOutlook",
      },
      {
        title:
          "Emotional Intelligence : Emotional Self Control (Score Out of 20)",
        value: "emotionalSelfControl",
      },
      {
        title: "Emotional Intelligence : Adaptability (Score Out of 20)",
        value: "adaptability",
      },
      {
        title: "Personality Code",
        value: "personalityCode",
      },
    ];

    var aspirationObj = [
      {
        title: "Nos of Schools",
        value: "noOfSchools",
      },
      {
        title: "Term",
        value: "term",
      },
      {
        title: "Year",
        value: "year",
      },
      {
        title: "Degree",
        value: "degree",
      },
      {
        title: "Field of Study",
        value: "fieldOfStudy",
      },
      {
        title: "Where do you want to apply",
        value: "doYouWantApply",
      },
      {
        title: "List of Dream Colleges",
        value: "dreamCollege",
      },
      {
        title: "Area of Specialization",
        value: "areaOfSpecialization",
      },
    ];

    return aspirationObj.map((row) => {
      return (
        <CollapseContainerBody
          keyName={row.title}
          value={row.value}
          keyRow={"3"}
          valueRow={"3"}
        />
      );
    });
  };
  render() {
    return (
      <div>
        <CollapseContainer
          title={"Aspiration"}
          onClick={(e) => this.setState({ show: !this.state.show })}
          show={this.state.show}
        >
          <Grid container spacing={3} style={_TableTitle}>
            {this.props.StudentDetails.length !== 0
              ? this.renderStudent()
              : null}
          </Grid>
        </CollapseContainer>
      </div>
    );
  }
}
const _TableTitle = {
  padding: 12,
  label: {
    margin: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    StudentDetails: state.StudentReducer.StudentList,
  };
};

export default connect(mapStateToProps, { getStudentsById })(Aspiration);
