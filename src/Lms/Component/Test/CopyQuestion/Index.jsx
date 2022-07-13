import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonBox,
  Container,
  Question,
} from "../../../Assets/StyledComponents";
import {
  getConcepts,
  getCourses,
  getSubjects,
} from "../../../Redux/Action/CourseMaterial";
import {
  getFilters,
  getTopicListByConceptId,
  getTestQuestionSet,
  getQuestionSet,
} from "../../../Redux/Action/Test";
import { AddButton } from "../../../Utils/Buttons";
import LatexViewer from "../../../Utils/LatexViewer";
import { Data } from "./Data";
import FilterComponent from "./FilterComponent";
import TableComponent from "./Table";
import React from "react";
import { setPoperAnchorEl } from "../../../../Actions/HelperAction";
import PaginationComponent from "../../../Utils/PaginationComponent";

const INITIAL_PAGE_NO = 0;
const NO_OF_RESPONSE = 10;
function Index() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    courseId: null,
    subjectId: null,
    conceptId: null,
    testTypeId: null,
    selectedQuestions: [],
    selectionLimit: 3,
    open: false,
    close: false,
    questionSetId: null,
    scroll: false,
    topicId: null,
    topicList: null,
    currentPage: 0,
    questionsList: [],
    questionDetails: [],
    field: [],
    order: [],
    status: null,
  });
  const {
    courseId,
    subjectId,
    conceptId,
    testTypeId,
    topicId,
    selectedQuestions,
    selectionLimit,
    open,
    questionSetId,
    scroll,
    close,
    currentPage,
    questionsList,
    field,
    order,
    status,
  } = state;

  const { courses, subjects, concepts } = useSelector(
    (state) => state.CourseMaterialReducer
  );

  const { filterData, topicList, testData } = useSelector(
    (state) => state.TestReducer
  );
  const tableData = testData;
  console.log(filterData, "testData");

  useEffect(() => {
    dispatch(getFilters());
  }, []);

  useEffect(() => {
    let paramObj = {
      page: currentPage,
      testType: testTypeId !== "default" ? testTypeId : null,
      topicId: topicId !== "default" ? topicId : null,
      status: status !== "default" ? status : null,
      field: field.length > 0 ? field : null,
      order: order.length > 0 ? order : null,
      size: NO_OF_RESPONSE,
      courseId: courseId,
    };

    dispatch(getQuestionSet(paramObj));
  }, [testTypeId, topicId, status, field, courseId, order]);

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
                          getTopicListByConceptId(conceptResponse.data[0]?.id)
                        );
                        setState({
                          ...state,
                          courseId: response.data[0]?.id,
                          subjectId: subjectResponse.data[0]?.id,
                          conceptId: conceptResponse.data[0]?.id,
                        });
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
    console.log(event, "event");
    const { name, value } = event.target;
    if (name === "course") {
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
                          subjectId: subjectResponse.data[0].id,
                          conceptId: conceptResponse.data[0].id,
                          topicId: topicResponse.data?.[0]?.id,
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
                    topicId: topicResponse.data?.[0]?.id,
                    currentPage: 0,
                  });
                }
              )
            );
          }
        })
      );
    } else if (name === "testType") {
      setState({
        ...state,
        testTypeId: value,
        currentPage: 0,
      });
      // var newObj = {
      //   [name]: value,
      // };
      // if (value === "CALIBRATION") {
      //   setState({ ...newObj, topicId: "default" });
      // } else {
      //   setState({
      //     ...newObj,
      //     topicId:
      //       topicId !== "default" ? topicId : topicOptions[0]?.id || "default",
      //   });
      // }
    } else if (name === "topic") {
      setState({
        ...state,
        topicId: value,
        currentPage: 0,
      });
    } else {
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
    }
  };

  const filterProps = {
    courses: { ...courses },
    courseId: courseId,
    subjects: { ...subjects },
    subjectId: subjectId,
    concepts: { ...concepts },
    conceptId: conceptId,
    testType: testTypeId,
    filterData: { ...filterData },
    topicId: topicId,
    topicList: { ...topicList },
    onChange: handleChange,
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
  console.log(selectedQuestions);

  const disabledQuestion = (id) => {
    let arr = [...selectedQuestions];
    return !arr.includes(id) && selectionLimit === arr.length;
  };

  const renderQuestions = () => {
    return (
      <div>
        {questionsList.length !== 0 &&
          questionsList.map((item, index) => {
            return (
              <Question id={item.id} disabled={disabledQuestion(item.id)}>
                <div className="flex-filler">
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
            scroll: true,
            questionDetails: response.data,
            questionsList: response.data.questions,
          });
        }
      })
    );

    console.log(id, "+++++++");
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
    this.setState({ currentPage: value - 1 });
    // let paramObj = { page: value - 1, size: NO_OF_RESPONSE };
    // this.props.getQuestionSet(paramObj);
  };
  return (
    <>
      <Container>
        <FilterComponent {...filterProps} />

        {tableData && (
          <TableComponent
            handleTableRowClick={handleTableRowClick}
            tableData={tableData.content}
            field={field}
            order={order}
          />
        )}

        {tableData !== undefined && (
          <PaginationComponent
            pageCount={tableData?.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
      {/* <Divider />
      <Grid item>
        <SubTitle>List of Question</SubTitle>
      </Grid> */}
      <Dialog open={open} maxWidth="lg" fullWidth>
        <DialogContent> {renderQuestions()}</DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            className={"button-style"}
            onClick={handleClose}
          >
            cancel
          </Button>
          <div style={{ width: "20px" }} />
          <Button
            color="primary"
            variant="contained"
            className={"button-style"}
          >
            copy
          </Button>
        </DialogActions>
      </Dialog>
      {/* {renderQuestions()} */}
      {/* <div style={{ display: "flex", marginLeft: "94%" }}>
        <AddButton>Copy</AddButton>
      </div> */}
    </>
  );
}

export default Index;
