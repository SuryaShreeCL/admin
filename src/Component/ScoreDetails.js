import React from "react";
import Button from "@material-ui/core/Button";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { viewscoredetails } from "../Actions/ScoreDetails";
import { Component } from "react";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

//  props.viewscoredetails(props.id);
// console.log(props.viewScoreDetailsList)
class ScoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreDetails : []
    };
  }

  componentDidMount() {
    this.props.viewscoredetails(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.viewScoreDetailsList !== prevProps.viewScoreDetailsList){
      this.setState({scoreDetails : this.props.viewScoreDetailsList})
    }
    if(this.state.scoreDetails !== prevState.scoreDetails){
      let initialId = 1
      this.state.scoreDetails.map((scoreDet)=>{
        scoreDet.id = initialId++
      })
    }
  }
  

  render() {
    console.log(this.state.scoreDetails)
    const columns = [
      { field: "id", headerName: "ID", width: 200 },
      { field: "questionSetName", headerName: "Question Set Name", width: 350 },
      { field: "score", headerName: "Score", width: 300 },
      { field: "total", headerName: "Total", width: 350 },
    ];

    console.log(this.props.viewScoreDetailsList);
    return (
      <div>
        {/* <h6>Score Details</h6>
             <h6> {this.props.viewScoreDetailsList.map(mark=><li>{mark.questionSetName}:{mark.score}</li>)}</h6> */}
        <Grid container>
          <Grid item md={12} style={{ height: "100vh" }}>
            <DataGrid
            autoHeight
            autoPageSize
            loading={this.state.scoreDetails.length === 0}
              rows={this.state.scoreDetails.length !== 0 ? this.state.scoreDetails : []}
              columns={columns}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);

  return {
    viewScoreDetailsList: state.ScoreDetailsReducer.viewScoreDetailsList,
  };
};

export default connect(mapStateToProps, {
  viewscoredetails,
})(ScoreDetails);
