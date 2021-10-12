import React, { Component } from "react";
import MarkSheetUpload from "./MarkSheetUpload";
import ViewDetails from "./ViewDetails";
import { Grid } from "@material-ui/core";
import "./DiplomaForm.css";
import BottomButton from "../BottomButton";
import { connect } from "react-redux";
import { viewAcademicDetails } from "../../../Actions/ProfileGapAction";
import { getAcademicType, isClickedSem } from "../../../Actions/HelperAction";
import { URL } from "../../../Actions/URL";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      list : {
        diploma : "Diploma",
        ug : "Undergraduate",
        pg : "Postgraduate"
      }
    };
  }

  componentDidMount() {
    this.props.viewAcademicDetails(
      this.props.match.params.studentId,
      this.props.academicTypes,
      (response) => {
        this.setState({
          data: response &&  response.data,
        });
      }
    );
  }

  //  markSheet(click) handle function
  handleCardClick = (data) => {   
    this.props.isClickedSem({data:data,number:Math.random});
  };

  handleClick = (data) => {
    console.log(data)
    window.open(
      URL +
        "/api/v1/files/download/" +
        this.props.match.params.studentId +
        "/" +
        data
    );
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        <Grid container position="relative" height="100vh">
          <Grid item md={12}>
            <Grid container>
              {/* View details */}
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <ViewDetails 
                item={this.state.data} 
                list={this.state.list}
                />
              </Grid>

              {/* divider grid */}
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <hr className={"divider"} />
              </Grid>

              {/* markSheet card */}
              {this.state.data &&
                this.state.data.semesterDetails.map((item) => (
                  <Grid
                    item
                    md={4}
                    xs={4}
                    sm={4}
                    xl={4}
                    lg={4}
                    spacing={3}
                    style={{ padding: "15px" }}
                  >
                    <MarkSheetUpload
                      {...this.props}
                      department={
                        this.state.data.department &&
                        this.state.data.department.name
                      }
                      university={
                        this.state.data.university &&
                        this.state.data.university.name
                      }
                      semester={item.semName}
                      markSheet={item.studentDocument.marksheetName}
                      score={item.score}
                      handleChange={() => {
                        console.log("card click")
                        this.handleCardClick(item.id)}
                      }
                      handleDownloadClick={() =>
                        this.handleClick(item.studentDocument.path)
                      }
                      data={item}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* divider and button grid */}

          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            position="absolute"
            bottom="0px"
            width="100%"
          >
            <BottomButton />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    academicTypes: state.HelperReducer.academicType,
    clickedSem: state.HelperReducer.clickedSem,
  };
};
export default connect(mapStateToProps, {
  viewAcademicDetails,
  getAcademicType,
  isClickedSem,
})(Index);
