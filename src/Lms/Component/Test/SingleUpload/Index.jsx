import React, { Component } from 'react';
import { C2, H1 } from '../../../Assets/StyledComponents';
import DropDownRack from '../DropDownRack';
import { connect } from 'react-redux';
import {
  getSubjects,
  getConcepts,
  getCourses,
} from '../../../Redux/Action/CourseMaterial';

export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSubject: '',
    };
  }

  componentDidMount() {
    // this.props.getSubjects(
    //   this.props.match.params.courseId,
    //   subjectResponse => {
    //     if (subjectResponse.success) {
    //       this.props.getConcepts();
    //     }
    //     console.log(subjectResponse);
    //   }
    // );

    this.props.getSubjects(
      this.props.match.params.courseId,
      subjectResponse => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            conceptResponse => {
              if (conceptResponse.success) {
                this.props
                  .getTopics
                  // conceptResponse.data[0].id,
                  // INITIAL_PAGE_NO,
                  // INITIAL_SEARCH_TEXT,
                  // topicResponse => {}
                  ();
                // this.setState({
                //   courseId: response.data[0].id,
                //   subjectId: subjectResponse.data[0].id,
                //   conceptId: conceptResponse.data[0].id,
                //   role: role,
                // });
              }
            }
          );
        }
      }
    );
  }

  render() {
    console.log();
    return (
      <C2>
        <H1>Add new Question</H1>
        {/* <DropDownRack /> */}
      </C2>
    );
  }
}

const mapStateToProps = state => {
  return {
    // questionTypes: state.TestReducer.questionType,
    // template: state.TestReducer.template,
  };
};

export default connect(mapStateToProps, {
  getSubjects,
})(Index);

// export default Index;
