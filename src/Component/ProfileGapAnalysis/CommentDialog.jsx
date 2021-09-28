import React from "react";
import {
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
function CommentDialog(props) {
  return (
    <Dialog open={props.open} maxWidth="sm">
      <DialogTitle>
        <Typography style={{fontSize:"18px"}}>Comments History</Typography>
        <hr />
        <Typography style={{fontSize:"14px"}}>Comments</Typography>
      </DialogTitle>
      <DialogContent style={{display:"flex",alignItems:"center"}} >
        {props.data &&
          props.data.map((data) => {
            let date = new Date(data.updatedAt).getDate();
            let month = new Date(data.updatedAt).getMonth();
            let year = new Date(data.updatedAt).getFullYear();
            var monthtext = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ];
            let monthname = monthtext[month];
            let finaldate = date + " " + monthname + " " + year;
            return (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{
                    border: "1px solid #B5AEAD",
                    borderRadius: "10px",
                    padding: "10px",
                    margin: "5px",
                  }}
                >
                  <Grid item md={12}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{finaldate}</Typography>
                      <div style={{ display: "flex" }}>
                        <Typography
                          style={{ color: "grey", marginRight: "10px" }}
                        >
                          Changed by
                        </Typography>
                        <Typography>{data.updatedBy}</Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <Grid container spacing={1}>
                      <Grid item md={12}>
                        <Typography style={{ color: "grey" }} k>
                          Previous
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Typography style={{ color: "grey" }}>
                          Enter {data.fieldName}
                        </Typography>
                      </Grid>
                      <Grid item md={5}>
                        <Typography>
                          {data.oldValue !== null &&
                          typeof data.oldValue === "object"
                            ? data.oldValue.name
                            : data.oldValue}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6}>
                    <Grid container spacing={1}>
                      <Grid item md={12}>
                        <Typography style={{ color: "grey" }}>
                          Change to
                        </Typography>
                      </Grid>
                      <Grid item md={7}>
                        <Typography style={{ color: "grey" }}>
                          Enter {data.fieldName}
                        </Typography>
                      </Grid>
                      <Grid item md={5}>
                        <Typography>
                          {data.newValue !== null &&
                          typeof data.newValue === "object"
                            ? data.newValue.name
                            : data.newValue}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Typography style={{ color: "grey" }}>Comments</Typography>
                  </Grid>
                  <Grid item md={12} style={{ marginTop: "-15px" }}>
                    <p>{data.comments}</p>
                  </Grid>
                </Grid>
              </>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item md={12}>
            <hr/>
            </Grid>
          <Grid item md={12} align={"right"}>
            <PrimaryButton
              variant={"outlined"}
              color={"primary"}
              style={{ width: "100px", height: "30px" }}
              onClick={props.onClose}
            >
              Cancel
            </PrimaryButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDialog;
