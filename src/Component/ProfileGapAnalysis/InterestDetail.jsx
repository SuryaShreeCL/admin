import { TextField, Grid, withStyles, createTheme,ThemeProvider } from "@material-ui/core";
import React, { Component } from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  deleteInterestDetails,
  getInterestDetails,
  saveInterestDetails,
} from "../../AsyncApiCall/Student";
import MySnackBar from "../MySnackBar";
import "./InterestDetail.css";

class InterestDetail extends Component {
  constructor(props) {
    super(props);

    // Setting Up Initial State

    this.state = {
      interestArr: [
        {
          id: "",
          areaOfInterest: "",
          updatedBy: {
            id: "",
          },
          helperText: "",
        },
      ],
      snackOpen: false,
      snackColor: "",
      snackMsg: "",
    };
  }
  // To get interest details

  getInterestDetails = () => {
    getInterestDetails(
      this.props.match.params.studentId,
      this.props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        if (response.data.length > 0) {
          const tempHolder = response.data.map((eachItem, index) => {
            return {
              id: eachItem.id,
              areaOfInterest: eachItem.interest,
              updatedBy: {
                id: eachItem.updatedBy.id,
              },
              helperText: "",
            };
          });
          this.setState({
            interestArr: tempHolder,
          });
        }
      }
    });
  };

  theme = createTheme({
   overrides : {
     MuiGrid : {
       "spacing-xs-3" : {
         padding : "0%",
         width : "100%",
         margin : "0px"
       }
     }
   }
  })
  componentDidMount() {
    this.getInterestDetails();
  }

  // For adding one more duplicate row in the form

  handleAdd = () => {
    let arr = this.state.interestArr;
    arr.push({
      id: "",
      areaOfInterest: "",
      updatedBy: {
        id: "",
      },
      helperText: "",
    });
    this.setState({
      interestArr: arr,
    });
  };

  // Delete a specific row

  handleDelete = (data, index) => {
    if (this.state.interestArr.length > 1) {
      if (data.id.length === 0) {

        // To delete a userdefined row

        let deleteArr = this.state.interestArr;
        deleteArr.splice(index, 1);
        this.setState({
          interestArr: deleteArr,
        });
      } else {

        // To delete a row that is comming from api

        deleteInterestDetails(data.id).then((response) => {
          if (response.status === 200) {
            this.getInterestDetails();
            this.setState({
              snackMsg: response.data,
              snackOpen: true,
              snackColor: "success",
            });
          }
        });
      }
    }
  };

  // Handles the changes in textbox

  handleTextChange = (e, index) => {
    // 1. Create a copy of a interest arr
    let items = [...this.state.interestArr];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item.areaOfInterest = e.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    this.setState({ interestArr: items });
  };

  // Handles save and update

  handleSave = () => {
    const adminuserId = window.sessionStorage.getItem("adminUserId");
    const productId = this.props.match.params.productId;
    const studentId = this.props.match.params.studentId;
    const requestBody = this.state.interestArr.map((eachItem, index) => {
      if (eachItem.id.length === 0) {
        return {
          interest: eachItem.areaOfInterest,
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
          interest: eachItem.areaOfInterest,
          updatedBy: {
            id:
              eachItem.updatedBy.id.length === 0
                ? adminuserId
                : eachItem.updatedBy.id,
          },
        };
      }
    });

    var error = false;
    for (let i = 0; i < requestBody.length; i++) {
      if (requestBody[i].interest.length === 0) {
        error = true;
        break;
      }
    }

    if (!error) {
      saveInterestDetails(studentId, productId, requestBody).then(
        (response) => {
          if (response.status === 200) {
            this.getInterestDetails();
            this.setState({
              snackColor: "success",
              snackOpen: true,
              snackMsg: "Saved Successfully",
            });
          }
        }
      );
    } else {
      this.setState({
        snackColor: "error",
        snackMsg: "Please fill the required field",
        snackOpen: true,
      });
    }
  };
  render() {
    const { classes } = this.props
    return (
      <div>
        <ThemeProvider theme={this.theme}>
        <Grid container spacing={3} className={classes.container}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            className={classes.topGrid}
          >
            {this.state.interestArr.map((data, index) => (
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                  <p>Area of Interest ({index + 1})</p>
                </Grid>
                {/* textfield */}
                <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                <Grid
                  item
                  md={5}
                  xs={5}
                  sm={5}
                  xl={5}
                  lg={5}
                  className={"grid"}
                >
                  <TextField
                    className={"textField_align"}
                    label="Enter interest Area"
                    value={data.areaOfInterest}
                    helperText={data.helperText}
                    error={data.helperText.length > 0}
                    onChange={(e) => this.handleTextChange(e, index)}
                    fullWidth
                  ></TextField>
                </Grid>

                <Grid item md={2} className={"icon_div"}>
                  <AddCircleOutlineIcon className={classes.addIcon}
                    color="primary"
                    onClick={() => this.handleAdd()}
                  />
                  <DeleteOutlineIcon
                    color="secondary"
                    onClick={() => {
                      this.handleDelete(data, index);
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

           {/* button */}
           <Grid container className={classes.bottomContainer}>
            <Grid item md={12} xs={12} sm={12} xl={12} lg={12} className={classes.dividerGrid}>
              <hr/>
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
              <hr/>
              <div className={"save_button_div"}>
                <PrimaryButton
                  variant={"contained"}
                  color={"primary"}
                  onClick={this.handleSave}
                 className={classes.button}
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
        </ThemeProvider>
      </div>
    );
  }
}

const useStyles = (theme) => ({
  button: {
    width: "100px",
    display: "flex",
    marginRight: "21px",
    marginBottom: "10px",
  },
  buttonGrid: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  dividerGrid : {
    width:"964px",
    marginLeft:"10px",
    marginRight:"11px",
  },
  bottomContainer : {
    height:"84px", 
    display:'flex', 
    alignSelf:'flex-end'
  },
  addIcon : {
    marginRight:"8px"
  },
  container: {
    height: "100vh"
  },
  topGrid : {
    maxHeight: "87%", 
    overflowY: "scroll", 
    padding: "15px"
  },
});


export default (withStyles(useStyles)(InterestDetail));