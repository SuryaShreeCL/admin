import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBranches, getDegree, getAllColleges } from "../../Actions/College";
import {getAllProductFamily,getProductByFamilyId} from '../../Actions/ProductAction'
import DateFnsUtils from '@date-io/date-fns';
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
            <Typography>Students Details</Typography>
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
            <Typography> Product Details</Typography>
          </Grid>
          <Grid item md={3}>
            <Autocomplete
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
            <Typography>Call Details</Typography>
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
          <Grid item md={3}>
            <TextField label="Call Status" />
          </Grid>
          <Grid item md={3}>
            {/* <TextField label="Call Back Time" /> */}
            <form noValidate>
      <TextField
        id="datetime-local"
        label="Call Back Time"
        type="datetime-local"
        defaultValue={new Date()}
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
          </Grid>
          <Grid item md={3}>
            <TextField label="Week Days" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Special Time to be Contacted ?" />
          </Grid>
          <Grid item md={12}>
            <Typography>Client Service Details</Typography>
          </Grid>
          <Grid item md={3}>
            {/* <TextField label="Enrollment Date" /> */}
            <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Enrollment Date"
        //   value={selectedDate}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
          </Grid>
          <Grid item md={3}>
            <TextField label="Applying Degree" />
          </Grid>
          <Grid item md={3}>
            <TextField type="number" label="Intake Year" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Intake Term" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Order Type" />
          </Grid>
          <Grid item md={6}>
            <TextField fullWidth label="Preferred Countries" />
          </Grid>
          <Grid item md={3}>
            <TextField label="Package" />
          </Grid>
          <Grid item md={12}>
            <Typography>Client's Educational Details</Typography>
          </Grid>
          <Grid item md={3}>
            <Autocomplete
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
            <Typography>Client's Work Experience Background</Typography>
          </Grid>
          <Grid item md={2}>
            <TextField label="Any Work Exps ?" />
          </Grid>
          <Grid item md={5}>
            <TextField fullWidth label="If yes, then type of Experience?" />
          </Grid>
          <Grid item md={5}>
            <TextField fullWidth label="Field of Expertise" />
          </Grid>
          <Grid item md={3}>
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
