import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { postStudentAccess, viewStudentStatus } from "../Actions/AdminAction";
import "../Asset/StudentData.css";
import AllocateMentor from "./AllocateMentor";
import CareerInterestSurveyResults from "./CareerInterestSurveyResults";
import PgaTab from "./Pga/PgaTab";
import Product from "./Product";
import StarterPackTable from "./ProductBased/StarterPackTable";
import Recommendation from "./Recommendation";
import ScoreDetails from "./ScoreDetails";
import StudentDocuments from "./StudentDocuments";
import StudentMarkDetails from "./StudentMarkDetails";
import SubStudentTab from "./SubStudentTab";
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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export function Student_data(props) {
  React.useEffect(()=>{
    // props.viewStudentStatus(props.match.params.id)
  },[])
  console.log(props.match.params.id);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [activate, setActivate] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  console.log(props.studentStatusResponse)
  return (
    <div className={classes.root}>
 
        <AppBar position="sticky" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >

            <Tab label="Student Information" {...a11yProps(1)} />
            <Tab label="Career Interest Survey" {...a11yProps(2)} />
            <Tab label="Recommendation" {...a11yProps(3)} />
            <Tab label="Product" {...a11yProps(4)} />
            <Tab label="Documents" {...a11yProps(5)} />
            <Tab label="StudentMarkDetails" {...a11yProps(6)} />
            <Tab label="ScoreDetails" {...a11yProps(7)} />
            <Tab label="Mentor Allocation" {...a11yProps(8)} />
            <Tab label="PGA" {...a11yProps(9)} />
            <Tab label="Starter Pack" {...a11yProps(10)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* <Other_data id={props.match.params.id} /> */}
          <SubStudentTab id={props.match.params.id} />
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
        <TabPanel value={value} index={4}>
          <StudentDocuments id={props.match.params.id} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <StudentMarkDetails id={props.match.params.id} />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <ScoreDetails id={props.match.params.id} />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <AllocateMentor id={props.match.params.id} />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <PgaTab id={props.match.params.id} />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <StarterPackTable id={props.match.params.id} />
        </TabPanel>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    studentAccessResponse: state.AdminReducer.studentAccessResponse,
    studentStatusResponse: state.AdminReducer.studentStatusResponse
  };
};
export default connect(mapStateToProps, { postStudentAccess, viewStudentStatus })(Student_data);
