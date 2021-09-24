import { TextField, Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { connect } from "react-redux";
import PrimaryButton from "../../Utils/PrimaryButton";
import {
  getcvresult,
  deletecvresult,
  updatecvresult,
} from "../../Actions/ProfileGapAction";
import MySnackBar from "../MySnackBar";
class CV extends Component {
  constructor() {
    super();
    this.state = {
      cvarr: [
        {
          id: "",
          sectionName: "",
          comments: "",
          updatedBy: {
            id: "",
          },
        },
      ],
      getcv: [],
      snackOpen: false,
      snackColor: "",
      snackMsg: "",
    };
  }
  componentDidMount() {
    this.props.getcvresult(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        console.log(response);
        if (response.data.length > 0) {
          this.setState({
            cvarr: response.data,
          });
        }
      }
    );
  }
  handleAdd = () => {
    console.log("handleAdd");
    let arr = this.state.cvarr;
    arr.push({
      id: "",
      sectionName: "",
      comments: "",
      updatedBy: {
        id: "",
      },
    });
    this.setState({
      cvarr: arr,
    });
  };
  handleDelete = (data, index) => {
    console.log(data);
    if (this.state.cvarr.length > 1) {
      console.log("delete");
      if (data.id.length > 0) {
        this.props.deletecvresult(data.id, (response) => {
          console.log(response);
          if (response.status === 200) {
            this.props.getcvresult(
              this.props.match.params.studentId,
              this.props.match.params.productId,
              (response) => {
                console.log(response);
                this.setState({
                  cvarr: response.data,
                });
              }
            );
            this.setState({
              snackMsg: response.data,
              snackOpen: true,
              snackColor: "success",
            });
          }
        });
      } else {
        if (this.state.cvarr.length > 1) {
          console.log(index, "Delete");
          let delarr = this.state.cvarr;
          delarr.splice(index, 1);
          this.setState({
            cvarr: delarr,
          });
        }
      }
    }
  };
  handleTextChange = (e, index, name) => {
    let items = [...this.state.cvarr];
    let item = { ...items[index] };
    console.log(item);
    item[name] = e.target.value;
    items[index] = item;
    this.setState({ cvarr: items });
  };
  handleSaved = () => {
    console.log("hello");
    const adminuserId = window.sessionStorage.getItem("adminUserId");
    let obj = this.state.cvarr.map((eachItem, index) => {
      console.log(eachItem);
      // if (
      //    eachItem.sectionName !== "" &&
      //    eachItem.comments !== ""
      //    ){
          if (eachItem.id.length === 0) {
            return {
              sectionName: eachItem.sectionName,
              comments: eachItem.comments,
              updatedBy: {
                id:
                  eachItem.updatedBy.id.length === 0
                    ? adminuserId
                    : eachItem.updatedBy.id,
              },
            };
          } else {
            return {
              id: eachItem.id,
              sectionName: eachItem.sectionName,
              comments: eachItem.comments,
              updatedBy: {
                id:
                  eachItem.updatedBy.id.length === 0
                    ? adminuserId
                    : eachItem.updatedBy.id,
              },
            };
          }
        //  }
        //  else {
        //    this.setState({
        //     snackMsg: "Please Fill the Required Field",
        //     snackOpen: true,
        //     snackColor: "error",
        //    })
        //  }
     
    });
    let error = false;
    for(let i = 0 ; i < obj.length ; i++){
      if(obj[i].sectionName.length === 0  || obj[i].comments.length === 0){
        error = true;
      }
    }
    if(!error){
      console.log(obj);
      this.props.updatecvresult(
       this.props.match.params.studentId,
       this.props.match.params.productId,
       obj,
       (response) => {
         if (response.status === 200) {
           this.props.getcvresult(
             this.props.match.params.studentId,
             this.props.match.params.productId,
             (response) => {
               console.log(response);
               this.setState({
                 cvarr: response.data,
               });
             }
           );
           this.setState({
             snackMsg: "Updated Successfully",
             snackOpen: true,
             snackColor: "success",
           });
         }
       }
     );
    }
     else {
      this.setState({
            snackMsg: "Please Fill the Required Field",
            snackOpen: true,
            snackColor: "error",
           })
     }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            md={12}
            style={{ maxHeight: "92%", overflowY: "scroll", padding: "15px" }}
          >
            {this.state.cvarr.map((data, index) => (
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <TextField
                    label="Section Name"
                    value={data.sectionName}
                    onChange={(e) =>
                      this.handleTextChange(e, index, "sectionName")
                    }
                  />
                </Grid>
                <Grid item md={10}>
                  <TextField
                    fullWidth
                    label="Editor/Mentor's Comment"
                    value={data.comments}
                    onChange={(e) =>
                      this.handleTextChange(e, index, "comments")
                    }
                  />
                </Grid>
                <Grid
                  item
                  md={2}
                  style={{ display: "flex", alignItems: "end" }}
                >
                  <div style={{ display: "flex" }}>
                    <AddCircleOutlineIcon
                      color="primary"
                      onClick={() => {
                        this.handleAdd();
                      }}
                    />
                    <DeleteOutlineIcon
                      color="secondary"
                      onClick={() => {
                        this.handleDelete(data, index);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            md={12}
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <PrimaryButton
              variant={"contained"}
              color={"primary"}
              style={{
                width: "100px",
                display: "flex",
                alignItems: "flex-end",
              }}
              onClick={() => this.handleSaved()}
            >
              Save
            </PrimaryButton>
          </Grid>
        </Grid>
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
const useStyles = (theme) => ({});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    getcvresultList: state.ProfileGapAnalysisReducer.getcvresult,
    deletecvresultList: state.ProfileGapAnalysisReducer.deletecvresult,
    updatecvresultList: state.ProfileGapAnalysisReducer.updatecvresult,
  };
};
export default connect(mapStateToProps, {
  getcvresult,
  deletecvresult,
  updatecvresult,
})(withStyles(useStyles)(CV));
