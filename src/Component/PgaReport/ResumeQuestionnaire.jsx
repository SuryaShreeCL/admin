import {
  Checkbox,
  Chip,
  Collapse,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentCareerTrackDetails,
  getAcademicCertificates,
  getColleges,
  getDegrees,
  getDepartments,
  getElectiveSubjects,
  getProfessionalCertificates,
  getRelevantSkills,
  getResumePdfDownloadUrl,
  getResumePdfPath,
  getResumePdfUrl,
  getResumeQuestionnaire,
  getUniversity,
  postResumes,
} from "../../Actions/PgaReportAction";
import { HELPER_TEXT } from "../../Constant/Variables";
import PdfViewer from "../../Utils/PdfViewer";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import MySnackBar from "../MySnackBar";
import Loader from "../Utils/controls/Loader";
import {
  BoldText,
  BottomBox,
  CenteredLoader,
  FlexRow,
  FlexView,
  JustifyFlex,
  ListText,
  PageWrap,
  QuestionText,
  StyledButton,
  StyledMediumButton,
} from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

const RESUME_PARSE_SUCCESS_MESSAGE = "Resume parsed successfully";
const RESUME_PARSE_ERROR_MESSAGE = "Resume parsing failed";

const GPA_RANG = [
  {
    id: 100,
    label: "100%",
  },
  {
    id: 10,
    label: "10",
  },
  {
    id: 7,
    label: "7",
  },
  {
    id: 4,
    label: "4",
  },
];

