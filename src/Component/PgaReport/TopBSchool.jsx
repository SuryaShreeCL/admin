import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewCountryForSelect } from "../../Actions/Aspiration";
import { saveSchool } from "../../Actions/HelperAction";
import {
  addSampleSchool,
  deleteSelectedSchool,
  getAddedSchool,
  getPlanBCountry,
  getSchoolRegion,
  searchSchool,
} from "../../AsyncApiCall/PgaReport/SampleSchool";
import DropDown from "../../Component/Controls/DropDown";
import TextFieldComponent from "../../Component/Controls/TextField";
import { HELPER_TEXT } from "../../Constant/Variables";
import Editable from "../../Utils/EditableTable";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { isEmptyObject } from "../Validation";
import BottomContainer from "./BottomContainer";
import BSchoolTable from "./Components/BSchoolTable";
import NoSchool from "./Components/NoSchool";
import { PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";

function SelectSchool(props) {
  const [region, setRegion] = useState([]);
  const [searchSchoolList, setSearchSchoolList] = useState([]);
  const [selectedSchoolList, setSelectedSchoolList] = useState([]);
  const [ countryList, setCountryList ] = useState([])
  const [snack, setSnack] = useState({
    snackOpen: false,
    snackColor: "",
    snackMsg: "",
  });

  const [selectedCountry, setSelectedCountry] = useState({
    value: null,
    helperText: "",
  });

  const [selectedRegion, setSelectedRegion] = useState({
    value: null,
    helperText: "",
  });

  const dispatch = useDispatch();
  const { addedSchool } = useSelector((state) => state.HelperReducer);
  // const { viewCountryForSelectList } = useSelector(
  //   (state) => state.AspirationReducer
  // );
  const columns = [
    {
      title: "Id",
      field: "id",
      hidden: true,
    },
    {
      title: "Region",
      field: "region.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.region.name : "",
    },
    {
      title: "Country",
      field: "country.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.country.name : "",
    },
    {
      title: "B School Name",
      field: "university.name",
      render: (rowData, renderType) =>
        renderType === "row" ? rowData.university.name : "",
    },
  ];

  const classes = useStyles();

  const getAndSetSearchSchoolList = (data) => {
    searchSchool(props.match.params.productId,"BSCHOOL", data).then((response) => {
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
    // dispatch(viewCountryForSelect());
    getPlanBCountry()
    .then(response=>{
      if(response.status === 200){
        setCountryList(response.data.data)
      }
    })
    getSchoolRegion(props.match.params.productId).then((response) => {
      if (response.status === 200) {
        setRegion(response.data.data);
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

    isEmptyObject(selectedCountry.value)
      ? setSelectedCountry((prevSelect) => ({
          ...prevSelect,
          helperText: HELPER_TEXT.requiredField,
        }))
      : setSelectedCountry((prevSelect) => ({ ...prevSelect, helperText: "" }));
    if (
      !isEmptyObject(selectedRegion.value) &&
      !isEmptyObject(selectedCountry.value)
    ) {
      let requestBody = {
        region: { id: selectedRegion.value.id },
        country: { id: selectedCountry.value.id },
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
                    <Typography variant={"h5"}>Top Schools By Regions</Typography>
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
                  <Grid item md={6}>
                    <DropDown
                      id="combo-box-demo"
                      options={countryList}
                      getOptionLabel={(option) => option.name}
                      value={selectedCountry.value}
                      fullWidth
                      onChange={(e, value) => {
                        setSelectedCountry((prevSelected) => ({
                          ...prevSelected,
                          value: value,
                          helperText: "",
                        }));
                      }}
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          error={selectedCountry.helperText.length > 0}
                          helperText={selectedCountry.helperText}
                          label="Country"
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
                  <BSchoolTable
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
                    lg={12}
                    xl={12}
                    container
                    className={classes.sampleSchoolHeading}
                    alignItems={"center"}
                  >
                    <Typography variant={"h5"}>
                      Sample B-Schools Section
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
