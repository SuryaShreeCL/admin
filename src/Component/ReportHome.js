import {
  Breadcrumbs,
  Button,
  Grid, Typography
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { connect } from "react-redux";
import {
  getCareerExpoReport,
  viewCvReport,
  viewDiagTestReport,
  viewMarkSheetReport,
  viewMydetailsReport,
  viewTechTestReport,
  viewTermsAndConReports,
  viewTestRating
} from "../Actions/Reports";
import BackButton from "../Asset/Images/backbutton.svg";
import { downloadReport } from "../AsyncApiCall/Student";
import { studentPath } from "./RoutePaths";
class ReportHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careerReportData: [],
      arr: [
        { col1: "one", col2: "two", col3: "three" },
        { col1: "1", col2: "2", col3: "3" },
      ],
      objectKeys: [],
    };
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.careerReport !== prevProps.careerReport) {
      let myArr = [];
      this.props.careerReport.map((eachReport) => {
        let myObj = {};
        for (const property in eachReport) {
          myObj[property] =
            typeof eachReport[property] === "object"
              ? ""
              : eachReport[property];
          if (
            typeof eachReport[property] !== "string" &&
            eachReport[property] !== null &&
            Object.keys(eachReport[property]).length !== 0
          ) {
            for (const innerProperty in eachReport[property]) {
              myObj[innerProperty] = eachReport[property][innerProperty];
            }
          }
        }
        myArr.push(myObj);

        this.setState({ careerReportData: myArr });
      });
    }

    if (this.state.careerReportData !== prevState.careerReportData) {
      this.setState({
        objectKeys: Object.keys(this.state.careerReportData[532]),
      });
    }
  }

  reportContent = [
    { title: "Terms And Condition", endPoint: "report/tnc" },
    { title: "My Details", endPoint: "report/mydetails" },
    { title: "CV Rating", endPoint: "reports/cvratings" },
    { title: "Mark Sheet", endPoint: "report/marksheet" },
    { title: "Test Rating", endPoint: "report/testRating" },
    {
      title: "Technical Test Computer",
      endPoint: "report/technicaltest/Technical Test Computer",
    },
    { title: "Diagnostic Test", endPoint: "report/diagonostictest" },
    { title: "Career Interest Test", endPoint: "reports/cit/Career Exploration Test" },
  ];

  handleDownloadClick = (title, endpoint) => {
    downloadReport(endpoint)
      .then((response) => {
        if (response.status === 201) {
          const downloadUrl = window.URL.createObjectURL(
            new Blob([response.data])
          );
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", `${title}.xls`); //any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.props.careerReport);
    console.log(this.state.objectKeys);
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <img
            src={BackButton}
            style={{ cursor: "pointer", marginTop: "-10px" }}
            onClick={() => this.props.history.goBack()}
          />
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Typography
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginLeft: "10px",
              }}
              onClick={() => this.props.history.push(studentPath)}
            >
              Home
            </Typography>
            <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
              Report
            </Typography>
          </Breadcrumbs>
        </div>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6">Reports</Typography>
          </Grid>
          {this.reportContent.map(({ title, endPoint }, index) => {
            return (
              <Grid
                item
                xs={12}
                justifyContent={"space-between"}
                alignItems={"center"}
                container
                style={{ borderBottom: "1px solid #f1f1f1" }}
              >
                <Typography>{title}</Typography>
                <Button
                  color={"primary"}
                  onClick={() => this.handleDownloadClick(title, endPoint)}
                  variant={"contained"}
                >
                  Download
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    termsAndConReport: state.ReportReducer.termsAndConReport,
    cvReport: state.ReportReducer.cvReport,
    markSheetReport: state.ReportReducer.markSheetReport,
    myDetailsReport: state.ReportReducer.myDetailsReport,
    techTestMechReport: state.ReportReducer.techTestMechReport,
    techTestCseReport: state.ReportReducer.techTestCseReport,
    testRatingResult: state.ReportReducer.testRatingResult,
    techTestElectronics: state.ReportReducer.techTestElectronics,
    diagTestResult: state.ReportReducer.diagTestResult,
    careerReport: state.ReportReducer.careerReportResult,
  };
};
export default connect(mapStateToProps, {
  viewTermsAndConReports,
  viewCvReport,
  viewMarkSheetReport,
  viewMydetailsReport,
  viewTechTestReport,
  viewTestRating,
  viewDiagTestReport,
  getCareerExpoReport,
})(ReportHome);
