import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { colors } from "../../Constant/Variables";
import DropDown from "../Controls/DropDown";
import TextFieldComponent from "../Controls/TextField";
import BottomContainer from "./BottomContainer";
import DatePick from "./Components/DatePick";
import { AddButton, PageWrapper } from "./Components/StyledComponents";
import { useStyles } from "./Styles/Index";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { getEdxBatch, getEdxCourseDescription, getEdxCourseType, getStudentEdx } from "../../AsyncApiCall/PgaReport/Edx";

function Edx(props) {
  const [ batchList, setBatchList ] = useState([])
  const [ courseTypeList, setCourseTypeList ] = useState([])
  const [ descriptionList, setDescriptionTypeList ] = useState([])
  const [data, setData] = useState({
    id: null,
    branch: null,
    quarterlyPlans: null,
    courseCategorizations: null,
    branchDate: null,
    descriptionOne: null,
    descriptionTwo: null,
  });

  const getAndSetStudentEdx = () =>{
    getStudentEdx(props.match.params.studentId, props.match.params.productId)
    .then(response=>{
      if(response.status === 200){
        setData(response.data.data)
      }
    })
  }

  useEffect(()=>{
    getEdxBatch()
    .then(response=>{
      if(response.status === 200){
        setBatchList(response.data.data)
      }
    })
    getEdxCourseType()
    .then(response=>{
      if(response.status === 200){
        setCourseTypeList(response.data.data)
      }
    })
    getEdxCourseDescription()
    .then(response=>{
      if(response.status === 200){
        setDescriptionTypeList(response.data.data)
      }
    })
    getAndSetStudentEdx()
  },[])

  const classes = useStyles();
  return (
    <PageWrapper>
      <div className={classes.containerStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant={"h5"}>edX Courses</Typography>
          </Grid>
          <Grid item md={2} lg={2} xl={2}>
            <DropDown
              id="combo-box-demo"
              options={batchList}
              fullWidth
              value={data.branch}
              onChange={(e, newValue) => setData((prev)=>({
                ...prev,
                branch : newValue
              }))}
              getOptionLabel={(option) => option.monthStr}
              renderInput={(params) => (
                <TextFieldComponent
                  {...params}
                  label="Batch"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={2} lg={2} xl={2}>
            <DatePick
              label={"edX Validity Date"}
              value={data.branchDate}  
              onChange={(date) =>
                setData((prev)=>({...prev, branchDate : date}))
              }
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <TextFieldComponent
              value={data.descriptionOne || ""}
              onChange={(e) =>
                setData((prev)=>({...prev, descriptionOne : e.target.value }))
              }
              label={"Expected courses to complete by application deadline"}
              fullWidth
            />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <TextFieldComponent
               value={data.descriptionTwo || ""}
               onChange={(e) =>
                 setData((prev)=>({...prev, descriptionTwo : e.target.value }))
               }
              label={"Expected courses to complete by edX course validity date"}
              fullWidth
            />
          </Grid>
          <Grid item md={2} lg={2} xl={2}></Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant={"h6"}>
              Suggested Plan of Action (for completion of edX courses)-
              Quarterly Plan
            </Typography>
          </Grid>
          {quarterPlan.map((eachPlan, index) => {
            return (
              <>
                <Grid item md={6} lg={6} xl={6}>
                  <Grid container spacing={2}>
                    <Grid item md={12} lg={12} xl={12}>
                      <Typography>{eachPlan.name}</Typography>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                      <DropDown
                        id="combo-box-demo"
                        options={courseTypeList}
                        fullWidth
                        // value={eachFactor.pgaCSF}
                        // onChange={(e, newValue) => handleCvChange(newValue, index)}
                        getOptionLabel={(option) => option.type}
                        renderInput={(params) => (
                          <TextFieldComponent
                            {...params}
                            label="Select Course Type"
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={5} lg={5} xl={5}>
                      <TextFieldComponent
                        className={classes.textField}
                        // value={contextDesc.value || ""}
                        // onChange={(e) =>
                        //   setContextDesc({ value: e.target.value, helperText: "" })
                        // }
                        // helperText={contextDesc.helperText}
                        // error={contextDesc.helperText.length > 0}
                        label={"Number of course"}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {index % 2 !== 0 && (
                  <Grid item md={12} lg={12} xl={12}>
                    <hr />
                  </Grid>
                )}
              </>
            );
          })}
          <Grid
            item
            xs={12}
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant={"h6"}>
              Categorization of courses for easy selection
            </Typography>
            <AddButton color={colors.primaryColor}>Add</AddButton>
          </Grid>
          <Grid item md={2}>
            <DropDown
              id="combo-box-demo"
              options={courseTypeList}
              fullWidth
              // value={eachFactor.pgaCSF}
              // onChange={(e, newValue) => handleCvChange(newValue, index)}
              getOptionLabel={(option) => option.tyype}
              renderInput={(params) => (
                <TextFieldComponent
                  {...params}
                  label="Select Type"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={5}>
            <DropDown
              id="combo-box-demo"
              options={descriptionList}
              fullWidth
              // value={eachFactor.pgaCSF}
              // onChange={(e, newValue) => handleCvChange(newValue, index)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextFieldComponent
                  {...params}
                  label="Description"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <TextFieldComponent
              className={classes.textField}
              // value={contextDesc.value || ""}
              // onChange={(e) =>
              //   setContextDesc({ value: e.target.value, helperText: "" })
              // }
              // helperText={contextDesc.helperText}
              // error={contextDesc.helperText.length > 0}
              label={"Course Details"}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>
            <TextFieldComponent
              className={classes.textField}
              // value={contextDesc.value || ""}
              // onChange={(e) =>
              //   setContextDesc({ value: e.target.value, helperText: "" })
              // }
              // helperText={contextDesc.helperText}
              // error={contextDesc.helperText.length > 0}
              label={"Course Details"}
              fullWidth
            />
          </Grid>
          <Grid item md={1} container justifyContent={"center"}>
            <IconButton>
              <DeleteOutlineRoundedIcon color={"secondary"} />
            </IconButton>
            </Grid>
        </Grid>
      </div>
      <BottomContainer />
    </PageWrapper>
  );
}

const easySelection = [
  { type: "", description: "", courseOne: "", courseTwo: "" },
  { type: "", description: "", courseOne: "", courseTwo: "" },
  { type: "", description: "", courseOne: "", courseTwo: "" },
];

const quarterPlan = [
  {
    name: "Quarter: Feb 2021 - Apr 2021",
    courseType: null,
    numberOfCourse: "",
  },
  {
    name: "Quarter: Feb 2021 - Apr 2021",
    courseType: null,
    numberOfCourse: "",
  },
  {
    name: "Quarter: Feb 2021 - Apr 2021",
    courseType: null,
    numberOfCourse: "",
  },
  {
    name: "Quarter: Feb 2021 - Apr 2021",
    courseType: null,
    numberOfCourse: "",
  },
];

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];
export default Edx;
