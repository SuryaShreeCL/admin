import { Card, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import "./DiplomaForm.css";

export default class MarkSheetUpload extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3} style={{ padding: "15px" }}>
          <Grid item container md={12}>
            <Card style={{ width: "100%", padding: "15px" }}>
              {/* card 1st div */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography style={{ lineHeight: "25px"}}>
                    Computer Science
                  </Typography>
                </div>
                <div>
                  <Typography style={{ lineHeight: "25px" }}>
                    1st Sem
                  </Typography>
                </div>
              </div>
              {/* card 2nd div */}
              <div>
                <Typography style={{ lineHeight: "43px" }}>
                  Savitribai phule Pune University
                </Typography>
              </div>
              {/* card 3rd div */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography style={{ lineHeight: "25px" }}>
                      1st Sem marksheet
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                  </div>
                </div>

                <div>
                  <Typography style={{ lineHeight: "25px" }}>
                    SGPA 90%
                  </Typography>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
