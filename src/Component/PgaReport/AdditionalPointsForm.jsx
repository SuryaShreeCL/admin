import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { colors } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
function AdditionalPointsForm(props) {
  const classes = useStyles();
  const [additionalPoints, setAdditionalPoints] = useState([
    {
      id: "",
      cgpa: "",
      remarks: "",
    },
  ]);
  const handleAddClick = () => {
    setAdditionalPoints([
      ...additionalPoints,
      { id: "", cgpa: "", remarks: "" },
    ]);
  };
  return (
    <PageWrapper>
      <Grid container className={classes.containerStyle}>
        <Grid item md={8}>
          <Grid container spacing={2}>
            <Grid item md={10}>
              <Typography variant={"h5"}>Additional Points</Typography>
            </Grid>
            <Grid item md={2} container justifyContent={"flex-end"}>
              <AddButton color={colors.primaryColor} onClick={handleAddClick}>
                Add
              </AddButton>
            </Grid>
            {additionalPoints.map((eachItem, index) => {
              return (
                <>
                  <Grid item md={3}>
                    <DropDown
                      id="combo-box-demo"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextFieldComponent
                          {...params}
                          label="CGPA"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={9}></Grid>
                  <Grid item md={11}>
                    <TextFieldComponent label={"Remarks"} fullWidth />
                  </Grid>
                  <Grid item md={1}>
                    <IconButton>
                      <DeleteOutlineRoundedIcon color={"secondary"} />
                    </IconButton>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
      <BottomContainer />
    </PageWrapper>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

export default AdditionalPointsForm;
