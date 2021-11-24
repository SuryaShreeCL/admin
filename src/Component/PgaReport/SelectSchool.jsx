import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
import BottomContainer from "./BottomContainer";
import { PageWrapper } from "./Components/StyledComponents";
import DropDown from "../../Component/Controls/DropDown";
import TextFieldComponent from "../../Component/Controls/TextField";
import { useStyles } from "./Styles/Index";
import {
  addSampleSchool,
  deleteSelectedSchool,
  getAddedSchool,
  getSchoolCategory,
  getSchoolProgram,
  getSchoolRegion,
  searchSchool,
} from "../../AsyncApiCall/PgaReport/SampleSchool";
import SchoolListTable from "./Components/SchoolListTable";
import NoSchool from "./Components/NoSchool";
import { isEmptyObject } from "../Validation";
import { HELPER_TEXT } from "../../Constant/Variables";
import { useDispatch, useSelector } from "react-redux";
import Editable from "../../Utils/EditableTable";
import MySnackBar from "../MySnackBar";
import { saveSchool } from "../../Actions/HelperAction";

function SelectSchool(props) {
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [program, setProgram] = useState([]);
  const [searchSchoolList, setSearchSchoolList] = useState([]);
  const [selectedSchoolList, setSelectedSchoolList] = useState([]);
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackColor: "",
    snackMsg: "",
  });

  const [selectedCategory, setSelectedCategory] = useState({
    value: null,
    helperText: "",
  });
  const [selectedProgram, setSelectedProgram] = useState({
    value: null,
    helperText: "",
  });

  const [selectedRegion, setSelectedRegion] = useState({
    value: null,
    helperText: "",
  });

  const dispatch = useDispatch();
  const { addedSchool } = useSelector((state) => state.HelperReducer);

  const columns = [
    {
      title: "Id",
      field: "id",
      hidden: true,
    },
    {
      title: "Category",
      field: "category.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.category.name : "",
    },
    {
      title: "University Name",
      field: "university.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.university.name : "",
    },
    {
      title: "Program Name",
      field: "program.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.program.name : "",
    },
    {
      title: "Region",
      field: "region.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.region.name : "",
    },
  ];

  const classes = useStyles();

  const getAndSetSearchSchoolList = (data) => {
    searchSchool(props.match.params.productId,"program", data).then((response) => {
      if (response.status === 200) {
        setSearchSchoolList(response.data.data);
      }
    });
  };

  const getAndSetAddedSchool = () => {
    getAddedSchool(
      props.match.params.studentId,
      props.match.params.productId
    ).then((response) => {
      if (response.status === 200) {
        setSelectedSchoolList(response.data.data);
      }
    });
  };

  useEffect(() => {
    getSchoolCategory(props.match.params.productId).then((response) => {
      if (response.status === 200) {
        setCategory(response.data.data);
      }
    });
    getSchoolRegion(props.match.params.productId).then((response) => {
      if (response.status === 200) {
        setRegion(response.data.data);
      }
    });
    getSchoolProgram(props.match.params.productId).then((response) => {
      if (response.status === 200) {
        setProgram(response.data.data);
      }
    });
    getAndSetAddedSchool();
  }, []);

  useEffect(() => {
    if (addedSchool) {
      if (
        selectedSchoolList.filter((el) => el.id === addedSchool.id).length === 0
      ) {
        setSelectedSchoolList((prevSelectedSchool) => [
          ...prevSelectedSchool,
          addedSchool,
        ]);
        dispatch(saveSchool(null));
      } else {
        setSnack({
          snackColor: "info",
          snackMsg: "This school is already added",
          snackOpen: true,
        });
      }
    }
  }, [addedSchool]);

  const handleSearchSchool = () => {
    isEmptyObject(selectedRegion.value)
      ? setSelectedRegion((prevSelect) => ({
          ...prevSelect,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setSelectedRegion((prevSelect) => ({ ...prevSelect, helperText: "" }));
    isEmptyObject(selectedCategory.value)
      ? setSelectedCategory((prevSelect) => ({
          ...prevSelect,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setSelectedCategory((prevSelect) => ({
          ...prevSelect,
          helperText: "",
        }));
    isEmptyObject(selectedProgram.value)
      ? setSelectedProgram((prevSelect) => ({
          ...prevSelect,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setSelectedProgram((prevSelect) => ({ ...prevSelect, helperText: "" }));
    if (
      !isEmptyObject(selectedRegion.value) &&
      !isEmptyObject(selectedCategory.value) &&
      !isEmptyObject(selectedProgram.value)
    ) {
      let requestBody = {
        region: { id: selectedRegion.value.id },
        category: { id: selectedCategory.value.id },
        program: { id: selectedProgram.value.id },
      };
      getAndSetSearchSchoolList(requestBody);
    }
  };
  const handleRowDelete = (oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        deleteSelectedSchool(
          props.match.params.studentId,
          props.match.params.productId,
          oldData.id
        ).then((response) => {
          if (response.data.success) {
            getAndSetAddedSchool();
          } else {
            const dataDelete = [...selectedSchoolList];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setSelectedSchoolList([...dataDelete]);
          }
        });
        resolve();
      }, 1000);
    });
  };

  const handleSaveClick = () => {
    if (selectedSchoolList.length !== 0) {
      const selectedSchoolListId = selectedSchoolList.map(
        (eachSchool, index) => {
          return { id: eachSchool.id };
        }
      );
      addSampleSchool(
        props.match.params.studentId,
        props.match.params.productId,
        selectedSchoolListId
      ).then((response) => {
        if (response.status === 200) {
          getAndSetAddedSchool();
          setSnack({
            snackMsg: "Saved Successfully",
            snackColor: "success",
            snackOpen: true,
          });
        }
      });
    } else {
      setSnack({
        snackMsg: "Please Add School First",
        snackColor: "warning",
        snackOpen: true,
      });
    }
  };
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
              <Grid item md={10}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Typography variant={"h5"}>
                      Select Sample Schools
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <DropDown
                      id="combo-box-demo"
                      options={category}
                      getOptionLabel={(option) => option.name}
                      value={selectedCategory.value}
                      fullWidth
                      onChange={(e, value) => {
                        setSelectedCategory((prevSelectedCat) => ({
                          ...prevSelectedCat,
                          value: value,
                          helperText: "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          error={selectedCategory.helperText.length > 0}
                          helperText={selectedCategory.helperText}
                          label="Category"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <DropDown
                      id="combo-box-demo"
                      options={region}
                      getOptionLabel={(option) => option.name}
                      value={selectedRegion.value}
                      fullWidth
                      onChange={(e, value) => {
                        setSelectedRegion((prevSelectedReg) => ({
                          ...prevSelectedReg,
                          value: value,
                          helperText: "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          error={selectedRegion.helperText.length > 0}
                          helperText={selectedRegion.helperText}
                          label="Region"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <DropDown
                      id="combo-box-demo"
                      options={program}
                      getOptionLabel={(option) => option.name}
                      value={selectedProgram.value}
                      fullWidth
                      onChange={(e, value) => {
                        setSelectedProgram((prevSelectedPro) => ({
                          ...prevSelectedPro,
                          value: value,
                          helperText: "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          error={selectedProgram.helperText.length > 0}
                          helperText={selectedProgram.helperText}
                          label="Program Name"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                md={2}
                container
                justifyContent={"center"}
                alignItems={"flex-end"}
              >
                <PrimaryButton
                  type={"submit"}
                  variant={"contained"}
                  onClick={handleSearchSchool}
                  color={"primary"}
                >
                  Search
                </PrimaryButton>
              </Grid>
              <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                <hr />
              </Grid>
              <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                {searchSchoolList.length !== 0 ? (
                  <SchoolListTable
                    selectedSchool={selectedSchoolList}
                    data={searchSchoolList}
                  />
                ) : (
                  <NoSchool text={"No Sample School Found"} />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
            <div className={classes.containerStyle}>
              <Grid container spacing={2}>
                {selectedSchoolList.length !== 0 && (
                  <Grid
                    item
                    md={12}
                    container
                    alignItems={"center"}
                    className={classes.sampleSchoolHeading}
                  >
                    <Typography variant={"h5"}>
                      Sample Schools Section
                    </Typography>
                    <Typography color={"textSecondary"}>
                      ({selectedSchoolList.length})
                    </Typography>
                  </Grid>
                )}
                <Grid item md={12}>
                  {selectedSchoolList.length !== 0 ? (
                    <Editable
                      data={selectedSchoolList}
                      columns={columns}
                      onRowDelete={handleRowDelete}
                    />
                  ) : (
                    <NoSchool text={"No Sample School Added"} />
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

export default SelectSchool;
