import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { colors } from "../../Constant/Variables";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import DropDown from "../Controls/DropDown";
import { useStyles } from "./Styles/Index";

function CriticalSuccessFactor(props) {

  const [factors, setFactors] = useState([{ cv: "", remarks: "" }]);
  const classes = useStyles()
  const handleAddClick = () => {
    setFactors([...factors, { cv: "", remarks: "" }]);
  };
  return (
    <PageWrapper>
        <div className={classes.specializationWrapper}>
        <Grid container spacing={2}>
        <Grid item md={10} sm={10} xs={10} lg={10} xl={10}>
          <Typography variant={"h5"}>Critical Success Factors</Typography>
        </Grid>
        <Grid item md={2} sm={2} xs={2} lg={2} xl={2} container justifyContent={"flex-end"}>
          <AddButton onClick={handleAddClick} color={colors.primaryColor}>
            Add
          </AddButton>
        </Grid>
        {factors.map((eachFactor, index) => {
          return (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DropDown
                  id="combo-box-demo"
                  options={top100Films}
                  className={classes.autoCompleteStyle}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextFieldComponent
                      {...params}
                      label="Curriculum Vitae"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                <TextFieldComponent label={"Remarks"} fullWidth />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1} container justifyContent={"flex-end"}>
                <IconButton>
                  <DeleteOutlineRoundedIcon color={"secondary"} />
                </IconButton>
              </Grid>
            </>
          );
        })}
      </Grid>
        </div>
    
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

export default CriticalSuccessFactor;
