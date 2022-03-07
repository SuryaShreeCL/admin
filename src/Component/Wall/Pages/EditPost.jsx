import React, { useState, useEffect } from "react";
import {
  ButtonsContainer,
  CreatePostContainer,
} from "../Assets/Styles/CreatePostStyles";
import BackHandler from "../Components/BackHandler";
import Preview from "../Components/Preview";
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
import Controls from "../../Utils/controls/Controls";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ExistingMedia } from "../Components/Upload/ExistingMedia";
import {
  createWallPost,
  getWallCategories,
  updateWallPost,
  uploadImage,
  getPlatforms,
  getWallJobList,
} from "../../../Actions/WallActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { wallPath } from "../../RoutePaths";
import Notification from "../../Utils/Notification";
import ConfirmDialog from "../../Utils/ConfirmDialog";
import { MultipleFileUploadField } from "../Components/Upload/MultipleFileUploadField";
import PreprationContainer from "../Components/PreparationContainer";
import DeleteIcon from "@material-ui/icons/Delete";
const AVOID_INPUT = ["E", "e", "+", "-"];

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
    width: "80%",
    marginTop: "10px",
  },
  hostImage: {
    borderRadius: "50%",
  },
});

const EditPost = () => {
  const classes = useStyles();
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { recordForEdit } = location;

  useEffect(() => {
    if (recordForEdit) setState(recordForEdit);
  }, [recordForEdit]);

  const [records, setRecords] = useState(recordForEdit);

  const [state, setState] = useState({
    jobCategory: [],
    roleDescription: "",
    wallCategories: [],
    caption: "",
    isEvent: false,
    wallFiles: [],
    isWebinar: location?.postType === "Webinar",
    canComment: false,
    totalViews: 0,
    totalLikes: 0,
    linkedSelfPrepVideos: [{ videoName: "", videoLink: "" }],
    eventTitle: "",
    linkedWebinars: [],
    redirectionUrl: "",
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

  const { categories } = useSelector((state) => state.getWallCategoriesReducer);
  const { platforms } = useSelector((state) => state.platformsReducer);
  const { jobs } = useSelector((state) => state.getWallJobListReducer);

  useEffect(() => {
    dispatch(getWallCategories("Live"));
    dispatch(getWallJobList("Live"));
    dispatch(getPlatforms());
    //SETTING PRE POPULATED RECORD
    if (records != null)
      setRecords({
        ...recordForEdit,
      });
  }, [recordForEdit, dispatch]);

  const onEditDraft = (post, activeStatus) => {
    if (!post.id) dispatch(createWallPost(post));
    else dispatch(updateWallPost({ ...post, activeStatus }));
    setNotify({
      isOpen: true,
      message: "Drafted Successfully",
      type: "success",
    });
    setTimeout(() => {
      history.push({
        pathname: wallPath,
        tab: location?.postTypeTab,
      });
    }, 1200);
  };

  const updatePost = (post) => {
    dispatch(updateWallPost(post));
    setNotify({
      isOpen: true,
      message: "Updated Successfully",
      type: "success",
    });
    setTimeout(() => {
      history.push({
        pathname: wallPath,
        tab: location?.postTypeTab,
      });
    }, 1200);
  };

  const validationSchema = yup.object({
    caption: yup.string().required("caption is required"),
    jobRole: yup.string().required("Job role is required"),
  });

  const handleImageUpload = ({ e, type, setFieldValue }) => {
    const fileSize = e.target.files[0].size / 1024 / 1024;
    const fileType = e.target.files[0].type;

    // File size less than 1 MiB && Image file check
    if (fileSize < 1 && fileType.includes("image")) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      dispatch(
        uploadImage(formData, (response) => {
          if (type === "BANNER")
            setFieldValue("banner", response.data.imageUrl);
          else setFieldValue("hostImageUrl", response.data.imageUrl);
        })
      );
    } else {
      setNotify({
        isOpen: true,
        message: "Please upload an image file within 1MB size",
        type: "error",
      });
    }
  };

  const handleDeleteClick = (setFieldValue) => {
    setFieldValue("banner", "");
  };

  const handleHostDeleteClick = (setFieldValue) => {
    setFieldValue("hostImageUrl", "");
  };

  // console.log(records);

  return (
    <>
      <BackHandler
        title={`Edit ${location?.postType}`}
        tab={location?.postTypeTab}
      />
      <CreatePostContainer>
        <Formik
          initialValues={records || state}
          // validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            updatePost({
              ...values,
              activeStatus: values.isWebinar ? "Scheduled" : "Live",
              wallFiles: [...(values.wallFilesUpdate ?? [])],
            });
            resetForm();
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
            console.log(values);
            return (
              <>
                <div className="CreatePost">
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <h6>Post Type</h6>
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>Wall Post</Grid>
                      <Grid item>
                        <Switch
                          checked={values.isEvent}
                          name={values.isEvent}
                          disabled
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </Grid>
                      <Grid item>Event</Grid>
                    </Grid>
                    <RadioGroup
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "10px",
                      }}
                      aria-label="type"
                      disabled
                      name="supportingMedia"
                      value={values.supportingMedia}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="video"
                        control={<Radio color="primary" />}
                        label="Video"
                        disabled={values.isWebinar}
                      />
                      <FormControlLabel
                        value="image"
                        control={<Radio color="primary" />}
                        label="Image"
                        disabled={values.isWebinar}
                      />
                      <FormControlLabel
                        value="text"
                        control={<Radio color="primary" />}
                        label="Text"
                        disabled={values.isWebinar}
                      />
                      <FormControlLabel
                        value="audio"
                        control={<Radio color="primary" />}
                        label="Audio"
                        disabled={values.isWebinar}
                      />
                      {values.isWebinar && !values.isEvent && (
                        <FormControlLabel
                          value="webinar"
                          control={<Radio color="primary" />}
                          label="Webinar"
                        />
                      )}
                    </RadioGroup>
                    <Grid container spacing={1} direction="column">
                      <FormControl
                        className={classes.root}
                        style={{ width: "80%" }}
                      >
                        <Autocomplete
                          multiple
                          id="wallCategories"
                          name="wallCategories"
                          getOptionLabel={(option) => option?.name}
                          options={categories ?? []}
                          onChange={(e, value) => {
                            setFieldValue(
                              "wallCategories",
                              value !== null ? value : categories
                            );
                          }}
                          value={values.wallCategories}
                          disabled={
                            values?.wallCategories[0]?.name ==
                              "4th Year Premium" ||
                            values?.wallCategories[0]?.name ==
                              "4th Year Freemium"
                              ? true
                              : false
                          }
                          renderInput={(params) => (
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
                        />
                      </FormControl>

                      {/* Platforms Dropdown */}
                      <FormControl
                        className={classes.root}
                        style={{ width: "80%" }}
                      >
                        <Autocomplete
                          multiple
                          id="platforms"
                          name="platforms"
                          getOptionLabel={(option) => option?.name}
                          options={platforms ?? []}
                          onChange={(e, value) => {
                            setFieldValue(
                              "platforms",
                              value !== null ? value : categories
                            );
                          }}
                          fullWidth
                          value={values.platforms}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Platforms"
                              name="platforms"
                              variant="outlined"
                              error={
                                touched.platforms &&
                                Boolean(values.platforms.length === 0)
                              }
                            />
                          )}
                          style={{
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        />
                      </FormControl>

                      {/* Swetha */}
                      {values.isEvent && !values.isWebinar && (
                        <FormControl
                          className={classes.root}
                          style={{ width: "80%" }}
                        >
                          <Autocomplete
                            id="jobCategory"
                            name="jobCategory"
                            getOptionLabel={(option) => option?.name}
                            options={jobs ?? []}
                            onChange={(e, value) => {
                              setFieldValue(
                                "jobCategory",
                                value !== null ? value : jobs
                              );
                            }}
                            fullWidth
                            value={values.jobCategory}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Job Field"
                                name="jobCategory"
                                variant="outlined"
                                error={
                                  touched.jobCategory &&
                                  Boolean(values.jobCategory.length === 0)
                                }
                              />
                            )}
                            style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                          />
                        </FormControl>
                      )}

                      {values.supportingMedia === "webinar" ? (
                        <Grid item>
                          <Controls.Input
                            label="Enter Webinar Title"
                            name="eventTitle"
                            error={
                              touched.eventTitle && Boolean(errors.eventTitle)
                            }
                            style={{ width: "80%", marginTop: "18px" }}
                            value={values.eventTitle}
                            onChange={handleChange}
                          />
                        </Grid>
                      ) : (
                        <Grid item>
                          <Controls.Input
                            label="Job Role"
                            value={values.jobRole}
                            name="jobRole"
                            onChange={handleChange}
                            error={touched.jobRole && Boolean(errors.jobRole)}
                            multiline
                            style={{
                              width: "80%",
                              marginTop: "18px",
                            }}
                          />
                          <Controls.Input
                            label="Enter Caption (register now etc)"
                            value={values.caption}
                            name="caption"
                            onChange={handleChange}
                            error={touched.caption && Boolean(errors.caption)}
                            multiline
                            className={classes.captionStyle}
                            rows={6}
                          />
                        </Grid>
                      )}
                      {/* Swetha */}
                      {values.isEvent && !values.isWebinar && (
                        <>
                          <Grid item>
                            <Controls.Input
                              label="Enter Salary"
                              name="salary"
                              style={{
                                width: "80%",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              value={values.salary}
                              type={"number"}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item>
                            <Controls.Input
                              label="Enter Location"
                              name="location"
                              style={{
                                width: "80%",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              value={values.location}
                              onChange={handleChange}
                            />
                          </Grid>
                        </>
                      )}

                      {values.isWebinar && (
                        <Grid item>
                          <Controls.Input
                            label="Host Name"
                            name="hostName"
                            style={{
                              width: "80%",
                              marginTop: "10px",
                              marginBottom: "10px",
                            }}
                            value={values.hostName}
                            onChange={handleChange}
                          />
                        </Grid>
                      )}

                      {values.isWebinar && (
                        <Grid item>
                          {!values.banner ? (
                            <Controls.Input
                              label="Banner image (Banner image should be in 16:9 ratio or 1920 x 1080 resolution)"
                              name="bannerImage"
                              style={{
                                width: "80%",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              inputProps={{
                                accept: "image/png, image/jpeg",
                                style: { opacity: "0" },
                              }}
                              value={values.banner}
                              type="file"
                              onInput={(e) =>
                                handleImageUpload({
                                  e,
                                  type: "BANNER",
                                  setFieldValue,
                                })
                              }
                              onClick={(e) => (e.target.value = null)}
                            />
                          ) : (
                            <Grid container direction="column">
                              <Typography>Banner image</Typography>

                              <img
                                src={values.banner}
                                height={225}
                                width={400}
                              />
                              <Controls.ActionButton
                                onClick={() => handleDeleteClick(setFieldValue)}
                              >
                                <DeleteIcon
                                  fontSize="small"
                                  color="secondary"
                                />
                              </Controls.ActionButton>
                            </Grid>
                          )}
                        </Grid>
                      )}

                      {values.isWebinar && (
                        <Grid item>
                          {!values.hostImageUrl ? (
                            <Controls.Input
                              label="Host image"
                              name="hostName"
                              style={{
                                width: "80%",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              inputProps={{
                                accept: "image/png, image/jpeg",
                                style: { opacity: "0" },
                              }}
                              value={values.hostImage}
                              type="file"
                              onInput={(e) =>
                                handleImageUpload({ e, setFieldValue })
                              }
                              onClick={(e) => (e.target.value = null)}
                            />
                          ) : (
                            <Grid container direction="column">
                              <Typography>Host image</Typography>
                              <img
                                src={values.hostImageUrl}
                                height={150}
                                width={150}
                                className={classes.hostImage}
                              />
                              <Controls.ActionButton
                                onClick={() =>
                                  handleHostDeleteClick(setFieldValue)
                                }
                              >
                                <DeleteIcon
                                  fontSize="small"
                                  color="secondary"
                                />
                              </Controls.ActionButton>
                            </Grid>
                          )}
                        </Grid>
                      )}

                      {values.supportingMedia === "webinar" && (
                        <Grid item>
                          <Controls.Input
                            label="Type description here.."
                            value={values.caption}
                            name="caption"
                            onChange={handleChange}
                            error={touched.caption && Boolean(errors.caption)}
                            multiline
                            className={classes.captionStyle}
                            rows={5}
                          />
                        </Grid>
                      )}

                      {values.supportingMedia === "video" && (
                        <Grid item>
                          <span style={{ fontSize: "1rem" }}>
                            Video URL Available
                            <Switch
                              checked={values.isVideoUrlEnabled}
                              name="isVideoUrlEnabled"
                              onChange={handleChange}
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </span>
                        </Grid>
                      )}
                      {values.supportingMedia === "video" &&
                        values.isVideoUrlEnabled && (
                          <Grid item>
                            <Controls.Input
                              label="Paste Video URL"
                              name="videoUrl"
                              className={classes.spacer}
                              value={values.videoUrl}
                              onChange={handleChange}
                            />
                          </Grid>
                        )}
                      {values.isWebinar && (
                        <Grid item>
                          <Controls.Input
                            label="Zoom Webinar ID"
                            name="zoomLink"
                            type="number"
                            error={touched.zoomLink && Boolean(errors.zoomLink)}
                            style={{
                              width: "80%",
                              marginTop: "10px",
                              marginBottom: "14px",
                            }}
                            value={values.zoomLink}
                            onChange={handleChange}
                          />
                        </Grid>
                      )}
                      {!values.isEvent && !values.isWebinar && (
                        <>
                          <Grid item>
                            <Controls.Input
                              label="Paste the Redirection Link"
                              name="redirectionUrl"
                              className={classes.spacer}
                              value={values.redirectionUrl}
                              onChange={handleChange}
                              error={
                                values.redirectionUrl.length > 5 &&
                                !values.redirectionUrl.includes("http")
                              }
                              helperText={
                                values.redirectionUrl.length > 5 &&
                                !values.redirectionUrl.includes("http") &&
                                "Enter Full link Ex:https://www.example.com/"
                              }
                            />
                          </Grid>
                          <Grid item>
                            <Controls.Input
                              label="Enter Button Text Here"
                              name="buttonText"
                              error={
                                values.redirectionUrl?.length > 1 &&
                                values.buttonText?.length < 1 &&
                                Boolean(true)
                              }
                              style={{
                                width: "80%",
                                marginTop: "18px",
                                marginBottom: "14px",
                              }}
                              value={values.buttonText}
                              onChange={handleChange}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>

                    <Grid container direction="column" style={{ width: "80%" }}>
                      {values.supportingMedia === "image" && (
                        <MultipleFileUploadField
                          name="wallFilesUpdate"
                          fileType="image"
                        />
                      )}
                      {values.supportingMedia === "video" &&
                        !values.isVideoUrlEnabled && (
                          <MultipleFileUploadField
                            name="wallFilesUpdate"
                            fileType="video"
                          />
                        )}
                      {values.supportingMedia === "audio" && (
                        <MultipleFileUploadField
                          name="wallFilesUpdate"
                          fileType="audio"
                        />
                      )}
                      <Grid item>
                        {values.wallFiles?.map((media) => (
                          <ExistingMedia
                            media={media}
                            wallFiles={values.wallFiles}
                          />
                        ))}
                      </Grid>
                    </Grid>
                    {!values.isEvent && !values.isWebinar && (
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        className={classes.spacer}
                      >
                        <Grid item>
                          <h6 style={{ fontSize: "1rem" }}>
                            Schedule Post for Later
                            <Switch
                              checked={values.isScheduled}
                              onChange={handleChange}
                              name="isScheduled"
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </h6>
                        </Grid>
                        <Grid item>
                          <h6 style={{ fontSize: "1rem" }}>
                            Disable Comments
                            <Switch
                              checked={values.canComment}
                              onChange={handleChange}
                              name="canComment"
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </h6>
                        </Grid>
                      </Grid>
                    )}
                    {values.isEvent && (
                      <Grid item>
                        <h6 style={{ fontSize: "1rem" }}>
                          Resume Required?
                          <Switch
                            checked={values.resumeNeeded}
                            onChange={handleChange}
                            name="resumeNeeded"
                            color="primary"
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </h6>
                      </Grid>
                    )}
                    {values.isEvent && (
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        className={classes.spacer}
                      >
                        <Grid item>
                          <h6 style={{ fontSize: "1rem" }}>
                            Event Start Date{" "}
                          </h6>
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
                              style={{ width: "100%", margin: "10px 0px" }}
                              name="eventDate"
                              inputVariant="outlined"
                              onChange={(val) => {
                                setFieldValue("eventDate", val);
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item>
                          <h6 style={{ fontSize: "1rem" }}>Event End Date </h6>
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
                              style={{ width: "100%", margin: "10px 0px" }}
                              name="eventEndDate"
                              inputVariant="outlined"
                              onChange={(val) => {
                                setFieldValue("eventEndDate", val);
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    )}
                    {values.isWebinar && (
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        className={classes.spacer}
                      >
                        <Grid item>
                          <h6 style={{ fontSize: "1rem" }}>
                            Webinar Start Date{" "}
                          </h6>
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
                              inputVariant="outlined"
                              onChange={(val) => {
                                setFieldValue("eventDate", val);
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item>
                          <h6 style={{ fontSize: "1rem" }}>
                            Webinar End Date{" "}
                          </h6>
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
                              inputVariant="outlined"
                              onChange={(val) => {
                                setFieldValue("eventEndDate", val);
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item>
                      {values.isScheduled && (
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <DateTimePicker
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EventIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={values.selectedDate}
                            style={{ width: "80%", margin: "10px 0px" }}
                            name="selectedDate"
                            inputVariant="outlined"
                            onChange={(val) => {
                              setFieldValue("selectedDate", val);
                            }}
                            label="Schedule Data & Time"
                          />
                        </MuiPickersUtilsProvider>
                      )}
                    </Grid>
                    {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                    <ButtonsContainer>
                      <Button
                        color="primary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to discard this post?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              history.push(wallPath);
                            },
                          });
                        }}
                      >
                        Discard Post
                      </Button>
                      <Controls.Button
                        text="Post"
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "26px" }}
                        type="submit"
                      />
                      {!values.isWebinar && !values.isEvent && (
                        <Button
                          color="primary"
                          onClick={() => onEditDraft(values, "Draft")}
                        >
                          Save as Draft
                        </Button>
                      )}
                    </ButtonsContainer>
                  </Form>
                  {/* Swetha */}
                  <div style={{ flexDirection: "column" }}>
                    {values.isWebinar ? null : <Preview state={values} />}
                    {values.isWebinar || values.isEvent ? (
                      <>
                        <Divider className={classes.divider} />
                        <Grid item>
                          <div className={classes.title}>Role Description </div>

                          <Controls.Input
                            // label="Role Description"
                            value={values.roleDescription}
                            name="roleDescription"
                            onChange={handleChange}
                            error={
                              touched.roleDescription &&
                              Boolean(errors.roleDescription)
                            }
                            multiline
                            className={classes.roleStyle}
                            rows={6}
                            fullWidth
                          />
                        </Grid>
                      </>
                    ) : null}
                  </div>
                </div>
                {values.isEvent && (
                  <PreprationContainer
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
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

export default EditPost;
