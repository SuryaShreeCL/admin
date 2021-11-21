import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { PDFViewer } from "@react-pdf/renderer";
import MsReport from "./GenerateReport/MsReport";
import MbaReport from "./GenerateReport/MbaReport";
import { MsSampleReport } from "./GenerateReport/SampleMsReport";
import { mbaReport } from "./GenerateReport/SampleMbaReport";
import { pbPlacement } from "./GenerateReport/PbPlacementSample";
import {
  getReportPreview,
  getReportStatus,
} from "../../Actions/ProfileGapAction";
import { connect } from "react-redux";
import PbPlacementReport from "./GenerateReport/PbPlacementReport";
import { pbMaster } from "./GenerateReport/PbMasterSample";
import PbMasterReport from "./GenerateReport/PbMasterReport";
import MbaPbReport from "./GenerateReport/MbaPbReport";
import MimPbReport from "./GenerateReport/MimPbReport";

class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportData: [],
    };
  }

  componentDidMount() {
    this.props.getReportStatus(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        console.log(response);
      }
    );
    this.props.getReportPreview(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      // "5",

      (response) => {
        console.log(response);
        this.setState({
          //   reportData: MsSampleReport && MsSampleReport.data,
          // reportData: mbaReport && mbaReport.data,
          reportData: response.data.data,
        });
      }
    );
  }

  mbaReportHeader = [
    {
      title: "Management Fit",
      description:
        "includes various parameters like leadership potential, ability to be part of the team,etc.",
    },
    {
      title: "Intellectual Abilities",
      description:
        "includes various parameters like academic excellence, critical thinking, and analytical abilities, etc.",
    },
    {
      title: "People Skills",
      description:
        "includes various parameters like personality, contribution to the community,etc.",
    },
    {
      title: "MBA Program Fit",
      description:
        "includes various parameters that are important to the admissions committee like career growth,employability potential,etc.",
    },
    {
      title: "Global Mindset",
      description:
        "includes various parameters like experience of working abroad or of working are of working in a multi-cultural environment,etc.",
    },
  ];

  renderReport = () => {
    let productId = this.props.match.params.productId;
    console.log(productId, "oooooooooooooooooooooo");
    if (productId === "7" || productId === "5") {
      console.log("mmmmmmmmmmmmmmmmmm");
      return (
        <MbaReport
          content={this.state.reportData.contents || []}
          assessment={this.mbaReportHeader}
        />
      );
    } else {
      console.log("ttttttttttttttttt");

      return <MsReport content={this.state.reportData.contents || []} />;
    }
  };

  render() {
    console.log(this.state, "sssssssssssssssssss");
    return (
      <div>
        <Grid container>
          <Grid item md={12}>
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
              {this.renderReport()}
            </PDFViewer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, {
  getReportPreview,
  getReportStatus,
})(Preview);
