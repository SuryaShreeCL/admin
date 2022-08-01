import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, FlexView, H1 } from "../../Assets/StyledComponents";
import {
  addConcept,
  getConcept,
  updateConcept,
  updateConceptStatus,
} from "../../Redux/Action/Concept";
import { getCourses, getSubjects } from "../../Redux/Action/CourseMaterial";
import DialogComponent from "../../Utils/DialogComponent";
import PaginationComponent from "../../Utils/PaginationComponent";
import PlusButton from "../../Utils/PlusButton";
import { SnackBar } from "../../Utils/SnackBar";
import ConceptContainer from "./Component/ConceptContainer";
import DataTable from "./Component/DataTable";
import FilterContainer from "./Component/FilterContainer";
import Popup from "./Component/Popup";
import { STATUS_POPUP_CONTENT } from "./Component/StatusPopupContent";

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
    fileSize: null,
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
    fileSize,
  } = state;

  const { conceptList } = useSelector((state) => state.LmsConceptReducer);

  const sortedArray = (newOrder, data) => {
    let arr = [...data];
    arr.sort((a1, b1) => {
      switch (newOrder) {
        case "ASC":
          return a1.wkStatus.localeCompare(b1.wkStatus);
        case "DESC":
          return b1.wkStatus.localeCompare(a1.wkStatus);
        default:
          return 0;
      }
    });
    return arr;
  };

  const getDataModel = (newOrder, newPage, data) => {
    const totalCount = data.length;
    const startIndex = newPage * SIZE;
    const selectedItems = data.slice(startIndex, startIndex + SIZE);
    return {
      ...state,
      conceptData: sortedArray(newOrder, selectedItems),
      totalPages: Math.ceil(totalCount / SIZE),
    };
  };

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
                    subjectResponse.data[0]?.id
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
        setState({
          ...getDataModel(order, page, [...conceptList.data]),
          content: [...conceptList.data],
        });
      } else {
        setState({
          ...state,
          snackOpen: true,
          snackColor: "error",
          snackMessage: conceptList.message,
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
                getConcept(value?.courseId, subjectResponse.data[0]?.id)
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
        dispatch(getConcept(courseValue.courseId, value.id));
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
          dispatch(getConcept(courseValue?.courseId, subjectValue?.id));
          handleSuccess(response);
        } else handleFail(response);
      })
    );
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null, conceptDetails: {} });
  };

  const handlePageChange = (event, value) => {
    setState({ ...getDataModel(order, value - 1, content), page: value - 1 });
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
      conceptDetails: { ...val },
    });
  };

  const handleOptions = (name) => {
    const {
      name: conceptName,
      id,
      description,
      imageUrl,
      document,
    } = conceptDetails;
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
          fileSize: document?.size,
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
      fileSize: null,
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
        fileSize: fileSize,
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
        fileSize: null,
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
                dispatch(getConcept(courseValue?.courseId, subjectValue?.id));
              }, 500);
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
                dispatch(getConcept(courseValue?.courseId, subjectValue?.id));
              }, 500);
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

  const setFile = (file) => {
    setState({
      ...state,
      imageUrl: file.name,
      fileSize: file.size,
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
            fileSize={fileSize}
            setFile={setFile}
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
