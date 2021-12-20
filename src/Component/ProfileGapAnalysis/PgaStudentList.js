import React, { Component } from "react";
import Loader from "../Utils/controls/Loader";
import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import DataGrid from "./DataGrid";
import { callSummaryLayoutPath, stagedTabsPath } from "../RoutePaths";
import { connect } from "react-redux";
import PrimaryButton from "../../Utils/PrimaryButton";
import { getpgalist } from "../../Actions/ProfileGapAction";
import { isEmptyString } from "../Validation";
import {  StudentStepDetails } from "../../Actions/Student";
import MySnackBar from "../MySnackBar";
class PgaStudentList extends Component {
  constructor() {
    super();
    this.state = {
      shrink: false,
      listOfusers: [],
      search : "",
      noResultpopup : false,
      status : {
        pending : "Pending",
        completed : "Completed"
      }
    };
  }
  renderPgaChip = (pgaCallStatus) => {
     if (pgaCallStatus.pgaCallStatus === "Completed") {
      return (
        <Chip
          label={this.state.status[pgaCallStatus.pgaCallStatus]}
          color={"primary"}
        />
      );
    }
     else if (pgaCallStatus.pgaCallStatus === null) {
      return (
        <Chip
          label={"Pending"}
          color={"secondary"}
        />
      );
    } 
    else {
      return (
        <Chip
          label={this.state.status[pgaCallStatus.pgaCallStatus]}
          color={"secondary"}
        />
      );
    }
  };
  renderPpgaChip = (ppgaCallStatus) => {
    return <Chip label={"Pending"} color={"secondary"} />;
  };
  handleManage = (eachItem) => {
    this.props.StudentStepDetails(eachItem.studentId,this.props.match.params.productId)
    this.props.history.push(
      stagedTabsPath +
        eachItem.studentId +
        "/" +
        this.props.match.params.productId +
        "?stage=pga"
    )
  }
  componentDidMount() {
    this.props.getpgalist(this.props.match.params.productId, "", (response) => {
      console.log(response);
      if(response.status === 200){
        this.setState({
          listOfusers : response.data.content,
          noResultpopup : response.data.totalElements === 0 ? true : false
        })
      }
    });
  }
  renderManageButton = (eachItem) => {
    return (
      <PrimaryButton
      onClick={() =>
        this.handleManage(eachItem)
      }
        variant={"contained"}
        color={"primary"}
        style={{ textTransform: "none", width: "100px" }}
      >
        Manage
      </PrimaryButton>
    );
  };
  shrink() {
    this.setState({ shrink: true });
  }
  handleSearch = () =>{

    if (!isEmptyString(this.state.search)) {
      this.props.getpgalist(
        this.props.match.params.productId,
        this.state.search,(response=>{
          this.setState({
            listOfusers : response.data.content,
            noResultpopup : response.data.totalElements === 0 ? true : false
          })
        })
      );
    }
     
  }
  render() {
    const { HeadStyle, HeadDisplay } = style;
    console.log(this.state)
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <div style={HeadDisplay}>
              <p style={HeadStyle}>
                {" "}
                List of Users in Profile Gap Analysis Stage{" "}
              </p>
              <div>
                <TextField
                  label={
                    <Typography style={{ fontSize: "13px", marginLeft: 5 }}>
                      Search by Email ID / Mobile / Full Name / CLS ID
                    </Typography>
                  }
                  variant="outlined"
                  value={this.state.search}
                  onChange={(e) => {
                    if(e.target.value.length === 0){
                        this.props.getpgalist(
                          this.props.match.params.productId,
                          "",(response=>{
                            this.setState({
                              listOfusers : response.data.content
                            })
                          })
                        )
                    }
                    this.setState({ search: e.target.value });
                  }}
                  InputLabelProps={{
                    shrink: this.state.shrink,
                  }}
                  onFocus={() => this.shrink()}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      document.getElementById("search").click();
                    }
                  }}
                />
                <IconButton
                  style={{ marginLeft: "8px" }}
                  onClick={this.handleSearch}
                  color="primary"
                  id={"search"}
                  aria-label="search"
                >
                  <SearchRoundedIcon />
                </IconButton>
              </div>
            </div>
            {this.state.listOfusers && this.state.listOfusers.length !== 0 ? (
              <DataGrid
                data={this.state.listOfusers}
                pgaCallStatus={this.renderPgaChip}
                ppgaCallStatus={this.renderPpgaChip}
                action={this.renderManageButton}
              />
            ) : (
              <Loader />
            )}
          </Grid>
        </Grid>
        <MySnackBar snackMsg={"No Result Found"} snackOpen={this.state.noResultpopup} snackVariant={"error"} onClose={()=>this.setState({noResultpopup : false})}/>
      </div>
    );
  }
}
const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#052A4E",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
};
const mapStateToProps = (state) => {
  return {
    StudentStepDetailsList : state.StudentReducer.StudentStepDetails
  };
};

export default connect(mapStateToProps, {
  getpgalist,StudentStepDetails
})(PgaStudentList);
