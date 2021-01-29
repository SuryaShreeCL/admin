import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HigherEducation from './HigherEducation'
import DiagnosticTestPerformance from './DiagnosticTestPerformance'
import CareerInterestSurveyResults from './CareerInterestSurveyResults'
import CareerPathOptions from './CareerPathOptions'
import Other_data from './OtherData'
import Recommendation from './Recommendation'
import '../Asset/StudentData.css'
import ProfileInfo from './Table/StudentDetail/ProfileInfo';
import CollapseContainer from './Table/StudentDetail/Utils/CollapseContainerHeader';
import Product from "./Product"
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

export default function Student_data(props) {
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
       <ProfileInfo id={props.match.params.id} />
       </div>
      <AppBar position="sticky" color='default'>
        <Tabs value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Profile Information" {...a11yProps(1)} />
          <Tab label="Career Intrest Survey" {...a11yProps(2)} />
          <Tab label="Recommendation" {...a11yProps(3)} /> 
          <Tab label="Product" {...a11yProps(4)} />          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Other_data id={props.match.params.id} />                          
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CareerInterestSurveyResults id={props.match.params.id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Recommendation id={props.match.params.id} />
      </TabPanel>   
      <TabPanel value={value} index={3}>
        <Product id={props.match.params.id} />
      </TabPanel>   
      </>
    </div>

  );
}