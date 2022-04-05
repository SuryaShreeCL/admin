import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";
import {} from "../../Asset/StyledComponents/ApplicationStage";
import {
  customTheme,
  StyledStaticButton,
  useStyles,
} from "../../Asset/StyledComponents/Styles";
import { DownloadCvTable } from "../Utils/DownloadCvTable";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { createTheme, withStyles } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";
import CvViewer from "../ProfileGapAnalysis/CvViewer";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DropzoneComponent from "../Utils/controls/CustomDropZone";

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

function Index(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    activeMainTabValue: "LOR Frameworks",
    mainTabList: [
      "LOR Frameworks",
      "Essay Frameworks",
      "Additional Essay/Personal Statement Framework",
    ],
  });
  const { activeMainTabValue, mainTabList } = state;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  const renderComponent = () => {
    const { activeMainTabValue } = state;
    switch (activeMainTabValue) {
      case "LOR Frameworks":
        return (
          <>
            <Grid item xs={12}>
              <Tabs
                className={classes.tabMenuFitWithGraduate}
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                aria-label='simple tabs example'
              >
                <Tab label='Graduate School 1' />
                <Tab label='Graduate School 2' />
                <Tab label='Graduate School 3' />
              </Tabs>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography>
                  <br />
                  &nbsp;&nbsp;Program Link:<a href='#'>Program Link</a>
                  &nbsp;&nbsp;&nbsp;Deadline:<a href='#'>Deadline</a>
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={1}>
                <ColorButton
                  variant='contained'
                  color='primary'
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
                  aria-labelledby='alert-dialog-slide-title'
                  aria-describedby='alert-dialog-slide-description'
                  maxWidth='md'
                >
                  <DialogTitle id='alert-dialog-slide-title'>
                    {"Upload Document | Pre Strategy Worksheet"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
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
                              id='standard-basic'
                              placeholder='file name'
                              fullWidth
                            />
                            <br />
                            <br />
                          </Grid>
                          <br />
                          <Grid item xs={12}>
                            <TextField
                              id='standard-basic'
                              placeholder='comment'
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant='contained'
                      color='primary'
                    >
                      Upload
                    </Button>
                    <Button onClick={handleClose} color='primary'>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
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
          </>
        );
      default:
        return null;
    }
  };

  const renderTabs = () => {
    return mainTabList.length !== 0
      ? mainTabList.map((item, index) => (
          <CustomTab
            value={item}
            label={item}
            id={`${item}${index}`}
            minHeight={"72px"}
          />
        ))
      : null;
  };

  const handleTabChange = (e, newValue) => {
    setState({ ...state, activeMainTabValue: newValue });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState(0);

  return (
    <Box className={classes.stageBoxLayoutStyle}>
      <Grid container>
        <Grid item lg={12}>
          <Box display={"flex"} alignItems={"center"}>
            <Box flex={1}>
              <CustomTabs value={activeMainTabValue} onChange={handleTabChange}>
                {renderTabs()}
              </CustomTabs>
            </Box>
            <StyledStaticButton active={true} color={"primary"}>
              {"Miscellaneous / Handouts"}
            </StyledStaticButton>
          </Box>
          <Divider className={classes.dividerStyle} />
        </Grid>
        <Grid item lg={12}>
          {renderComponent()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
