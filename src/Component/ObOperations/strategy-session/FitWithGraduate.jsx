import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "./Styles";
import SaveContainer from "./components/SaveContainer";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getRegions } from "../../../Actions/Student";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllDegree,
  getAllSpecialization,
} from "../../../Actions/Aspiration";
import { getUniversity } from "../../../Actions/College";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FitWithGraduate() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { studentId } = useParams();
  const { regionList } = useSelector((state) => state.StudentReducer);
  const { allDegreeList } = useSelector((state) => state.AspirationReducer);
  const {universityList} = useSelector((state) => state.CollegeReducer);
  const [degree, setDegree] = useState(null);
  const [region, setRegion] = useState(null);
  const [value, setValue] = React.useState(0);
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    dispatch(getRegions(studentId));
    dispatch(getAllDegree());
    dispatch(getUniversity());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.contentWrapper}>
          <div >
        <Grid container>
          <Grid item xs={12}>
            <Typography>Graduate exam scores</Typography>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Tabs className={classes.tabMenuFitWithGraduate}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="simple tabs example"
          >
            <Tab label="Graduate School 1" />
            <Tab label="Graduate School 2" />
            <Tab label="Graduate School 3" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid item xs={10}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography>Region</Typography>
                  <Autocomplete
                  id="combo-box-demo"
                  options={regionList}
                  value={region}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setRegion(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Region"
                      variant="standard"
                    />
                  )}
                />
                </Grid>
                <Grid item xs={3}>
                  <Typography>Location</Typography>
                  <Autocomplete
                    // {...defaultProps}
                    id="debug"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Region"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography>Name of University</Typography>
                  <Autocomplete
                  id="combo-box-demo"
                  options={universityList}
                  value={university}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setUniversity(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="University"
                      variant="standard"
                    />
                  )}
                />
                </Grid>
                <Grid item xs={4}>
                  <Typography>Link to the program website</Typography>
                  <TextField
                    fullWidth
                    className={classes.UnalignedTextGraduate}
                    id="standard-basic"
                    placeholder="Point 1"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography>Program</Typography>
                  <Autocomplete
                    // {...defaultProps}
                    id="debug"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Region"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography>Degree</Typography>
                  <Autocomplete
                  id="combo-box-demo"
                  options={allDegreeList}
                  value={degree}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, newValue) => setDegree(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Degree" variant="standard" />
                  )}
                />
              
              
                </Grid>
                <Grid item xs={4}>
                  <Typography>Field of Study</Typography>
                  <Autocomplete
                    // {...defaultProps}
                    id="debug"
                    debug
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Region"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <hr></hr>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography>
                    Conduct&nbsp;a&nbsp;through&nbsp;research&nbsp;about&nbsp;the&nbsp;graduate&nbsp;school&nbsp;and&nbsp;extract&nbsp;information&nbsp;from&nbsp;the&nbsp;school&nbsp;wesbite&nbsp;in&nbsp;terms&nbsp;of&nbsp;the&nbsp;following:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    What do you like about the curriculum?
                  </Typography>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    placeholder="Point 1"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    What are the different research areas offered by the school?
                  </Typography>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    placeholder="Point 1"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    How do you relate yourself with the research work carried
                    out by different research Centres/Labs?
                  </Typography>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    placeholder="Point 1"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    Do check if there are any Professors whose work you really
                    like in your area of interest and identify someone whose
                    work fascinated you
                  </Typography>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    placeholder="Point 1"
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </div>
        </div>
      </div>
      <SaveContainer />
    </div>
  );
}
