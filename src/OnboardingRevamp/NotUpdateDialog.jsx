import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  Button,
  createTheme,
  ThemeProvider,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
export default class NotUpdateDialog extends Component {
  theme = createTheme({
    overrides: {
      MuiGrid: {
        "spacing-xs-2": {
          padding: "2px",
        },
      },
      MuiButton : {
          label : {
            textTransform : "none"
          }
      }
    },
  });
  render() {
    return (
      <div>
        <ThemeProvider theme={this.theme}>
          <Dialog open={this.props.open}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography>Not Updated</Typography>
                </Grid>
                <Grid item md={12}>
                  <hr />
                </Grid>
                <Grid item md={12}>
                  <Typography>
                    Below Mentioned sections status are not updated
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <ul>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                    <li>Work Experience</li>
                  </ul>
                </Grid>
                <Grid item md={12}>
                  <TextField label="Add Comments" fullWidth />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container>
                <Grid item md={12}>
                  <hr />
                </Grid>
                <Grid item md={12} align={"right"}>
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
        </ThemeProvider>
      </div>
    );
  }
}
