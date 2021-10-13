import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { PageWrapper } from "./Components/StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useStyles } from "./Styles/Index";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
function PlanOfAction(props) {
  const classes = useStyles();
  const [quarterly, setQuarterly] = useState([
    {
      name: "july",
      focus: [
        { name: "Focus", activity: "", remark: "" },
        { name: "Focus", activity: "", remark: "" },
      ],
    },
    { name: "October", focus: [{ name: "Focus", activity: "", remark: "" }] },
    { name: "Jan", focus: [{ name: "Focus", activity: "", remark: "" }] },
    { name: "Feb", focus: [{ name: "Focus", activity: "", remark: "" }] },
  ]);
  const handleAddClick = (index) => {
    let quarterlyCopy = [...quarterly];
    quarterlyCopy[index].focus.push({
      name: "Focus",
      activity: "",
      remark: "",
    });
    setQuarterly(quarterlyCopy);
  };

  return (
    <PageWrapper>
      <div className={classes.planOfActionContainer}>
        <Typography variant={"h5"}>Quarterly Plan Of Action</Typography>
      </div>
      <Grid container spacing={2} className={classes.planOfActionWrapper}>
        {quarterly.map((eachQuarter, quarterIndex) => {
          return (
            <>
              <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                <Typography>{eachQuarter.name}</Typography>
              </Grid>
              {eachQuarter.focus.map((eachFocus, focusIndex) => {
                let focusNumber = focusIndex + 1;
                return (
                  <>
                    <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
                      <Typography>
                        {eachFocus.name + " " + focusNumber}
                      </Typography>
                    </Grid>
                    <Grid item md={3} xs={12} sm={12} lg={3} xl={3}>
                      <DropDown
                        id="combo-box-demo"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextFieldComponent
                            {...params}
                            label="Focus Name"
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3} xs={12} sm={12} lg={3} xl={3}>
                      <TextFieldComponent label={"Activity"} fullWidth />
                    </Grid>
                    <Grid item md={5} xs={12} sm={12} lg={5} xl={5}>
                      <TextFieldComponent label={"Remarks"} fullWidth />
                    </Grid>
                    <Grid item md={1} xl={1} lg={1} container justifyContent={"flex-end"}>
                      {focusIndex === eachQuarter.focus.length - 1 && (
                        <IconButton
                          onClick={() => handleAddClick(quarterIndex)}
                        >
                          <AddCircleOutlineOutlinedIcon color={"primary"} />
                        </IconButton>
                      )}

                      <IconButton>
                        <DeleteOutlineRoundedIcon color={"secondary"} />
                      </IconButton>
                    </Grid>
                  </>
                );
              })}
            </>
          );
        })}
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

export default PlanOfAction;
