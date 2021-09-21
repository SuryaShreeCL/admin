import React, { Component } from 'react';
import { C2, H1 } from '../../../Assets/StyledComponents';
import DropDownRack from './DropDownRack';
import { connect } from 'react-redux';
import {
  getSubjects,
  getConcepts,
  getTopics2,
  putImage,
} from '../../../Redux/Action/CourseMaterial';
import Answer from './Answer';
import Explanation from './Explanation';
import Buttons from './Buttons';
import QueryString from 'qs';
import { capitalize } from '@material-ui/core';
// import CKEditor from 'react-ckeditor-component';

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
      activeTab: 0,
      bucketArray: [],
      answerType: '',
      anchorEl: null,
      text: '',
      url: '',
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
    if (!this.state.checked) {
      this.setState({
        checked: !this.state.checked,
        answerType: 'BUNDLE',
        bucketArray: [
          {
            tabLabel: 'Bucket 1',
            choices: [{ text: '', image: null, selected: false }],
          },
          {
            tabLabel: 'Bucket 2',
            choices: [{ text: '', image: null, selected: false }],
          },
        ],
      });
    } else {
      this.setState({
        checked: !this.state.checked,
        answerType: '',
      });
    }
  };

  handleTabChange = value => {
    this.setState({ activeTab: value });
  };

  handleAddBucket = () => {
    let arr = this.state.bucketArray;
    let count = this.state.bucketArray.length + 1;
    arr.push({
      tabLabel: 'Bucket ' + count,

      choices: [{ text: '', image: null, selected: false }],
    });
    this.setState({ bucketArray: arr, activeTab: count - 1 });
  };

  handleRadioChange = e => {
    if (e.target.value === 'SUBJECTIVE') {
      // let arr = this.state.bucketArray;
      // arr[0].choices[0].selected = true;

      this.setState({
        answerType: e.target.value,
        bucketArray: [
          {
            choices: [{ text: '', image: null, selected: true }],
          },
        ],
      });
    } else
      this.setState({
        answerType: e.target.value,
        bucketArray: [
          {
            choices: [{ text: '', image: null, selected: false }],
          },
        ],
      });
  };

  handleCheckBoxes = e => {
    const { activeTab } = this.state;
    if (this.state.answerType === 'SINGLE_SELECT') {
      let arr = this.state.bucketArray;
      if (arr[activeTab].choices[e.target.value].selected) {
        arr[activeTab].choices[e.target.value].selected = false;
        this.setState({ bucketArray: arr });
      } else {
        arr[activeTab].choices.map(item => (item.selected = false));
        arr[activeTab].choices[e.target.value].selected = true;
        this.setState({ bucketArray: arr });
      }
    }
    if (this.state.answerType === 'MULTI_CHOICE') {
      let arr = this.state.bucketArray;

      arr[activeTab].choices[e.target.value].selected = !arr[activeTab].choices[
        e.target.value
      ].selected;
      this.setState({ bucketArray: arr });
    }
  };

  handleAddOption = () => {
    if (this.state.bucketArray[this.state.activeTab].choices.length < 5) {
      let arr = this.state.bucketArray;
      arr[this.state.activeTab].choices.push({
        text: '',
        image: null,
        selected: false,
      });
      this.setState({ bucketArray: arr });
    }
  };

  handleImageUpload = (e, index) => {
    // console.log(e.target.id);
    // this.setState({
    //   selectedFile: e.target.files[0],
    // });
    // console.log(
    //   this.state.bucketArray[this.state.activeTab].choices[e.target.id].image
    // );
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.props.putImage(formData, response => {
      console.log(response);
      if (response.success) {
        let arr = this.state.bucketArray;
        console.log(response);
        arr[this.state.activeTab].choices[index].image = response.data;
        this.setState({ bucketArray: arr });
      }
      // console.log(response);
    });
  };

  handleThreeDotClick = e => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = () => {
    let arr = this.state.bucketArray;
    if (arr.length > 2) {
      arr.pop();
      this.setState({
        activeTab: this.state.activeTab - 1,
        bucketArray: arr,
        anchorEl: null,
      });
    }
  };

  handleDeleteIconClick = index => {
    let arr = this.state.bucketArray;
    // console.log(this.state.bucketArray[this.state.activeTab].choices[index]);
    arr[this.state.activeTab].choices[index].image = null;
    this.setState({ bucketArray: arr });
  };

  handleTextChange = (e, index) => {
    let arr = this.state.bucketArray;
    // console.log(this.state.bucketArray[this.state.activeTab].choices[index]);
    arr[this.state.activeTab].choices[index].text = e.target.value;
    this.setState({ bucketArray: arr });
  };

  handleExpTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleUrlChange = e => {
    this.setState({
      url: e.target.value,
    });
  };

  handleSaveClick = () => {
    const obj = {
      id: null,
      type: this.getType(),
      difficultyLevel: this.state.activeLevel.toUpperCase(),
    };
    console.log(obj);
  };

  handleCancelClick = () => {
    // if (this.state.checked) {
    //   console.log(this.state.checked);
    //   // return
    // }
  };

  getType = () => {
    console.log('hi');
    // return 'null';
    console.log(this.state.checked);
    if (this.state.checked) {
      return 'BUNDLE';
    } else return this.state.answerType;
  };

  render() {
    const { testQuestionSetId, type } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const { subjects, concepts, topics } = this.props;

    const {
      activeSubject,
      activeConcept,
      activeTopic,
      activeLevel,
      expectedTime,
      checked,
      activeTab,
      bucketArray,
      answerType,
      anchorEl,
      text,
      url,
    } = this.state;

    const {
      handleSubjectChange,
      handleConceptChange,
      handleTopicChange,
      handleInputChange,
      handleSwitch,
      handleTabChange,
      handleAddBucket,
      handleRadioChange,
      handleCheckBoxes,
      handleAddOption,
      handleImageUpload,
      handleThreeDotClick,
      handleClose,
      handleDelete,
      handleDeleteIconClick,
      handleTextChange,
      handleExpTextChange,
      handleUrlChange,
      handleSaveClick,
      handleCancelClick,
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
      activeTab,
      handleTabChange,
      handleAddBucket,
      bucketArray,
      handleRadioChange,
      answerType,
      handleCheckBoxes,
      handleAddOption,
      handleImageUpload,
      handleThreeDotClick,
      anchorEl,
      handleClose,
      handleDelete,
      handleDeleteIconClick,
      handleTextChange,
    };

    const explanationProps = {
      text,
      url,
      handleExpTextChange,
      handleUrlChange,
    };

    const buttonsProps = {
      handleSaveClick,
      handleCancelClick,
    };
    // console.log(capitalize('sssssss'));

    return (
      <div>
        <C2>
          <H1>Add new Question</H1>
          <DropDownRack {...dropDownRackProps} />
          <Answer {...answerProps} />
          <Explanation {...explanationProps} />
        </C2>
        <Buttons {...buttonsProps} />
      </div>
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
  putImage,
})(Index);
