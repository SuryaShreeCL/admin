import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Student  from './Student';
import  ActiveStudents  from './ActiveStudents';
import  BlackListedStudents  from './BlackListedStudent';
import  MernUsers  from './MernUsers';
import ManualUsers from "./ManualUsers";
import {studentPath } from "./RoutePaths";
import BackButton from '../Asset/Images/backbutton.svg';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Breadcrumbs} from '@material-ui/core'
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
  },
}));

export default function StudentHome(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
       <div style={{display:"flex",flexDirection:"row",margin:"10px"}}>
          <img
            src={BackButton}
            style={{ cursor: "pointer",marginTop:"-10px" }}
            onClick={() => props.history.goBack()}
             />
               <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Typography style={{ cursor: "pointer", fontWeight: "600",marginLeft:"10px" }} onClick={()=>props.history.push(studentPath)}>
                Home
              </Typography>
            </Breadcrumbs>
            </div>
      <AppBar position="static" color="default">
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="simple tabs example">
          <Tab label="All Users" {...a11yProps(0)} />
          <Tab label="Active Users" {...a11yProps(1)} />
          <Tab label="Inactive Users" {...a11yProps(2)} />
          <Tab label="Marketing Platform Users" {...a11yProps(3)} />
          <Tab label="Manual Users" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Student {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActiveStudents {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BlackListedStudents {...props} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MernUsers {...props} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ManualUsers {...props} />
      </TabPanel>
    </div>
  );
}
