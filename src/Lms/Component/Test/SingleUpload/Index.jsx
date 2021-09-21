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
import Question from './Question';
import QueryString from 'qs';
import { postQuestions } from '../../../Redux/Action/Test';

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
        answerType: 'SINGLE_SELECT',
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
        bucketArray: [],
        activeTab: 0,
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
    arr[this.state.activeTab].choices[index].image = null;
    this.setState({ bucketArray: arr });
  };

  handleTextChange = (e, index) => {
    let arr = this.state.bucketArray;
    arr[this.state.activeTab].choices[index].text = e.target.value;
    this.setState({ bucketArray: arr });
  };

  handleExpTextChange = (e, editor) => {
    const data = editor.getData();
    this.setState({ text: data });
  };

  handleUrlChange = e => {
    this.setState({
      url: e.target.value,
    });
  };

  handleSaveClick = () => {
    const {
      activeLevel,
      expectedTime,
      activeTopic,
      question,
      description,
    } = this.state;
    const { sectionId, testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const obj = {
      name: 'question',
      id: null,
      type: this.getType(),
      difficultyLevel: activeLevel.toUpperCase(),
      expectedTime: expectedTime,
      topic: { id: activeTopic },
      testSection: { id: sectionId },
      question,
      description,
      choices: this.getChoices(),
      answerKeys: this.getAnswerKeys(),
    };
    this.props.postQuestions(testQuestionSetId, obj, response => {
      console.log(response);
    });
    // console.log(obj);
  };

  handleCancelClick = () => {
    // if (this.state.checked) {
    //   console.log(this.state.checked);
    //   // return
    // }
  };

  getType = () => {
    if (this.state.checked) {
      return 'BUNDLE';
    } else return this.state.answerType;
  };

  handleQuestionChange = (e, editor) => {
    const data = editor.getData();
    this.setState({ question: data });
  };

  handleDescriptionChange = (e, editor) => {
    const data = editor.getData();
    this.setState({ description: data });
  };

  getChoices = () => {
    let arr = this.state.bucketArray;
    let choices = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].choices.length; j++) {
        choices.push({
          id: null,
          type: arr[i].choices[j].text.length === 0 ? 'IMAGE' : 'TEXT',
          text:
            arr[i].choices[j].text.length !== 0
              ? arr[i].choices[j].text
              : arr[i].choices[j].image.fileName,
          orderNo: j + 1,
          bundleNo: arr.length > 1 ? i + 1 : null,
        });
      }
    }
    return choices;
  };

  getAnswerKeys = () => {
    let arr = this.state.bucketArray;
    let choices = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].choices.length; j++) {
        if (arr[i].choices[j].selected) {
          choices.push({
            id: null,
            type: arr[i].choices[j].text.length === 0 ? 'IMAGE' : 'TEXT',
            text:
              arr[i].choices[j].text.length !== 0
                ? arr[i].choices[j].text
                : arr[i].choices[j].image.fileName,
            orderNo: j + 1,
            bundleNo: arr.length > 1 ? i + 1 : null,
          });
        }
      }
    }
    return choices;
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
      question,
      description,
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
      handleQuestionChange,
      handleDescriptionChange,
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

    const questionProps = {
      handleQuestionChange,
      handleDescriptionChange,
      question,
      description,
    };
    console.log(this.state);

    return (
      <div>
        <C2>
          <H1>Add new Question</H1>
          <DropDownRack {...dropDownRackProps} />
          <Question {...questionProps} />
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
  postQuestions,
})(Index);
