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

class PgaStudentList extends Component {
  constructor() {
    super();
    this.state = {
      shrink: false,
      listOfusers: [],
      search : ""
    };
  }
  renderPgaChip = (pgaCallStatus) => {
     if (pgaCallStatus.pgaCallStatus === "Completed") {
      return (
        <Chip
          label={pgaCallStatus.pgaCallStatus}
          color={"primary"}
        />
      );
    }
    //  else if (pgaCallStatus.pgaCallStatus === null) {
    //   return (
    //     <Chip
    //       label={"Pending"}
    //       color={"secondary"}
    //     />
    //   );
    // } 
    else {
      return (
        <Chip
          label={pgaCallStatus.pgaCallStatus}
          color={"secondary"}
        />
      );
    }
  };
  renderPpgaChip = (ppgaCallStatus) => {
    return <Chip label={"Pending"} color={"secondary"} />;
  };
  componentDidMount() {
    this.props.getpgalist(this.props.match.params.productId, "", (response) => {
      console.log(response);
      if(response.status === 200){
        this.setState({
          listOfusers : response.data.content
        })
      }
    });
  }
  renderManageButton = (eachItem) => {
    return (
      <PrimaryButton
        onClick={() =>
          this.props.history.push(
            stagedTabsPath +
              eachItem.studentId +
              "/" +
              this.props.match.params.productId +
              "?stage=pga"
          )
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
            listOfusers : response.data.content
          })
        })
      );
    }
     
  }
  componentDidUpdate(prevState,prevProps){
    if(this.state.search !== prevState.search){
      if(isEmptyString(this.state.search)){
        this.props.getpgalist(
          this.props.match.params.productId,
          "",(response=>{
            if(response.status === 200){
              this.setState({
                listOfusers : response.data.content
              })
            }
          })
        );
      }
    }
   }
  render() {
    const { HeadStyle, HeadDisplay } = style;
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
            {this.state.listOfusers.length !== 0 ? (
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
  return {};
};

export default connect(mapStateToProps, {
  getpgalist,
})(PgaStudentList);
