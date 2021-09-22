import React, { Component } from "react";
import { TextField, Grid, Divider } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import './InterestDetail.css';


export default class PpgaCallNotes extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            style={{ maxHeight: "92%", overflowY: "scroll", padding: "15px" }}
          >
            <Grid container spacing={3}>
              <Grid item md={12}>
                <p>10th and 12th Details | School-Board-Grades</p>
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* UG | School-Board-Grades */}
            <Grid container spacing={3}>
              <Grid item md={12}>
                <p>UG | School-Board-Grades</p>
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Interested Subjects */}
            <Grid container spacing={3}>
              <Grid item md={12}>
                <p>Interested Subjects</p>
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Confirm package (Placements/Masters) */}
            <Grid container spacing={3}>
              <Grid item md={12}>
                <p>Confirm package (Placements/Masters)</p>
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* button */}
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            //   backgroundColor:"green"
            }}
          >
            <div style={{backgroundColor:"pink"}}>
            <Divider/>
            </div>
            <PrimaryButton
              variant={"contained"}
              color={"primary"}
              style={{
                width: "100px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              Save
            </PrimaryButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
