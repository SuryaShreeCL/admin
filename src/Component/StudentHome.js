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
import ManualUsers from "./ManualUsers"
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

export default function StudentHome() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
        <Student />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActiveStudents />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BlackListedStudents />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MernUsers />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ManualUsers />
      </TabPanel>
    </div>
  );
}
