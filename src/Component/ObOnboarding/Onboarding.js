import {
  Grid,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  Typography,
  Paper,
  TextField,
  Icon,
  Drawer,
  ListItem,
  List,
  createMuiTheme,
  ThemeProvider,
  IconButton,
  Divider
} from "@material-ui/core";
import React, { Component } from "react";
import PrimaryButton from '../../Utils/PrimaryButton'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { OnboardingPersonalInfoPath, stagedTabsPath,callSummaryLayoutPath } from "../RoutePaths";
import { getAllColleges, getBranches } from "../../Actions/College";
import DataGridTable from "../Utils/DataGridTable";
import Call from "../../Asset/Images/callImg.png"
import { connect } from "react-redux";
import { getStudentByStages } from "../../Actions/AdminAction";
import CloseIcon from '@material-ui/icons/Close';
import {Autocomplete} from '@material-ui/lab';
import { ExpandMore } from "@material-ui/icons";
import {getAllTerms} from '../../Actions/Aspiration'
const theme = createMuiTheme({
  overrides: {
    MuiDrawer : {
      paper : {
        backgroundColor:"white"
      }
    }   
  },
});
export class Onboarding extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      shrink : false,
      draweropen : false
    }
  }
 
  componentDidMount() {

    // To get the users based on stages
    this.props.getStudentByStages(this.props.stageDetails.stepName)
    this.props.getBranches();
    this.props.getAllColleges();
  }

  componentDidUpdate(prevProps, prevState) {
  
  }
  shrink(){
    this.setState({ shrink: true });
}
  
  filterfunction=()=>{
    this.setState({
      draweropen : true
    })
  }
  // filterContent = () => {
  //   <div>
  //   <List>
  //     <ListItem>
  //       <Typography>Filter Open in Right Side</Typography>
  //     </ListItem>
  //   </List>
  //   </div>
  // }
  render() {

    console.log(this.props.productId)

    const { HeadStyle, HeadDisplay } = style;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TableContainer component={Paper}>
              <div style={HeadDisplay}>
            <p style={HeadStyle}> List of Users in On Boarding Stage </p>
            {/* <div> */}
            <TextField
                label= {
                    <Typography style={{fontSize:"13px",marginLeft:"30px"}}>
                      Search by Email ID / Mobile / Full Name / CLS ID
                    </Typography>
                }
                variant="outlined"
                InputLabelProps={{
                    shrink: this.state.shrink
                }}
                onFocus={()=> this.shrink()}
                type="search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                style={{ width: '45%', marginLeft: '23%'}}
            />
              <PrimaryButton
                        style={{height:30, width:107, marginRight:70, marginTop:10, textTransform: "none"}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={()=>this.filterfunction()}
                      >
                       Filter
                      </PrimaryButton>
            </div>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">CLS ID</TableCell>
                    <TableCell align="left">Client Name</TableCell>
                    <TableCell align="left">Email Address</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="left">OB Call Status</TableCell>
                    <TableCell align="left">Completion %</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.studentsByStagesList.length !== 0 && this.props.studentsByStagesList.map((eachItem,index)=>{
                    return (
                      <TableRow> 
                      <TableCell>{eachItem.clsId}</TableCell>
                      <TableCell>{eachItem.fullName !== null ? eachItem.fullName : eachItem.firstName+" "+eachItem.lastName}</TableCell>
                      <TableCell>{eachItem.emailId}</TableCell>
                      <TableCell>{eachItem.phoneNumber}</TableCell>
                      <TableCell >{eachItem.obCallStatus}</TableCell>
                      <TableCell align="center">90%</TableCell>
                      <TableCell>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:50}}>
                      <img onClick={()=>this.props.history.push(callSummaryLayoutPath+eachItem.studentId+"/product/"+this.props.productId)} src={Call} style={{height:30, width:30, marginRight:10}} />
                        <PrimaryButton
                          onClick={()=>this.props.history.push(stagedTabsPath+eachItem.studentId)}
                          variant={"contained"}
                          color={"primary"}
                          size={"small"}
                          style={{ textTransform: "none" }}
                        >
                          Manage Client
                        </PrimaryButton>
                        </div>
                      </TableCell>
                    </TableRow>
                    )
                  })}
                 
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

        </Grid>
        <ThemeProvider theme={theme}>
        <Drawer 
        anchor={"right"}
        color="white"
        open={this.state.draweropen}
        onClose={()=>this.setState({draweropen : false})}
        >
           <div>
            <List>
              <ListItem>
                <div style={{display:"flex",flexDirection:"row"}}>
                <Typography>Filter</Typography>
                <IconButton style={{marginLeft:"230px",marginTop:"-10px"}} onClick={()=>this.setState({ draweropen : false})}>
                  <CloseIcon style={{ color: "#1093FF" }} />
                </IconButton>
                </div>              
              </ListItem>
              <ListItem>
                {/* <TextField
                label = "College"
                variant="outlined"
                /> */}
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params}  
                  label = "College"
                  variant="outlined" />}
                />
              </ListItem>
              <ListItem>
                {/* <TextField
                label = "Department"
                variant="outlined"
                /> */}
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params}  
                  label = "Department"
                  variant="outlined" />}
                />
              </ListItem>
              <ListItem>
                {/* <TextField
                label = "Intake"
                variant="outlined"
                /> */}
                 <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  // options={top100Films}
                  // getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params}  
                  label = "Intake"
                  variant="outlined" />}
                />
              </ListItem>
              <ListItem>
                {/* <TextField
                label = "City"
                variant="outlined"
                /> */}
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  // options={top100Films}
                  // getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params}  
                  label = "City"
                  variant="outlined" />}
                />
              </ListItem>
              <ListItem>
                {/* <TextField
                label = "BDA Name"
                variant="outlined"
                /> */}
                 <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  // options={top100Films}
                  // getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params}  
                  label = "BDA Name"
                  variant="outlined" />}
                />
              </ListItem>
              <ListItem>
                <PrimaryButton color={"primary"} variant={"contained"} style={{textTransform : "none", width : "300px"}}>Apply Filter</PrimaryButton>
              </ListItem>
              <ListItem>
                <PrimaryButton color={"primary"} variant={"outlined"} style={{textTransform : "none",width : "300px"}}>Reset Filter</PrimaryButton>
              </ListItem>
            </List>
            </div>
        </Drawer>
        </ThemeProvider>
      </div>
    );
  }
}
const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#052A4E",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width:'100%',
    justifyContent:'space-between',
    padding:20
  }
};

const mapStateToProps = (state) =>{
  return {  
    studentsByStagesList : state.AdminReducer.studentsByStagesList,
    getBranchesList: state.CollegeReducer.BranchList,
    getCollegesList: state.CollegeReducer.allCollegeList,
    getAspTermsList: state.AspirationReducer.allTermList,
  }
}

export default connect(mapStateToProps, {getStudentByStages,getBranches,getAllTerms,
  getAllColleges,})(Onboarding)
