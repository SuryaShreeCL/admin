import React, { Component } from "react";
import ViewMarks from "./ViewMarks";
import ViewSemesterDetails from "./ViewSemesterDetails";
import { Grid, withStyles } from "@material-ui/core";
import "../DiplomaForm/DiplomaForm.css";
import BottomButton from "../BottomButton";
import CvViewer from "../CvViewer";
import TableGrid from "../../../Utils/EditableTable";
import { connect } from "react-redux";
import { useStyles } from "../../../Asset/DiplomaStyles";
import { viewSemesterDetails, deleteSemesterDetails } from '../../../Actions/ProfileGapAction';
import { isClickedSem } from "../../../Actions/HelperAction";
import {
  isEmptyObject,
  isEmptyString,
  isNanAndEmpty,
  isNumber,
} from "../../Validation";
import { HELPER_TEXT } from "../../../Constant/Variables";



class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdfViewer: "",
      data: null,
      semesterData : [],
      collegeDetails : "",
      university : "",
      department : "",
      score : "",
      subjectDetails : ""
    };
  }

  columns = [
    {
      title: "Id",
      field: "id",
      hidden: true,
    },
    {
      title: "Subject Code",
      field : "subjectDetailsUgPgDiploma.subjectCode",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.subjectDetailsUgPgDiploma.subjectCode : "",
      validate: (rowData) => {
        if (!isEmptyObject(rowData)) {
          if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.subjectCode)) {
            return true;
          } else {
            return { isValid: false, helperText: HELPER_TEXT.requiredField };
          }
        }
      },
     
    },
    {
      title: "Subject Name",
      field : "subjectDetailsUgPgDiploma.subjectName",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.subjectDetailsUgPgDiploma.subjectName : "",
      validate: (rowData) => {
        if (!isEmptyObject(rowData)) {
          if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.subjectName)) {
            return true;
          } else {
            return { isValid: false, helperText: HELPER_TEXT.requiredField };
          }
        }
      },

     
    },
    {
      title: "Grade Points",
      field : "gradePoints",
      render: (rowData, renderType) =>
      renderType === "row" ? rowData.gradePoints : "",
    validate: (rowData) => {
      if (!isEmptyObject(rowData)) {
        if (!isEmptyString(rowData.gradePoints)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      }
    },
     
    },
    {
      title: "Credit",
      field : "credit",
      render: (rowData, renderType) =>
      renderType === "row" ? rowData.credit : "",
    validate: (rowData) => {
      if (!isEmptyObject(rowData)) {
        if (!isEmptyString(rowData.credit)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      }
    },
     
    },
    {
      title: "Type",
      field : "subjectDetailsUgPgDiploma.type",
      render: (rowData, renderType) =>
      renderType === "row" ? rowData.subjectDetailsUgPgDiploma.type : "",
    validate: (rowData) => {
      if (!isEmptyObject(rowData)) {
        if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.type)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      }
    },

    },
    {
      title: "Result",
      field : "result",
      render: (rowData, renderType) =>
      renderType === "row" ? rowData.result : "",
    validate: (rowData) => {
      if (!isEmptyObject(rowData)) {
        if (!isEmptyString(rowData.result)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      }
    },
    },
    {
      title: "Pass/Fail",
      field : "subjectDetailsUgPgDiploma.passOrFail",
      render: (rowData, renderType) =>
      renderType === "row" ? rowData.subjectDetailsUgPgDiploma.passOrFail : "",
    validate: (rowData) => {
      if (!isEmptyObject(rowData)) {
        if (!isEmptyString(rowData.subjectDetailsUgPgDiploma.passOrFail)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      }
    },

    },
   
    
  ];

  handleRowAdd = (newData) => {
    console.log(newData);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
     this.setState({
      semesterData : [...this.state.semesterData, newData]
     })
        resolve();
      }, 1000);
    });
  };

  handleRowDelete = (oldData) => {
    console.log(oldData);
    if (oldData.subjectDetailsUgPgDiploma.id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
         this.props.deleteSemesterDetails(
          this.props.match.params.studentId,
          oldData.subjectDetailsUgPgDiploma.id,
          this.props.clickedSem,
           (response)=>{
           if(response.status === 200){
             this.props.viewSemesterDetails(this.props.match.params.studentId, this.props.clickedSem,(response))
           }
         })
           
            resolve();
          
        }, 1000);
      });
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...this.state.semesterData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          // setData([...dataDelete]);
          this.setState({
            semesterData : [...dataDelete]
          })
          resolve();
        }, 1000);
      });
    }
  };

  handleRowUpdate = (newData, oldData) => {
    console.log(newData);
    console.log(oldData);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...this.state.semesterData];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        // setData([...dataUpdate]);
        this.setState({
          semesterData : [...dataUpdate]
        })
        resolve();
      }, 1000)
    })
  }

  componentDidMount () {
    this.props.viewSemesterDetails(this.props.match.params.studentId,this.props.clickedSem,(response)=>{
      console.log(response)
        this.setState({
          semesterData :  response.data.data[0].studentSubjectDetails,
          score :  response.data.data[0].studentSemesterDetails.score,
          collegeDetails : response.data.data[0].college,
          university : response.data.data[0].university,
          department : response.data.data[0].department,
          subjectDetails : response.data.data[0].studentSemesterDetails[0],
          pdfViewer : response.data.data[0].studentDocument[0].path,


          data: response.data
        })
      
    })
  }

  render() {
    const {classes}  = this.props;
    console.log(this.state);
    console.log(this.state.semesterData)

    return (
      <div>
        <Grid container position="relative" height="100vh">
          {/*  left container*/}

          {/* semester details */}
          <Grid item md={7} xs={7} sm={7} xl={7} lg={7}>
            <Grid container>
              <Grid
                item
                md={12} xs={12} sm={12} xl={12} lg={12}
                // className={classes.container}
                style={{
                  height: "95vh",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  width: "100%",
                }}
              >
                <ViewSemesterDetails 
                // data={this.state.semesterData}
                collegeName = {this.state.collegeDetails}
                universityName = {this.state.university}
                departmentName = {this.state.department}
                gpa = {this.state.score}


                />

                <TableGrid
                  columns={this.columns}
                  data={this.state.semesterData}
                  onRowDelete={this.handleRowDelete}
                  onRowUpdate={this.handleRowUpdate}
                  onRowAdd={this.handleRowAdd}
                />
                <ViewMarks />
              </Grid>

              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <BottomButton />
              </Grid>
            </Grid>
          </Grid>

          {/* right container - markSheet */}
          <Grid item md={5} xs={5} sm={5} xl={5} lg={5}>
            <CvViewer path={this.state.pdfViewer} {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    clickedSem: state.HelperReducer.clickedSem,


  };
};


export default connect(mapStateToProps, {
  viewSemesterDetails,
  isClickedSem,
  deleteSemesterDetails
})(withStyles(useStyles)(Index));