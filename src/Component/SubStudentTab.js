import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";
import { BasicInformation } from './Table/StudentDetail/ProfileInfoComponents/BasicInformation';
import PersonalDetails from './NewStudentDetails/PersonalDetails';
import ContactDetails from './NewStudentDetails/ContactDetails';
import EducationalDetails from './NewStudentDetails/EducationalDetails';
import AccountStatus from './NewStudentDetails/AccountStatus';
import {getAspirationByStudentId,} from "../Actions/Student"
import {viewStudentStatus} from "../Actions/AdminAction"
import AspirationDetails from './NewStudentDetails/AspirationDetails';
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

 function SubStudentTab(props) {
  // function usePrevious(value) {
  //   const ref = React.useRef();
  //   React.useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  // const prevResponse = usePrevious(props.studentStatusResponse)
   React.useEffect(()=>{
    props.getAspirationByStudentId(props.id)
    props.viewStudentStatus(props.id)
  
   },[props.updateVerificationResponse])
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log(props.studentStatusResponse)
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
          <Tab label="Aspiration Details" {...a11yProps(3)} />
          <Tab label="Account Status" {...a11yProps(4)} />
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
      <TabPanel value={value} index={3}>
        <AspirationDetails id={props.id} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AccountStatus id={props.id} />
      </TabPanel>
      
    </div>
  );
}
const mapStateToProps = (state) =>{
  return {
    aspirationDetails : state.StudentReducer.aspirationDetails,
    studentStatusResponse : state.AdminReducer.studentStatusResponse,
    updateVerificationResponse : state.AdminReducer.updateVerificationResponse,

  }
}
export default connect(mapStateToProps,{getAspirationByStudentId, viewStudentStatus})(SubStudentTab)