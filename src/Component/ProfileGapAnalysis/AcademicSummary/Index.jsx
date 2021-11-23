import { Grid, Typography, Button, Tabs, Tab } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TopSubjects from "./TopSubjects";
import { useStyles } from "../FormStyles";
import BacklogSummary from "../BacklogSummary/Index";
import {
  createBacklogSemDetails,
  deleteStudentBacklogSem,
  getAcademicSummary,
  getFilterListForDropDown,
} from "../../../AsyncApiCall/Ppga";
import { isEmptyObject, isEmptyString, isNanAndEmpty } from "../../Validation";
import { HELPER_TEXT } from "../../../Constant/Variables";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PrimaryButton from "../../../Utils/PrimaryButton";
import MySnackBar from "../../MySnackBar";

function Index(props) {
  // Defining column and config for CRUD Table
  const columns = [
    {
      title: "Semester",
      field: "semester",
      type: "numeric",
      validate: (rowData) => {
        if (!isNanAndEmpty(rowData.semester)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      },
    },
    {
      title: "Semester GPA",
      field: "sgpa",
      type: "numeric",
      validate: (rowData) => {
        if (!isNanAndEmpty(rowData.sgpa)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      },
    },
    {
      title: "# Active Backlog",
      field: "activeBackLog",
      type: "numeric",
      validate: (rowData) => {
        if (!isNanAndEmpty(rowData.activeBackLog)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      },
    },
    {
      title: "Backlog Subjects",
      field: "activeBackLogSubjects",
      validate: (rowData) => {
        if (!isEmptyString(rowData.activeBackLogSubjects)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      },
    },
    {
      title: "Cleared Backlog",
      field: "clearedBackLog",
      type: "numeric",
      validate: (rowData) => {
        if (!isNanAndEmpty(rowData.clearedBackLog)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      },
    },
    {
      title: "Cleared Backlog Subjects",
      field: "clearedBackLogSubjects",
      validate: (rowData) => {
        if (!isEmptyString(rowData.clearedBackLogSubjects)) {
          return true;
        } else {
          return { isValid: false, helperText: HELPER_TEXT.requiredField };
        }
      },
    },
  ];
  //   Setting Up initial state
  const [tabValue, setTabValue] = useState(0);
  const [dropDownValue, setDropdownValue] = useState([]);
  const [degreeType, setDegreeType] = useState(null);
  const [degreeTypeHelperText, setDegreeTypeHelperText] = useState("");
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryHelperText, setSubCategoryHelperText] = useState("");
  const [data, setData] = useState([]);
  const [semester, setSemester] = useState([]);
  const [subjectTableFields, setSubjectTableFields] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackVariant: "",
    snackMsg: "",
  });
  //   Styles for the component
  const classes = useStyles();

  //   To get and set dropdown values
  const getAndSetDropDownValues = () => {
    getFilterListForDropDown(props.match.params.studentId).then((response) => {
      if (response.status === 200) {
        setDropdownValue(response.data.data);
      }
    });
  };
  // Get and set academic summary data
  const getAndSetAcademicSummary = () => {
    getAcademicSummary(
      props.match.params.studentId,
      degreeType.id,
      subCategory.id
    ).then((response) => {
      console.log(response);

      if (response.status === 200) {
        //   Setting up values only if the data is present
        if (response.data.data.backlogSummary) {
          setData(response.data.data.backlogSummary);
        } else {
          setData([]);
        }
        if (response.data.data.semesters) {
          setSemester(response.data.data.semesters);
        } else {
          setSemester([]);
        }
        if (response.data.data.subjectTableFields) {
          setSubjectTableFields(response.data.data.subjectTableFields);
        } else {
          setSubjectTableFields([]);
        }
        if (response.data.data.subjects) {
          setSubjects(response.data.data.subjects);
        } else {
          setSubjects([]);
        }
      } else {
        setSnack({
          snackMsg: "Student Details Not Found",
          snackVariant: "error",
          snackOpen: true,
        });
      }
    });
  };

  useEffect(() => {
    //   This function sets the initial values for the dropdown that is returned from the API
    getAndSetDropDownValues();
  }, []);
  // Handling tab change function
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // To add a new backlog subject details
  const handleRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let requestBody = {
          semester: newData.semester,
          sgpa: newData.sgpa,
          activeBackLog: newData.activeBackLog,
          activeBackLogSubjects: newData.activeBackLogSubjects,
          clearedBackLog: newData.clearedBackLog,
          clearedBackLogSubjects: newData.clearedBackLogSubjects,
        };
        // This function will create a new backlog subject
        createBacklogSemDetails(
          props.match.params.studentId,
          degreeType.id,
          requestBody
        ).then((response) => {
          if (response.status === 200) {
            getAndSetAcademicSummary();
          }
        });
        resolve();
      }, 1000);
    });
  };

  //   This function deletes a single subject backlog

  const handleRowDelete = (oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        deleteStudentBacklogSem(oldData.id).then((response) => {
          if (response.status === 200) {
            getAndSetAcademicSummary();
          }
        });
        resolve();
      }, 1000);
    });
  };

  //   Declaring tab labels

  const tabLabel = ["Top Subjects", "Backlog Summary"];

  //   This function render tab content based on index value

  const renderTabContent = () => {
    if (tabValue === 0) {
      return (
        <TopSubjects
          subjects={subjects}
          degreeType={degreeType}
          subjectTableFields={subjectTableFields}
          semester={semester}
        />
      );
    } else if (tabValue === 1) {
      return (
        <BacklogSummary
          data={data}
          handleRowAdd={handleRowAdd}
          handleRowDelete={handleRowDelete}
          columns={columns}
        />
      );
    }
  };

  //   This function will generate data when the user clicks the get data button
  const handleGetData = () => {
    isEmptyObject(degreeType)
      ? setDegreeTypeHelperText(HELPER_TEXT.requiredField)
      : setDegreeTypeHelperText("");
    isEmptyObject(subCategory)
      ? setSubCategoryHelperText(HELPER_TEXT.requiredField)
      : setSubCategoryHelperText("");
    if (!isEmptyObject(degreeType) && !isEmptyObject(subCategory)) {
      getAndSetAcademicSummary();
    }
  };

  //   This function handles the tab disabling based on the grade

  const handleTabDisabled = (index) => {
    if (index === 1) {
      if (degreeType === null) {
        return true;
      } else if (degreeType.id === "ssc" || degreeType.id === "hsc") {
        return true;
      }
    } else {
      return false;
    }
  };

  //   It handles the degree change

  const handleDegreeTypeChange = (value) => {
    setDegreeType(value);
    setSubCategory(null);
    setDegreeTypeHelperText("");
    if (value) {
      if (value.id === "hsc" || value.id === "ssc") {
        setTabValue(0);
      }
    } else {
      setTabValue(0);
    }
  };

  return (
    <Grid container spacing={2} className={classes.containerSpacing}>
      {/* Title */}
      <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
        <Typography variant={"h6"}>Academics Summary</Typography>
      </Grid>
      <Grid item md={6} xs={6} sm={6} lg={6} xl={6}>
        <Grid container spacing={2}>
          {/* Degree type dropdown */}
          <Grid item md={6} xs={6} sm={6} lg={6} xl={6}>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              size={"small"}
              value={degreeType}
              popupIcon={<ExpandMore color={"inherit"} />}
              onChange={(e, newValue) => handleDegreeTypeChange(newValue)}
              options={dropDownValue}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={degreeTypeHelperText}
                  error={degreeTypeHelperText.length > 0}
                  label="Degree Type"
                  variant="standard"
                />
              )}
            />
          </Grid>
          {/* Subject category dropdown */}
          <Grid item md={6} xs={6} sm={6} lg={6} xl={6}>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              size={"small"}
              popupIcon={<ExpandMore color={"inherit"} />}
              disabled={degreeType === null}
              value={subCategory}
              onChange={(e, newValue) => {
                setSubCategory(newValue);
                setSubCategoryHelperText("");
              }}
              options={degreeType !== null ? degreeType.categories : []}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={subCategoryHelperText}
                  error={subCategoryHelperText.length > 0}
                  label="Top 3 Subjects Category"
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        xs={6}
        sm={6}
        lg={6}
        xl={6}
        container
        justifyContent={"flex-end"}
      >
        <PrimaryButton
          onClick={handleGetData}
          size={"small"}
          variant={"contained"}
          color={"primary"}
        >
          Get Data
        </PrimaryButton>
      </Grid>
      <Grid item md={12}>
        <hr />
      </Grid>
      <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
        <Tabs
          classes={{ root: classes.tabStyle }}
          indicatorColor="none"
          textColor="primary"
          value={tabValue}
          onChange={handleChange}
        >
          {tabLabel.map((eachItem, index) => {
            return (
              <Tab
                classes={{ root: classes.tabTextStyle }}
                disabled={handleTabDisabled(index)}
                label={eachItem}
              />
            );
          })}
        </Tabs>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        sm={12}
        lg={12}
        xl={12}
        className={classes.academicSummaryLayout}
      >
        {renderTabContent()}
      </Grid>
      <MySnackBar
        onClose={() =>
          setSnack({
            snackOpen: false,
            snackMsg: "",
            snackVariant: "",
          })
        }
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackVariant}
        snackMsg={snack.snackMsg}
      />
    </Grid>
  );
}

export default Index;
