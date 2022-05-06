import { Breadcrumbs, Button, Grid, Typography } from "@material-ui/core";
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
  viewTestRating,
  getTestList,
} from "../Actions/Reports";
import BackButton from "../Asset/Images/backbutton.svg";
import { downloadReport } from "../AsyncApiCall/Student";
import { studentPath } from "./RoutePaths";
import DropDown from "../Utils/DropDown";
import {
  typographyStyle,
  BreadCrumpContainer,
} from "../Asset/StyledComponents/ReportStyles";
import Loader from "../Lms/Utils/Loader";
import { getReportProduct } from "../Actions/AdminAction";
class ReportHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      careerReportData: [],
      arr: [
        { col1: "one", col2: "two", col3: "three" },
        { col1: "1", col2: "2", col3: "3" },
      ],
      objectKeys: [],
      isDownloading: false,

      selectedItem: "",
      dynamicReportContent: [],
    };
  }

  componentDidMount() {
    let adminDetails = JSON.parse(
      window.sessionStorage.getItem("adminDetails")
    );
    let id = adminDetails.products[0].productFamily.id;
    if (id) {
      this.props.getReportProduct(id);
    }
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
    if (this.props.getProducts !== prevProps.getProducts) {
      if (this.props.getProducts) {
        var arr = this.props.getProducts.filter(
          (item) => item.isProduct === true
        );
        this.setState({
          productList: arr,
        });
      }
    }
  }

  reportContent = [
    { title: "Terms And Condition", endPoint: "report/tnc" },
    { title: "My Details", endPoint: "report/mydetails" },
    { title: "CV Rating", endPoint: "reports/cvratings" },
    { title: "Mark Sheet", endPoint: "report/marksheet" },
    { title: "Test Rating", endPoint: "report/testRating" },
  ];

  handleDownloadClick = (title, endpoint) => {
    this.setState({
      isDownloading: true,
    });
    downloadReport(endpoint, this.state.selectedItem).then((response) => {
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
        this.setState({
          isDownloading: false,
        });
      } else {
        this.setState({
          isDownloading: false,
        });
      }
    });
  };

  handleDynamicDownloadClick = (title) => {
    this.setState({
      isDownloading: true,
    });

    let endPoint = "";

    switch (title) {
      case "Career Interest Survey":
        endPoint = "reports/cit";
        break;
      case "Technical Test":
        endPoint = "report/technicaltest";
        break;
      case "Diagnostic Test":
        endPoint = "report/diagonostictest";
        break;
      case "Supplementary Questions":
        endPoint = "reports/supplementaryTest";
        break;
      case "Higher Education Readiness Survey":
        endPoint = "reports/higherEducationReadinessSurveyTest";
        break;
    }

    console.log(endPoint);

    downloadReport(endPoint, this.state.selectedItem).then((response) => {
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
        this.setState({
          isDownloading: false,
        });
      } else {
        this.setState({
          isDownloading: false,
        });
      }
    });
  };

  handleDropDownChange = (e) => {
    this.setState({ selectedItem: e.target.value });

    this.props.getTestList(e.target.value, (res) => {
      if (typeof res !== "string") {
        this.setState({ dynamicReportContent: res.data });
      }
    });
  };

  render() {
    let dropDownItems = [];
    console.log(this.state);

    if (this.props.linkedProducts.products)
      dropDownItems = this.props.linkedProducts.products;

    if (this.state.isDownloading) return <Loader />;
    else
      return (
        <div>
          <BreadCrumpContainer>
            <img
              src={BackButton}
              style={{ cursor: "pointer", marginTop: "-10px" }}
              onClick={() => this.props.history.goBack()}
            />
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Typography
                onClick={() => this.props.history.push(studentPath)}
                style={typographyStyle}
              >
                Home
              </Typography>
              <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
                Report
              </Typography>
            </Breadcrumbs>
          </BreadCrumpContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DropDown
                label="Products"
                name="products"
                items={this.state.productList}
                value={this.state.selectedItem}
                onChange={this.handleDropDownChange}
              />
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6">Reports</Typography>
            </Grid>
            {this.state.selectedItem &&
              this.reportContent.map(({ title, endPoint }, index) => {
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
                      disabled={this.state.isDownloading}
                      color={"primary"}
                      onClick={() => this.handleDownloadClick(title, endPoint)}
                      variant={"contained"}
                    >
                      Download
                    </Button>
                  </Grid>
                );
              })}

            {this.state.dynamicReportContent.map((item) => {
              return (
                <Grid
                  item
                  xs={12}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  container
                  style={{ borderBottom: "1px solid #f1f1f1" }}
                >
                  <Typography>{item.name}</Typography>
                  <Button
                    disabled={this.state.isDownloading}
                    color={"primary"}
                    onClick={() => this.handleDynamicDownloadClick(item.name)}
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
    linkedProducts: state.AdminReducer.adminLinkedProductDetails,
    getProducts: state.AdminReducer.getProductsInReports,
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
  getTestList,
  getReportProduct,
})(ReportHome);
