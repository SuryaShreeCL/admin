import { Box, Grid, TextField, ThemeProvider } from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { lms_add_topic } from "../../../Component/RoutePaths";
import PublishIcon from "../../Assets/icons/Publish.svg";
import {
  Container,
  FlexView,
  H1,
  textFieldTheme,
} from "../../Assets/StyledComponents";
import {
  deleteTopic,
  getConcepts,
  getCourses,
  getSubjects,
  getTopics,
  publishTopic,
  reviewTopic,
  approveTopic,
  draftTopic,
} from "../../Redux/Action/CourseMaterial";
import DialogComponent from "../../Utils/DialogComponent";
import PaginationComponent from "../../Utils/PaginationComponent";
import PlusButton from "../../Utils/PlusButton";
import DataTable from "./Component/DataTable";
import FilterContainer from "./Component/FilterContainer";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import { useState } from "react";
import { SnackBar } from "../../Utils/SnackBar";
import { useEffect } from "react";
import {
  addConcept,
  getConcept,
  updateConcept,
  updateConceptStatus,
} from "../../Redux/Action/Concept";
import { STATUS_POPUP_CONTENT } from "./Component/StatusPopupContent";
import Popup from "./Component/Popup";
import ConceptContainer from "./Component/ConceptContainer";

const SIZE = 10;

