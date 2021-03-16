import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BasicInformation } from './Table/StudentDetail/ProfileInfoComponents/BasicInformation';
import PersonalDetails from './NewStudentDetails/PersonalDetails';
import ContactDetails from './NewStudentDetails/ContactDetails';
import EducationalDetails from './NewStudentDetails/EducationalDetails';
import AccountStatus from './NewStudentDetails/AccountStatus';

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
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SubStudentTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value}
         onChange={handleChange}
         variant="fullWidth"
         scrollButtons="auto"
          aria-label="simple tabs example"
          >
          <Tab label="Personal Details" {...a11yProps(0)} />
          <Tab label="Contact Details" {...a11yProps(1)} />
          <Tab label="Educational Details" {...a11yProps(2)} />
          <Tab label="Account Status" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PersonalDetails id={props.id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactDetails id={props.id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EducationalDetails id={props.id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AccountStatus id={props.id} />
      </TabPanel>
    </div>
  );
}