import React, { Component } from "react";
import { Divider, Grid, Paper, Typography, TextField } from "@material-ui/core";

export default class UserData extends Component {
  render() {
    return (
      <div>
        <Grid container style={{}} spacing={1}>
          <Grid item md={12}>
            <Typography variant={"h6"}>Personal Information</Typography>
          </Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}></Grid>
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item md={12}>
            <Typography variant={"h6"}>Shipping Information</Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={4} lg={4} xl={4}>
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
          <Grid item xs={12} md={8} sm={8} lg={8} xl={8}>
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
          <Grid item xs={12} md={8} sm={8} lg={8} xl={8}>
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
          <Grid item xs={12} md={4} sm={4} lg={4} xl={4}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
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
            <Typography variant={"h6"}>Academic  Information</Typography>
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="UG Degree"
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="College Name"
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
          <Grid item xs={12} md={3} sm={3} lg={3} xl={3}>
            <TextField
              label="Department"
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
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="SGPA"
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
        </Grid>
      </div>
    );
  }
}
