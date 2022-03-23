import {
  Box,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCommentHistory,
  getPpgaCallNotes,
  ppgaCallNotesStatus,
  updatePpgaCallNotes,
} from "../../Actions/ProfileGapAction";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import Loader from "../Utils/controls/Loader";
import CommentDialog from "./CommentDialog";
import "./InterestDetail.css";

class PpgaCallNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      data: [],
      snackOpen: false,
      snackColor: "",
      snackMsg: "",
      commentDialogOpen: false,
      commentList: [],
      prePpgaCallNotes: false,
      postPpgaCallNotes: false,
      mentorCallNotes: false,
      fieldname: {
        fieldOfStudy: "Field Of Study",
        college: "College",
        degree: "Degree",
        postGraduateDegree: "PostGraduate Degree",
        postGraduateUniversity: "PostGraduate Univeristy",
        postGraduateCollege: "PostGraduate College",
        firstName: "First Name",
        lastName: "Last Name",
        currentSem: "Current Semester",
        workexp: "Work Experience",
      },
      commentUpdateList: [],
    };
  }

  handleChange = (e, index) => {
    let items = [...this.state.data];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item[e.target.name] = e.target.value;
    // 4. Put it back into our array. N.B. we are mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    this.setState({ data: items });
  };

  componentDidMount() {
    this.props.getPpgaCallNotes(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );

    this.props.getCommentHistory(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );

    this.props.ppgaCallNotesStatus(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      commentHistory,
      ppgaCallNotesList,
      ppgaCallStatus,
      ppgaNotesStatus,
    } = this.props;

    if (commentHistory && commentHistory !== prevProps.commentHistory) {
      if (commentHistory.success) {
        let arr = [];
        if (commentHistory.data && commentHistory.data.length !== 0) {
          this.setState({
            buttonStatus: true,
          });
          commentHistory.data.map((eachdata) => {
            if (eachdata.fieldName === "college") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldCollege && eachdata.oldCollege.name,
                newValue: eachdata.newCollege && eachdata.newCollege.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "degree") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldDegree && eachdata.oldDegree.name,
                newValue: eachdata.newDegree && eachdata.newDegree.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "fieldOfStudy") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue:
                  eachdata.oldPgDepartment && eachdata.oldPgDepartment.name,
                newValue:
                  eachdata.newPgDepartment && eachdata.newPgDepartment.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "postGraduateDegree") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldPgDegree && eachdata.oldPgDegree.name,
                newValue: eachdata.newPgDegree && eachdata.newPgDegree.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "fieldOfStudy") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue:
                  eachdata.oldPgDepartment && eachdata.oldPgDepartment.name,
                newValue:
                  eachdata.newPgDepartment && eachdata.newPgDepartment.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "postGraduateUniversity") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue:
                  eachdata.oldPgUniversity && eachdata.oldPgUniversity.name,
                newValue:
                  eachdata.newPgUniversity && eachdata.newPgUniversity.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else if (eachdata.fieldName === "postGraduateCollege") {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldPgcollege && eachdata.oldPgcollege.name,
                newValue: eachdata.newPgcollege && eachdata.newPgcollege.name,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            } else {
              arr.push({
                fieldName: eachdata.fieldName,
                oldValue: eachdata.oldValue,
                newValue: eachdata.newValue,
                comment: eachdata.comment,
                updatedAt: eachdata.updatedAt,
                updatedBy: eachdata.updatedBy,
              });
            }
          });
        }
        this.setState({
          commentList: commentHistory.data || [],
          commentUpdateList: arr,
        });
      } else {
        this.setState({
          snackMsg: commentHistory.message,
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }

    if (
      ppgaCallNotesList &&
      ppgaCallNotesList !== prevProps.ppgaCallNotesList
    ) {
      if (ppgaCallNotesList.success) {
        this.setState({
          data: ppgaCallNotesList.data?.body || [],
        });
      } else {
        this.setState({
          snackMsg: ppgaCallNotesList.message,
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }

    if (ppgaCallStatus && ppgaCallStatus !== prevProps.ppgaCallStatus) {
      if (ppgaCallStatus.success) {
        this.props.getPpgaCallNotes(
          match.params.studentId,
          match.params.productId
        );
        this.setState({
          data: ppgaCallStatus.data?.body || [],
          snackColor: "success",
          snackOpen: true,
          snackMsg: "Saved Successfully",
        });
      } else {
        this.setState({
          snackMsg: ppgaCallStatus.message,
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }

    if (ppgaNotesStatus && ppgaNotesStatus !== prevProps.ppgaNotesStatus) {
      if (ppgaNotesStatus.success) {
        this.setState({
          prePpgaCallNotes: ppgaNotesStatus.data?.ppga,
          postPpgaCallNotes: ppgaNotesStatus.data?.postPga,
          mentorCallNotes: ppgaNotesStatus.data?.mentorNotes,
        });
      } else {
        this.setState({
          snackMsg: ppgaNotesStatus.message,
          snackOpen: true,
          snackVariant: "error",
        });
      }
    }
  }

  handleClick = () => {
    this.setState({
      commentDialogOpen: true,
    });
  };

  handleSave = () => {
    const adminUserId = window.sessionStorage.getItem("adminUserId");

    const requestBody = this.state.data.map((eachItem, index) => {
      if (eachItem.id === null) {
        return {
          ppgaNotes: eachItem.ppgaNotes,
          postPpgaNotes: eachItem.postPpgaNotes,
          mentorNotes: eachItem.mentorNotes,
          ppgaCallNotesTitle: {
            id: eachItem.ppgaCallNotesTitle.id,
          },
          updatedBy: {
            id: adminUserId,
          },
        };
      } else {
        return {
          id: eachItem.id,
          ppgaNotes: eachItem.ppgaNotes,
          postPpgaNotes: eachItem.postPpgaNotes,
          mentorNotes: eachItem.mentorNotes,
          ppgaCallNotesTitle: {
            id: eachItem.ppgaCallNotesTitle.id,
          },
          updatedBy: {
            id:
              eachItem.updatedBy.id.length === 0
                ? adminUserId
                : eachItem.updatedBy.id,
          },
        };
      }
    });

    this.props.updatePpgaCallNotes(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      requestBody
    );

    this.props.ppgaCallNotesStatus(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
  };

  render() {
    const { classes, loading } = this.props;

    return (
      <div>
        <Box height={"90vh"} padding={"15px"}>
          <Box className={classes.topGrid}>
            {loading ? (
              <Loader />
            ) : (
              this.state.data &&
              this.state.data.map((item, index) => (
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                    <p>{item.ppgaCallNotesTitle.text}</p>
                    <hr />
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      label='PPGA Notes'
                      name='ppgaNotes'
                      InputLabelProps={{ shrink: true }}
                      value={item.ppgaNotes}
                      onChange={(e) => this.handleChange(e, index)}
                      className='ppgaTextField_align'
                      disabled={!this.state.prePpgaCallNotes}
                    ></TextField>
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      className='ppgaTextField_align'
                      name='postPpgaNotes'
                      value={item.postPpgaNotes}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => this.handleChange(e, index)}
                      label='Post PPGA Notes'
                      disabled={!this.state.postPpgaCallNotes}
                    ></TextField>
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      className='ppgaTextField_align'
                      name='mentorNotes'
                      onChange={(e) => this.handleChange(e, index)}
                      value={item.mentorNotes}
                      InputLabelProps={{ shrink: true }}
                      label='Mentor Notes'
                      disabled={!this.state.mentorCallNotes}
                    ></TextField>
                  </Grid>
                </Grid>
              ))
            )}
          </Box>
          <Grid container spacing={2} className={classes.container}>
            {/* button */}
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              xl={12}
              lg={12}
              className={classes.dividerDiv}
            >
              <hr className={"divider"} />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              xl={12}
              lg={12}
              className={classes.buttonGrid}
            >
              <div>
                <Typography
                  className={classes.bottomText}
                  onClick={this.handleClick}
                >
                  PPGA Call - Verification/Change Details
                </Typography>
                <CommentDialog
                  open={this.state.commentDialogOpen}
                  data={this.state.commentUpdateList}
                  onClose={() => this.setState({ commentDialogOpen: false })}
                  fieldname={this.state.fieldname}
                />
              </div>
              <div className={"button_div"}>
                <PrimaryButton
                  disabled={
                    !this.state.prePpgaCallNotes ||
                    !this.state.mentorCallNotes ||
                    loading
                    // !this.state.postPpgaCallNotes
                  }
                  variant={"contained"}
                  color={"primary"}
                  onClick={this.handleSave}
                  className={classes.button}
                >
                  {"Save"}
                </PrimaryButton>
              </div>
            </Grid>
          </Grid>
        </Box>
        <MySnackBar
          onClose={() => this.setState({ snackOpen: false })}
          snackOpen={this.state.snackOpen}
          snackVariant={this.state.snackColor}
          snackMsg={this.state.snackMsg}
        />
      </div>
    );
  }
}

const useStyles = (theme) => ({
  button: {
    width: "100px",
    display: "flex",
    alignItems: "flex-end",
    marginRight: "24px",
    marginBottom: "25px",
  },
  container: {
    padding: "10px",
  },
  topGrid: {
    overflowY: "auto",
    height: "76vh",
    padding: "15px !important",
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "-15px",
    alignItems: "center",
    padding: "5px",
  },
  bottomText: {
    marginLeft: "19px",
    marginBottom: "18px",
    cursor: "pointer",
    color: "#1093FF",
  },
  dividerDiv: {
    margin: "20px 0px 0px 0px",
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ppgaCallNotesList: state.ProfileGapAnalysisReducer.ppgaCallNotes,
    ppgaCallStatus: state.ProfileGapAnalysisReducer.ppgaCallStatus,
    commentHistory: state.ProfileGapAnalysisReducer.commentHistory,
    ppgaNotesStatus: state.ProfileGapAnalysisReducer.ppgaNotesStatus,
    loading: state.ProfileGapAnalysisReducer.loading,
  };
};

export default connect(mapStateToProps, {
  getPpgaCallNotes,
  updatePpgaCallNotes,
  getCommentHistory,
  ppgaCallNotesStatus,
})(withStyles(useStyles)(PpgaCallNotes));
