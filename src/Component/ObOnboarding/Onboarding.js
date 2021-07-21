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
} from "@material-ui/core";
import React, { Component } from "react";
import PrimaryButton from '../../Utils/PrimaryButton'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { OnboardingPersonalInfoPath, stagedTabsPath,callSummaryLayoutPath } from "../RoutePaths";
import DataGridTable from "../Utils/DataGridTable";
import Call from "../../Asset/Images/callImg.png"
import { connect } from "react-redux";
import { getStudentByStages } from "../../Actions/AdminAction";

export class Onboarding extends Component {
  constructor(props) {
    super(props)
  
    this.state = {

    }
  }
 
  componentDidMount() {

    // To get the users based on stages
    this.props.getStudentByStages(this.props.stageDetails.stepName)
  
  }
  
  
  render() {

    console.log(this.props)

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
            label='Search by Email ID / Mobile / Full Name / CLS ID'
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
            style={{width:'50%', marginLeft:50}}
             />
              <PrimaryButton
                        style={{height:30, width:107, marginRight:70, marginTop:10, textTransform: "none"}}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                      >
                       Filter
                      </PrimaryButton>
                      {/* </div> */}
            </div>
          {/* <Grid item md={12} style={{height : "500px"}}>
          <DataGridTable
      columns = {this.state.tableColumns}
      // rows = {this.props.getAllProductFamilyList} 
      filterItems = {
        [
          { columnField: 'productName', operatorValue: 'contains' },
          { columnField: 'shortName', operatorValue: 'contains' },
          { columnField: 'codeName', operatorValue: 'contains' },
        ]
      }
      />
          </Grid> */}
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
                  <TableRow>
                    <TableCell>CLS200051</TableCell>
                    <TableCell>Atharva Unde</TableCell>
                    <TableCell>atharva@thecareerlabs.com</TableCell>
                    <TableCell>+919561027164</TableCell>
                    <TableCell >Completed</TableCell>
                    <TableCell align="center">90%</TableCell>
                    <TableCell>
                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:50}}>
                    <img onClick={()=>this.props.history.push(callSummaryLayoutPath+"02c1c610-3f86-45ff-88e3-9642d8ee092e"+"/product/"+"1")} src={Call} style={{height:30, width:30, marginRight:10}} />
                      <PrimaryButton
                        onClick={()=>this.props.history.push(stagedTabsPath+"02c1c610-3f86-45ff-88e3-9642d8ee092e")}
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
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

        </Grid>
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
    studentsByStagesList : state.AdminReducer.studentsByStagesList

  }
}

export default connect(mapStateToProps, {getStudentByStages})(Onboarding)
