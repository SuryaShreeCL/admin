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
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  createWebinar,
  getWebinarList,
  updateWebinar,
} from "../../../Actions/ThirdWebinarAction";
import { thirdYear } from "../../RoutePaths";
import ConfirmDialog from "../../Utils/ConfirmDialog";
import Controls from "../../Utils/controls/Controls";
import Notification from "../../Utils/Notification";
import {
  ButtonsContainer,
  CreatePostContainer,
} from "../Assets/Styles/CreatePostStyles";
import BackHandler from "../Components/BackHandler";

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
    width: "80%",
    marginTop: "10px",
  },
  hostImage: {
    borderRadius: "50%",
  },
  btnContainer: {
    justifyContent: "flex-end !important",
    width: "80%",
    gap: "30px",
  },
});

const Webinar = () => {
  const classes = useStyles();
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, webinarList, createStatus, updateStatus } = useSelector(
    (state) => state.thirdYearWebinarListReducer
  );

  const isEdit = params?.id;
  const [state, setState] = useState({
    id: params?.id || null,
    webinarTitle: "",
    description: "",
    zoomLink: "",
    eventDate: new Date(),
    eventEndDate: new Date(),
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
    if (params?.id) {
      dispatch(getWebinarList(params?.id));
    }
  }, []);

  useEffect(() => {
    if (webinarList) {
      if (webinarList.success) {
        const { data } = webinarList;
        setState({
          ...state,
          webinarTitle: data?.eventTitle,
          description: data?.description,
          zoomLink: data?.zoomLink,
          eventDate: data?.eventDate ? new Date(data?.eventDate) : new Date(),
          eventEndDate: data?.eventEndDate
            ? new Date(data?.eventEndDate)
            : new Date(),
        });
      } else {
        setNotify({
          isOpen: true,
          message: webinarList.message,
          type: "error",
        });
      }
    }
  }, [webinarList]);

  useEffect(() => {
    if (createStatus) {
      if (createStatus.success) {
        setNotify({
          isOpen: true,
          message: "Created Successfully",
          type: "success",
        });
        setTimeout(() => {
          history.push({
            pathname: thirdYear,
            tab: location?.postTypeTab,
          });
        }, 1200);
      } else {
        setNotify({
          isOpen: true,
          message: createStatus.message,
          type: "error",
        });
      }
    }
  }, [createStatus]);

  useEffect(() => {
    if (updateStatus) {
      if (updateStatus.success) {
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
        setTimeout(() => {
          history.push({
            pathname: thirdYear,
            tab: location?.postTypeTab,
          });
        }, 1200);
      } else {
        setNotify({
          isOpen: true,
          message: updateStatus.message,
          type: "error",
        });
      }
    }
  }, [updateStatus]);

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

  const handleSchedule = (values) => {
    let payload = {
      id: values.id,
      eventTitle: values.webinarTitle,
      description: values.description,
      zoomLink: values.zoomLink,
      eventDate: values.eventDate,
      eventEndDate: values.eventEndDate,
      activeStatus: "Scheduled",
    };
    if (isEdit) {
      dispatch(updateWebinar(payload));
    } else {
      dispatch(createWebinar(payload));
    }
  };

  const validate = (values) => {
    /* Validating the timings */
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
    return true;
  };

  //Max 30 words limit for description
  const getWordCount = (str) => {
    return str?.trim().split(/\s+/).length || 0;
  };

  const isValidZoomLink = (str) => {
    let regexp = /https:\/\/[\w-]*\.?zoom.us\/(j|my)\/[\d\w?=-]+/g;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const validationSchema = yup.object({
    webinarTitle: yup.string().required("Title is required"),
    description: yup
      .string()
      .required("Description is required")
      .test(
        "is-valid-word-count",
        "It shouldn't exceed more than 30 word Limit",
        (value) => getWordCount(value) <= 30
      ),
    zoomLink: yup
      .string()
      .required("Zoom link is required")
      .test("is-valid-zoom-link", "Not a valid zoom link", (value) =>
        isValidZoomLink(value)
      ),
  });

  return (
    <>
      <BackHandler
        title={`${isEdit ? "Edit" : "Create"} webinar`}
        tab={location?.postTypeTab ?? 0}
        isDrive={location?.isDrive ?? 0}
      />
      <CreatePostContainer>
        <Formik
          initialValues={state}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (validate(values)) {
              handleSchedule(values);
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
                <div className='CreatePost'>
                  <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Grid container spacing={1} direction='column'>
                      <Grid item>
                        <h6 style={{ fontSize: "1rem" }}>{"Webinar Title"}</h6>
                        <Controls.Input
                          label={"Webinar Title"}
                          name={"webinarTitle"}
                          error={
                            touched.webinarTitle && Boolean(errors.webinarTitle)
                          }
                          helperText={
                            touched.webinarTitle && errors.webinarTitle
                          }
                          className={classes.captionStyle}
                          value={values.webinarTitle}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item>
                        <h6 style={{ fontSize: "1rem" }}>
                          {"Add description"}
                        </h6>
                        <Controls.Input
                          label={"Type description here.."}
                          value={values.description}
                          name={"description"}
                          onChange={handleChange}
                          error={
                            touched.description && Boolean(errors.description)
                          }
                          helperText={`Max 30 words limit`}
                          multiline
                          className={classes.captionStyle}
                          rows={2}
                        />
                      </Grid>

                      <Grid item>
                        <h6 style={{ fontSize: "1rem" }}>
                          {"Enter Zoom Link"}
                        </h6>
                        <Controls.Input
                          label='Zoom Webinar Link'
                          name='zoomLink'
                          error={touched.zoomLink && Boolean(errors.zoomLink)}
                          helperText={touched.zoomLink && errors.zoomLink}
                          className={classes.captionStyle}
                          value={values.zoomLink}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid
                        container
                        direction='row'
                        justify='space-between'
                        className={classes.spacer}
                      >
                        <Grid item lg={12}>
                          <h6 style={{ fontSize: "1rem" }}>
                            {"Schedule Details"}
                          </h6>
                        </Grid>
                        <Grid item>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                              value={values.eventDate}
                              style={{ width: "400px", margin: "10px 0px" }}
                              disablePast
                              name={"eventDate"}
                              label={"Start Data & Time"}
                              inputVariant='outlined'
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
                                  <InputAdornment position={"start"}>
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                              value={values.eventEndDate}
                              style={{ width: "400px", margin: "10px 0px" }}
                              disablePast
                              name={"eventEndDate"}
                              label={"End Data & Time"}
                              inputVariant={"outlined"}
                              onChange={(val) => {
                                setFieldValue("eventEndDate", val);
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </div>
                <ButtonsContainer className={classes.btnContainer}>
                  <Controls.Button
                    text={`Discard`}
                    variant='contained'
                    color='primary'
                    style={{ borderRadius: "26px", marginRight: "10px" }}
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to discard this webinar?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDiscard();
                        },
                      });
                    }}
                  />
                  <Controls.Button
                    text={`Submit`}
                    variant='contained'
                    color='primary'
                    style={{ borderRadius: "26px" }}
                    type={"submit"}
                    onClick={submitForm}
                    disabled={loading}
                    loading={loading}
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

export default Webinar;
