import React, { useState, useEffect } from "react";
import {
  ButtonsContainer,
  CreatePostContainer,
} from "../Wall/Assets/Styles/CreatePostStyles";
import BackHandler from "../Wall/Components/BackHandler";
import Preview from "../Wall/Components/Preview";
import Switch from "@material-ui/core/Switch";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventIcon from "@material-ui/icons/Event";
import MomentUtils from "@date-io/moment";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Notification from "../Utils/Notification";
import ConfirmDialog from "../Utils/ConfirmDialog";
import Controls from "../Utils/controls/Controls";
import {
  getWallCategories,
} from "../../Actions/WallActions";

const useStyles = makeStyles({
  root: {
    "& .MuiSelect-root": {
      border: "1px solid rgba(0, 0, 0, 0.12)",
      borderRadius: "4px",
      padding: "1rem",
    },
  },
  captionStyle: {
    width: "80%",
    marginTop: 20,
    marginBottom: 15,
  },
  spacer: {
    width: "80%",
    marginTop: "10px",
  },
  hostImage: {
    borderRadius: "50%",
  },
});


const PremiumUserLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  
  const [state, setState] = useState({
    wallCategories: [],
    caption: "",
    isEvent: location.type ?? false,
    supportingMedia: location?.postType === "Webinar" ? "webinar" : "image",
    wallFiles: [],
    isWebinar: location?.postType === "Webinar",
    canComment: false,
    linkedSelfPrepVideos: null,
    totalViews: 0,
    totalLikes: 0,
    linkedTest: null,
    eventTitle: "",
    linkedWebinars: [],
    redirectionUrl: "",
    zoomLink: "",
    buttonText: "",
    createdBy: window.sessionStorage.getItem("department") || "",
    eventDate: new Date(),
    resumeNeeded: false,
    eventEndDate: new Date(),
    selectedDate: new Date(),
    isScheduled: false,
    isVideoUrlEnabled: false,
    videoUrl: "",
    jobRole: "",
    hostImageUrl: "",
    banner: "",
    platforms: [],
  });

  useEffect(() => {
    dispatch(getWallCategories("Live"));
    // dispatch(getPlatforms());
  }, [dispatch]);


  const { categories } = useSelector(state => state.getWallCategoriesReducer);

  const [errorSchema, setErrorSchema] = useState({
    isVideoLink: false,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDiscard = () => {
    // setConfirmDialog({
    //   ...confirmDialog,
    //   isOpen: false,
    // });
    // setTimeout(() => {
    //   history.push({
    //     pathname: wallPath,
    //     tab: location?.postTypeTab,
    //   });
    // }, 1200);
    // setNotify({
    //   isOpen: true,
    //   message: "Discarded",
    //   type: "warning",
    // });
  };


  return (
  <div>
    <BackHandler
        title={`Upload Premium Users`}
        tab={location?.postTypeTab}
      />
        <Formik
          initialValues={state || []}
          // validationSchema={
            
          // }
          onSubmit={(values, { resetForm }) => {
            // if (validate(values)) {
            //   // createPost(
            //   //   values,
            //   //   location?.postType === "Webinar" ? "Scheduled" : "Live"
            //   // );
            //   // resetForm();
            // }
          }}
          enableReinitialize
        >
          {({
            handleSubmit,
            errors,
            handleChange,
            values,
            touched,
            setFieldValue,
          }) => {
            return (
              <>
                <div className="CreatePost">
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <FormControl
                      className={classes.root}
                      style={{ width: "80%" }}
                    >
                      <Grid container direction="row">
                      <Autocomplete
                        multiple
                        id="wallCategories"
                        name="wallCategories"
                        getOptionLabel={option => option?.name}
                        options={categories ?? []}
                        onChange={(e, value) => {
                          setFieldValue(
                            "wallCategories",
                            value !== null ? value : categories
                          );
                        }}
                        value={values.wallCategories}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Category"
                            name="wallCategories"
                            variant="outlined"
                            error={
                              touched.wallCategories &&
                              Boolean(values.wallCategories.length === 0)
                            }
                          />
                        )}
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          marginLeft: "10px",
                          width: "70%",
                        }}
                      />
                      <Button
                          variant='contained'
                          component='label'
                          // startIcon={<CloudUploadIcon />}
                          color="primary"
                          style={{margin: "auto", borderRadius: "26px", width: "200px", height: "50px" }}
                          >
                          + Upload Sheet
                          <input
                            name='avatar'
                            accept='image/*'
                            id='contained-button-file'
                            type='file'
                            hidden
                            onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                // if (fileReader.readyState === 2) {
                                //   setFieldValue('avatar', fileReader.result);
                                //   setAvatarPreview(fileReader.result);
                                // }
                              };
                              fileReader.readAsDataURL(e.target.files[0]);
                            }}
                          />
                        </Button>
                      </Grid>
                    </FormControl>
                          
                  </Form>
                </div>    
              </>
            );
          }}
        </Formik>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
  </div>
  );
}

export default PremiumUserLanding;