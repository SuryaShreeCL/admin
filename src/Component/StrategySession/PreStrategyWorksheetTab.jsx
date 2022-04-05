import Button from "@material-ui/core/Button";
import { blue, purple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { createTheme, withStyles } from "@material-ui/core/styles";
import React from "react";
import CvViewer from "../ProfileGapAnalysis/CvViewer";
import { useStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DropzoneComponent from "../Utils/controls/CustomDropZone";
import { Box } from "@material-ui/core";
import { DownloadCvTable } from "../Utils/DownloadCvTable";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],

    marginTop: "20px",
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
}))(Button);

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProgramPreference(props) {
  console.log(props, "hellosadooasd");

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [upload, setUpload] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    setUpload(true);
    this.props.postStudentDocumentUsingStageId();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Grid item xs={12} align="right">
            <div className={classes.buttonPosition}>
              {/* <ColorButton
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                upload
              </ColorButton> */}

              <div>
                <ColorButton
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  onClick={handleClickOpen}
                >
                  Upload
                </ColorButton>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  maxWidth="md"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Upload Document | Pre Strategy Worksheet"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <Box width={"500px"}>
                        <Grid container>
                          <Grid item xs={12}>
                            <DropzoneComponent
                              acceptTypes={".pdf, .doc, .docx"}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={classes.documentDetails}
                          >
                            Document Details
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="standard-basic"
                              placeholder="file name"
                              fullWidth
                            />
                            <br />
                            <br />
                          </Grid>
                          <br />
                          <Grid item xs={12}>
                            <TextField
                              id="standard-basic"
                              placeholder="comment"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleUpload}
                      variant="contained"
                      color="primary"
                    >
                      Upload
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <DownloadCvTable
                headers={["Version", "Uploaded date", "Comment", ""]}
                body={[
                  {
                    comment: "hii",
                    createdBy: "",
                    id: 1,
                    path: "vvvv1",
                    isDownload: true,
                  },
                ]}
                handleComment={() => {}}
                handleDownload={() => {}}
                handleDelete={() => {}}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <CvViewer doctype={"cv"} {...props} />
        </Grid>
      </Grid>
    </>
  );
}

export default ProgramPreference;
