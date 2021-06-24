import React, { Component } from "react";
import { Divider, Grid, Box, Typography, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PrimaryButton from "../../Utils/PrimaryButton";
import CustomizedSwitch from "../../Utils/CustomizedSwitch";

export default class UserData extends Component {
  render() {
    return (
      <div>
        <Grid container style={{}} spacing={1}>
          <Grid item md={12}>
            <Box pt={2}>
              <Typography variant={"h6"} className={"user_data_heading"}>
                Personal Information
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Client First Name"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Client Last Name"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Full Name"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>

          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Contact Number"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Alternate Contatct Number"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Email Address"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Alternate Email Address"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid md={12} style={{display:"flex",flexDirection:"row"}}>
          <Grid item>
            <Box pt={4}>
              <Typography variant={"h6"} className={"user_data_heading"}>
                Shipping Information
              </Typography>
            </Box>
          </Grid>
          <Grid item>
          <Box pt={3} mx={2}>
            <CustomizedSwitch />
            </Box>
          </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Suit No, Apartment Name"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Street Address 1"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Street Address 2"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Land Mark"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Pincode"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="State"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Current City"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Country"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item md={12}>
            <Box pt={3}>
              <Typography variant={"h6"} className={"user_data_heading"}>
                Academic Information
              </Typography>
            </Box>
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="UG Degree" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="College Name"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Department" variant="standard" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Present Semester"
              //   value={this.state.firstName}
              size={"small"}
              //   name="firstName"
              //   error={this.state.fnameErr !== "" ? true : false}
              //   onChange={this.handleTextChange}
              //   helperText={this.state.fnameErr}
              fullWidth
              //   onKeyPress={(evt) => {
              //     if (isAlpha(evt)) {
              //       evt.preventDefault();
              //     }
              //   }}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // options={this.props.getAllProductFamilyList}
              // getOptionLabel={(option) => option.productName}
              // onChange={(e, newValue) => this.setState({ family: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="SGPA" variant="standard" />
              )}
            />
          </Grid>
          <Grid item md={12} align="center">
            <Box pt={4}>
              <PrimaryButton color={"primary"} variant={"contained"}>
                Update Details
              </PrimaryButton>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}
