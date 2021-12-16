import React, { Component } from "react";
import { connect } from "react-redux";
import { getDocumentList } from "../../Actions/Student";
import Grid from "@material-ui/core/Grid";
import DoccumentCard from "../Utils/DoccumentCard";
import { URL } from "../../Actions/URL";

export class UploadCV extends Component {
  componentDidMount() {
    this.props.getDocumentList(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
  }

  documentClick = (data) => {
    window.open(
      URL + "/api/v1/cv/download/cv/" + data.studentId + "/" + data.path
    );
  };
  render() {
    const { HeadStyle, GridStyle } = style;
    return (
      <div>
        <Grid container>
          <Grid item md={12}>
            <p style={HeadStyle}>Documents Received</p>
          </Grid>
          <Grid item md={12}>
            {this.props.getAllDocumentList.CV &&
              this.props.getAllDocumentList.CV.length !== 0 && (
                <Grid item md={12}>
                  <Grid item md={12} direction="column">
                    <p style={GridStyle}>CV</p>
                  </Grid>
                  <Grid item={12} container>
                    {this.props.getAllDocumentList.CV
                      ? this.props.getAllDocumentList.CV.map((data) => (
                          <Grid
                            item
                            md={4}
                            direction="row"
                            onClick={() => this.documentClick(data)}
                          >
                            <DoccumentCard
                              certificate={data.path}
                              date={data.uploadDate}
                              path={data.path}
                              studentid={this.props.match.params.studentId}
                              // category = 'cv'
                              // id = {data.ieltsId}
                              // status={this.state.documentedit}
                            />
                          </Grid>
                        ))
                      : null}
                  </Grid>
                </Grid>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
const style = {
  HeadStyle: {
    paddingTop: "18px",
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
  },
  GridStyle: {
    fontStyle: "Montserrat",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "16px",
    color: "#052A4E",
  },
};
const mapStateToProps = (state) => {
  return {
    getAllDocumentList: state.StudentReducer.getDocumentList,
  };
};

export default connect(mapStateToProps, {
  getDocumentList,
})(UploadCV);
