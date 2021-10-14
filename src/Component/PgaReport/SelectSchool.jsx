import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
import BottomContainer from "./BottomContainer";
import {  PageWrapper } from "./Components/StyledComponents";
import DropDown from "../../Component/Controls/DropDown";
import TextFieldComponent from "../../Component/Controls/TextField";
import { useStyles } from "./Styles/Index";
import {
  getSchoolCategory,
  getSchoolProgram,
  getSchoolRegion,
  searchSchool,
} from "../../AsyncApiCall/PgaReport/SampleSchool";
import SchoolListTable from "./Components/SchoolListTable";
import NoSchool from "./Components/NoSchool";
import { isEmptyObject } from "../Validation";
import { HELPER_TEXT } from "../../Constant/Variables";

function SelectSchool(props) {
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [program, setProgram] = useState([]);
  const [searchSchoolList, setSearchSchoolList] = useState([]);
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

  const classes = useStyles();

  const getAndSetSearchSchoolList = (data) => {
    searchSchool(data).then((response) => {
      if (response.status === 200) {
        setSearchSchoolList(response.data.data);
      }
    });
  };

  useEffect(() => {
    getSchoolCategory().then((response) => {
      if (response.status === 200) {
        setCategory(response.data.data);
      }
    });
    getSchoolRegion().then((response) => {
      if (response.status === 200) {
        setRegion(response.data.data);
      }
    });
    getSchoolProgram().then((response) => {
      if (response.status === 200) {
        setProgram(response.data.data);
      }
    });
  }, []);

  const handleSearchSchool = () => {
    isEmptyObject(selectedRegion.value) ? setSelectedRegion(prevSelect=>({...prevSelect, helperText : HELPER_TEXT.requiredField})) : setSelectedRegion(prevSelect=>({ ...prevSelect, helperText : "" }))
    isEmptyObject(selectedCategory.value) ? setSelectedCategory(prevSelect=>({...prevSelect, helperText : HELPER_TEXT.requiredField})) : setSelectedCategory(prevSelect=>({...prevSelect, helperText : ""}))
    isEmptyObject(selectedProgram.value) ? setSelectedProgram(prevSelect=>({...prevSelect, helperText : HELPER_TEXT.requiredField})) : setSelectedProgram(prevSelect=>({...prevSelect, helperText : ""}))
    if(
      !isEmptyObject(selectedRegion.value) &&
      !isEmptyObject(selectedCategory.value) &&
      !isEmptyObject(selectedProgram.value)
    ){
      let requestBody = {
        region: { id: selectedRegion.value.id },
        category: { id: selectedCategory.value.id },
        program: { id: selectedProgram.value.id },
      };
      getAndSetSearchSchoolList(requestBody);
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
            className={classes.leftContainer}
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
                          helperText : ""
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
                          helperText : ""

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
                          helperText : ""

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
                  <SchoolListTable data={searchSchoolList} />
                ) : (
                  <NoSchool text={"No Sample School Found"} />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} xs={12} md={6} lg={6} xl={6}></Grid>
        </Grid>
        <BottomContainer />
      </div>
    </PageWrapper>
  );
}


export default SelectSchool;
