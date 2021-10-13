import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { colors } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { useStyles } from "./Styles/Index";

function SpecializationTrack() {
  const [specializationTrack, setSpecializationTrack] = useState([
    { id: "", trackName: "", careerTrack: "", courseOne: "", courseTwo: "" },
  ]);
  const classes = useStyles();
  const handleAddClick = () => {
    setSpecializationTrack([
      ...specializationTrack,
      { id: "", trackName: "", careerTrack: "", courseOne: "", courseTwo: "" },
    ]);
  };
  return (
    <PageWrapper>
      <div className={classes.specializationWrapper}>
        <Grid container spacing={2}>
          <Grid item sm={10} md={10} xs={10} lg={10} xl={10}>
            <Typography variant={"h5"}>
              Suggested Specialization Tracks
            </Typography>
          </Grid>
          <Grid
            item
            sm={2}
            md={2}
            xs={2}
            lg={2}
            xl={2}
            container
            justifyContent={"flex-end"}
          >
            <AddButton onClick={handleAddClick} color={colors.primaryColor}>
              Add
            </AddButton>
          </Grid>
          {specializationTrack.map((eachSpec, index) => {
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
                        label="Track Name"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={9}></Grid>
                <Grid item md={3}>
                  <DropDown
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Career Track"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4}>
                  <DropDown
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Course One"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4}>
                  <DropDown
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextFieldComponent
                        {...params}
                        label="Course Two"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  md={1}
                  container
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                >
                  <IconButton>
                    <DeleteOutlineRoundedIcon color={"secondary"} />
                  </IconButton>
                </Grid>
              </>
            );
          })}
        </Grid>
        <BottomContainer />
      </div>
    </PageWrapper>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];

export default SpecializationTrack;
