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
import { viewSemesterDetails } from '../../../Actions/ProfileGapAction';
import { isClickedSem } from "../../../Actions/HelperAction";


class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentDocument: "",
      data: [],
      semesterData : []
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
     
    },
    {
      title: "Subject Name",
     
    },
    {
      title: "Grade Points",
     
    },
    {
      title: "Credit",
     
    },
    {
      title: "Type",
     
    },
    {
      title: "Result",
     
    },
    {
      title: "Pass/Fail",
     
    },
    {
      title: "Type",
     
    },
  ];

  handleRowAdd = (newData) => {
    console.log(newData);
  };

  handleRowDelete = (oldData) => {
    console.log(oldData);
  };

  componentDidMount () {
    this.props.viewSemesterDetails(this.props.match.params.studentId,this.props.clickedSem,(response)=>{
      console.log(response)
        this.setState({
         semesterData : response.data
        })
      
    })
  }

  render() {
    const {classes}  = this.props;
    console.log(this.state);

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
                <ViewSemesterDetails data={this.state.semesterData}/>

                <TableGrid
                  columns={this.columns}
                  data={this.state.data}
                  onRowDelete={this.handleRowDelete}
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
            <CvViewer path={this.state.studentDocument} {...this.props} />
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
  isClickedSem
})(withStyles(useStyles)(Index));