function ResumeQuestionnaire(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { studentId, productId } = props.match.params;
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const [collapse, setCollapse] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [resumeQuestionnaireForm, setResumeQuestionnaireForm] = useState({
    academicCertificates: [],
    professionalCertificates: [],
    electiveSubjects: [],
    relevantSkills: [],
    researchProjectCount: 0,
    independentProjectCount: 0,
    courseProjectCount: 0,
    internshipCount: 0,
    academicProjectCount: 0,
    awards: [],
    hobbies: [],
    cgpaScale: null,
    cgpa: 0,
    college: null,
    degree: null,
    department: null,
    university: null,
  });
  const [academicCertificatesList, setAcademicCertificatesList] = useState([]);
  const [
    professionalCertificatesList,
    setProfessionalCertificatesList,
  ] = useState([]);
  const [relevantSkillsList, setRelevantSkillsList] = useState([]);
  const [electiveSubjectsList, setElectiveSubjectsList] = useState([]);
  const [saveClick, setSaveClick] = useState(false);
  const [url, setUrl] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeParseResponse, setResumeParseResponse] = useState(null);

  const {
    resumeParseStatus,
    colleges,
    departments,
    universities,
    degrees,
    academicCertificates,
    professionalCertificates,
    relevantSkills,
    electiveSubjects,
    careerTrackDetailsStatus,
    resumePdfPath,
    resumePdfUrl,
    resumeQuestionnaire,
  } = useSelector((state) => state.PgaReportReducer);

  useEffect(() => {
    dispatch(getColleges());
    dispatch(getUniversity());
    dispatch(getDegrees());
    dispatch(getDepartments());
    dispatch(getAcademicCertificates(studentId));
    dispatch(getProfessionalCertificates(studentId));
    dispatch(getElectiveSubjects(studentId));
    dispatch(getRelevantSkills(studentId));
    dispatch(getResumePdfPath(studentId, productId));
    dispatch(getResumeQuestionnaire(studentId, productId));
  }, [dispatch]);

  useEffect(() => {
    if (
      professionalCertificates &&
      professionalCertificates.success &&
      professionalCertificates.data
    ) {
      setProfessionalCertificatesList(
        professionalCertificates.data.map(({ name }) => name)
      );
    }
  }, [professionalCertificates]);

  useEffect(() => {
    if (relevantSkills && relevantSkills.success && relevantSkills.data) {
      setRelevantSkillsList(relevantSkills.data.map(({ name }) => name));
    }
  }, [relevantSkills]);

  useEffect(() => {
    if (electiveSubjects && electiveSubjects.success && electiveSubjects.data) {
      setElectiveSubjectsList(electiveSubjects.data.map(({ name }) => name));
    }
  }, [electiveSubjects]);

  useEffect(() => {
    if (
      academicCertificates &&
      academicCertificates.success &&
      academicCertificates.data
    ) {
      setAcademicCertificatesList(
        academicCertificates.data.map(({ name }) => name)
      );
    }
  }, [academicCertificates]);

  useEffect(() => {
    if (resumePdfUrl) {
      setResumeData(resumePdfUrl);
    }
  }, [resumePdfUrl]);

  useEffect(() => {
    if (resumePdfPath && typeof resumePdfPath === "object") {
      dispatch(getResumePdfDownloadUrl(studentId, resumePdfPath.path));
      setUrl(getResumePdfUrl(studentId, resumePdfPath.path));
    }
  }, [resumePdfPath]);

  useEffect(() => {
    if (resumeQuestionnaire && resumeQuestionnaire.success) {
      setResumeQuestionnaireForm(resumeQuestionnaire.data);
    }
  }, [resumeQuestionnaire]);

  useEffect(() => {
    if (loading && resumeParseStatus !== resumeParseResponse) {
      setResumeParseResponse(resumeParseStatus);
      if (loading) setLoading(false);
      const { degree, department, interest } = resumeParseStatus;
      if (degree && department && interest) {
        let newDegree = degree.flat(2);
        let newDepartment = department.flat(2);
        let newInterest = interest.flat(2);
        let getDegree = resumeQuestionnaireForm.degree
          ? resumeQuestionnaireForm.degree
          : degrees.find(({ name }) => newDegree.indexOf(name) > -1) || null;
        let getDepartment = resumeQuestionnaireForm.department
          ? resumeQuestionnaireForm.department
          : departments.find(({ name }) => newDepartment.indexOf(name) > -1) ||
            null;
        setResumeQuestionnaireForm({
          ...resumeQuestionnaireForm,
          degree: getDegree,
          department: getDepartment,
          relevantSkills: resumeParseStatus.skill,
          hobbies: [
            newInterest
              .flat(2)
              .join(", ")
              .toString(),
          ],
        });
        setSnack({
          snackOpen: true,
          snackColor: "success",
          snackMsg: RESUME_PARSE_SUCCESS_MESSAGE,
        });
      } else {
        setSnack({
          snackOpen: true,
          snackColor: "error",
          snackMsg: RESUME_PARSE_ERROR_MESSAGE,
        });
      }
    }
  }, [resumeParseStatus, resumeParseResponse, loading]);

  useEffect(() => {
    if (careerTrackDetailsStatus) {
      if (careerTrackDetailsStatus.success && saveClick) {
        props.handlePageChange("pgaSpiderGraph");
      }
    }
  }, [careerTrackDetailsStatus, saveClick]);

  const getValidArray = (collection) =>
    collection && Array.isArray(collection) ? collection : [];

  const renderExpandIcon = (open) => {
    return open ? <ExpandLess /> : <ExpandMore />;
  };

  const typeOfOptions = [
    {
      name: "Academic Details",
      id: 0,
    },
    {
      name: "Academic Certifications",
      id: 1,
    },
    {
      name: "Internships Experience",
      id: 2,
    },
    {
      name: "Projects hands on Experience",
      id: 3,
    },
    {
      name: "Professional Certificate",
      id: 4,
    },
    {
      name: "Coursework Taken",
      id: 5,
    },
    {
      name: "Skills Acquired",
      id: 6,
    },
    {
      name: "Personal Impact",
      id: 7,
    },
  ];

  const renderContent = () => {
    return typeOfOptions.map(({ name, id }) => (
      <List className={classes.listPadding}>
        <ListItem
          id={id}
          onClick={() => handleCollapse(id)}
          classes={{ gutters: classes.gutters }}
          button
          divider
        >
          <ListText primary={name} />
          {renderExpandIcon(collapse.indexOf(id) > -1)}
        </ListItem>
        <Collapse in={collapse.indexOf(id) > -1} timeout="auto" unmountOnExit>
          <Grid container spacing={2} className={classes.paddingList}>
            {renderOption(id)}
          </Grid>
        </Collapse>
      </List>
    ));
  };

  const renderOption = (id) => {
    switch (id) {
      case 0:
        return academicDetails();
      case 1:
        return academicCertifications();
      case 2:
        return internshipsExperience();
      case 3:
        return projectsHandsOnExperience();
      case 4:
        return professionalCertificate();
      case 5:
        return courseworkTaken();
      case 6:
        return skillsAcquired();
      case 7:
        return personalImpact();
      default:
        break;
    }
  };

  const personalImpact = () => {
    const { awards, hobbies } = resumeQuestionnaireForm;
    return (
      <>
        <Grid item md={12} className={classes.gapStyle}>
          <div className={classes.gap}>
            <QuestionText>
              {"Let us know if you have received any awards till date"}
            </QuestionText>
            <TextFieldComponent
              className={classes.inputText}
              name={"awards"}
              value={awards[0]}
              onChange={handleInputChange}
              variant={"standard"}
              placeholder={"Add Custom Entry"}
              fullWidth
            />
          </div>
          <div className={classes.gap}>
            <QuestionText>{"Which hobbies do you have?"}</QuestionText>
            <TextFieldComponent
              className={classes.inputText}
              name={"hobbies"}
              value={hobbies[0]}
              onChange={handleInputChange}
              variant={"standard"}
              placeholder={"Add Custom Entry"}
              fullWidth
            />
          </div>
        </Grid>
      </>
    );
  };

  const skillsAcquired = () => {
    const { relevantSkills } = resumeQuestionnaireForm;

    return (
      <>
        <Grid item md={12}>
          <FlexRow>
            <QuestionText>
              {"Which of the following Skills you have acquired?"}
            </QuestionText>
          </FlexRow>
        </Grid>
        <Grid item md={12}>
          {creatableDropDown(
            "Search/ Add Custom Entry",
            "relevantSkills",
            relevantSkills,
            getValidArray(relevantSkillsList)
          )}
        </Grid>
      </>
    );
  };

  const courseworkTaken = () => {
    const { electiveSubjects } = resumeQuestionnaireForm;
    return (
      <>
        <Grid item md={12}>
          <FlexRow>
            <QuestionText>
              {"Which of the following Coursework you have taken?"}
            </QuestionText>
          </FlexRow>
        </Grid>
        <Grid item md={12}>
          {creatableDropDown(
            "Search/ Add Custom Entry",
            "electiveSubjects",
            electiveSubjects,
            getValidArray(electiveSubjectsList)
          )}
        </Grid>
      </>
    );
  };

  const professionalCertificate = () => {
    const { professionalCertificates } = resumeQuestionnaireForm;
    return (
      <>
        <Grid item md={12}>
          <FlexRow>
            <QuestionText>
              {
                "Which of the following Professional Certificate was completed by candidate?"
              }
            </QuestionText>
          </FlexRow>
        </Grid>
        <Grid item md={12}>
          {creatableDropDown(
            "Search/ Add Custom Entry",
            "professionalCertificates",
            professionalCertificates,
            getValidArray(professionalCertificatesList)
          )}
        </Grid>
      </>
    );
  };

  const projectsHandsOnExperience = () => {
    const {
      researchProjectCount,
      independentProjectCount,
      courseProjectCount,
      academicProjectCount,
    } = resumeQuestionnaireForm;
    return (
      <>
        {renderProjectHands(
          "Academic",
          "academicProjectCount",
          academicProjectCount
        )}
        {renderProjectHands("Course", "courseProjectCount", courseProjectCount)}
        {renderProjectHands(
          "Research",
          "researchProjectCount",
          researchProjectCount
        )}
        {renderProjectHands(
          "Independent",
          "independentProjectCount",
          independentProjectCount
        )}
      </>
    );
  };

  const renderProjectHands = (label, name, value) => (
    <>
      <Grid item md={6}>
        <FlexRow>
          {/* <BoldText>{letText}</BoldText> */}
          <QuestionText>
            {`${label} projects completed by successful candidate`}
          </QuestionText>
        </FlexRow>
      </Grid>
      <Grid item md={1}>
        <TextFieldComponent
          id={name}
          className={classes.centeredInputText}
          name={name}
          value={value}
          onChange={handleChange}
          variant={"standard"}
          type={"number"}
          placeholder={"00"}
          fullWidth
        />
      </Grid>
      <Grid item md={5}>
        <FlexRow>
          <QuestionText>
            {`${label} projects completed by successful candidate`}
          </QuestionText>
        </FlexRow>
      </Grid>
    </>
  );

  const internshipsExperience = () => {
    const { internshipCount } = resumeQuestionnaireForm;
    return (
      <>
        <Grid item md={6}>
          <FlexRow>
            <QuestionText>
              {
                "How many internship have completed by the candidate successfully"
              }
            </QuestionText>
          </FlexRow>
        </Grid>
        <Grid item md={1}>
          <TextFieldComponent
            className={classes.centeredInputText}
            id={internshipCount}
            name={"internshipCount"}
            value={internshipCount}
            onChange={handleChange}
            variant={"standard"}
            type={"number"}
            placeholder={"00"}
            fullWidth
          />
        </Grid>
      </>
    );
  };

  const academicCertifications = () => {
    const { academicCertificates } = resumeQuestionnaireForm;
    return (
      <>
        <Grid item md={12}>
          <FlexRow>
            <QuestionText>
              {
                "Which of the following academic certificate was completed by candidate?"
              }
            </QuestionText>
          </FlexRow>
        </Grid>
        <Grid item md={12}>
          {creatableDropDown(
            "Search/ Add Custom Entry",
            "academicCertificates",
            academicCertificates,
            getValidArray(academicCertificatesList)
          )}
        </Grid>
      </>
    );
  };

  const academicDetails = () => {
    const {
      college,
      university,
      degree,
      department,
      cgpa,
      cgpaScale,
    } = resumeQuestionnaireForm;
    return (
      <>
        <Grid item md={6}>
          {renderDropDown(
            getValidArray(colleges),
            "college",
            "Name of College",
            college
          )}
        </Grid>
        <Grid item md={6}>
          {renderDropDown(
            getValidArray(universities),
            "university",
            "Name of University",
            university
          )}
        </Grid>
        <Grid item md={2}>
          {renderDropDown(getValidArray(degrees), "degree", "Degree", degree)}
        </Grid>
        <Grid item md={4}>
          {renderDropDown(
            getValidArray(departments),
            "department",
            "Department Name",
            department
          )}
        </Grid>
        <Grid item md={6}>
          <div className={classes.flexColumn}>
            {renderCustomDropDown(
              GPA_RANG,
              "cgpaScale",
              "GPA/% Range",
              cgpaScale,
              true
            )}
            <TextFieldComponent
              id={cgpa}
              className={classes.centeredInputText}
              name={"cgpa"}
              value={cgpa}
              onChange={handleChange}
              variant={"standard"}
              type={"number"}
              label={"Overall GPA/%"}
              placeholder={"00"}
              disabled={true}
              fullWidth
            />
          </div>
        </Grid>
      </>
    );
  };

  const HandleCreatableDropDownChange = (name, newValue) => {
    let value = "";
    if (typeof newValue === "string") value = newValue;
    else if (newValue && newValue.inputValue) value = newValue.inputValue;
    else value = newValue;
    setResumeQuestionnaireForm({
      ...resumeQuestionnaireForm,
      [name]: value,
    });
  };

  const creatableDropDown = (label, name, value, option = []) => {
    return (
      <Autocomplete
        multiple
        freeSolo
        options={option}
        key={name}
        value={value}
        className={classes.autoCompleteCustomStyle}
        onChange={(event, newValue) =>
          HandleCreatableDropDownChange(name, newValue)
        }
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant={"outlined"}
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              className={classes.checkBox}
              color={"default"}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} variant={"standard"} placeholder={label} />
        )}
      />
    );
  };

  const renderDropDown = (options, name, label, value) => {
    return (
      <DropDown
        key={name}
        options={options}
        fullWidth
        onChange={(e, neValue) => handleDropDownChange(name, neValue)}
        getOptionLabel={(option) => option.name}
        value={value}
        disabled={true}
        renderInput={(params) => (
          <TextFieldComponent {...params} label={label} variant={"standard"} />
        )}
      />
    );
  };

  const renderCustomDropDown = (options, name, label, value, disabled) => {
    return (
      <DropDown
        key={name}
        options={options}
        fullWidth
        onChange={(e, neValue) => handleDropDownChange(name, neValue.id)}
        getOptionLabel={(option) => option.label}
        value={options.find(({ id }) => id === value) || null}
        disabled={disabled}
        renderInput={(params) => (
          <TextFieldComponent {...params} label={label} variant={"standard"} />
        )}
      />
    );
  };

  const handleDropDownChange = (name, value) => {
    setResumeQuestionnaireForm({
      ...resumeQuestionnaireForm,
      [name]: value,
    });
  };

  const handleSnackClose = () =>
    setSnack({
      snackOpen: false,
      snackMsg: "",
      snackColor: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeQuestionnaireForm({
      ...resumeQuestionnaireForm,
      [name]: value,
    });
  };

  const handleCollapse = (id) => {
    let arr = [...collapse];
    let index = arr.indexOf(id);
    if (index > -1) arr.splice(index, 1);
    else arr.push(id);
    setCollapse(arr);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeQuestionnaireForm({
      ...resumeQuestionnaireForm,
      [name]: [value],
    });
  };

  const handleSave = () => {
    const {
      cgpaScale,
      college,
      degree,
      department,
      university,
    } = resumeQuestionnaireForm;
    if (cgpaScale && college && degree && department && university) {
      dispatch(
        addStudentCareerTrackDetails(
          studentId,
          productId,
          resumeQuestionnaireForm
        )
      );
      setSaveClick(true);
    } else {
      setSnack({
        snackOpen: true,
        snackMsg: HELPER_TEXT.requiredField,
        snackColor: "error",
      });
    }
  };

  const handleParse = (e) => {
    e.preventDefault();
    setLoading(true);
    const { path } = resumePdfPath;
    var bodyFormData = new FormData();
    const myFile = new File([resumeData], path, {
      type: path && path.slice(path.indexOf(".") + 1, path.length),
      lastModified: new Date().getTime(),
    });
    bodyFormData.append("file", myFile);
    dispatch(postResumes(bodyFormData));
  };
  return (
    <Grid container>
      <Grid item sm={12} md={8}>
        <PageWrap className={classes.paddingContent}>
          <Grid container spacing={2}>
            <Grid item lg={12} className={classes.fullWidth}>
              <JustifyFlex>
                <Typography variant={"h5"}>{"Resume Questionnaire"}</Typography>
                <StyledButton
                  variant={"contained"}
                  isOutlined={false}
                  onClick={handleParse}
                >
                  {"Update Resume"}
                </StyledButton>
              </JustifyFlex>
            </Grid>
            <Grid item lg={12}>
              {renderContent()}
            </Grid>
          </Grid>
        </PageWrap>
        <BottomBox>
          <FlexView>
            <StyledMediumButton variant={"contained"} onClick={handleSave}>
              {"Save & Generate"}
            </StyledMediumButton>
          </FlexView>
        </BottomBox>
      </Grid>
      <Grid item sm={12} md={4}>
        <PdfViewer cvUrl={url} />
      </Grid>
      <MySnackBar
        onClose={handleSnackClose}
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackColor}
        snackMsg={snack.snackMsg}
      />
      {loading ? (
        <CenteredLoader>
          <Loader />
        </CenteredLoader>
      ) : null}
    </Grid>
  );
}

export default ResumeQuestionnaire;
