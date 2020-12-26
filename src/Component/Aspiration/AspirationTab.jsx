import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {Paper} from "@material-ui/core"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AspirationTerm from "./AspirationTerm"
import AspirationArea from "./AspirationArea"
import AspirationFeildOfStudy from "./AspirationFeildOfStudy"
import AspirationDegree from "./AspirationDegree"
import AspirationCountry from "./AspirationCountry"
import AspirationCollege from "./AspirationCollege"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function AspirationTab(props) {
  console.log(props.match.params.id)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show,setShow]=React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <>
      <div>
       </div>
      {/* <AppBar position="sticky" color='default'> */}
        <Tabs value={value}
        component={Paper}
        elevation={3}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Terms" {...a11yProps(1)} />
          <Tab label="Degree" {...a11yProps(2)} />
          <Tab label="Feild Of Study" {...a11yProps(3)} />  
          <Tab label="Country" {...a11yProps(4)} />  
          <Tab label="Dream College" {...a11yProps(5)} />  
          <Tab label="Specialization" {...a11yProps(6)} />          
        </Tabs>
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>
        <AspirationTerm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AspirationDegree />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <AspirationFeildOfStudy />
      </TabPanel>   
      <TabPanel value={value} index={3}>
          <AspirationCountry />
      </TabPanel> 
      <TabPanel value={value} index={4}>
          <AspirationCollege />
      </TabPanel> 
      <TabPanel value={value} index={5}>
          <AspirationArea />
      </TabPanel>   
      </>
    </div>

  );
}