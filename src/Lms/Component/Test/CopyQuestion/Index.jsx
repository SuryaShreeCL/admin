import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Divider,
  FlexView,
  H1,
  Question,
  SubTitle,
} from "../../../Assets/StyledComponents";
import {
  getConcepts,
  getCourses,
  getSubjects,
} from "../../../Redux/Action/CourseMaterial";
import {
  getFilters,
  getQuestionSet,
  getTestQuestionSet,
  getTopicListByConceptId,
  copyQuestion,
} from "../../../Redux/Action/Test";
import LatexViewer from "../../../Utils/LatexViewer";
import PaginationComponent from "../../../Utils/PaginationComponent";
import FilterComponent from "./FilterComponent";
import TableComponent from "./Table";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { lms_add_test } from "../../../../Component/RoutePaths";
import { SnackBar } from "../../../Utils/SnackBar";

const NO_OF_RESPONSE = 10;

function Index() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    courseId: "default",
    subjectId: null,
    conceptId: null,
    testType: null,
    selectedQuestions: [],
    open: false,
    questionSetId: null,
    topicId: null,
    currentPage: 0,
    questionsList: [],
    questionDetails: [],
    field: [],
    order: [],
    courseValue: null,
  });

  const [snack, setSnack] = useState({
    snackOpen: false,
    message: "",
    color: "",
  });

  const {
    courseId,
    subjectId,
    conceptId,
    testType,
    topicId,
    selectedQuestions,
    open,
    currentPage,
    questionsList,
    field,
    order,
    courseValue,
  } = state;

  const { snackOpen, message, color } = snack;

  const handleSnackClose = () => {
    setSnack({
      snackOpen: false,
      message: "",
      color: "",
    });
  };

  const location = useLocation();
  const { testQuestionSetId, sectionId } = useParams();
  const history = useHistory();
  const { courses, subjects, concepts } = useSelector(
    (state) => state.CourseMaterialReducer
  );

  const { filterData, topicList, testData } = useSelector(
    (state) => state.TestReducer
  );

  const findCourseValue = (course_id) => {
    const courseList = { data: [], ...courses }.data;
    let newCourseValue = course_id
      ? courseList.filter((item) => item.id === course_id)[0]?.courseId || null
      : courseList[0]?.courseId || null;
    return newCourseValue;
  };

  useEffect(() => {
    dispatch(getFilters());
  }, []);

  let params = new URLSearchParams(location.search);
  let selectionLimit = params.get("limit");

  useEffect(() => {
    if (courseId !== "default") {
      let paramObj = {
        page: currentPage,
        testType: testType !== "default" ? testType : null,
        topicId: topicId !== "default" ? topicId : null,
        status: null,
        field: field.length > 0 ? field : null,
        order: order.length > 0 ? order : null,
        size: NO_OF_RESPONSE,
        courseId:
          testType === "CALIBRATION"
            ? courseValue
            : courseId !== "default"
            ? courseId
            : null,
      };
      dispatch(getQuestionSet(paramObj));
    }
  }, [currentPage, testType, topicId, field, courseId, order]);

  useEffect(() => {
    dispatch(
      getCourses((response) => {
        if (response.success) {
          dispatch(
            getSubjects(response.data[0]?.id, (subjectResponse) => {
              if (subjectResponse.success) {
                dispatch(
                  getConcepts(
                    subjectResponse.data[0]?.id,
                    (conceptResponse) => {
                      if (conceptResponse.success) {
                        dispatch(
                          getTopicListByConceptId(
                            conceptResponse.data[0]?.id,
                            (topicResponse) => {
                              setState({
                                ...state,
                                courseId: response.data[0]?.id,
                                courseValue: findCourseValue(
                                  response.data[0]?.id
                                ),
                                subjectId: subjectResponse.data[0]?.id,
                                conceptId: conceptResponse.data[0]?.id,
                                topicId: topicResponse.data[0]?.id || null,
                              });
                            }
                          )
                        );
                      }
                    }
                  )
                );
              }
            })
          );
        }
      })
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "course") {
      if (testType !== "CALIBRATION") {
        dispatch(
          getSubjects(value, (subjectResponse) => {
            if (subjectResponse.success) {
              dispatch(
                getConcepts(subjectResponse.data[0].id, (conceptResponse) => {
                  if (conceptResponse.success) {
                    dispatch(
                      getTopicListByConceptId(
                        conceptResponse.data[0]?.id,
                        (topicResponse) => {
                          setState({
                            ...state,
                            courseId: value,
                            courseValue: findCourseValue(value),
                            subjectId: subjectResponse.data[0].id,
                            conceptId: conceptResponse.data[0].id,
                            topicId: topicResponse.data[0]?.id || null,
                            currentPage: 0,
                          });
                        }
                      )
                    );
                  }
                })
              );
            }
          })
        );
      } else {
        setState({
          ...state,
          courseId: value !== "default" ? value : null,
          courseValue: findCourseValue(value),
          currentPage: 0,
        });
      }
    } else if (name === "subject") {
      dispatch(
        getConcepts(value, (conceptResponse) => {
          if (conceptResponse.success) {
            dispatch(
              getTopicListByConceptId(
                conceptResponse.data[0]?.id,
                (topicResponse) => {
                  setState({
                    ...state,
                    subjectId: value,
                    conceptId: conceptResponse.data[0].id,
                    topicId: topicResponse.data[0]?.id || null,
                    currentPage: 0,
                  });
                }
              )
            );
          }
        })
      );
    } else if (name === "testType") {
      var newObj = {
        ...state,
        [name]: value,
        currentPage: 0,
      };
      if (value === "CALIBRATION") {
        setState({
          ...newObj,
          topicId: null,
          subjectId: null,
          conceptId: null,
        });
      } else {
        let newCourseId = courseId
          ? courseId
          : { data: [], ...courses }.data[0]?.id || null;
        if ((newCourseId && !topicId) || topicId === "default") {
          dispatch(
            getSubjects(newCourseId, (subjectResponse) => {
              if (subjectResponse.success) {
                dispatch(
                  getConcepts(subjectResponse.data[0].id, (conceptResponse) => {
                    if (conceptResponse.success) {
                      dispatch(
                        getTopicListByConceptId(
                          conceptResponse.data[0]?.id,
                          (topicResponse) => {
                            setState({
                              ...newObj,
                              courseId: newCourseId,
                              courseValue: findCourseValue(newCourseId),
                              subjectId: subjectResponse.data[0].id,
                              conceptId: conceptResponse.data[0].id,
                              topicId: topicResponse.data?.[0]?.id,
                            });
                          }
                        )
                      );
                    }
                  })
                );
              }
            })
          );
        } else
          setState({
            ...newObj,
            courseId: newCourseId,
            courseValue: findCourseValue(newCourseId),
          });
      }
    } else if (name === "concept") {
      dispatch(
        getTopicListByConceptId(value, (topicResponse) => {
          setState({
            ...state,
            conceptId: value,
            topicId: topicResponse.data?.[0]?.id,
            currentPage: 0,
          });
        })
      );
    } else {
      setState({
        ...state,
        [name]: value,
        currentPage: 0,
      });
    }
  };

  const handleCheckboxClick = (event) => {
    const { id } = event.target;
    let arr = [...selectedQuestions];
    let index = arr.indexOf(id);
    if (index > -1) arr.splice(index, 1);
    else arr.push(id);
    setState({
      ...state,
      selectedQuestions: arr,
    });
  };

  const disabledQuestion = (id) => {
    let arr = [...selectedQuestions];
    return selectionLimit
      ? !arr.includes(id) && parseInt(selectionLimit) === arr.length
      : false;
  };

  const renderQuestions = () => {
    return (
      <div>
        {questionsList.length !== 0 &&
          questionsList.map((item, index) => {
            return (
              <Question
                id={item.id}
                disabled={disabledQuestion(item.id)}
                pointer={!disabledQuestion(item.id)}
                onClick={!disabledQuestion(item.id) && handleCheckboxClick}
              >
                <div className='flex-filler'>
                  {index + 1}. &nbsp;&nbsp;
                  <div style={{ flexGrow: 1 }}>
                    <LatexViewer math={item.question} />
                  </div>
                  <div style={{ margin: "auto" }}>
                    <Checkbox
                      color={"primary"}
                      alignItem={"center"}
                      id={item.id}
                      size={"medium"}
                      checked={selectedQuestions.includes(item.id)}
                      disabled={disabledQuestion(item.id)}
                      onClick={handleCheckboxClick}
                    />
                  </div>
                </div>
              </Question>
            );
          })}
      </div>
    );
  };

  const handleTableRowClick = (event) => {
    const { id } = event.currentTarget;
    dispatch(
      getTestQuestionSet(id, (response) => {
        if (response.success) {
          setState({
            ...state,
            questionSetId: id,
            open: true,
            questionDetails: response.data,
            questionsList: response.data.questions,
          });
        }
      })
    );
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
      selectedQuestions: [],
    });
  };

  const handlePageChange = (event, value) => {
    window.scroll(0, 0);
    setState({ ...state, currentPage: value - 1 });
  };

  const handleSortNew = (index, order) => {
    const fields = { 1: "type", 4: "courseName", 6: "wkStatusValue" };
    setState({
      ...state,
      field: field.concat(fields[index]),
      order: state.order.concat(order),
    });
  };

  const handleSortBlue = (fieldIndex) => {
    setState({
      ...state,
      field: field.filter((item, index) => {
        if (index !== fieldIndex) return item;
      }),
      order: order.filter((item, index) => {
        if (index !== fieldIndex) return item;
      }),
    });
  };

  const handleSortBlur = (fieldIndex) => {
    if (order[fieldIndex] === "ASC") {
      let newOrder = order;
      newOrder.splice(fieldIndex, 1, "DESC");
      setState({ ...state, order: newOrder });
    } else {
      let newOrder = order;
      newOrder.splice(fieldIndex, 1, "ASC");
      setState({ ...state, order: newOrder });
    }
  };

  const handleCopy = () => {
    let requestBody = {
      testQuestionSetId: testQuestionSetId,
      questionList: selectedQuestions,
      testSectionId: sectionId ? sectionId : null,
    };

    dispatch(
      copyQuestion(requestBody, (res) => {
        if (res.success) {
          handleClose();
          setSnack({
            snackOpen: true,
            message: res.message,
            color: "success",
          });
          setTimeout(() => {
            history.push(
              `${lms_add_test}?testQuestionSetId=${testQuestionSetId}`
            );
          }, 3000);
        } else {
          setSnack({
            snackOpen: true,
            message: res.message,
            color: "error",
          });
        }
      })
    );
  };

  const filterProps = {
    courses: { ...courses },
    courseId: courseId,
    subjects: { ...subjects },
    subjectId: subjectId,
    concepts: { ...concepts },
    conceptId: conceptId,
    testType: testType,
    filterData: { ...filterData },
    topicId: topicId,
    topicList: topicList,
    onChange: handleChange,
  };

  var tableData = { data: {}, ...testData }.data;

  return (
    <>
      <Container>
        <Grid container>
          <H1 style={{ marginBottom: "35px" }}>{"Copy Question"}</H1>
        </Grid>

        <FilterComponent {...filterProps} />
        {tableData && (
          <TableComponent
            handleTableRowClick={handleTableRowClick}
            tableData={tableData.content}
            handleSortBlue={handleSortBlue}
            handleSortBlur={handleSortBlur}
            handleSortNew={handleSortNew}
            field={field}
            order={order}
          />
        )}
        {tableData !== undefined && (
          <PaginationComponent
            pageCount={tableData.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>

      <Dialog open={open} maxWidth='lg' fullWidth>
        <DialogTitle style={{ padding: "24px" }}>
          <SubTitle>{"List of Question"}</SubTitle>
        </DialogTitle>
        <Divider style={{ margin: 0 }} />
        <DialogContent>{renderQuestions()}</DialogContent>
        <Divider style={{ margin: 0 }} />
        <DialogActions>
          <FlexView
            gap={"25px"}
            padding={"15px 20px !important"}
            minWidth={"300px"}
          >
            <Button
              color='primary'
              variant='outlined'
              className={"button-style"}
              onClick={handleClose}
              fullWidth
            >
              {"Cancel"}
            </Button>
            <Button
              color='primary'
              variant='contained'
              className={"button-style"}
              onClick={handleCopy}
              disabled={selectedQuestions.length === 0}
              fullWidth
            >
              {"copy"}
            </Button>
          </FlexView>
        </DialogActions>
      </Dialog>
      <SnackBar
        snackData={{
          open: snackOpen,
          snackClose: handleSnackClose,
          snackType: color,
          message: message,
        }}
      />
    </>
  );
}

export default Index;
