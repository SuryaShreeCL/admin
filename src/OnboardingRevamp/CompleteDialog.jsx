import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";

export default class CompleteDialog extends Component {
  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogContent>
            <Grid container>
              <Grid item md={12}>
                <Typography>Confirmation</Typography>
              </Grid>
              <Grid item md={12}>
                <hr />
              </Grid>
              <Grid item md={12}>
                <Typography>Your marking Onboarding complete</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container>
              <Grid item md={12}>
                <hr />
              </Grid>
              <Grid item md={12} align={"right"}>
                <Button color={"primary"} variant={"contained"}>
                  Onboarding Complete
                </Button>
                <Button
                  color={"primary"}
                  variant={"text"}
                  onClick={this.props.onClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
