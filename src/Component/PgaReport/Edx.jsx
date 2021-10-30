import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { colors, HELPER_TEXT } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import DatePick from "./Components/DatePick";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import {
  deleteStudentEdx,
  getEdxBatch,
  getEdxCourseDescription,
  getEdxCourseType,
  getStudentEdx,
  saveStudentEdx,
} from "../../AsyncApiCall/PgaReport/Edx";
import MySnackBar from "../MySnackBar";
import { isEmptyObject, isEmptyString } from "../Validation";

function Edx(props) {
  const [batchList, setBatchList] = useState([]);
  const [courseTypeList, setCourseTypeList] = useState([]);
  const [descriptionList, setDescriptionTypeList] = useState([]);

  const [data, setData] = useState({
    id: null,
    branch: null,
    quarterlyPlans: [],
    courseCategorizations: [],
    branchDate: null,
    descriptionOne: null,
    descriptionTwo: null,
  });

  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });

  const getAndSetStudentEdx = () => {
    getStudentEdx(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        if (response.data.data.courseCategorizations.length === 0) {
          var formattedData = response.data.data;
          formattedData.courseCategorizations = [
            {
              id: null,
              description: null,
              pgaEdxCourseType: null,
              courseDetailsOne: "",
              courseDetailsTwo: "",
            },
          ];
          setData(formattedData);
        } else {
          setData(response.data.data);
        }
      }
    });
  };

  useEffect(() => {
    getEdxBatch().then((response) => {
      if (response.status === 200) {
        setBatchList(response.data.data);
      }
    });
    getEdxCourseType().then((response) => {
      if (response.status === 200) {
        setCourseTypeList(response.data.data);
      }
    });
    getEdxCourseDescription().then((response) => {
      if (response.status === 200) {
        setDescriptionTypeList(response.data.data);
      }
    });
    getAndSetStudentEdx();
  }, []);

  const classes = useStyles();

  const handleBatchChange = (value) => {
    if (value.length !== 0) {
      saveStudentEdx(
        props.match.params.studentId,
        props.match.params.productId,
        data
      ).then((response) => {
        if (response.status === 200) {
          getAndSetStudentEdx();
        }
      });
    }
  };

  const courseCatChange = (index, value) => {
    let copyOfData = { ...data };
    copyOfData.courseCategorizations[index].pgaEdxCourseType = value;
    setData(copyOfData);
  };

  const courseDesChange = (index, value) => {
    let copyOfData = { ...data };
    copyOfData.courseCategorizations[index].description = value;
    setData(copyOfData);
  };

  const handleTextChange = (e, index) => {
    let copyOfData = { ...data };
    copyOfData.courseCategorizations[index][e.target.name] = e.target.value;
    setData(copyOfData);
  };

  const handleDescriptionChange = (e) => {
    let copyOfData = { ...data };
    copyOfData[e.target.name] = e.target.value;
    setData(copyOfData);
  };

  const handleNoOfCourseChange = (e, index) => {
    let copyOfData = { ...data };
    copyOfData.quarterlyPlans[index][e.target.name] = e.target.value;
    setData(copyOfData);
  };

  const handleQuarterCatTypeChange = (index, value) => {
    let copyOfData = { ...data };
    copyOfData.quarterlyPlans[index].pgaEdxCourseType = value;
    setData(copyOfData);
  };

  const handleAddClick = () => {
    setData((prev) => ({
      ...prev,
      courseCategorizations: [
        ...prev.courseCategorizations,
        {
          id: null,
          branch: null,
          quarterlyPlans: [],
          courseCategorizations: [],
          branchDate: null,
          descriptionOne: null,
          descriptionTwo: null,
        },
      ],
    }));
  };

  const handleDeleteClick = (item, index) => {
    if (item.id) {
      deleteStudentEdx(item.id).then((response) => {
        if (response.status === 200) {
          getAndSetStudentEdx();
        }
      });
    } else {
      let copyOfData = { ...data };
      if (copyOfData.courseCategorizations.length !== 1) {
        copyOfData.courseCategorizations.splice(index, 1);
        setData(copyOfData);
      }
    }
  };

  const handleSave = () => {
    if (data.id) {
      let error = false;
      for (let i = 0; i < data.courseCategorizations.length; i++) {
        if (isEmptyString(data.courseCategorizations[i].courseDetailsOne)) {
          error = true;
          break;
        }
        if (isEmptyString(data.courseCategorizations[i].courseDetailsTwo)) {
          error = true;
          break;
        }
        if (isEmptyObject(data.courseCategorizations[i].description)) {
          error = true;
          break;
        }
        if (isEmptyObject(data.courseCategorizations[i].pgaEdxCourseType)) {
          error = true;
          break;
        }
      }
      for (let i = 0; i < data.quarterlyPlans.length; i++) {
        if (isEmptyObject(data.quarterlyPlans[i].pgaEdxCourseType)) {
          error = true;
          break;
        }
        if (isEmptyString(data.quarterlyPlans[i].description)) {
          error = true;
          break;
        }
      }
      if (
        !isEmptyObject(data.branch) &&
        data.branchDate !== null &&
        !isEmptyString(data.descriptionOne) &&
        !isEmptyString(data.descriptionTwo) &&
        !error
      ) {
        saveStudentEdx(
          props.match.params.studentId,
          props.match.params.productId,
          data
        ).then((response) => {
          if (response.status === 200) {
            getAndSetStudentEdx();
            setSnack({
              snackOpen: true,
              snackColor: "success",
              snackMsg: "Saved Successfully",
            });
          }
        });
      } else {
        setSnack({
          snackOpen: true,
          snackColor: "error",
          snackMsg: HELPER_TEXT.requiredField,
        });
      }
    } else {
      setSnack({
        snackOpen: true,
        snackColor: "error",
        snackMsg: "Please Select The Batch First",
      });
    }
  };

  return (
    <PageWrapper>
      <div className={classes.containerStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant={"h5"}>edX Courses</Typography>
          </Grid>
          <Grid item md={2} lg={2} xl={2}>
            <DropDown
              id="combo-box-demo"
              options={batchList}
              fullWidth
              disabled={data.id && true}
              value={data.branch}
              onChange={(e, newValue) =>
                setData((prev) => ({
                  ...prev,
                  branch: newValue,
                }))
              }
              onBlur={(e) => handleBatchChange(e.target.value)}
              getOptionLabel={(option) => option.monthStr}
              renderInput={(params) => (
                <TextFieldComponent
                  {...params}
                  label="Batch"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={2} lg={2} xl={2}>
            <DatePick
              label={"edX Validity Date"}
              value={data.branchDate}
              onChange={(date) =>
                setData((prev) => ({ ...prev, branchDate: date }))
              }
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <TextFieldComponent
              value={data.descriptionOne || ""}
              name={"descriptionOne"}
              onChange={(e) => handleDescriptionChange(e)}
              label={"Expected courses to complete by application deadline"}
              fullWidth
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <TextFieldComponent
              value={data.descriptionTwo || ""}
              name={"descriptionTwo"}
              onChange={(e) => handleDescriptionChange(e)}
              label={"Expected courses to complete by edX course validity date"}
              fullWidth
            />
          </Grid>
          <Grid item md={2} lg={2} xl={2}></Grid>
          {data.quarterlyPlans.length !== 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className={classes.suggestPlan}
            >
              <Typography variant={"h6"}>
                Suggested Plan of Action (for completion of edX courses)-
                Quarterly Plan
              </Typography>
            </Grid>
          )}

          {data.quarterlyPlans.map((eachPlan, index) => {
            return (
              <>
                <Grid item md={6} lg={6} xl={6}>
                  <Grid container spacing={2}>
                    <Grid item md={12} lg={12} xl={12}>
                      <Typography>{`Quarter: ${eachPlan.quarterPlan}`}</Typography>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                      <DropDown
                        id="combo-box-demo"
                        options={courseTypeList}
                        fullWidth
                        value={eachPlan.pgaEdxCourseType}
                        onChange={(e, newValue) =>
                          handleQuarterCatTypeChange(index, newValue)
                        }
                        getOptionLabel={(option) => option.type}
                        renderInput={(params) => (
                          <TextFieldComponent
                            {...params}
                            label="Select Course Type"
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={5} lg={5} xl={5}>
                      <TextFieldComponent
                        className={classes.textField}
                        name={"description"}
                        value={eachPlan.description || ""}
                        onChange={(e) => handleNoOfCourseChange(e, index)}
                        label={"Number of course"}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {index % 2 !== 0 && (
                  <Grid item md={12} lg={12} xl={12}>
                    <hr />
                  </Grid>
                )}
              </>
            );
          })}
          <Grid
            item
            xs={12}
            className={classes.suggestPlan}
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant={"h6"}>
              Categorization of courses for easy selection
            </Typography>
            <AddButton onClick={handleAddClick} color={colors.primaryColor}>
              Add
            </AddButton>
          </Grid>
          {data.courseCategorizations.map((eachCat, index) => {
            return (
              <>
                <Grid item md={2}>
                  <DropDown
                    id="combo-box-demo"
                    options={courseTypeList}
                    fullWidth
                    value={eachCat.pgaEdxCourseType}
                    onChange={(e, newValue) => courseCatChange(index, newValue)}
                    getOptionLabel={(option) => option.type}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Select Type"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={5}>
                  <DropDown
                    id="combo-box-demo"
                    options={descriptionList}
                    fullWidth
                    value={eachCat.description}
                    onChange={(e, newValue) => courseDesChange(index, newValue)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Description"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={2}>
                  <TextFieldComponent
                    className={classes.textField}
                    value={eachCat.courseDetailsOne || ""}
                    name={"courseDetailsOne"}
                    onChange={(e) => handleTextChange(e, index)}
                    label={"Course Details"}
                    fullWidth
                  />
                </Grid>
                <Grid item md={2}>
                  <TextFieldComponent
                    className={classes.textField}
                    value={eachCat.courseDetailsTwo || ""}
                    onChange={(e) => handleTextChange(e, index)}
                    name={"courseDetailsTwo"}
                    label={"Course Details"}
                    fullWidth
                  />
                </Grid>
                <Grid item md={1} container justifyContent={"center"}>
                  <IconButton onClick={() => handleDeleteClick(eachCat, index)}>
                    <DeleteOutlineRoundedIcon color={"secondary"} />
                  </IconButton>
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>
      <BottomContainer onClick={handleSave} />
      <MySnackBar
        onClose={() =>
          setSnack({
            snackOpen: false,
            snackMsg: "",
            snackColor: "",
          })
        }
        snackOpen={snack.snackOpen}
        snackVariant={snack.snackColor}
        snackMsg={snack.snackMsg}
      />
    </PageWrapper>
  );
}

export default Edx;
