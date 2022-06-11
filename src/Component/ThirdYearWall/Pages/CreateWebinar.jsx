import MomentUtils from "@date-io/moment";
import { Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import EventIcon from "@material-ui/icons/Event";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";
import {
  createWallPost,
  getPlatforms,
  getWallCategories,
  getWallJobList,
  uploadImage,
} from "../../../Actions/WallActions";
import { thirdYear } from "../../RoutePaths";
import ConfirmDialog from "../../Utils/ConfirmDialog";
import Controls from "../../Utils/controls/Controls";
import Notification from "../../Utils/Notification";
import {
  ButtonsContainer,
  CreatePostContainer,
} from "../Assets/Styles/CreatePostStyles";
import BackHandler from "../Components/BackHandler";

// const AVOID_INPUT = ["E", "e", "+", "-"];

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
    marginTop: 15,
    marginBottom: 15,
  },
  roleStyle: {
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: "16px",
    color: "#052A4E",
    marginTop: 40,
    fontWeight: 400,
    lineHeight: "19.5px",
  },
  divider: { backgroundColor: "#D8D8D8", marginTop: 40 },
  spacer: {
    // width: "80%",
    marginTop: "10px",
  },
  hostImage: {
    borderRadius: "50%",
  },
});

const CreatePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState({
    jobCategory: null,
    wallCategories: [],
    caption: "",
    salary: "",
    location: "",
    roleDescription: "",
    isEvent: location.type ?? false,
    // isEvent: true,
    supportingMedia: location?.postType === "Webinar" ? "webinar" : "image",
    wallFiles: [],
    isWebinar: location?.postType === "Webinar",
    canComment: false,
    linkedSelfPrepVideos: null,
    wallSteps: [
      {
        status: "todo",
        heading: "",
        subText: "",
        message: "",
        url: "",
        isStatusUploaded: "",
        form: null,
      },
    ],
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

  useEffect(() => {
    dispatch(getWallCategories("Live"));
    dispatch(getWallJobList("Live"));
    dispatch(getPlatforms());
  }, [dispatch]);

  // const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  // const { platforms } = useSelector((state) => state.platformsReducer);
  // const { jobs } = useSelector((state) => state.getWallJobListReducer);

  const validate = (values) => {
    /* Validating the timings */
    if (values.isWebinar) {
      if (
        moment(values.eventEndDate).isSameOrBefore(values.eventDate) ||
        moment(values.eventDate).isBefore(moment()) ||
        moment(values.eventEndDate).isBefore(moment())
      ) {
        setNotify({
          isOpen: true,
          message: "Please add proper timing & date",
          type: "error",
        });
        return false;
      }
    }

    /* Validating if the media url is added or not */
    // if (values.isVideoUrlEnabled && values.videoUrl?.length < 1) {
    //   setErrorSchema((s) => ({ ...s, isVideoLink: true }));
    //   return false;
    // }
    return true;
  };

  const webinarvalidationSchema = yup.object({
    caption: yup
      .string()
      .required("caption is required")
      .matches(`^\w*(?:\w+(?:\w+\w+){0,3}\w*)?$`, ""),
    eventTitle: yup.string().required("title is required"),
    zoomLink: yup.string().required("zoom link is required"),
  });

  const handleSchedule = (values) => {
    if (values.caption.match(/\S+/g).length > 3) alert("u r wrong");

    // if (!values.id)
    // dispatch(createWallPost({ ...values, activeStatus: "Scheduled" }));
    setNotify({
      isOpen: true,
      message: "Created Successfully",
      type: "success",
    });
    setTimeout(() => {
      history.push({
        // pathname: state.isEvent
        //   ? testCreate
        //   : location.isDrive
        //   ? placementDrives
        //   : wallPath,
        pathname: thirdYear,
        tab: location?.postTypeTab,
      });
    }, 1500);
  };

  const onDiscard = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setTimeout(() => {
      history.push({
        pathname: thirdYear,
        tab: location?.postTypeTab,
      });
    }, 1200);
    setNotify({
      isOpen: true,
      message: "Discarded",
      type: "warning",
    });
  };

  return (
    <>
      <BackHandler
        title={`Create webinar`}
        tab={location?.postTypeTab ?? 0}
        isDrive={location?.isDrive ?? 0}
      />
      <CreatePostContainer>
        <Formik
          initialValues={state || []}
          validationSchema={webinarvalidationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values, "valuesss", validate(values));
            if (validate(values)) {
              handleSchedule(values);
              resetForm();
            }
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
            submitForm,
          }) => {
            return (
              <>
                <div className="CreatePost">
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Grid item>
                      <h6 style={{ fontSize: "1rem" }}>Webinar Title</h6>
                      <Controls.Input
                        label="Webinar Title"
                        name="eventTitle"
                        error={touched.eventTitle && Boolean(errors.eventTitle)}
                        // helperText={touched.eventTitle && errors.eventTitle}
                        className={classes.captionStyle}
                        value={values.eventTitle}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <h6 style={{ fontSize: "1rem" }}>Add description</h6>
                      <Controls.Input
                        label="Type description here.."
                        value={values.caption}
                        name="caption"
                        onChange={handleChange}
                        error={touched.caption && Boolean(errors.caption)}
                        multiline
                        className={classes.captionStyle}
                        rows={2}
                      />
                    </Grid>

                    <Grid item>
                      <h6 style={{ fontSize: "1rem" }}>Enter Zoom Link</h6>
                      <Controls.Input
                        label="Zoom Webinar Link"
                        name="zoomLink"
                        error={touched.zoomLink && Boolean(errors.zoomLink)}
                        className={classes.captionStyle}
                        value={values.zoomLink}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      className={classes.spacer}
                    >
                      <Grid item lg={12}>
                        <h6 style={{ fontSize: "1rem" }}>Schedule Details</h6>
                      </Grid>
                      <Grid item>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.eventDate}
                            style={{ width: "400px", margin: "10px 0px" }}
                            disablePast
                            name="eventDate"
                            label="Start Data & Time"
                            inputVariant="outlined"
                            onChange={(val) => {
                              setFieldValue("eventDate", val);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.eventEndDate}
                            style={{ width: "400px", margin: "10px 0px" }}
                            disablePast
                            name="eventEndDate"
                            label="End Data & Time"
                            inputVariant="outlined"
                            onChange={(val) => {
                              setFieldValue("eventEndDate", val);
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Form>
                </div>

                <ButtonsContainer className={classes.btnscontainer}>
                  <Controls.Button
                    text={`Discard`}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "26px", marginRight: "10px" }}
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to discard this post?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDiscard();
                        },
                      });
                    }}
                  />

                  <Controls.Button
                    text={`Submit`}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "26px" }}
                    type="submit"
                    onClick={submitForm}
                  />
                </ButtonsContainer>
              </>
            );
          }}
        </Formik>
      </CreatePostContainer>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CreatePost;
