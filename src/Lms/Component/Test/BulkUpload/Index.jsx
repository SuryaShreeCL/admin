import { Divider, Snackbar } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  DropDownBox,
  H1,
  H2,
  B1,
  GreySpan,
  BlueSpan,
  FileName,
  C2,
  C1,
} from '../../../Assets/StyledComponents';
import DropDown from '../../../Utils/DropDown';
import { RadioButtonsGroup } from '../../../Utils/RadioButton';
import Dropzone from 'react-dropzone';
import { ThemeProvider } from 'styled-components';
import { ColorScheme } from '../../../Assets/StyledComponents';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  getQuestionType,
  setQuestionData,
  setQuestionDataWithId,
  getTemplate,
  getTopicList,
} from '../../../Redux/Action/Test';
import Alert from '@material-ui/lab/Alert';
import { lmsTest, single_upload } from '../../../../Component/RoutePaths';
import { lms_add_test } from '../../../../Component/RoutePaths';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: null,
      files: [],
      selectedType: '',
      alertState: false,
      alertMsg: '',
      alertSeverity: '',
      activeValue: 1,
    };
  }

  componentDidMount() {
    // console.log();
    const { testQuestionSetId } = this.props.match.params;
    this.props.getQuestionType(testQuestionSetId);
  }

  handleChange = event => {
    // console.log(event.target.value);
    // console.log(this.props.questionType)
    let index = this.props.questionTypes.data.findIndex(
      obj => obj.id === event.target.value
    );
    this.props.getTemplate(this.props.questionTypes.data[index].fileName);
    // console.log(this.props.questionTypes.data[index].fileName);
    this.setState({ selectedType: event.target.value });
  };

  onDrop = files => {
    // console.log(files[0].name);
    if (files[0].name.match(/.(xls|xlsx|csv)$/i))
      this.setState({
        files,
        alertState: false,
        alertMsg: '',
        alertSeverity: '',
      });
    else {
      this.setState({
        alertState: true,
        alertMsg: 'Please upload a .xls, .xlsx or csv file',
        alertSeverity: 'error',
      });
    }
  };

  handleButtonClick = () => {
    if (this.state.selectedType === '') {
      this.setState({
        alertState: true,
        alertMsg: 'Please select a Question Type',
        alertSeverity: 'error',
      });
    } else if (this.state.files.length === 0) {
      this.setState({
        alertState: true,
        alertMsg: 'Please upload a file',
        alertSeverity: 'error',
      });
    } else if (this.state.files.length > 0) {
      const { testQuestionSetId, sectionId } = this.props.match.params;
      const formData = new FormData();
      formData.append('file', this.state.files[0]);
      if (sectionId !== undefined) {
        this.props.setQuestionDataWithId(
          testQuestionSetId,
          this.state.selectedType,
          sectionId,
          formData,
          response => {
            if (response.success) {
              this.setState({
                files: [],
                alertState: true,
                alertMsg: response.message,
                alertSeverity: 'success',
              });

              this.props.history.push(
                lms_add_test +
                  '?testQuestionSetId=' +
                  this.props.match.params.testQuestionSetId
              );
            } else {
              this.setState({
                files: [],
                alertState: true,
                alertMsg: response.message,
                alertSeverity: 'error',
              });
            }
          }
        );
      } else {
        this.props.setQuestionData(
          testQuestionSetId,
          this.state.selectedType,
          formData,
          response => {
            if (response.success) {
              this.setState({
                files: [],
                alertState: true,
                alertMsg: response.message,
                alertSeverity: 'success',
              });
              this.props.history.push(
                lms_add_test +
                  '?testQuestionSetId=' +
                  this.props.match.params.testQuestionSetId
              );
            } else {
              this.setState({
                files: [],
                alertState: true,
                alertMsg: response.message,
                alertSeverity: 'error',
              });
            }
          }
        );
      }
    }
  };

  handleClose = () => {
    this.setState({ alertState: false });
  };

  handleTemplateClick = () => {
    if (this.state.selectedType === '') {
      this.setState({
        alertState: true,
        alertMsg: 'Please select a Question Type',
        alertSeverity: 'error',
      });
    } else window.open(this.props.template.data.url);
  };

  handleCancelClick = () => {
    // const { testQuestionSetId } = this.props.match.params;
    this.props.history.push(`${lmsTest}`);
  };

  handleTopicList = () => {
    const { testQuestionSetId } = this.props.match.params;
    this.props.getTopicList(testQuestionSetId, response => {
      console.log(response);
    });
  };

  render() {
    if (this.props.questionTypes !== undefined) {
      const { data: questionType } = this.props.questionTypes;
      const { selectedType } = this.state;
      const {
        handleChange,
        handleClose,
        handleTemplateClick,
        handleCancelClick,
        handleTopicList,
      } = this;

      const radioData = {
        name: 'Question Pattern',
        activeValue: 2,
        radioItemData: [
          { id: 1, label: 'By Single Question' },
          { id: 2, label: 'Bulk Upload' },
        ],
        handleRadioChange: (event, name) => {
          // console.log(name);
          if (name === '1') {
            console.log(name);
            this.props.history.push(single_upload);
          }
          // this.setState({ activeValue: parseInt(name) });
        },
        groupName: 'Question Pattern',
      };

      // console.log(radioData);

      return (
        <React.Fragment>
          <C2>
            <H1>Add new Question</H1>
            <DropDownBox>
              <DropDown
                label='Question Type'
                name='questionType'
                items={questionType}
                value={selectedType}
                onChange={handleChange}
              />
            </DropDownBox>
            <C1>
              <Link onClick={handleTemplateClick} className={'link_text'}>
                Preview Template
              </Link>
              {this.props.match.params.type === 'CALIBRATION' && (
                <Link
                  onClick={handleTopicList}
                  className={'link_text padding_left'}
                >
                  Download Topic List
                </Link>
              )}
            </C1>
            <Divider className={'divider_style'} />
            <H2 className={'padding'}>Question</H2>
            <RadioButtonsGroup radioData={radioData} />
            <B1 style={{ paddingTop: '34px', paddingBottom: '16px' }}>
              Upload file
            </B1>
            {/* <Drop /> */}
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div className={'drop_zone_style'} {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      type='file'
                      accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    />
                    <GreySpan>Drag & Drop your File or</GreySpan>
                    &nbsp;
                    <BlueSpan>Upload</BlueSpan>
                  </div>
                  <aside>
                    <FileName>
                      {this.state.files.length > 0
                        ? this.state.files[0].name
                        : null}
                    </FileName>
                  </aside>
                </section>
              )}
            </Dropzone>
          </C2>
          <ThemeProvider theme={ColorScheme}>
            <Button
              variant='outlined'
              color='primary'
              className={'round-button margin-style-right'}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={'round-button margin-style-left'}
              onClick={this.handleButtonClick}
            >
              Send
            </Button>
          </ThemeProvider>
          <Snackbar open={this.state.alertState} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={this.state.alertSeverity}
              variant='filled'
            >
              {this.state.alertMsg}
            </Alert>
          </Snackbar>
        </React.Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = state => {
  return {
    questionTypes: state.TestReducer.questionType,
    template: state.TestReducer.template,
  };
};

export default connect(mapStateToProps, {
  getQuestionType,
  setQuestionData,
  setQuestionDataWithId,
  getTemplate,
  getTopicList,
})(Index);
