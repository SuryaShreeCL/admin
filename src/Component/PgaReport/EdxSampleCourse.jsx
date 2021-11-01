import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCourse } from "../../Actions/HelperAction";
import NoCourse from "../../Asset/Images/NoCourse.svg";
import { getEdxCourseType } from "../../AsyncApiCall/PgaReport/Edx";
import {
  deleteStudentEdxCourse,
  getEdxCourseCategory,
  getStudentEdxCourse,
  saveEdxCourseCategory,
  searchEdxCourseByCategory,
} from "../../AsyncApiCall/PgaReport/EdxSampleCourse";
import DropDown from "../../Component/Controls/DropDown";
import TextFieldComponent from "../../Component/Controls/TextField";
import { HELPER_TEXT } from "../../Constant/Variables";
import Editable from "../../Utils/EditableTable";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { isEmptyObject, isEmptyString } from "../Validation";
import BottomContainer from "./BottomContainer";
import CourseListTable from "./Components/CourseListTable";
import NoSchool from "./Components/NoSchool";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function EdxSampleCourse(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [studentCategory, setStudentCategory] = useState({
    value: null,
    helperText: "",
  });
  const [searchCourseList, setSearchCourseList] = useState([]);
  const [selectedCourseList, setSelectedCourseList] = useState([]);
  const [courseTypeList, setCourseTypeList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackMsg: "",
    snackColor: "",
  });
  const dispatch = useDispatch();
  const { addedCourse } = useSelector((state) => state.HelperReducer);

  const columns = [
    {
      title: "Id",
      field: "id",
      hidden: true,
    },
    {
      title: "Course Title",
      field: "courseTitle",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.courseTitle : "",
        validate : ( rowData ) => {
          if( !isEmptyString(rowData.courseTitle) ){
            return true;
          }else{
            return { isValid  : false }
          }
        }
    },
    {
      title: "Level",
      field: "level",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.level : "",
        validate : ( rowData ) => {
          if( !isEmptyString(rowData.level) ){
            return true;
          }else{
            return { isValid  : false }
          }
        }
    },
    {
      title: "Program Type",
      field: "programType",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.programType : "",
        validate : ( rowData ) => {
          if( !isEmptyString(rowData.programType) ){
            return true;
          }else{
            return { isValid  : false }
          }
        }
    },
    {
      title: "Course Type",
      field: "pgaEdxCourseType",
      render: (rowData, renderType) =>{
        if(renderType === "row"){
          if(rowData.pgaEdxCourseType){
            return rowData.pgaEdxCourseType.type
          }else{
            return ""
          }
        }
      },
      validate : ( rowData )=>{
          if(!isEmptyObject(rowData.pgaEdxCourseType)){
            return true;
          }else{
            return { isValid : false }
          } 
      },
      editComponent: (props) => {
        console.log(props);
        return (
          <DropDown
            id="combo-box-demo"
            options={courseTypeList}
            getOptionLabel={(option) => option.type}
            value={props.rowData.pgaEdxCourseType}
            fullWidth
            onChange={(e, value) => {
                console.log(value)
              props.onChange(value);
            }}
            renderInput={(params) => (
              <TextFieldComponent
                {...params}
                error={isEmptyObject(props.rowData.pgaEdxCourseType)}
                label="Course Type"
                variant="standard"
              />
            )}
          />
        );
      },
    },
  ];

  const classes = useStyles();

  const getAndSetSearchCourseList = () => {
    searchEdxCourseByCategory(studentCategory.value.id).then((response) => {
      if (response.status === 200) {
        setSearchCourseList(response.data.data);
      }
    });
  };

  const getAndSetAddedCourse = () => {
    getStudentEdxCourse(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setSelectedCourseList(response.data.data);
      }
    });
  };

  useEffect(() => {
    getEdxCourseType().then((response) => {
      if (response.status === 200) {
        setCourseTypeList(response.data.data);
      }
    });
    getEdxCourseCategory().then((response) => {
      if (response.status === 200) {
        setCategoryList(response.data.data);
      }
    });

    getAndSetAddedCourse();
  }, []);

  useEffect(() => {
    if (addedCourse) {
      if (
        selectedCourseList.filter((el) => el.id === addedCourse.id).length === 0
      ) {
        setSelectedCourseList((prevSelectedCourse) => [
          ...prevSelectedCourse,
          addedCourse,
        ]);
        dispatch(saveCourse(null));
      } else {
        setSnack({
          snackColor: "info",
          snackMsg: "This Course is already added",
          snackOpen: true,
        });
      }
    }
  }, [addedCourse]);

  const handleSearchCategory = () => {
    isEmptyObject(studentCategory.value)
      ? setStudentCategory((prevSelect) => ({
          ...prevSelect,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setStudentCategory((prevSelect) => ({ ...prevSelect, helperText: "" }));

    if (!isEmptyObject(studentCategory.value)) {
      getAndSetSearchCourseList();
    }
  };
  const handleRowDelete = (oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        deleteStudentEdxCourse(
          oldData.id
        ).then((response) => {          
          if (response.status === 200) {
            if(response.data.success){
              getAndSetAddedCourse();
            } else {
              const dataDelete = [...selectedCourseList];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setSelectedCourseList([...dataDelete]);
            }
          }
        });
        resolve();
      }, 1000);
    });
  };

  const handleRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...selectedCourseList];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setSelectedCourseList([...dataUpdate]);
        resolve();
      }, 1000);
    });
  };

  const handleSaveClick = () => {

    if (selectedCourseList.length !== 0) {
      const selectedCourseListId = selectedCourseList.map(
        (eachCourse, index) => {
          return { pgaEdxCourse: {id : eachCourse.id}, pgaEdxCourseType : {id : eachCourse.pgaEdxCourseType.id} };
        }
      );
      console.log(selectedCourseListId, "------")
      saveEdxCourseCategory(
        props.match.params.studentId,
        props.match.params.productId,
        selectedCourseListId
      ).then((response) => {
        if (response.status === 200) {
          getAndSetAddedCourse();
          setSnack({
            snackMsg: "Saved Successfully",
            snackColor: "success",
            snackOpen: true,
          });
        }
      });
    } else {
      setSnack({
        snackMsg: "Please Add Course First",
        snackColor: "warning",
        snackOpen: true,
      });
    }
  };
  console.log(selectedCourseList, "=========")
  return (
    <PageWrapper>
      <div className={classes.containerStyle}>
        <Grid container>
          <Grid
            item
            sm={12}
            xs={12}
            md={6}
            lg={6}
            xl={6}
            className={classes.schoolLeftContainer}
          >
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography variant={"h5"}>
                    edX Courses - Suggested sample edX courses for Client
                    </Typography>
                  </Grid>

                  <Grid item md={8}>
                    <DropDown
                      id="combo-box-demo"
                      options={categoryList}
                      getOptionLabel={(option) => option.name}
                      value={studentCategory.value}
                      fullWidth
                      onChange={(e, value) => {
                        setStudentCategory((prevSelectedCat) => ({
                          ...prevSelectedCat,
                          value: value,
                          helperText: "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          error={studentCategory.helperText.length > 0}
                          helperText={studentCategory.helperText}
                          label="Category"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    container
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                  >
                    <PrimaryButton
                      type={"submit"}
                      variant={"contained"}
                      onClick={handleSearchCategory}
                      color={"primary"}
                    >
                      Search
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                <hr />
              </Grid>
              <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                {searchCourseList.length !== 0 ? (
                  <CourseListTable
                    selectedCourse={selectedCourseList}
                    data={searchCourseList}
                  />
                ) : (
                  <NoSchool image={NoCourse} text={"No Course Found"} />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
            <div className={classes.containerStyle}>
              <Grid container spacing={2}>
                {selectedCourseList.length !== 0 && (
                  <Grid
                    item
                    md={12}
                    lg={12}
                    xl={12}
                    container
                    className={classes.sampleSchoolHeading}
                    alignItems={"center"}
                  >
                    <Typography variant={"h5"}>
                    Selected sample course  
                    </Typography>
                    <Typography color={"textSecondary"}>
                      ({selectedCourseList.length})
                    </Typography>
                  </Grid>
                )}
                <Grid item md={12}>
                  {selectedCourseList.length !== 0 ? (
                    <Editable
                    onRowUpdate={handleRowUpdate}
                      data={selectedCourseList}
                      columns={columns}
                      onRowDelete={handleRowDelete}
                    />
                  ) : (
                    <NoSchool image={NoCourse} text={"No Course Added"} />
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <BottomContainer onClick={handleSaveClick} />
      </div>
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

export default EdxSampleCourse;
