import { Checkbox } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Question } from "../../../Assets/StyledComponents";
import {
  getConcepts,
  getCourses,
  getSubjects,
} from "../../../Redux/Action/CourseMaterial";
import { getFilters } from "../../../Redux/Action/Test";
import { AddButton } from "../../../Utils/Buttons";
import LatexViewer from "../../../Utils/LatexViewer";
import { Data } from "./Data";
import FilterComponent from "./FilterComponent";
import TableComp from "./Table";
import React from "react";

function Index() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    courseId: null,
    subjectId: null,
    conceptId: null,
    testTypeId: null,
    selectedQuestions: [],
    selectionLimit: 3,
  });
  const {
    courseId,
    subjectId,
    conceptId,
    testTypeId,
    selectedQuestions,
    selectionLimit,
  } = state;

  const { courses, subjects, concepts } = useSelector(
    (state) => state.CourseMaterialReducer
  );

  const { filterData } = useSelector((state) => state.TestReducer);

  console.log(filterData, "filterData");

  useEffect(() => {
    dispatch(getFilters());
  }, []);
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
                        // dispatch(getTopicListByConceptId(
                        //    conceptResponse.data[0]?.id
                        // ));
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
                  // this.props.getTopicListByConceptId(conceptResponse.data[0]?.id);
                  setState({
                    ...state,
                    courseId: value,
                    subjectId: subjectResponse.data[0].id,
                    conceptId: conceptResponse.data[0].id,
                  });
                }
              })
            );
          }
        })
      );
    } else if (name === "subject")
      dispatch(
        getConcepts(value, (conceptResponse) => {
          if (conceptResponse.success) {
            // this.props.getTopicListByConceptId(conceptResponse.data[0]?.id);
            setState({
              ...state,
              subjectId: value,
              conceptId: conceptResponse.data[0].id,
            });
          }
        })
      );
    else if (name === "testType") {
      setState({
        ...state,
        testTypeId: value,
      });
      // var newObj = {
      //   [name]: value,
      // };
      // if (value === "CALIBRATION") {
      //   setState({ ...newObj, topicId: "default" });
      // } else {
      // setState({
      //     ...newObj,
      //     topicId:
      //       topicId !== "default" ? topicId : topicOptions[0]?.id || "default",
      //   });
      // }
    } else {
      // this.props.getTopicListByConceptId(event.target.value);
      setState({
        ...state,
        conceptId: value,
      });
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
        {Data.map((item, index) => {
          return (
            <Question id={item.id} disabled={disabledQuestion(item.id)}>
              <div className="flex-filler">
                {index + 1}. &nbsp;&nbsp;
                <div style={{ flexGrow: 1 }}>
                  <LatexViewer math={item.question} />
                </div>
                <div>
                  <Checkbox
                    color={"primary"}
                    id={item.id}
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

  return (
    <>
      <Container>
        <FilterComponent {...filterProps} />
        <TableComp />
      </Container>
      {/* <Divider />
      <Grid item>
        <SubTitle>List of Question</SubTitle>
      </Grid> */}
      {/* {renderQuestions()} */}
      <div style={{ display: "flex", marginLeft: "94%" }}>
        <AddButton>Copy</AddButton>
      </div>
    </>
  );
}

export default Index;
