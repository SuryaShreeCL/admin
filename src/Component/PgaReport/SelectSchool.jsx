import { Grid, Typography } from "@material-ui/core";
import React from "react";
import PrimaryButton from "../../Utils/PrimaryButton";
import BottomContainer from "./BottomContainer";
import { PageWrapper } from "./Components/StyledComponents";
import DropDown from "../../Component/Controls/DropDown";
import TextFieldComponent from "../../Component/Controls/TextField";
import { useStyles } from "./Styles/Index";
import { Formik, Form } from "formik";

const initialValues = {
  category: "",
  region: "",
  programName: "",
};


function SelectSchool(props) {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        console.log(values, ".....");
      }}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, resetForm, setFieldValue, values }) => (
        <Form onSubmit={handleSubmit}>
          <PageWrapper>
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
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          value={values.category}
                          fullWidth
                          onChange={(e, value) => {
                            setFieldValue(
                              "category",
                              value !== null ? value : initialValues.category
                            );
                          }}
                          renderInput={(params) => (
                            <TextFieldComponent
                              {...params}
                              label="Category"
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <DropDown
                          id="combo-box-demo"
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          value={values.region}
                          fullWidth
                          onChange={(e, value) => {
                            setFieldValue(
                              "region",
                              value !== null ? value : initialValues.region
                            );
                          }}
                          renderInput={(params) => (
                            <TextFieldComponent
                              {...params}
                              label="Region"
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <DropDown
                          id="combo-box-demo"
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          value={values.programName}
                          fullWidth
                          onChange={(e, value) => {
                            setFieldValue(
                              "programName",
                              value !== null ? value : initialValues.programName
                            );
                          }}
                          renderInput={(params) => (
                            <TextFieldComponent
                              {...params}
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
                      color={"primary"}
                    >
                      Search
                    </PrimaryButton>
                  </Grid>
                  <Grid item md={12}>
                    <hr />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
                Hello world
              </Grid>
            </Grid>
            <BottomContainer />
          </PageWrapper>
        </Form>
      )}
    </Formik>
  );
}
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

export default SelectSchool;
