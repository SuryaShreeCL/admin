import React, { Component } from "react";
import { Divider, Grid, Paper, Typography, TextField } from "@material-ui/core";
import {UpdateDetailButton} from "../../Asset/StyledComponent"

export default class ProductPunching extends Component {
  render() {
    return (
      <div>
        <Grid container style={{}} spacing={1}>
          <Grid item xs={12} md={4} sm={4} lg={4} xl={4}>
            <TextField
              label="Select Product Family (Dropdown)"
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
              label="Select Product Varient (Dropdown)"
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
            <Typography variant={"h6"}>Product 1 </Typography>
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Family"
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
              label="Product Varient"
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
              label="Varient SKU (Standalone)"
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
              label="Standalone Sellable?"
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
              label="Product Pricing (Standane)"
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
              label="Product Pricing (Combo)"
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
              label="Product SKU (Combo)"
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
              label="Product Validity "
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
              label="Product End of Service"
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
              label="Payment Provider"
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
              label="Payment ID"
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
            <Typography variant={"h6"}>Product 1 </Typography>
          </Grid>
          <Grid item xs={12} md={2} sm={2} lg={2} xl={2}>
            <TextField
              label="Product Family"
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
              label="Product Varient"
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
              label="Varient SKU (Standalone)"
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
              label="Standalone Sellable?"
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
              label="Product Pricing (Standane)"
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
              label="Product Pricing (Combo)"
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
              label="Product SKU (Combo)"
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
              label="Product Validity "
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
              label="Product End of Service"
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
              label="Payment Provider"
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
              label="Payment ID"
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
            <UpdateDetailButton>
            Update Details
            </UpdateDetailButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
