import React, { Component } from 'react';
import { C2, H1 } from '../../../Assets/StyledComponents';
import DropDownRack from './DropDownRack';
import { connect } from 'react-redux';
import {
  getSubjects,
  getConcepts,
  getTopics2,
} from '../../../Redux/Action/CourseMaterial';
import Answer from './Answer';

export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSubject: '',
      activeConcept: '',
      activeTopic: '',
      activeLevel: '',
      expectedTime: '',
      checked: false,
    };
  }

  componentDidMount() {
    this.props.getSubjects(
      this.props.match.params.courseId,
      subjectResponse => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            conceptResponse => {
              if (conceptResponse.success) {
                this.props.getTopics2(
                  conceptResponse.data[0].id,
                  topicsResponse => {
                    if (topicsResponse.success) {
                      this.setState({
                        activeSubject: subjectResponse.data[0].id,
                        activeConcept: conceptResponse.data[0].id,
                        activeTopic: topicsResponse.data[0].id,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  handleSubjectChange = event => {
    this.props.getConcepts(event.target.value, conceptResponse => {
      if (conceptResponse.success) {
        this.props.getTopics2(conceptResponse.data[0].id, topicsResponse => {
          if (topicsResponse.success) {
            this.setState({
              activeSubject: event.target.value,
              activeConcept: conceptResponse.data[0].id,
              activeTopic: topicsResponse.data[0].id,
            });
          }
        });
      }
    });
  };

  handleConceptChange = e => {
    this.props.getTopics2(e.target.value, topicsResponse => {
      if (topicsResponse.success) {
        this.setState({
          activeConcept: e.target.value,
          activeTopic: topicsResponse.data[0].id,
        });
      }
    });
  };

  handleTopicChange = e => {
    this.setState({ activeTopic: e.target.value });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSwitch = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    // console.log(this.state);

    const { subjects, concepts, topics } = this.props;

    const {
      activeSubject,
      activeConcept,
      activeTopic,
      activeLevel,
      expectedTime,
      checked,
    } = this.state;

    const {
      handleSubjectChange,
      handleConceptChange,
      handleTopicChange,
      handleInputChange,
      handleSwitch,
    } = this;

    const difficulty = [
      { id: 'Easy', title: 'Easy' },
      { id: 'Medium', title: 'Medium' },
      { id: 'Hard', title: 'Hard' },
    ];

    let dropDownRackProps = {
      subjects,
      concepts,
      topics,
      activeSubject,
      activeConcept,
      activeTopic,
      handleSubjectChange,
      handleConceptChange,
      handleTopicChange,
      activeLevel,
      difficulty,
      handleInputChange,
      expectedTime,
    };

    let answerProps = {
      checked,
      handleSwitch,
    };

    // console.log(topics);

    return (
      <C2>
        <H1>Add new Question</H1>
        <DropDownRack {...dropDownRackProps} />
        <Answer {...answerProps} />
      </C2>
    );
  }
}

const mapStateToProps = state => {
  return {
    subjects: state.CourseMaterialReducer.subjects,
    concepts: state.CourseMaterialReducer.concepts,
    topics: state.CourseMaterialReducer.topics,
  };
};

export default connect(mapStateToProps, {
  getSubjects,
  getConcepts,
  getTopics2,
})(Index);
