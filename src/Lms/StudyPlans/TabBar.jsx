import React,{useState}from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Index from './Index';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function TabPanel(props) {
  const { children, value,index, ...other } = props;
   

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

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const months=[
    "1 Month",
    "3 Month",
    "6 Month",
    "9 Month"
  ]

  console.log(props.data);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        // style={{backgroundColor:"#1093FF"}}
        style={{
          backgroundColor: <Index /> ? "#1093FF" : "#F5F5F5",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {months &&
            months.map((month, index) => {
              return (
                <div key={index}>
                  <Tab label={month} value="one" {...a11yProps(0)} />
                </div>
              );
            })}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={"one"}>
      {props.data &&
            props.data.data.map((month, index) => {
              return (
                <div key={index}>
                   <List component="nav" aria-labelledby="nested-list-subheader">
                  <ListItem className={"list_button"} button>
                    <ListItemText
                      className={"list_item"}
                      primary={`${month.month} month`}
                    />
                  </ListItem>
                  </List>
                </div>
              );
            })}
          
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <CallbyTommorrow/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CallBydayafterTommorrow/>
      </TabPanel> */}
    </div>
  );
}
