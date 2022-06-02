import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  createMuiTheme,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import { ExpandMore } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DoccumentCard from "../Utils/DoccumentCard";
import {
  viewStudentStatus,
  updateVerificationStatus,
} from "../../Actions/AdminAction";
import Status from "../Utils/Status";
import { SECTION } from "../../Constant/Variables";
import Model from "../Utils/SectionModel";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllColleges,
  getBranches,
  getDegree,
  getPGDegree,
  getUniversity,
} from "../../Actions/College";
import {
  getAcademicInfo,
  updateAcademicInfo,
  getStudentsById,
  sscexamboard,
  getDocumentList,
} from "../../Actions/Student";
import { getVariantStepsById } from "../../Actions/ProductAction";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";
import { URL } from "../../Actions/URL";
import MySnackBar from "../MySnackBar";
import { ErrorMessage,isSpace, spaceRemoveRegex } from "../Validation";
import * as moment from "moment";

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
    },
    MuiFormHelperText: {
      root: {
        color: "red",
      },
    },
  },
});
export class academicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackMsg: "",
      snackOpen: false,
      snackVariant: "",
      expanded: "panel1",
      open: false,
      ugCollege: "",
      ugCollegeErr: "",
      ugUniversity: "",
      ugUniversityErr: "",
      ugDepartment: "",
      ugDepartmentErr: "",
      ugDegree: "",
      ugDegreeErr: "",
      ugSemester: "",
      ugSemesterErr: "",
      ugCgpaScale: "",
      ugCgpaScaleErr: "",
      ugStartDate: null,
      ugStartDateErr: "",
      ugEndDate: null,
      ugEndDateErr: "",
      ugCgpaErr: "",
      ugCgpa: "",

      pgCollege: "",
      pgCollegeErr: "",
      pgUniversity: "",
      pgUniversityErr: "",
      pgDepartment: "",
      pgDepartmentErr: "",
      pgDegree: "",
      pgDegreeErr: "",
      pgSemester: "",
      pgSemesterErr: "",
      pgYear: "",
      pgYearErr: "",
      pgStartDate: null,
      pgStartDateErr: "",
      pgEndDate: null,
      pgEndDateErr: "",
      pgCgpa: "",
      pgCgpaErr: "",
      pgCgpaScale: "",
      pgCgpaScaleErr: "",

      diplomaCollege: "",
      diplomaCollegeErr: "",
      diplomoUniversity: "",
      diplomoUniversityErr: "",
      diplomoDepartment: "",
      diplomoDepartmentErr: "",
      diplomoDegree: "",
      diplomoDegreeErr: "",
      diplomoEndDate: null,
      diplomoEndDateErr: "",
      diplomostartDate: null,
      diplomostartDateErr: "",
      diplomoCgpaScale: "",
      diplomoCgpaScaleErr: "",
      diplomoCgpa: "",
      diplomoCgpaErr: "",

      tenthSchool: "",
      tenthSchoolErr: "",
      tenthExamBoard: "",
      tenthExamBoardErr: "",
      tenthType: "",
      tenthTypeErr: "",
      tenthStartDate: null,
      tenthStartDateErr: "",
      tenthEndDate: null,
      tenthEndDateErr: "",
      tenthCgpa: "",
      tenthCgpaErr: "",
      tenthCgpaScaleErr: "",
      tenthCgpaScale: "",

      twelthSchool: "",
      twelthSchoolErr: "",
      twelthExamBoard: "",
      twelthExamBoardErr: "",
      twelthType: "",
      twelthTypeErr: "",
      twelthStartDate: null,
      twelthStartDateErr: "",
      twelthEndDate: null,
      twelthEndDateErr: "",
      twelthCgpa: "",
      twelthCgpaErr: "",
      twelthCgpaScaleErr: "",
      twelthCgpaScale: "",
      sectionStatus: {
        model: false,
        data: null,
        sectionName: "",
      },
      documentedit: true,
    };
  }

  componentDidMount() {
    this.props.getBranches();
    this.props.getDegree();
    this.props.getPGDegree();
    this.props.getAllColleges();
    this.props.getUniversity();
    this.props.sscexamboard();
    this.props.getAcademicInfo(this.props.match.params.studentId);
    this.props.getStudentsById(this.props.match.params.studentId);
    this.props.viewStudentStatus(this.props.match.params.studentId);
    this.props.getVariantStepsById(
      this.props.match.params.productId +
        `?studentId=${this.props.match.params.studentId}`
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.getAcademicInfoList.length > 0 &&
      this.props.getAcademicInfoList !== prevProps.getAcademicInfoList
    ) {
      const { scoreScale } = this.props.getAcademicInfoList;
      let ugDetails = null;
      this.props.getAcademicInfoList.map((data) => {
        if (data.type === "ug") {
          ugDetails = data;
        }
      });
      if (ugDetails) {
        var ugScale = ugDetails.scoreScale;
        this.setState({
          ugCollege: ugDetails.college,
          ugUniversity: ugDetails.university,
          ugDepartment: ugDetails.department,
          ugDegree: ugDetails.degree,
          ugSemester: ugDetails.currentSem,
          ugCgpaScale: { title: ugScale.toString(), value: ugScale },
          ugCgpa: ugDetails.score,
          ugStartDate: ugDetails.startDate,
          ugEndDate: ugDetails.endDate,
        });
      }
      let pgDetails = null;
      this.props.getAcademicInfoList.map((data) => {
        if (data.type === "pg") {
          pgDetails = data;
        }
      });
      if (pgDetails) {
        var pgScale = pgDetails.scoreScale;
        this.setState({
          pgCollege: pgDetails.college,
          pgUniversity: pgDetails.university,
          pgDepartment: pgDetails.department,
          pgDegree: pgDetails.degree,
          pgCgpa: pgDetails.score,
          pgCgpaScale: { title: pgScale.toString(), value: pgScale },
          pgStartDate: pgDetails.startDate,
          pgEndDate: pgDetails.endDate,
        });
      }
      let diplomaDetails = null;
      this.props.getAcademicInfoList.map((data) => {
        if (data.type === "diploma") {
          diplomaDetails = data;
        }
      });
      if (diplomaDetails) {
        const { diplomaType } = diplomaDetails;

        var diplomoScale = diplomaDetails.scoreScale;
        this.setState({
          diplomaCollege: diplomaDetails.college,
          diplomoUniversity: diplomaDetails.university,
          diplomoDepartment: { title: diplomaType },
          diplomoDegree: diplomaDetails.degree,
          diplomoEndDate: diplomaDetails.endDate,
          diplomostartDate: diplomaDetails.startDate,
          diplomoCgpaScale: {
            title: diplomoScale && diplomoScale.toString(),
            value: diplomoScale,
          },
          diplomoCgpa: diplomaDetails.score,
        });
      }
      let tenthDetails = null;
      this.props.getAcademicInfoList.map((data) => {
        if (data.type === "ssc") {
          tenthDetails = data;
        }
      });
      if (tenthDetails) {
        var tenthScale = tenthDetails.scoreScale;
        this.setState({
          tenthSchool: tenthDetails.schoolName,
          tenthExamBoard: tenthDetails.examBoard,
          tenthCgpaScale: { title: tenthScale.toString(), value: tenthScale },
          tenthStartDate: tenthDetails.startDate,
          //  moment(new Date(tenthDetails.startDate)).format(
          //   "yyyy-MM"
          // ),
          tenthEndDate: tenthDetails.endDate,
          // moment(new Date(tenthDetails.endDate)).format(
          //   "yyyy-MM"
          // ),
          tenthCgpa: tenthDetails.score,
        });
      }

      let twelthDetails = null;
      this.props.getAcademicInfoList.map((data) => {
        if (data.type === "hsc") {
          twelthDetails = data;
        }
      });

      if (twelthDetails) {
        var twelthScale = twelthDetails.scoreScale;
        this.setState({
          twelthSchool: twelthDetails.schoolName,
          twelthExamBoard: twelthDetails.examBoard,
          // twelthStartDate: moment(new Date(twelthDetails.startDate)).format(
          //   "yyyy-MM"
          // ),
          // twelthEndDate: moment(new Date(twelthDetails.endDate)).format(
          //   "yyyy-MM"
          // ),
          twelthStartDate: twelthDetails.startDate,
          twelthEndDate: twelthDetails.endDate,
          twelthCgpa: twelthDetails.score,
          twelthCgpaScale: {
            title: twelthScale.toString(),
            value: twelthScale,
          },
        });
      }
    }
  }
  documentClick = (data) => {
    // this.props.downloadGAT(this.props.match.params.studentId,data.type)
    window.open(
      URL +
        "/api/v1/files/download/" +
        this.props.match.params.studentId +
        "/" +
        data.path
    );
  };

  handleChange = (panel) => (event, newExpanded) => {
    this.setState({ expanded: newExpanded ? panel : false });
  };

  Accordion = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
      borderRadius: 20,
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
      MuiInputLabel: {
        root: {
          whiteSpace: "nowrap",
          fontSize: "inherit",
        },
      },
      MuiFormControl: {
        marginNormal: {
          marginTop: "0px",
          marginBottom: "0px",
        },
      },
    },
    expanded: {},
  })(MuiAccordion);

  AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      marginTop: 15,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "20px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  handleSave = () => {
    console.log(
      "handleSave////////////////////////////",
      this.state.pgEndDate,
      this.state.pgStartDate
    );
    var error = false;
    let hlptxt = "Please fill the required field";
    // this.state.pgCollege === ""
    //   ? this.setState({ pgCollegeErr: hlptxt })
    //   : this.setState({ pgCollegeErr: "" });
    // this.state.ugCollege === ""
    //   ? this.setState({ ugCollegeErr: hlptxt })
    //   : this.setState({ ugCollegeErr: "" });
    // this.state.pgUniversity === ""
    //   ? this.setState({ pgUniversityErr: hlptxt })
    //   : this.setState({ pgUniversityErr: "" });
    // this.state.ugUniversity === ""
    //   ? this.setState({ ugUniversityErr: hlptxt })
    //   : this.setState({ ugUniversityErr: "" });
    // this.state.ugDepartment === ""
    //   ? this.setState({ ugDepartmentErr: hlptxt })
    //   : this.setState({ ugDepartmentErr: "" });
    // this.state.pgDepartment === ""
    //   ? this.setState({ pgDepartmentErr: hlptxt })
    //   : this.setState({ pgDepartmentErr: "" });
    // this.state.ugDegree === ""
    //   ? this.setState({ ugDegreeErr: hlptxt })
    //   : this.setState({ ugDegreeErr: "" });
    // this.state.pgDegree === ""
    //   ? this.setState({ pgDegreeErr: hlptxt })
    //   : this.setState({ pgDegreeErr: "" });
    // this.state.pgSemester === ""
    //   ? this.setState({ pgSemesterErr: hlptxt })
    //   : this.setState({ pgSemesterErr: "" });
    // this.state.pgYear === ""
    //   ? this.setState({ pgYearErr: hlptxt })
    //   : this.setState({ pgYearErr: "" });
    // this.state.pgCgpa === ""
    //   ? this.setState({ pgCgpaErr: hlptxt })
    //   : this.setState({ pgCgpaErr: "" });
    // this.state.pgCgpaScale === ""
    //   ? this.setState({ pgCgpaScaleErr: hlptxt })
    //   : this.setState({ pgCgpaScaleErr: "" });
    // this.state.pgStartDate === null
    //   ? this.setState({ pgStartDateErr: hlptxt })
    //   : this.setState({ pgStartDateErr: "" });
    // this.state.pgEndDate === null
    //   ? this.setState({ pgEndDateErr: hlptxt })
    //   : this.setState({ pgEndDateErr: "" });
    // this.state.ugSemester === ""
    //   ? this.setState({ ugSemesterErr: hlptxt})
    //   : this.setState({ ugSemesterErr: "" });
    // this.state.ugCgpaScale === ""
    //   ? this.setState({ ugCgpaScaleErr: hlptxt })
    //   : this.setState({ ugCgpaScaleErr: "" });
    // this.state.ugCgpa === ""
    //   ? this.setState({ ugCgpaErr: hlptxt })
    //   : this.setState({ ugCgpaErr: "" });
    // this.state.ugStartDate === null
    //   ? this.setState({ ugStartDateErr: hlptxt })
    //   : this.setState({ ugStartDateErr: "" });
    // this.state.ugEndDate === null
    //   ? this.setState({ ugEndDateErr: hlptxt })
    //   : this.setState({ ugEndDateErr: "" });
    // this.state.diplomaCollege === ""
    //   ? this.setState({ diplomaCollegeErr: hlptxt })
    //   : this.setState({ diplomaCollegeErr: "" });
    // this.state.diplomoUniversity === ""
    //   ? this.setState({ diplomoUniversityErr: hlptxt })
    //   : this.setState({ diplomoUniversityErr: "" });
    // this.state.diplomoDepartment === ""
    //   ? this.setState({ diplomoDepartmentErr: hlptxt })
    //   : this.setState({ diplomoDepartmentErr: "" });
    // this.state.diplomoDegree === ""
    //   ? this.setState({ diplomoDegreeErr: hlptxt })
    //   : this.setState({ diplomoDegreeErr: "" });
    // this.state.diplomostartDate === null
    //   ? this.setState({ diplomostartDateErr: hlptxt })
    //   : this.setState({ diplomostartDateErr: "" });
    // this.state.diplomoCgpaScale === ""
    //   ? this.setState({ diplomoCgpaScaleErr: hlptxt })
    //   : this.setState({ diplomoCgpaScaleErr: "" });
    // this.state.diplomoCgpa === ""
    //   ? this.setState({ diplomoCgpaErr: hlptxt })
    //   : this.setState({ diplomoCgpaErr: "" });
    // this.state.diplomoEndDate === null
    //   ? this.setState({ diplomoEndDateErr: hlptxt })
    //   : this.setState({ diplomoEndDateErr: "" });
    // this.state.tenthSchool === ""
    //   ? this.setState({ tenthSchoolErr: hlptxt })
    //   : this.setState({ tenthSchoolErr: "" });
    // this.state.tenthExamBoard === ""
    //   ? this.setState({ tenthExamBoardErr: hlptxt })
    //   : this.setState({ tenthExamBoardErr: "" });
    // this.state.tenthType === ""
    //   ? this.setState({ tenthTypeErr: hlptxt })
    //   : this.setState({ tenthTypeErr: "" });
    // this.state.tenthCgpa === ""
    //   ? this.setState({ tenthCgpaErr: hlptxt })
    //   : this.setState({ tenthCgpaErr: "" });
    // this.state.tenthStartDate === null
    //   ? this.setState({ tenthStartDateErr: hlptxt })
    //   : this.setState({ tenthStartDateErr: "" });
    // this.state.tenthEndDate === null
    //   ? this.setState({ tenthEndDateErr: hlptxt })
    //   : this.setState({ tenthEndDateErr: "" });
    // this.state.tenthSchool === ""
    //   ? this.setState({ tenthSchoolErr: hlptxt })
    //   : this.setState({ tenthSchoolErr: "" });
    // this.state.tenthExamBoard === ""
    //   ? this.setState({ tenthExamBoardErr: hlptxt })
    //   : this.setState({ tenthExamBoardErr: "" });
    // this.state.tenthType === ""
    //   ? this.setState({ tenthTypeErr: hlptxt })
    //   : this.setState({ tenthTypeErr: "" });
    // this.state.tenthCgpa === ""
    //   ? this.setState({ tenthCgpaErr: hlptxt })
    //   : this.setState({ tenthCgpaErr: "" });
    // // this.state.tenthStartDate === ""
    // //   ? this.setState({ tenthStartDateErr: hlptxt })
    // //   : this.setState({ tenthStartDateErr: "" });
    // // this.state.tenthEndDate === ""
    // //   ? this.setState({ tenthEndDateErr: hlptxt })
    // //   : this.setState({ tenthEndDateErr: "" });
    // this.state.tenthCgpaScale === ""
    //   ? this.setState({ tenthCgpaScaleErr: hlptxt })
    //   : this.setState({ tenthCgpaScaleErr: "" });
    // this.state.twelthSchool === ""
    //   ? this.setState({ twelthSchoolErr: hlptxt })
    //   : this.setState({ twelthSchoolErr: "" });
    // this.state.twelthExamBoard === ""
    //   ? this.setState({ twelthExamBoardErr: hlptxt })
    //   : this.setState({ twelthExamBoardErr: "" });
    // this.state.twelthType === ""
    //   ? this.setState({ twelthTypeErr: hlptxt })
    //   : this.setState({ twelthTypeErr: "" });
    // this.state.twelthCgpa === ""
    //   ? this.setState({ twelthCgpaErr: hlptxt })
    //   : this.setState({ twelthCgpaErr: "" });
    // this.state.twelthStartDate === null
    //   ? this.setState({ twelthStartDateErr: hlptxt })
    //   : this.setState({ twelthStartDateErr: "" });
    // this.state.twelthEndDate === null
    //   ? this.setState({ twelthEndDateErr: hlptxt })
    //   : this.setState({ twelthEndDateErr: "" });
    // this.state.twelthCgpaScale === ""
    //   ? this.setState({ twelthCgpaScaleErr: hlptxt })
    //   : this.setState({ twelthCgpaScaleErr: "" });
    {
      var obj = [
        {
          examBoard: {
            id: this.state.tenthExamBoard.id,
          },
          schoolName: this.state.tenthSchool,
          score: this.state.tenthCgpa,
          scoreScale: this.state.tenthCgpaScale.title,
          // startDate: new Date(this.state.tenthStartDate),
          strStartDate: this.state.tenthStartDate,
          strEndDate: this.state.tenthEndDate,
          // endDate: new Date(this.state.tenthEndDate),
          type: "ssc",
        },
        {
          examBoard: {
            id: this.state.twelthExamBoard.id,
          },
          schoolName: this.state.twelthSchool,
          score: this.state.twelthCgpa,
          scoreScale: this.state.twelthCgpaScale.title,
          // startDate: new Date(this.state.twelthStartDate),
          // endDate: new Date(this.state.twelthEndDate),
          strStartDate: this.state.twelthStartDate,
          strEndDate: this.state.twelthEndDate,
          type: "hsc",
        },
        {
          college: {
            id: this.state.ugCollege.id,
            name: this.state.ugCollege.name,
          },
          department: {
            id: this.state.ugDepartment.id,
            name: this.state.ugDepartment.name,
          },
          university: {
            id: this.state.ugUniversity.id,
            name: this.state.ugUniversity.name,
          },
          degree: {
            id: this.state.ugDegree.id,
            name: this.state.ugDegree.name,
          },
          // startDate: new Date(this.state.ugStartDate),
          // endDate: new Date(this.state.ugEndDate),
          strStartDate: this.state.ugStartDate,
          strEndDate: this.state.ugEndDate,
          score: this.state.ugCgpa,
          scoreScale: this.state.ugCgpaScale.title,
          type: "ug",
        },
        {
          college: {
            id: this.state.pgCollege.id,
            name: this.state.pgCollege.name,
          },
          department: {
            id: this.state.pgDepartment.id,
            name: this.state.pgDepartment.name,
          },
          university: {
            id: this.state.pgUniversity.id,
            name: this.state.pgUniversity.name,
          },
          degree: {
            id: this.state.pgDegree.id,
            name: this.state.pgDegree.name,
          },
          // startDate: new Date(this.state.pgStartDate),
          // endDate: new Date(this.state.pgEndDate),
          strStartDate: this.state.pgStartDate,
          strEndDate: this.state.pgEndDate,
          score: this.state.pgCgpa,
          scoreScale: this.state.pgCgpaScale.title,
          type: "pg",
        },
        {
          college: {
            id: this.state.diplomaCollege.id,
            name: this.state.diplomaCollege.name,
          },
          university: {
            id: this.state.diplomoUniversity.id,
            name: this.state.diplomoUniversity.name,
          },
          // startDate: new Date(this.state.diplomostartDate),
          // endDate: new Date(this.state.diplomoEndDate),
          strStartDate: this.state.diplomostartDate,
          strEndDate: this.state.diplomoEndDate,
          score: this.state.diplomoCgpa,
          scoreScale: this.state.diplomoCgpaScale.title,
          diplomaType: this.state.diplomoDepartment.title,
          type: "diploma",
        },
      ];
      if (
        this.state.pgStartDate !== null ||
        this.state.pgEndDate !== null ||
        this.state.pgStartDate !== "" ||
        this.state.pgEndDate !== ""
      ) {
        if (
          moment(new Date(this.state.pgStartDate)).format("YYYY-MM") ===
          moment(new Date(this.state.pgEndDate)).format("YYYY-MM")
        ) {
          this.setState({
            pgEndDateErr: "Please Choose the Valid date",
          });
          error = true;
        } else if (
          moment(new Date(this.state.pgStartDate)).format("YYYY-MM") >
          moment(new Date(this.state.pgEndDate)).format("YYYY-MM")
        ) {
          this.setState({
            pgEndDateErr: "Please Choose the Valid date",
          });
          error = true;
        } else {
          error = false;
        }
      } else {
        this.setState({
          pgEndDateErr: "",
        });
        error = false;
      }
    }
    if (
      this.state.ugStartDate !== null ||
      this.state.ugEndDate !== null ||
      this.state.ugStartDate !== "" ||
      this.state.ugEndDate !== ""
    ) {
      if (
        moment(new Date(this.state.ugStartDate)).format("YYYY-MM") ===
        moment(new Date(this.state.ugEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          ugEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else if (
        moment(new Date(this.state.ugStartDate)).format("YYYY-MM") >
        moment(new Date(this.state.ugEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          ugEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else {
        error = false;
      }
    } else {
      this.setState({
        ugEndDateErr: "",
      });
      error = false;
    }
    if (
      this.state.diplomostartDate !== null ||
      this.state.diplomoEndDate !== null ||
      this.state.diplomostartDate !== "" ||
      this.state.diplomoEndDate !== ""
    ) {
      if (
        moment(new Date(this.state.diplomostartDate)).format("YYYY-MM") ===
        moment(new Date(this.state.diplomoEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          diplomoEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else if (
        moment(new Date(this.state.diplomostartDate)).format("YYYY-MM") >
        moment(new Date(this.state.diplomoEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          diplomoEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else {
        error = false;
      }
    } else {
      this.setState({
        diplomoEndDateErr: "",
      });
      error = false;
    }
    if (
      this.state.twelthStartDate !== null ||
      this.state.twelthEndDate !== null ||
      this.state.twelthStartDate !== "" ||
      this.state.twelthEndDate !== ""
    ) {
      if (
        moment(new Date(this.state.twelthStartDate)).format("YYYY-MM") ===
        moment(new Date(this.state.twelthEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          twelthEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else if (
        moment(new Date(this.state.twelthStartDate)).format("YYYY-MM") >
        moment(new Date(this.state.twelthEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          twelthEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else {
        error = false;
      }
    } else {
      this.setState({
        twelthEndDateErr: "",
      });
      error = false;
    }
    if (
      this.state.tenthStartDate !== null ||
      this.state.tenthEndDate !== null ||
      this.state.tenthStartDate !== "" ||
      this.state.tenthEndDate !== ""
    ) {
      if (
        moment(new Date(this.state.tenthStartDate)).format("YYYY-MM") ===
        moment(new Date(this.state.tenthEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          tenthEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else if (
        moment(new Date(this.state.tenthStartDate)).format("YYYY-MM") >
        moment(new Date(this.state.tenthEndDate)).format("YYYY-MM")
      ) {
        this.setState({
          tenthEndDateErr: "Please Choose the Valid date",
        });
        error = true;
      } else {
        error = false;
      }
    } else {
      this.setState({
        tenthEndDateErr: "",
      });
      error = false;
    }
    if (!error) {
      this.props.updateAcademicInfo(
        this.props.match.params.studentId,
        obj,
        (response) => {
          if (response.status === 200) {
            this.setState({
              snackMsg: "Updated Successfully",
              snackOpen: true,
              snackVariant: "success",
            });
          }
        }
      );
    }
  };

  gpascale = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];
  stream = [
    { title: "PCB", value: "PCB" },
    { title: "PCM", value: "PCM" },
    { title: "PCBM", value: "PCBM" },
    { title: "PCMB", value: "PCBM" },
    { title: "PCMC", value: "PCMC" },
    { title: "Vocational", value: "Vocational" },
    { title: "others", value: "others" },
  ];

  diplomaType = [
    { title: "Diploma", value: "Diploma" },
    { title: "Post Graduate Diploma", value: "Post Graduate Diploma" },
  ];

  getStatus = (sectionName) => {
    if (this.props.studentStatus && this.props.studentStatus.length !== 0) {
      const { studentStatus } = this.props;
      return studentStatus.find((item) => item.sectionName === sectionName);
    }
  };

  renderModel = () => (
    <Model
      data={this.state.sectionStatus}
      handleClose={() =>
        this.setState({
          sectionStatus: {
            ...this.state.sectionStatus,
            model: false,
          },
        })
      }
      section={this.state.sectionStatus}
      {...this.props}
    />
  );

  render() {
    const { HeadStyle, title, ans, secondary, GridStyle } = style;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <Card style={{ padding: 20 }}>
              <Grid container>
                <Grid item md={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "22%",
                      }}
                    >
                      <p style={HeadStyle}>Academic Information</p>
                      {/* <img
                        src={Warning}
                        height={17}
                        width={17}
                        style={{ position: "realative", top: 5 }}
                      /> */}
                      {/* <Status
                      onClick={() => {
                        this.setState({
                          sectionStatus: {
                            model: true,
                            data: this.getStatus(SECTION.educationDetail),
                            sectionName: SECTION.educationDetail,
                          },
                        });
                      }}
                      status={
                        this.getStatus(SECTION.educationDetail)
                          ? this.getStatus(SECTION.educationDetail).status
                          : "notVerified"
                      }
                    /> */}
                    </div>
                    <IconButton
                      disabled={this.props.variantStepList.adminObComplete}
                      onClick={() =>
                        this.setState({
                          documentedit: !this.state.documentedit,
                        })
                      }
                    >
                      <img src={Pencil} height={17} width={17} />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
              <ThemeProvider theme={theme}>
                <div style={{ marginTop: 5 }}>
                  <Accordion style={{ borderRadius: 15 }}>
                    <AccordionSummary
                      style={{ height: 49 }}
                      expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <Grid container direction="row" justify="flex-start">
                          <p style={title}>Postgraduate Degree</p>
                        </Grid>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            id="debug"
                            onChange={(e, newValue) =>
                              this.setState({
                                pgCollege: newValue,
                                pgCollegeErr: "",
                              })
                            }
                            disabled={this.state.documentedit}
                            options={this.props.getCollegesList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.pgCollege}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.pgCollegeErr.length > 0}
                                helperText={this.state.pgCollegeErr}
                                label="College Name"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            id="debug"
                            disabled={this.state.documentedit}
                            options={this.props.getUniversityList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.pgUniversity}
                            onChange={(e, newValue) =>
                              this.setState({
                                pgUniversity: newValue,
                                pgUniversityErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.pgUniversityErr.length > 0}
                                helperText={this.state.pgUniversityErr}
                                label="University Name"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            id="debug"
                            disabled={this.state.documentedit}
                            options={this.props.getBranchesList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.pgDepartment}
                            onChange={(e, newValue) =>
                              this.setState({
                                pgDepartment: newValue,
                                pgDepartmentErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.pgDepartmentErr.length > 0}
                                helperText={this.state.pgDepartmentErr}
                                label="Department"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            id="debug"
                            disabled={this.state.documentedit}
                            options={this.props.getPGDegreesList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.pgDegree}
                            onChange={(e, newValue) =>
                              this.setState({
                                pgDegree: newValue,
                                pgDegreeErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.pgDegreeErr.length > 0}
                                label="Degree"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>

                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.gpascale}
                            getOptionLabel={(option) => option.title}
                            value={this.state.pgCgpaScale}
                            onChange={(e, newValue) =>
                              this.setState({
                                pgCgpaScale: newValue,
                                pgCgpaScaleErr: "",
                                pgCgpa: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.pgCgpaScaleErr.length > 0}
                                helperText={this.state.pgCgpaScaleErr}
                                label="CGPA Scale"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            id="standard-basic"
                            disabled={
                              this.state.documentedit ||
                              this.state.pgCgpaScale === "" ||
                              this.state.pgCgpaScale === null
                            }
                            onKeyPress={(evt) => {
                              if (
                                isNumber(evt) ||
                                evt.target.value?.length >= 2
                              )
                                evt.preventDefault();
                            }}
                            label="CGPA"
                            onChange={(e) => {
                              if (this.state.pgCgpaScale) {
                                if (e.target.value) {
                                  if (e.target.value.length <= 3) {
                                    if (
                                      (parseInt(e.target.value) > 100 &&
                                        parseInt(
                                          this.state.pgCgpaScale &&
                                            this.state.pgCgpaScale.value
                                        ) < parseInt(e.target.value)) ||
                                      parseInt(e.target.value) < 0 ||
                                      parseFloat(
                                        parseInt(
                                          this.state.pgCgpaScale &&
                                            this.state.pgCgpaScale.value
                                        ).toFixed(2)
                                      ) < parseFloat(e.target.value).toFixed(2)
                                    ) {
                                      e.preventDefault();
                                    } else {
                                      this.setState({
                                        pgCgpa:
                                          e.target.value >= 0
                                            ? e.target.value
                                            : "",
                                        pgCgpaErr: "",
                                      });
                                    }
                                  }
                                } else {
                                  this.setState({
                                    pgCgpa: e.target.value,
                                    pgCgpaErr: "",
                                  });
                                }
                              } else {
                                this.setState({
                                  pgCgpa: e.target.value,
                                  pgCgpaErr: "",
                                });
                              }
                            }}
                            value={this.state.pgCgpa}
                            error={this.state.pgCgpaErr.length > 0}
                            onKeyPress={(evt) => {
                              if (isSpace(evt) || evt.target.value?.length >= 5)
                                evt.preventDefault();
                            }}
                            helperText={this.state.pgCgpaErr}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="Start Date"
                            value={this.state.pgStartDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                pgStartDate: e.target.value,
                                pgStartDateErr: "",
                              })
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={this.state.pgStartDateErr.length > 0}
                            helperText={this.state.pgStartDateErr}
                            disabled={this.state.documentedit}
                            name="startDate"
                            fullWidth
                            inputProps={{
                              max: moment(new Date()).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="End Date"
                            value={this.state.pgEndDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                pgEndDate: e.target.value,
                                pgEndDateErr: "",
                              })
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            min={this.state.pgStartDate}
                            error={this.state.pgEndDateErr.length > 0}
                            helperText={this.state.pgEndDateErr}
                            disabled={
                              this.state.documentedit ||
                              this.state.pgStartDate === null
                            }
                            name="EndDate"
                            fullWidth
                            inputProps={{
                              min: moment(
                                new Date(this.state.pgStartDate)
                              ).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={12}></Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion style={{ borderRadius: 15, marginTop: 15 }}>
                    <AccordionSummary
                      style={{ height: 49 }}
                      expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <Grid container direction="row" justify="flex-start">
                          <p style={title}>Undergraduate Degree</p>
                        </Grid>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.props.getCollegesList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.ugCollege}
                            onChange={(e, newValue) =>
                              this.setState({
                                ugCollege: newValue,
                                ugCollegeErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.ugCollegeErr.length > 0}
                                helperText={this.state.ugCollegeErr}
                                label="College Name"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.props.getUniversityList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.ugUniversity}
                            onChange={(e, newValue) =>
                              this.setState({
                                ugUniversity: newValue,
                                ugUniversityErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.ugUniversityErr.length > 0}
                                helperText={this.state.ugUniversityErr}
                                label="University Name"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.props.getBranchesList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.ugDepartment}
                            onChange={(e, newValue) =>
                              this.setState({
                                ugDepartment: newValue,
                                ugDepartmentErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.ugDepartmentErr.length > 0}
                                helperText={this.state.ugDepartmentErr}
                                label="Department"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.props.getDegreeList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.ugDegree}
                            onChange={(e, newValue) =>
                              this.setState({
                                ugDegree: newValue,
                                ugDegreeErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                error={this.state.ugDegreeErr.length > 0}
                                helperText={this.state.ugDegreeErr}
                                {...params}
                                label="Degree"
                                margin="normal"
                                disabled={this.state.documentedit}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.gpascale}
                            getOptionLabel={(option) => option.title}
                            value={this.state.ugCgpaScale}
                            onChange={(e, newValue) =>
                              this.setState({
                                ugCgpaScale: newValue,
                                ugCgpaScaleErr: "",
                                ugCgpa: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={this.state.ugCgpaScaleErr.length > 0}
                                helperText={this.state.ugCgpaScaleErr}
                                label="CGPA Scale"
                                InputLabelProps={{ shrink: true }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            id="standard-basic"
                            disabled={
                              this.state.documentedit ||
                              this.state.ugCgpaScale === "" ||
                              this.state.ugCgpaScale === null
                            }
                            label="CGPA"
                            onKeyPress={(evt) => {
                              if (
                                isNumber(evt) ||
                                evt.target.value?.length >= 2
                              )
                                evt.preventDefault();
                            }}
                            value={this.state.ugCgpa}
                            onChange={(e) => {
                              if (this.state.ugCgpaScale) {
                                if (e.target.value) {
                                  if (e.target.value.length <= 3) {
                                    if (
                                      (parseInt(e.target.value) > 100 &&
                                        parseInt(this.state.ugCgpaScale.value) <
                                          parseInt(e.target.value)) ||
                                      parseInt(e.target.value) < 0 ||
                                      parseFloat(
                                        parseInt(
                                          this.state.ugCgpaScale.value
                                        ).toFixed(2)
                                      ) < parseFloat(e.target.value).toFixed(2)
                                    ) {
                                      e.preventDefault();
                                    } else {
                                      this.setState({
                                        ugCgpa:
                                          e.target.value >= 0
                                            ? e.target.value
                                            : "",
                                        ugCgpaErr: "",
                                      });
                                    }
                                  }
                                } else {
                                  this.setState({
                                    ugCgpa: e.target.value,
                                    ugCgpaErr: "",
                                  });
                                }
                              } else {
                                this.setState({
                                  ugCgpa: e.target.value,
                                  ugCgpaErr: "",
                                });
                              }
                            }}
                            error={this.state.ugCgpaErr.length > 0}
                            onKeyPress={(evt) => {
                              if (isSpace(evt) || evt.target.value?.length >= 5)
                                evt.preventDefault();
                            }}
                            helperText={this.state.ugCgpaErr}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="Start Date"
                            value={this.state.ugStartDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                ugStartDate: e.target.value,
                                ugStartDateErr: "",
                              })
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={this.state.ugStartDateErr.length > 0}
                            helperText={this.state.ugStartDateErr}
                            disabled={this.state.documentedit}
                            name="startDate"
                            fullWidth
                            inputProps={{
                              max: moment(new Date()).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="End Date"
                            value={this.state.ugEndDate}
                            type="month"
                            minDate={this.state.ugStartDate}
                            onChange={(e) =>
                              this.setState({
                                ugEndDate: e.target.value,
                                ugEndDateErr: "",
                              })
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={
                              this.state.documentedit ||
                              this.state.ugStartDate === null
                            }
                            error={this.state.ugEndDateErr.length > 0}
                            helperText={this.state.ugEndDateErr}
                            name="EndDate"
                            fullWidth
                            inputProps={{
                              min: moment(
                                new Date(this.state.ugStartDate)
                              ).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={12}></Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    style={{ borderRadius: 15, marginTop: 15 }}
                    expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  >
                    <AccordionSummary
                      style={{ height: 49 }}
                      expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <Grid container direction="row" justify="flex-start">
                          <p style={title}>Diploma Course</p>
                        </Grid>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            id="debug"
                            disabled={this.state.documentedit}
                            options={this.props.getCollegesList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.diplomaCollege}
                            onChange={(e, newValue) =>
                              this.setState({
                                diplomaCollege: newValue,
                                diplomaCollegeErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.diplomaCollegeErr.length > 0}
                                helperText={this.state.diplomaCollegeErr}
                                label="College Name"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            id="debug"
                            disabled={this.state.documentedit}
                            options={this.props.getUniversityList}
                            getOptionLabel={(option) => option.name}
                            value={this.state.diplomoUniversity}
                            onChange={(e, newValue) =>
                              this.setState({
                                diplomoUniversity: newValue,
                                diplomoUniversityErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={
                                  this.state.diplomoUniversityErr.length > 0
                                }
                                helperText={this.state.diplomoUniversityErr}
                                label="ExamBoard Name"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.diplomaType}
                            getOptionLabel={(option) => option.title}
                            value={this.state.diplomoDepartment}
                            onChange={(e, newValue) =>
                              this.setState({
                                diplomoDepartment: newValue,
                                diplomoDepartmentErr: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={
                                  this.state.diplomoDepartmentErr.length > 0
                                }
                                helperText={this.state.diplomoDepartmentErr}
                                label="Diploma Type"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            disabled={this.state.documentedit}
                            id="debug"
                            options={this.gpascale}
                            getOptionLabel={(option) => option.title}
                            value={this.state.diplomoCgpaScale}
                            onChange={(e, newValue) =>
                              this.setState({
                                diplomoCgpaScale: newValue,
                                diplomoCgpaScaleErr: "",
                                diplomoCgpa: "",
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={
                                  this.state.diplomoCgpaScaleErr.length > 0
                                }
                                helperText={this.state.diplomoCgpaScaleErr}
                                label="CGPA Scale"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            id="standard-basic"
                            value={this.state.diplomoCgpa}
                            onKeyPress={(evt) => {
                              if (
                                isNumber(evt) ||
                                evt.target.value?.length >= 2
                              )
                                evt.preventDefault();
                            }}
                            onChange={(e) => {
                              if (this.state.diplomoCgpaScale) {
                                if (e.target.value) {
                                  if (e.target.value.length <= 3) {
                                    if (
                                      (parseInt(e.target.value) > 100 &&
                                        parseInt(
                                          this.state.diplomoCgpaScale.value
                                        ) < parseInt(e.target.value)) ||
                                      parseInt(e.target.value) < 0 ||
                                      parseFloat(
                                        parseInt(
                                          this.state.diplomoCgpaScale.value
                                        ).toFixed(2)
                                      ) < parseFloat(e.target.value).toFixed(2)
                                    ) {
                                      e.preventDefault();
                                    } else {
                                      this.setState({
                                        diplomoCgpa:
                                          e.target.value >= 0
                                            ? e.target.value
                                            : "",
                                        diplomoCgpaErr: "",
                                      });
                                    }
                                  }
                                } else {
                                  this.setState({
                                    diplomoCgpa: e.target.value,
                                    diplomoCgpaErr: "",
                                  });
                                }
                              } else {
                                this.setState({
                                  diplomoCgpa: e.target.value,
                                  diplomoCgpaErr: "",
                                });
                              }
                            }}
                            InputLabelProps={{ shrink: true }}
                            label="CGPA"
                            disabled={
                              this.state.documentedit ||
                              this.state.diplomoCgpaScale === "" ||
                              this.state.diplomoCgpaScale === null
                            }
                            onKeyPress={(evt) => {
                              if (isSpace(evt) || evt.target.value?.length >= 5)
                                evt.preventDefault();
                            }}
                            error={this.state.diplomoCgpaErr.length > 0}
                            helperText={this.state.diplomoCgpaErr}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="Start Date"
                            value={this.state.diplomostartDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                diplomostartDate: e.target.value,
                                diplomostartDateErr: "",
                              })
                            }
                            error={this.state.diplomostartDateErr.length > 0}
                            helperText={this.state.diplomostartDateErr}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={this.state.documentedit}
                            name="startDate"
                            fullWidth
                            inputProps={{
                              max: moment(new Date()).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="End Date"
                            value={this.state.diplomoEndDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                diplomoEndDate: e.target.value,
                                diplomoEndDateErr: "",
                              })
                            }
                            error={this.state.diplomoEndDateErr.length > 0}
                            helperText={this.state.diplomoEndDateErr}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={
                              this.state.diplomostartDate === null ||
                              this.state.documentedit
                            }
                            name="EndDate"
                            fullWidth
                            inputProps={{
                              min: moment(
                                new Date(this.state.diplomostartDate)
                              ).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={1}></Grid>
                        <Grid item md={12}></Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion style={{ borderRadius: 15, marginTop: 15 }}>
                    <AccordionSummary
                      style={{ height: 49 }}
                      expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <Grid container direction="row" justify="flex-start">
                          <p style={title}>12th Grade</p>
                        </Grid>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item md={4}>
                          <TextField
                            error={this.state.twelthSchoolErr.length > 0}
                            helperText={this.state.twelthSchoolErr}
                            value={this.state.twelthSchool}
                            label="School Name"
                            // margin="normal"
                              onChange={(e) => {
                                if (spaceRemoveRegex.test(e.target.value) || e.target.value === "") {
                                  this.setState({
                                    twelthSchool: e.target.value,
                                    twelthSchoolErr: "",
                                  })
                              
                                } else {
                                  e.preventDefault();
                                }
                              }}
                            disabled={this.state.documentedit}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            options={this.props.sscexamboardList || []}
                            getOptionLabel={(option) => option.name}
                            value={this.state.twelthExamBoard}
                            onChange={(e, newValue) =>
                              this.setState({
                                twelthExamBoard: newValue,
                                twelthExamBoardErr: "",
                              })
                            }
                            disabled={this.state.documentedit}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.twelthExamBoardErr.length > 0}
                                helperText={this.state.twelthExamBoardErr}
                                label="Exam Board"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            options={this.gpascale}
                            getOptionLabel={(option) => option.title}
                            value={this.state.twelthCgpaScale}
                            onChange={(e, newValue) =>
                              this.setState({
                                twelthCgpaScale: newValue,
                                twelthCgpaScaleErr: "",
                                twelthCgpa: "",
                              })
                            }
                            disabled={this.state.documentedit}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                disabled={this.state.documentedit}
                                error={this.state.twelthCgpaScaleErr.length > 0}
                                helperText={this.state.twelthCgpaScaleErr}
                                label="CGPA Scale"
                              />
                            )}
                          />
                        </Grid>

                        <Grid item md={3}>
                          <TextField
                            id="standard-basic"
                            label="CGPA"
                            disabled={
                              this.state.documentedit ||
                              this.state.twelthCgpaScale === "" ||
                              this.state.twelthCgpaScale === null
                            }
                            onKeyPress={(evt) => {
                              if (isSpace(evt) || evt.target.value?.length >= 5)
                                evt.preventDefault();
                            }}
                            error={this.state.twelthCgpaErr.length > 0}
                            helperText={this.state.twelthCgpaErr}
                            value={this.state.twelthCgpa}
                            onChange={(e) => {
                              if (this.state.twelthCgpaScale) {
                                if (e.target.value) {
                                  if (
                                    (e.target.value.length <= 3 &&
                                      parseInt(e.target.value) > 100 &&
                                      parseInt(
                                        this.state.twelthCgpaScale.value
                                      ) < parseInt(e.target.value)) ||
                                    parseInt(e.target.value) < 0 ||
                                    parseFloat(
                                      parseInt(
                                        this.state.twelthCgpaScale.value
                                      ).toFixed(2)
                                    ) < parseFloat(e.target.value).toFixed(2)
                                  ) {
                                    e.preventDefault();
                                  } else {
                                    this.setState({
                                      twelthCgpa:
                                        e.target.value >= 0
                                          ? e.target.value
                                          : "",
                                      twelthCgpaErr: "",
                                    });
                                  }
                                } else {
                                  this.setState({
                                    twelthCgpa: e.target.value,
                                    twelthCgpaErr: "",
                                  });
                                }
                              } else {
                                this.setState({
                                  twelthCgpa: e.target.value,
                                  twelthCgpaErr: "",
                                });
                              }
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="Start Date"
                            value={this.state.twelthStartDate || ""}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                twelthStartDate: e.target.value,
                                twelthStartDateErr: "",
                              })
                            }
                            error={this.state.twelthStartDateErr.length > 0}
                            helperText={this.state.twelthStartDateErr}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={this.state.documentedit}
                            name="startDate"
                            fullWidth
                            inputProps={{
                              max: moment(new Date()).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="End Date"
                            value={this.state.twelthEndDate || ""}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                twelthEndDate: e.target.value,
                                twelthEndDateErr: "",
                              })
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={this.state.twelthEndDateErr.length > 0}
                            helperText={this.state.twelthEndDateErr}
                            disabled={
                              this.state.documentedit ||
                              this.state.twelthStartDate === null
                            }
                            name="EndDate"
                            fullWidth
                            inputProps={{
                              min: moment(
                                new Date(this.state.twelthStartDate)
                              ).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={12}></Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion style={{ borderRadius: 15, marginTop: 15 }}>
                    <AccordionSummary
                      style={{ height: 49 }}
                      expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <Grid container direction="row" justify="flex-start">
                          <p style={title}>10th Grade</p>
                        </Grid>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item md={6}>
                          <TextField
                            error={this.state.tenthSchoolErr.length > 0}
                            helperText={this.state.tenthSchoolErr}
                            label="School Name"
                            disabled={this.state.documentedit}
                            margin="normal"
                            value={this.state.tenthSchool}
                            // onChange={(e) =>
                            //   this.setState({
                            //     tenthSchool: e.target.value,
                            //     tenthSchoolErr: "",
                            //   })
                            // }
                            onChange={(e) => {
                              if (spaceRemoveRegex.test(e.target.value) || e.target.value === "") {
                                this.setState({
                                  tenthSchool: e.target.value,
                                  tenthSchoolErr: "",
                                })
                            
                              } else {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            options={this.props.sscexamboardList || []}
                            getOptionLabel={(option) => option.name}
                            value={this.state.tenthExamBoard}
                            onChange={(e, newValue) =>
                              this.setState({
                                tenthExamBoard: newValue,
                                tenthExamBoardErr: "",
                              })
                            }
                            disabled={this.state.documentedit}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={this.state.tenthExamBoardErr.length > 0}
                                helperText={this.state.tenthExamBoardErr}
                                label="Exam Board"
                                margin="normal"
                              />
                            )}
                          />
                        </Grid>

                        <Grid item md={3}>
                          <Autocomplete
                            popupIcon={
                              <ExpandMore style={{ color: "#1093FF" }} />
                            }
                            options={this.gpascale}
                            getOptionLabel={(option) => option.title}
                            value={this.state.tenthCgpaScale}
                            onChange={(e, newValue) =>
                              this.setState({
                                tenthCgpaScale: newValue,
                                tenthCgpaScaleErr: "",
                                tenthCgpa: "",
                              })
                            }
                            disabled={this.state.documentedit}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={this.state.tenthCgpaScaleErr.length > 0}
                                helperText={this.state.tenthCgpaScaleErr}
                                label="CGPA Scale"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            id="standard-basic"
                            disabled={
                              this.state.documentedit ||
                              this.state.tenthCgpaScale === "" ||
                              this.state.tenthCgpaScale === null
                            }
                            label="CGPA"
                            onKeyPress={(evt) => {
                              if (isSpace(evt) || evt.target.value?.length >= 5)
                                evt.preventDefault();
                            }}

                            error={this.state.tenthCgpaErr.length > 0}
                            helperText={this.state.tenthCgpaErr}
                            onChange={(e) => {
                              if (
                                this.state.tenthCgpaScale !== null ||
                                this.state.tenthCgpaScale !== ""
                              ) {
                                if (e.target.value) {
                                  if (e.target.value.length <= 3) {
                                    if (
                                      (parseInt(e.target.value) > 100 &&
                                        parseInt(
                                          this.state.tenthCgpaScale.value
                                        ) < parseInt(e.target.value)) ||
                                      parseInt(e.target.value) < 0 ||
                                      parseFloat(
                                        parseInt(
                                          this.state.tenthCgpaScale.value
                                        ).toFixed(2)
                                      ) < parseFloat(e.target.value).toFixed(2)
                                    ) {
                                      e.preventDefault();
                                    } else {
                                      this.setState({
                                        tenthCgpa:
                                          e.target.value >= 0
                                            ? e.target.value
                                            : "",
                                        tenthCgpaErr: "",
                                      });
                                    }
                                  }
                                } else {
                                  this.setState({
                                    tenthCgpa: e.target.value,
                                    tenthCgpaErr: "",
                                  });
                                }
                              } else {
                                this.setState({
                                  tenthCgpa: e.target.value,
                                  tenthCgpaErr: "",
                                });
                              }
                            }}
                            value={this.state.tenthCgpa}
                          />
                        </Grid>

                        <Grid item md={3}>
                          <TextField
                            label="Start Date"
                            value={this.state.tenthStartDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                tenthStartDate: e.target.value,
                                tenthStartDateErr: "",
                              })
                            }
                            error={this.state.tenthStartDateErr.length > 0}
                            helperText={this.state.tenthStartDateErr}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={this.state.documentedit}
                            name="startDate"
                            fullWidth
                            inputProps={{
                              max: moment(new Date()).format("yyyy-MM"),
                            }}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <TextField
                            label="End Date"
                            value={this.state.tenthEndDate}
                            type="month"
                            onChange={(e) =>
                              this.setState({
                                tenthEndDate: e.target.value,
                                tenthEndDateErr: "",
                              })
                            }
                            error={this.state.tenthEndDateErr.length > 0}
                            helperText={this.state.tenthEndDateErr}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                            disabled={
                              this.state.documentedit ||
                              this.state.tenthStartDate === null
                            }
                            inputProps={{
                              min: moment(
                                new Date(this.state.tenthStartDate)
                              ).format("yyyy-MM"),
                            }}
                            name="EndDate"
                            minDate={this.state.tenthStartDate}
                          />
                        </Grid>
                        <Grid item md={12}></Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Grid item md={12}>
                    <p style={HeadStyle}>Documents Received</p>
                  </Grid>
                  {this.props.getAllDocumentList["PG Degree"] &&
                    this.props.getAllDocumentList["PG Degree"].length !== 0 && (
                      <Grid item md={12}>
                        <Grid item md={12} direction="column">
                          <p style={GridStyle}>PG Degree</p>
                        </Grid>
                        <Grid item={12} container>
                          {this.props.getAllDocumentList["PG Degree"]
                            ? this.props.getAllDocumentList["PG Degree"].map(
                                (data) => (
                                  <Grid
                                    item
                                    md={4}
                                    direction="row"
                                    onClick={() => this.documentClick(data)}
                                  >
                                    <DoccumentCard
                                      certificate={data.name}
                                      date={data.date}
                                      path={data.path}
                                      studentid={
                                        this.props.match.params.studentId
                                      }
                                      productId={
                                        this.props.match.params.productId
                                      }
                                      status={this.state.documentedit}
                                    />
                                  </Grid>
                                )
                              )
                            : null}
                        </Grid>
                      </Grid>
                    )}

                  {this.props.getAllDocumentList["UG Degree"] &&
                    this.props.getAllDocumentList["UG Degree"].length !== 0 && (
                      <Grid item md={12}>
                        <Grid item md={12} direction="column">
                          <p style={GridStyle}>UG Degree</p>
                        </Grid>
                        <Grid item={12} container>
                          {this.props.getAllDocumentList["UG Degree"]
                            ? this.props.getAllDocumentList["UG Degree"].map(
                                (data) => (
                                  <Grid
                                    item
                                    md={4}
                                    direction="row"
                                    onClick={() => this.documentClick(data)}
                                  >
                                    <DoccumentCard
                                      certificate={data.name}
                                      date={data.date}
                                      path={data.path}
                                      studentid={
                                        this.props.match.params.studentId
                                      }
                                      status={this.state.documentedit}
                                      // status={true}
                                      productId={
                                        this.props.match.params.productId
                                      }
                                    />
                                  </Grid>
                                )
                              )
                            : null}
                        </Grid>
                      </Grid>
                    )}

                  {this.props.getAllDocumentList.Diploma &&
                    this.props.getAllDocumentList.Diploma.length !== 0 && (
                      <Grid item md={12}>
                        <Grid item md={12} direction="column">
                          <p style={GridStyle}>Diploma</p>
                        </Grid>
                        <Grid item={12} container>
                          {this.props.getAllDocumentList.Diploma
                            ? this.props.getAllDocumentList.Diploma.map(
                                (data) => (
                                  <Grid
                                    item
                                    md={4}
                                    direction="row"
                                    onClick={() => this.documentClick(data)}
                                  >
                                    <DoccumentCard
                                      certificate={data.name}
                                      date={data.date}
                                      path={data.path}
                                      studentid={
                                        this.props.match.params.studentId
                                      }
                                      status={this.state.documentedit}
                                      productId={
                                        this.props.match.params.productId
                                      }
                                      // status={true}
                                    />
                                  </Grid>
                                )
                              )
                            : null}
                        </Grid>
                      </Grid>
                    )}

                  {this.props.getAllDocumentList["XII Grade"] &&
                    this.props.getAllDocumentList["XII Grade"].length !== 0 && (
                      <Grid item md={12}>
                        <Grid item md={12} direction="column">
                          <p style={GridStyle}>XII Grade</p>
                        </Grid>
                        <Grid item={12} container>
                          {this.props.getAllDocumentList["XII Grade"]
                            ? this.props.getAllDocumentList["XII Grade"].map(
                                (data) => (
                                  <Grid
                                    item
                                    md={4}
                                    direction="row"
                                    onClick={() => this.documentClick(data)}
                                  >
                                    <DoccumentCard
                                      certificate={data.name}
                                      date={data.date}
                                      path={data.path}
                                      status={this.state.documentedit}
                                      // status={true}
                                      studentid={
                                        this.props.match.params.studentId
                                      }
                                      productId={
                                        this.props.match.params.productId
                                      }
                                    />
                                  </Grid>
                                )
                              )
                            : null}
                        </Grid>
                      </Grid>
                    )}
                  {this.props.getAllDocumentList["X Grade"] &&
                    this.props.getAllDocumentList["X Grade"].length !== 0 && (
                      <Grid item md={12}>
                        <Grid item md={12} direction="column">
                          <p style={GridStyle}>X Grade</p>
                        </Grid>
                        <Grid item={12} container>
                          {this.props.getAllDocumentList["X Grade"]
                            ? this.props.getAllDocumentList["X Grade"].map(
                                (data) => (
                                  <Grid
                                    item
                                    md={4}
                                    direction="row"
                                    onClick={() => this.documentClick(data)}
                                  >
                                    <DoccumentCard
                                      certificate={data.name}
                                      date={data.date}
                                      path={data.path}
                                      studentid={
                                        this.props.match.params.studentId
                                      }
                                      status={this.state.documentedit}
                                      productId={
                                        this.props.match.params.productId
                                      }
                                      // status={true}
                                    />
                                  </Grid>
                                )
                              )
                            : null}
                        </Grid>
                      </Grid>
                    )}

                  <Grid
                    item
                    md={12}
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 50,
                    }}
                  >
                    <PrimaryButton
                      onClick={() => this.handleSave()}
                      style={{ textTransform: "none" }}
                      variant={"contained"}
                      color={"primary"}
                      size={"small"}
                      disabled={this.props.variantStepList.adminObComplete}
                    >
                      Save Changes
                    </PrimaryButton>
                  </Grid>
                </div>
              </ThemeProvider>
            </Card>
            {this.renderModel()}
            <MySnackBar
              snackMsg={this.state.snackMsg}
              snackVariant={this.state.snackVariant}
              snackOpen={this.state.snackOpen}
              onClose={() => this.setState({ snackOpen: false })}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
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
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "17px",
    alignSelf: "flex-start",
    color: "#052A4E",
  },
  ans: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontSize: "12px",
    color: "#686868",
  },
  secondary: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    color: "#052A4E",
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
    getBranchesList: state.CollegeReducer.BranchList,
    getCollegesList: state.CollegeReducer.allCollegeList,
    getDegreeList: state.CollegeReducer.Degree,
    getUniversityList: state.CollegeReducer.University,
    getStudentsByIdList: state.StudentReducer.StudentList,
    getAcademicInfoList: state.StudentReducer.getAcademicInfo,
    updateAcademicInfoList: state.StudentReducer.updateAcademicInfo,
    sscexamboardList: state.StudentReducer.sscexamboard,
    studentStatus: state.AdminReducer.studentStatusResponse,
    getAllDocumentList: state.StudentReducer.getDocumentList,
    getPGDegreesList: state.CollegeReducer.getPGDegrees,
    variantStepList: state.ProductReducer.variantStepList,
  };
};

export default connect(mapStateToProps, {
  getBranches,
  getDegree,
  getAllColleges,
  getUniversity,
  getStudentsById,
  getAcademicInfo,
  updateAcademicInfo,
  sscexamboard,
  viewStudentStatus,
  updateVerificationStatus,
  getDocumentList,
  getPGDegree,
  getVariantStepsById,
})(academicInfo);
