import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBranches, getDegree, getAllColleges } from "../../Actions/College";
import {getAllProductFamily,getProductByFamilyId} from '../../Actions/ProductAction'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker} from '@material-ui/pickers'
import { ExpandMore} from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
class ClientDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getBranches();
    this.props.getDegree();
    this.props.getAllColleges();
    this.props.getAllProductFamily()
  }
  render() {
    return (
      <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography style={{fontWeight : "600" , color : "#407BFF"}}>Students Details</Typography>
          </Grid>
          <Grid item md={3}>
            <TextField label="Client Name" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Contact Number" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Email Address" />
          </Grid>
          <Grid item md={3}>
            <TextField label="CLS ID" />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="UG Degree" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getCollegesList}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="College Name"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getBranchesList}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Department" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField label="Present Semester" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Backlogs" />
          </Grid>
          <Grid item md={3}>
            <TextField label="CGPA" />
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={12}>
            <Typography style={{fontWeight : "600" , color : "#407BFF"}}> Product Details</Typography>
          </Grid>
          <Grid item md={3}>
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Product Family" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField label="Product Varient" />
          </Grid>
          <Grid item md={3}>
            <TextField label="intake" />
          </Grid>
          <Grid item md={3}>
            <TextField type="number" label="Year" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Product Validity" />
          </Grid>
          <Grid item md={3}>
            <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="End of Service Date"
          format="MM/dd/yyyy"
        //   value={}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          </Grid>
          <Grid item md={3}>
            <TextField type="number" label="Price" />
          </Grid>
          <Grid item md={12}>
            <Typography style={{fontWeight : "600" , color : "#407BFF"}}>Call Details</Typography>
          </Grid>
          <Grid item md={3}>
            <TextField label="Ameyo ID" />
          </Grid>
          <Grid item md={3}>
            <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="OB Call Date"
          format="MM/dd/yyyy"
        //   value={}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          </Grid>
          <Grid item md={3}>
            <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="OB Call Time"
        //   value={selectedDate}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
          </Grid>
          <Grid item md={3}>
            <TextField label="Onboarding Agent" />
          </Grid>
          <Grid item md={3} lg={3}>
            <TextField label="Call Status" />
          </Grid>
          <Grid item md={4} lg={3}>
     <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="Call Back Time"
        // value={selectedDate}
        // onChange={handleDateChange}
        onError={console.log}
        // disablePast
        format="yyyy/MM/dd HH:mm"
      />
          </Grid>
          <Grid item md={5} lg={3}>
            <TextField label="Specific Days to be contacted ?" />
          </Grid>
          <Grid item md={5} lg={3}>
            <TextField label="Special Time to be Contacted ?" />
          </Grid>
          <Grid item md={12}>
            <Typography style={{fontWeight : "600" , color : "#407BFF"}}>Client Service Details</Typography>
          </Grid>
          <Grid item md={3}>
            {/* <TextField label="Enrollment Date" /> */}
            {/* <KeyboardDatePicker
          margin="normal"
          id="time-picker"
          label="Enrollment Date"
        //   value={selectedDate}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> */}
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Enrollment Date"
          format="MM/dd/yyyy"
        //   value={}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />
          </Grid>
          <Grid item md={3}>
            {/* <TextField label="Applying Degree" /> */}
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Applying Degree" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            {/* <TextField type="number" label="Intake Year" /> */}
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Intake Year" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            {/* <TextField label="Intake Term" /> */}
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Intake Term" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            {/* <TextField label="Order Type" /> */}
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Order Type" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={6}>
            {/* <TextField fullWidth label="Preferred Countries" /> */}
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getAllProductFamilyList}
              getOptionLabel={(option) => option.productName}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Preferred Countries" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField label="Package" />
          </Grid>
          <Grid item md={12}>
            <Typography style={{fontWeight : "600" , color : "#407BFF"}}>Client's Educational Details</Typography>
          </Grid>
          <Grid item md={3}>
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="UG Degree" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getCollegesList}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="College Name" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
            popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
              id="combo-box-demo"
              options={this.props.getBranchesList}
              getOptionLabel={(option) => option.name}
              //   style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Department" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField label="Present Semester" />
          </Grid>
          <Grid item md={3}>
            <TextField label="CGPA" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Backlogs" />
          </Grid>
          <Grid item md={12}>
            <Typography style={{fontWeight : "600" , color : "#407BFF"}}>Client's Work Experience Background</Typography>
          </Grid>
          <Grid item md={3}>
            <TextField label="Any Work Exps ?" />
          </Grid>
          <Grid item md={5}>
            <TextField fullWidth label="If yes, then type of Experience?" />
          </Grid>
          <Grid item md={4}>
            <TextField fullWidth label="Field of Expertise" />
          </Grid>
          <Grid item md={4}>
            <TextField label="Work Experience(in Months)" />
          </Grid>
        </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getBranchesList: state.CollegeReducer.BranchList,
    getCollegesList: state.CollegeReducer.allCollegeList,
    getDegreeList: state.CollegeReducer.Degree,
    getProductByFamilyIdList : state.ProductReducer.getProductByFamilyId,
    getAllProductFamilyList : state.ProductReducer.getAllProductFamily
  };
};

export default connect(mapStateToProps, {
  getBranches,
  getDegree,
  getAllColleges,
  getProductByFamilyId,
  getAllProductFamily
})(ClientDetails);
