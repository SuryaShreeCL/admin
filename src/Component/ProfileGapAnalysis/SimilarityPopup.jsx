import {
  Button,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
  Typography,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterAnchorEl,
  setPoperAnchorEl,
} from "../../Actions/HelperAction";
import Accordian from "./Accordian";
import { StyledTab, StyledTabs } from "./PopUpTabs";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import SubjectInfoTable from "./SubjectInfoTable";

function SimilarityPopup(props) {
  // Setting up dispatch for making an API calls
  const dispatch = useDispatch();
  // Setting up styles for this component
  const useStyles = makeStyles((theme) => ({
    headingTypo: {
      padding: "16px 0px 10px 16px",
      fontWeight: 500,
    },
    popoverStyle: {
      height: "70vh",
      overflowY: "scroll",
      borderRadius: "10px",
      width: "700px",
    },
    filterContainer: {
      display: "flex",
      alignItems: "center",
      marginRight: "2%",
    },
    searchContainer: {
      alignSelf: "flex-end",
      marginBottom: "15px",
    },
    containerStyle: {
      margin: "0px 20px 0px 20px",
    },
  }));
  // Declaring variables for this component
  const popperAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.popperAnchorEl
  );
  const filterAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.filterAnchorEl
  );
  const popperOpen = Boolean(popperAnchorEl);
  const filterOpen = Boolean(filterAnchorEl);

  const id = popperOpen ? "simple-popper" : undefined;

  const [value, setValue] = React.useState(0);
  // Initiating style variable for this component
  const classes = useStyles();
  // This function handles the tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // This function handle the filter open
  const handleFilterOpen = (event) => {
    dispatch(setFilterAnchorEl(event.currentTarget));
  };
  // Setting you values for the year dropdown (logic : start year - Current year and end year ten years before start year )
  const years = () => {
    let endYear = new Date().getFullYear();
    let startYear = endYear - 10;

    let yearArr = [];
    for (let i = startYear; i <= endYear; i++) {
      yearArr.push(i);
    }
    return yearArr;
  };

  // This function returns the tab content based on index
  const renderTabContent = () => {
    console.log(years(), ".................");
    if (value === 0) {
      return (
        <Grid
          item
          md={12}
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          container
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <div className={classes.filterContainer}>
            <Typography color={"textSecondary"}>Filter By : </Typography>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              endIcon={<KeyboardArrowDownRoundedIcon />}
              onClick={handleFilterOpen}
            >
              Year
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={filterAnchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}              keepMounted
              open={filterOpen}
              onClose={() => dispatch(setFilterAnchorEl(null))}
            >
              {years().map((item, index) => {
                return (
                  <MenuItem
                    onClick={() => {
                      // This function will return student match data based on year
                      props.handleYearClick(item);
                      dispatch(setFilterAnchorEl(null));
                    }}
                  >
                    {item}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </Grid>
      );
    } else if (value === 1) {
      return (
        <Grid
          className={classes.containerStyle}
          container
          spacing={2}
          direction={"column"}
        >
          {/* Search field */}
          <div className={classes.searchContainer}>
            <TextField
              variant={"standard"}
              size={"small"}
              value={props.searchValue}
              onChange={props.searchHandler}
              label={"Search"}
            />
          </div>
          {/* Subject info table */}
          <SubjectInfoTable studentSubjectDetails={props.distinctMatch} />
        </Grid>
      );
    }
  };

  return (
    <Popover
      id={id}
      classes={{ paper: classes.popoverStyle }}
      open={popperOpen}
      anchorEl={popperAnchorEl}
      onClose={() => dispatch(setPoperAnchorEl(null))}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography className={classes.headingTypo}>
            Profile Similarity Checker
          </Typography>
        </Grid>
        <Grid item md={12}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Student Match" />
            <StyledTab label="Distinct Match" />
          </StyledTabs>
        </Grid>
        {renderTabContent()}
      </Grid>
      {/* Render list of accordians based on the data that is passed */}
      {value === 0 &&
        props.data.map((data, index) => {
          return <Accordian data={data} />;
        })}
    </Popover>
  );
}

export default SimilarityPopup;
