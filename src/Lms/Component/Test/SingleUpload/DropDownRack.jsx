import {
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { DropDownDiv } from "../../../Assets/StyledComponents";
import { AVOID_INPUT } from "../../../Constants";
import { aegetTestQuestionSet } from "../../../Redux/Action/Test";
import DropDown from "../../../Utils/DropDown";
import QueryString from "qs";



function DropDownRack(props) {
  const dispatch = useDispatch();
  const location = useLocation()
  console.log(location)
  const [testType, setTestType] = useState("")
  const [video,setVideo]=useState("120")
  const aeDept = window.sessionStorage.getItem("department");
  const {
    subjects,
    concepts,
    topics,
    activeSubject,
    activeConcept,
    activeTopic,
    handleSubjectChange,
    handleConceptChange,
    handleTopicChange,
    difficulty,
    activeLevel,
    handleInputChange,
    expectedTime,
    testQuestionSetId,
    type,
    separateScore

  } = props;
// console.log(type)
 
  // useEffect(() => {
  //   dispatch(
  //     aegetTestQuestionSet(testQuestionSetId, (response) => {
  //       if (response.success) {
  //         if (response.data.type) {
  //           setTestType(response.data.type);
  //         }
  //       }
  //     })
  //   );
  // }, [testQuestionSetId]);

  if (subjects !== null && concepts !== null) {
    return (
      <React.Fragment>
        {topics !== null && (
          <DropDownDiv>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <DropDown
                  label="Subject"
                  items={subjects.data}
                  value={activeSubject}
                  onChange={handleSubjectChange}
                  disabled={subjects.data.length < 2}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DropDown
                  label="Concept"
                  items={concepts.data}
                  value={activeConcept}
                  onChange={handleConceptChange}
                  disabled={concepts.data.length <
                     2}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DropDown
                  label="Topic"
                  items={topics}
                  value={activeTopic}
                  onChange={handleTopicChange}
                  disabled={topics.length < 2}
                />
              </Grid>
            </Grid>
          </DropDownDiv>
        )}
        <DropDownDiv>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DropDown
                label="Difficulty level"
                items={difficulty}
                value={activeLevel}
                name="activeLevel"
                onChange={handleInputChange}
              />
            </Grid>
            {aeDept === "assessment_engine_admin" && (
              <>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel
                    shrink={true}
                    style={{
                      top: "-8px",
                      left: "15px",
                      background: "#FFFFFF",
                      padding: "0 10px 0 8px",
                      zIndex: 1,
                    }}
                  >
                    Expected time for completion
                  </InputLabel>
                  <OutlinedInput
                    inputProps={{
                      style: {
                        height: "11px",
                      },
                    }}
                    type={"number"}
                    onKeyDown={(evt) =>
                      (AVOID_INPUT.includes(evt.key) ||
                        // Up arrow and down arrow disabling
                        evt.keyCode === 38 ||
                        evt.keyCode === 40) &&
                      evt.preventDefault()
                    }
                    id="expectedTime"
                  //  { type === "VIDEO"? (value={video}):
                  //  ( value={expectedTime})}
                  value={expectedTime}
                    name="expectedTime"
                    disabled={type==="VIDEO"}

                    // placeholder='Expected time for completion'
                    onChange={handleInputChange}
                    endAdornment={
                      <InputAdornment position="end">seconds</InputAdornment>
                    }
                  />
                  { console.log(expectedTime)}
                </FormControl>
              </Grid>
             
              
              <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel
                     shrink={true}
                      style={{
                        top: "-8px",
                        left: "15px",
                        background: "#FFFFFF",
                        padding: "0 10px 0 8px",
                        zIndex: 1,
                      }}
                      placeholder={"Score"}
                    >Score
                    
                    </InputLabel>
                    <OutlinedInput
                      inputProps={{
                        style: {
                          height: "11px",
                        },
                      }}
                      type={"number"}
                      onKeyDown={(evt) =>
                        (AVOID_INPUT.includes(evt.key) ||
                          // Up arrow and down arrow disabling
                          evt.keyCode === 38 ||
                          evt.keyCode === 40) &&
                        evt.preventDefault()
                      }
                      id="separateScore"
                      value={separateScore}
                      name="separateScore"
                      min="0"
                      // placeholder='Expected time for completion'
                      // onChange={handleInputChange}
                      onChange={(e)=>{
                        if(e.target.value.length<=4){
                        handleInputChange(e);}
                      else{
                        e.preventDefault();
                      }
                      }}
                    />
                  </FormControl>
                  {/* {console.log(score)} */}
                </Grid>
  
              </>
            )}

            {topics !== null && (
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel
                    shrink={true}
                    style={{
                      top: "-8px",
                      left: "15px",
                      background: "#FFFFFF",
                      padding: "0 10px 0 8px",
                      zIndex: 1,
                    }}
                  >
                    Expected time for completion
                  </InputLabel>
                  <OutlinedInput
                    inputProps={{
                      style: {
                        height: "11px",
                      },
                    }}
                    type={"number"}
                    onKeyDown={(evt) =>
                      (AVOID_INPUT.includes(evt.key) ||
                        // Up arrow and down arrow disabling
                        evt.keyCode === 38 ||
                        evt.keyCode === 40) &&
                      evt.preventDefault()
                    }
                    id="expectedTime"
                    value={expectedTime}
                    name="expectedTime"
                    disabled={type==="VIDEO"}
                    min={1}
                    // placeholder='Expected time for completion'
                    onChange={handleInputChange}
                    endAdornment={
                      <InputAdornment position="end">seconds</InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DropDownDiv>
        <Divider className={"single_select_divider"} />
      </React.Fragment>
    );
  } else return null;
}

export default DropDownRack;
