import React, { Component } from "react";
import { TextField, Grid, Divider, Typography } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import "./InterestDetail.css";
import {
  getPpgaCallNotes,
  updatePpgaCallNotes,
} from "../../Actions/ProfileGapAction";
import { connect } from "react-redux";
import MySnackBar from "../MySnackBar";
import CommentDialog from './CommentDialog';
import { getcommenthistory } from "../../Actions/ProfileGapAction";

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
      this.props.match.params.productId,
      (response) => {
        console.log(response);
        this.setState({
          data: response.data.body,
        });
      }
    );
    this.props.getcommenthistory(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        console.log(response);
        this.setState({
          commentList: response.data,
        });
      }
    );
  }

  handleClick = () => {
    this.setState({
      commentDialogOpen: true,
    });
  }

  handleSave = () => {
    const adminUserId = window.sessionStorage.getItem("adminUserId");

    const requestBody = this.state.data.map((eachItem, index) => {
      if (eachItem.id === null) {
        return {
          ppgaNotes: eachItem.ppgaNotes,
          postPPgaNotes: eachItem.postPpgaNotes,
          mentorComments: eachItem.mentorNotes,
          updatedBy: {
            id: adminUserId,
          },
        };
      } else {
        return {
          id: eachItem.id,
          ppgaNotes: eachItem.ppgaNotes,
          postPPgaNotes: eachItem.postPpgaNotes,
          mentorComments: eachItem.mentorNotes,
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
      requestBody,
      (response) => {
        console.log(response);
        if (response.status === 200) {
          this.props.getPpgaCallNotes(
            this.props.match.params.studentId,
            this.props.match.params.productId,
            (response) => {
              console.log(response);
              this.setState({
                data: response.data.body,

                snackColor: "success",
                snackOpen: true,
                snackMsg: "Saved Successfully",
              });
            }
          );
        }
      }
    );
  };

  render() {
    console.log(this.props.getcommenthistoryList);

    return (
      <div>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            style={{ maxHeight: "85%", overflowY: "scroll", padding: "25px" }}
          >
            {this.state.data &&
              this.state.data.map((item, index) => (
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                    <p>{item.ppgaCallNotesTitle.text}</p>
                    <hr/>
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      label="PPGA Notes"
                      name="ppgaNotes"
                      value={item.ppgaNotes}
                      onChange={(e) => this.handleChange(e, index)}
                      className="ppgaTextField_align"
                    ></TextField>
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      className="ppgaTextField_align"
                      name="postPpgaNotes"
                      value={item.postPPgaNotes}
                      onChange={(e) => this.handleChange(e, index)}
                      label="Post PPGA Notes"
                    ></TextField>
                  </Grid>
                  <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      className="ppgaTextField_align"
                      name="mentorNotes"
                      onChange={(e) => this.handleChange(e, index)}
                      value={item.mentorComments}
                      label="Mentor Notes"
                    ></TextField>
                  </Grid>
                </Grid>
              ))}
          </Grid>

          {/* button */}
          <Grid container>
          <Grid item md={12} xs={12} sm={12} xl={12} lg={12} style={{width:"964px",marginLeft:"10px",marginRight:"11px"}}>
              <hr style={{marginTop:"-16px"}}/>
            </Grid>
            {/* button and text main div */}
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              xl={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "-15px",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <div>
                <Typography style={{marginLeft:"21px",marginBottom:"18px"}}
                onClick={this.handleClick}
                className={"footer_text"}>
                  PPGA Call - Verification/Change Details
                </Typography>
                <CommentDialog 
        open={this.state.commentDialogOpen}
        data={this.state.commentList}
        onClose={()=>this.setState({commentDialogOpen : false})}
        />
                
              </div>
              <div className={"button_div"}>
                <PrimaryButton
                  variant={"contained"}
                  color={"primary"}
                  onClick={this.handleSave}
                  style={{
                    width: "100px",
                    display: "flex",
                    alignItems: "flex-end",
                    marginRight:"24px",
                    marginBottom:"25px"
                  }}
                >
                  Save
                </PrimaryButton>
              </div>
            </Grid>
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ppgaResponse: state.ProfileGapAnalysisReducer.ppgaCallNotes,
    updateResponse: state.ProfileGapAnalysisReducer.ppgaCall,
    getcommenthistoryList: state.ProfileGapAnalysisReducer.getcommenthistory,

  };
};
export default connect(mapStateToProps, {
  getPpgaCallNotes,
  updatePpgaCallNotes,
  getcommenthistory
})(PpgaCallNotes);
