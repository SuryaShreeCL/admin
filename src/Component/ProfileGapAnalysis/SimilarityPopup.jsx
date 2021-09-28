import React from "react";
import {
  Popper,
  Popover,
  Typography,
  Grid,
  makeStyles,
  Chip,
  IconButton
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setPoperAnchorEl } from "../../Actions/HelperAction";
import Accordian from "./Accordian";
import { StyledTab, StyledTabs } from "./PopUpTabs";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import { withStyles } from "@material-ui/styles";
function SimilarityPopup(props) {
  const StyledPopOver = withStyles({
    paper : {
      height : "70vh"
    }
  })(Popover)
  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    headingTypo: {
      padding: "16px 0px 10px 16px",
      fontWeight: 500,
    },
    chipStyle : {
      marginLeft : "2%"
    },
    filterBtnStyle : {
      marginRight : "2%"
    },
    popoverStyle : {
      height : "70vh",
      overflowY : "scroll"
    }
  }));

  const popperAnchorEl = useSelector(
    (state) => state.HelperReducer.popperState.popperAnchorEl
  );
  const popperOpen = Boolean(popperAnchorEl);
  const id = popperOpen ? "simple-popper" : undefined;
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Popover
      id={id}
      classes={{paper : classes.popoverStyle}}
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
        <Grid
          item
          md={12}
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          container
          alignItems={"center"}
          justifyContent={"space-between"}
        >
         <Chip className={classes.chipStyle} color={"primary"} label="2021 - 2022" onDelete={()=>console.log("delete...")} />
         <IconButton className={classes.filterBtnStyle} color="primary" aria-label="add to shopping cart">
        <FilterListRoundedIcon />
      </IconButton>
        </Grid>
      </Grid>

      <Accordian />
      <Accordian /> 
    </Popover>
  );
}

export default SimilarityPopup;
