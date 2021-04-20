import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GeneralDetails from './GeneralDetails';
import AcademicData from './AcademicData';
import CvAndPpga from './CvAndPpga';
import Pgaplan from './Pgaplan';
import Comment from './Commentandpoints';
import Review from './ReviewandRollout';

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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

 class PgaTab extends React.Component {
     constructor(props){
         super(props);
         this.state = {
             value : 0
         }
     }
    render() {
        console.log(this.props)
        return (
            <div>
                <AppBar position="static">
        <Tabs value={this.state.value} onChange={(e,newValue)=>this.setState({value : newValue})} aria-label="simple tabs example">
          <Tab label="General Details" {...a11yProps(0)} />
          <Tab label="Academic Data" {...a11yProps(1)} />
          <Tab label="CV And PPGA Questions" {...a11yProps(2)} />
          <Tab label="PGA Plan" {...a11yProps(3)} />
          <Tab label="Comment and Points" {...a11yProps(4)} />
          <Tab label="Review and Rollout" {...a11yProps(5)} />

        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
        <GeneralDetails id={this.props.id} />
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <AcademicData id={this.props.id} />
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
            <CvAndPpga id={this.props.id} />
      </TabPanel>
      <TabPanel value={this.state.value} index={3}>
            <Pgaplan id={this.props.id} />
      </TabPanel>
      <TabPanel value={this.state.value} index={4}>
            <Comment id={this.props.id} />
      </TabPanel>
      <TabPanel value={this.state.value} index={5}>
            <Review id={this.props.id} />
      </TabPanel>
            </div>
        )
    }
}

export default PgaTab