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
} from '../../../Redux/Action/Test';
import Alert from '@material-ui/lab/Alert';
import QueryString from 'qs';

// const testQuestionSetId = '4c72684b-3499-4378-a272-304f1708a798';
// const sectionId = '02106c2d-5e4c-45da-9f85-4efa0d7b9298';

const radioData = {
  name: 'Question Pattern',
  activeValue: 2,
  radioItemData: [
    { id: 1, label: 'By Single Question' },
    { id: 2, label: 'Bulk Upload' },
  ],
  handleRadioChange: () => console.log('hi'),
  groupName: 'Question Pattern',
};

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
    };
  }

  componentDidMount() {
    const { testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
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
    this.setState({
      files,
      alertState: true,
      alertMsg: 'File Upload Successful!',
      alertSeverity: 'success',
    });
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
      const { testQuestionSetId, sectionId } = QueryString.parse(
        this.props.location.search,
        {
          ignoreQueryPrefix: true,
        }
      );
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
    // return false;
  };

  render() {
    // const { handleChange } = this;
    // const { testQuestionSetId } = QueryString.parse(
    //   this.props.location.search,
    //   {
    //     ignoreQueryPrefix: true,
    //   }
    // );
    // // console.log(this.props);
    // console.log(this.props.template);
    if (this.props.questionTypes !== undefined) {
      const { data: questionType } = this.props.questionTypes;
      const { selectedType } = this.state;
      const { handleChange, handleClose, handleTemplateClick } = this;
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
            <Link onClick={handleTemplateClick} className={'link_text'}>
              Preview Template
            </Link>
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
                    <input {...getInputProps()} />
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
              // onClick={handleClose}
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
})(Index);