function Index(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    courseValue: null,
    subjectValue: null,
    content: [],
    page: 0,
    totalPages: 0,
    order: "",
    dialogOpen: false,
    dialogContent: null,
    anchorEl: null,
    snackOpen: false,
    snackColor: "",
    snackMessage: "",
    conceptDetails: {},
    courseOptions: [],
    subjectOptions: [],
    popupName: "",
    conceptPopupOpen: false,
    conceptCourseValue: null,
    conceptSubjectValue: null,
    conceptSubjectOptions: [],
    conceptName: null,
    imageUrl: null,
    conceptDescription: null,
    conceptData: [],
  });

  const {
    anchorEl,
    courseValue,
    subjectValue,
    page,
    dialogOpen,
    dialogContent,
    order,
    snackOpen,
    snackColor,
    snackMessage,
    courseOptions,
    subjectOptions,
    content,
    totalPages,
    conceptDetails,
    popupName,
    conceptPopupOpen,
    conceptCourseValue,
    conceptSubjectValue,
    conceptSubjectOptions,
    conceptName,
    imageUrl,
    conceptDescription,
    conceptData,
  } = state;

  const { conceptList } = useSelector((state) => state.LmsConceptReducer);

  const sortedArray = (newOrder, data) => {
    let arr = [...data];
    arr.sort((a1, b1) => {
      switch (newOrder) {
        case "ASC":
          return a1.wkStatus.value.localeCompare(b1.wkStatus.value);
        case "DESC":
          return b1.wkStatus.value.localeCompare(a1.wkStatus.value);
        default:
          return 0;
      }
    });
    return arr;
  };

  // const getDataModel = (newPage, data) => {
  //   const totalCount = data.length;
  //   const startIndex = newPage * SIZE;
  //   const selectedItems = data.slice(startIndex, startIndex + SIZE);
  //   return {
  //     ...state,
  //     content: selectedItems,
  //     totalPages: Math.ceil(totalCount / SIZE),
  //   };
  // };

  useEffect(() => {
    dispatch(
      getCourses((response) => {
        if (response.success) {
          dispatch(
            getSubjects(response.data[0].id, (subjectResponse) => {
              if (subjectResponse.success) {
                dispatch(
                  getConcept(
                    response.data[0]?.courseId,
                    subjectResponse.data[0]?.id,
                    0,
                    SIZE
                  )
                );
                setState({
                  ...state,
                  courseValue: response.data[0],
                  subjectValue: subjectResponse.data[0],
                  courseOptions: [...response.data],
                  subjectOptions: [...subjectResponse.data],
                });
              }
            })
          );
        }
      })
    );
  }, []);

  useEffect(() => {
    if (conceptList) {
      if (conceptList.success) {
        // const { content, totalPages } = conceptList.data;
        setState({
          ...state,
          // content: content,
          content: conceptList.data,
          totalPages: totalPages,
          // conceptData: sortedArray(order, content),
          conceptData: sortedArray(order, conceptList.data),
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackMessage: "error",
          snackColor: conceptList.message,
          content: [],
          conceptData: [],
          totalPages: 0,
          page: 0,
        });
      }
    }
  }, [conceptList]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "course") {
      if (value) {
        dispatch(
          getSubjects(value.id, (subjectResponse) => {
            if (subjectResponse.success) {
              dispatch(
                getConcept(
                  value?.courseId,
                  subjectResponse.data[0]?.id,
                  0,
                  SIZE
                )
              );
              setState({
                ...state,
                courseValue: value,
                subjectValue: subjectResponse.data[0],
                subjectOptions: [...subjectResponse.data],
                page: 0,
              });
            }
          })
        );
      }
    } else if (name === "subject") {
      if (value) {
        setState({
          ...state,
          subjectValue: value,
          page: 0,
        });
        dispatch(getConcept(courseValue.courseId, subjectValue.id, 0, SIZE));
      }
    } else if (name === "conceptCourseValue") {
      if (value) {
        dispatch(
          getSubjects(value.id, (subjectResponse) => {
            if (subjectResponse.success) {
              setState({
                ...state,
                conceptCourseValue: value,
                conceptSubjectValue: subjectResponse.data[0],
                conceptSubjectOptions: [...subjectResponse.data],
              });
            }
          })
        );
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleSuccess = (res) => {
    setState({
      ...state,
      snackOpen: true,
      snackColor: "success",
      snackMessage: res.message,
      dialogOpen: false,
      dialogContent: null,
      anchorEl: null,
      conceptDetails: {},
      page: 0,
    });
  };

  // Fail response
  const handleFail = (res) => {
    setState({
      snackOpen: true,
      snackColor: "error",
      snackMessage: res.message,
      dialogOpen: false,
      dialogContent: null,
      anchorEl: null,
      studyPlanDetails: {},
    });
  };

  const handleButton2Click = () => {
    const { id } = conceptDetails;
    dispatch(
      updateConceptStatus(id, dialogContent?.name, (response) => {
        if (response.success) {
          dispatch(
            getConcept(courseValue?.courseId, subjectValue?.id, 0, SIZE)
          );
          handleSuccess(response);
        } else handleFail(response);
      })
    );
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null, conceptDetails: {} });
  };

  const handlePageChange = (event, value) => {
    setState({ ...state, page: value - 1 });
    dispatch(
      getConcept(courseValue?.courseId, subjectValue?.id, value - 1, SIZE)
    );
  };

  const handleButton1Click = () => {
    setState({
      ...state,
      dialogContent: null,
    });
  };

  const handleCloseIconClick = () => {
    setState({
      ...state,
      dialogContent: null,
      anchorEl: null,
    });
  };

  const handleSnackClose = () => {
    setState({
      ...state,
      snackOpen: false,
      snackMessage: "",
      snackColor: "",
    });
  };

  const handleThreeDotClick = (e, val) => {
    setState({
      ...state,
      anchorEl: e.currentTarget,
      conceptDetails: val,
    });
  };

  const handleOptions = (name) => {
    const { name: conceptName, id, description, imageUrl } = conceptDetails;
    switch (name) {
      case "Edit": {
        setState({
          ...state,
          popupName: "Edit",
          conceptPopupOpen: true,
          conceptCourseValue: courseValue,
          conceptSubjectValue: subjectValue,
          conceptSubjectOptions: [...subjectOptions],
          conceptName: conceptName,
          conceptDescription: description,
          imageUrl: imageUrl,
          anchorEl: null,
        });
        break;
      }
      case "Archive": {
        setState({
          ...state,
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(conceptName).Archive,
        });
        break;
      }
      case "Unarchive": {
        setState({
          ...state,
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(conceptName).Unarchive,
        });
        break;
      }
      case "Send Review": {
        setState({
          ...state,
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(conceptName)["Send Review"],
        });
        break;
      }
      case "Approve": {
        setState({
          ...state,
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(conceptName).Approve,
        });
        break;
      }
      case "Publish Now": {
        setState({
          ...state,
          dialogOpen: true,
          dialogContent: STATUS_POPUP_CONTENT(conceptName)["Publish Now"],
        });
        break;
      }
      default:
        break;
    }
  };

  const handlePopupClose = () => {
    setState({
      ...state,
      conceptPopupOpen: false,
      popupName: "",
      anchorEl: null,
      conceptDetails: {},
    });
  };

  const handlePopupOpen = (e) => {
    const { name } = e.currentTarget;
    setState({
      ...state,
      conceptPopupOpen: true,
      popupName: name,
      conceptName: null,
      conceptCourseValue: null,
      conceptSubjectValue: null,
      conceptSubjectOptions: [],
      conceptDescription: null,
      imageUrl: null,
    });
  };

  const handleSave = () => {
    if (
      conceptSubjectValue?.id &&
      conceptName &&
      conceptName.trim().length !== 0 &&
      conceptDescription &&
      conceptDescription.trim().length !== 0 &&
      imageUrl
    ) {
      let obj = {
        name: conceptName,
        description: conceptDescription,
        imageUrl: imageUrl,
        subject: { id: conceptSubjectValue.id },
      };
      const defaultObj = {
        ...state,
        snackOpen: true,
        snackColor: "success",
        conceptCourseValue: null,
        conceptDescription: null,
        conceptName: null,
        conceptSubjectValue: null,
        conceptSubjectOptions: [],
        imageUrl: null,
        conceptPopupOpen: false,
        popupName: "",
        page: 0,
      };
      if (popupName === "Add") {
        dispatch(
          addConcept(obj, (res) => {
            if (res.success) {
              setTimeout(() => {
                setState({
                  ...defaultObj,
                  snackMessage: "Concept Created Successfully",
                });
              }, 500);
              dispatch(
                getConcept(courseValue?.courseId, subjectValue?.id, 0, SIZE)
              );
            } else {
              setState({
                ...state,
                snackOpen: true,
                snackColor: "error",
                snackMessage: res.message,
              });
            }
          })
        );
      } else {
        dispatch(
          updateConcept(conceptDetails.id, obj, (res) => {
            if (res.success) {
              setTimeout(() => {
                setState({
                  ...defaultObj,
                  snackMessage: "Concept Updated Successfully",
                });
              }, 500);
              dispatch(
                getConcept(courseValue?.courseId, subjectValue?.id, 0, SIZE)
              );
            } else {
              setState({
                ...state,
                snackOpen: true,
                snackColor: "error",
                snackMessage: res.message,
              });
            }
          })
        );
      }
    } else {
      setState({
        ...state,
        snackOpen: true,
        snackColor: "error",
        snackMessage: "Please fill all the required fields",
      });
    }
  };

  const setImageUrl = (fileName) => {
    setState({
      ...state,
      imageUrl: fileName,
    });
  };

  const handleSort = (newOrder) => {
    setState({
      ...state,
      order: newOrder,
      conceptData: sortedArray(newOrder, content),
    });
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FlexView>
            <H1>{"Concept"}</H1>
            <PlusButton name={"Add"} onClick={handlePopupOpen}>
              {"Add Concept"}
            </PlusButton>
          </FlexView>
        </Grid>
        <Grid item xs={12}>
          <Box marginBottom={"10px"}>
            <FilterContainer
              courseOptions={courseOptions}
              subjectOptions={subjectOptions}
              courseValue={courseValue}
              subjectValue={subjectValue}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box overflow='auto' width='100%' height='900px'>
            <DataTable
              data={conceptData}
              anchorEl={anchorEl}
              handleThreeDotClick={handleThreeDotClick}
              handleClose={handleClose}
              pageNo={page}
              size={SIZE}
              handleOptions={handleOptions}
              order={order}
              status={conceptDetails.status}
              handleSort={handleSort}
            />
          </Box>
          <PaginationComponent
            page={page + 1}
            pageCount={totalPages}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
      <Popup
        open={conceptPopupOpen}
        title={`${popupName} Concept`}
        onCancel={handlePopupClose}
        onSave={handleSave}
      >
        {
          <ConceptContainer
            courseOptions={courseOptions}
            courseValue={conceptCourseValue}
            subjectValue={conceptSubjectValue}
            subjectOptions={conceptSubjectOptions}
            conceptName={conceptName}
            isEdit={popupName === "Edit"}
            onChange={handleChange}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            conceptDescription={conceptDescription}
          />
        }
      </Popup>

      <SnackBar
        snackData={{
          open: snackOpen,
          snackClose: handleSnackClose,
          snackType: snackColor,
          message: snackMessage,
        }}
      />
      <DialogComponent
        open={dialogOpen}
        dialogContent={dialogContent}
        handleButton1Click={handleButton1Click}
        handleCloseIconClick={handleCloseIconClick}
        handleButton2Click={handleButton2Click}
      />
    </Container>
  );
}

export default Index;
