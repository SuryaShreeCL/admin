import { Button, Divider, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { ThemeProvider } from "styled-components";
import {  BackIconBox } from "../../../Assets/StyledComponents";
import { lmsTest, lms_add_test, single_upload } from "../../../../Component/RoutePaths";
import {
  B1, BlueSpan, C1, C2, ColorScheme, DropDownBox, FileName, GreySpan, H1,
  H2
} from "../../../Assets/StyledComponents";
import {
  aegetQuestionType, aegetTemplate, aegetTopicList, aesetQuestionData, aesetQuestionDataWithId, getQuestionType, getTemplate, getTopicList, setQuestionData, setQuestionDataWithId
} from "../../../Redux/Action/Test";
import DropDown from "../../../Utils/DropDown";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: null,
      files: [],
      selectedType: "",
      alertState: false,
      alertMsg: "",
      alertSeverity: "",
      activeValue: 2,
    };
  }

  componentDidMount() {
    const { testQuestionSetId } = this.props.match.params;
    const deptName = window.sessionStorage.getItem("department");
    deptName === "assessment_engine_admin"
      ? this.props.aegetQuestionType(testQuestionSetId)
      : this.props.getQuestionType(testQuestionSetId);
  }

  handleChange = (event) => {
    let index = this.props.questionTypes.data.findIndex(
      (obj) => obj.id === event.target.value
    );
    let deptName = window.sessionStorage.getItem("department");
  
    deptName !== "assessment_engine_admin"
      ? this.props.getTemplate(this.props.questionTypes.data[index].fileName)
      : this.props.aegetTemplate(this.props.questionTypes.data[index].fileName);
    this.setState({ selectedType: event.target.value });
  };

  onDrop = (files) => {
    if (files[0].name.match(/.(xls|xlsx|csv)$/i))
      this.setState({
        files,
        alertState: false,
        alertMsg: "",
        alertSeverity: "",
      });
    else {
      this.setState({
        alertState: true,
        alertMsg: "Please upload a .xls, .xlsx or csv file",
        alertSeverity: "error",
      });
    }
  };

  handleButtonClick = () => {
    let deptName = window.sessionStorage.getItem("department");
    if (this.state.selectedType === "") {
      this.setState({
        alertState: true,
        alertMsg: "Please select a Question Type",
        alertSeverity: "error",
      });
    } else if (this.state.files.length === 0) {
      this.setState({
        alertState: true,
        alertMsg: "Please upload a file",
        alertSeverity: "error",
      });
    } 
  //   else if  (this.state.files.length > 0){
  //   this.setState({
                    
  //     files: [],
  //     alertState: true,
  //     alertMsg: "Question Upload Successful!",
  //     alertSeverity: "success",
  //   }
  //   );
  // }
    else if (this.state.files.length > 0) {
      const { testQuestionSetId, sectionId } = this.props.match.params;
      const formData = new FormData();
      formData.append("file", this.state.files[0]);
      if (sectionId !== undefined) {
        deptName === "assessment_engine_admin"
          ? this.props.aesetQuestionDataWithId(
              testQuestionSetId,
              this.state.selectedType,
              sectionId,
              formData,
              (response) => {
                console.log(response);
                if (response.success) {
                
                  console.log(response.message)
                  this.setState({
                    
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "success",
                  }
                  );

                  this.props.history.push(
                    lms_add_test +
                      "?testQuestionSetId=" +
                      this.props.match.params.testQuestionSetId
                  );
                } else {
                  this.setState({
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "error",
                  });
                }
              }
            )
          : this.props.setQuestionDataWithId(
              testQuestionSetId,
              this.state.selectedType,
              sectionId,
              formData,
              (response) => {
                if (response.success) {
                  this.setState({
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "success",
                  });

                  this.props.history.push(
                    lms_add_test +
                      "?testQuestionSetId=" +
                      this.props.match.params.testQuestionSetId
                  );
                } else {
                  this.setState({
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "error",
                  });
                }
              }
            );
      } else {
        deptName === "assessment_engine_admin"
          ? this.props.aesetQuestionData(
              testQuestionSetId,
              this.state.selectedType,
              formData,
              (response) => {
                if (response.success) {
                  this.setState({
                    files: [],
                    
                      // snackMsg : "Uploaded Successfully",
                      // snackOpen : true,
                      // snackVariant : "success"
                
                    alertState: true,
                    alertMsg: "sdfs",
                    alertSeverity: "success",
                  });
                  this.props.history.push(
                    lms_add_test +
                      "?testQuestionSetId=" +
                      this.props.match.params.testQuestionSetId
                  );
                } else {
                  this.setState({
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "error",
                  });
                }
              }
            )
          : this.props.setQuestionData(
              testQuestionSetId,
              this.state.selectedType,
              formData,
              (response) => {
                if (response.success) {
                  this.setState({
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "success",
                  });
                  this.props.history.push(
                    lms_add_test +
                      "?testQuestionSetId=" +
                      this.props.match.params.testQuestionSetId
                  );
                } else {
                  this.setState({
                    files: [],
                    alertState: true,
                    alertMsg: response.message,
                    alertSeverity: "error",
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
  handleBackIconClick = () => {
    this.props.history.goBack();
  };
  handleTemplateClick = () => {
    if (this.state.selectedType === "") {
      this.setState({
        alertState: true,
        alertMsg: "Please select a Question Type",
        alertSeverity: "error",
      });
    } else window.open(this.props.template.data.url, "_blank");
  };

  handleCancelClick = () => {
    // const { testQuestionSetId } = this.props.match.params;
    this.props.history.push(`${lmsTest}`);
  };

  handleTopicList = () => {
    let deptName = window.sessionStorage.getItem("department");
    const { testQuestionSetId } = this.props.match.params;
    deptName === "assessment_engine_admin"?
    this.props.getTopicList(testQuestionSetId, (response) => {}):
    this.props.aegetTopicList(testQuestionSetId, (response) => {});
  };

  render() {
    const datae = window.sessionStorage.getItem("department");
    const datalist = this.props?.questionTypes?.data?.filter(
      (item) => item.title !== "Subjective"
    );
    const { testQuestionSetId, courseId, sectionId } = this.props.match.params;
    if (this.props.questionTypes !== undefined) {
      const { data: questionType } = this.props.questionTypes;
      const { selectedType } = this.state;
      const {
        handleChange,
        handleClose,
        handleTemplateClick,
        handleCancelClick,
        handleTopicList,
        handleBackIconClick
      } = this;

      const radioData = {
        name: "Question Pattern",
        activeValue: this.state.activeValue,
        radioItemData: [
          { id: 1, label: "By Single Question" },
          { id: 2, label: "Bulk Upload" },
        ],
        
        handleRadioChange: (event, name) => {
          const value = parseInt(event.target.value);
          this.setState({ activeValue: value });
          if (value === 1) {
            if (sectionId && courseId)
              this.props.history.push(
                `${single_upload}?testQuestionSetId=${testQuestionSetId}&sectionId=${sectionId}&courseId=${courseId}`
              );
            else if (sectionId)
              this.props.history.push(
                `${single_upload}?testQuestionSetId=${testQuestionSetId}&sectionId=${sectionId}`
              );
            else
              this.props.history.push(
                `${single_upload}?testQuestionSetId=${testQuestionSetId}`
              );
          }
        },
        groupName: "Question Pattern",
      };
      
      return (
        <React.Fragment>
           <BackIconBox>
          <IconButton color='primary' onClick={this.handleBackIconClick}>
            <ArrowBack color='primary' />
          </IconButton>
        </BackIconBox>
          <C2>
            <H1>Add new Question</H1>
            <DropDownBox>
              <DropDown
                label="Question Type"
                name="questionType"
                items={
                  datae === "assessment_engine_admin" ? datalist : questionType
                }
                value={selectedType}
                onChange={handleChange}
              />
            </DropDownBox>
            <C1>
              <Link onClick={handleTemplateClick} className={"link_text"}>
                Preview Template
              </Link>
              {this.props.match.params.courseId && (
                <Link
                  onClick={handleTopicList}
                  className={"link_text padding_left"}
                >
                  Download Topic List
                </Link>
              )}
            </C1>
            <Divider className={"divider_style"} />
            <H2 className={"padding"}>Question</H2>
            <RadioButtonsGroup radioData={radioData} />
            <B1 style={{ paddingTop: "34px", paddingBottom: "16px" }}>
              Upload file
            </B1>
            {/* <Drop /> */}
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div className={"drop_zone_style"} {...getRootProps()}>
                    <input
                      {...getInputProps()}
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
              variant="outlined"
              color="primary"
              className={"round-button margin-style-right"}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={"round-button margin-style-left"}
              onClick={this.handleButtonClick}
            >
              Send
            </Button>
          </ThemeProvider>
          <Snackbar open={this.state.alertState} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={this.state.alertSeverity}
              variant="filled"
            >
              {this.state.alertMsg}
             { console.log(this.state.alertMsg)}
            </Alert>
          </Snackbar>
        </React.Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => {
  return {
    questionTypes: state.TestReducer.questionType,
    template: state.TestReducer.template,
  };
};

export default connect(mapStateToProps, {
  getQuestionType,
  aegetQuestionType,
  setQuestionData,
  aesetQuestionData,
  setQuestionDataWithId,
  aesetQuestionDataWithId,
  getTemplate,
  aegetTemplate,
  getTopicList,
  aegetTopicList,
})(Index);
