import React, { Component } from "react";
import ViewMarks from "./ViewMarks";
import ViewSemesterDetails from "./ViewSemesterDetails";
import { Grid } from "@material-ui/core";
import "../DiplomaForm/DiplomaForm.css";
import BottomButton from "../BottomButton";
import CvViewer from "../CvViewer";
import TableGrid from "../../../Utils/EditableTable";

// import { useStyles } from "../../../Asset/DiplomaStyles";



export default class Index extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      studentDocument : "",
      data : []
    }
  }

  columns = [
    {
      title: "Id",
      field: "id",
      hidden: true,
    },
    {
      title: "Subject Code",
      field: "subjectDetails.language",
      // render: (rowData, renderType) =>
      //   renderType === "row" ? rowData.subjectDetails.language : "",
      // validate: (rowData) => {
      //   if (!isEmptyObject(rowData)) {
      //     if (!isEmptyString(rowData.subjectDetails.language)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
    {
      title: "Subject Name",
      field: "subjectDetails.subjectCode",
      // render: (rowData, renderType) =>
      //   renderType === "row" ? rowData.subjectDetails.subjectCode : "",
      // validate: (rowData) => {
      //   if (!isEmptyObject(rowData)) {
      //     if (!isEmptyString(rowData.subjectDetails.subjectCode)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
    {
      title: "Grade Points",
      field: "subjectDetails.subjectName",
      // render: (rowData, renderType) =>
      //   renderType === "row" ? rowData.subjectDetails.subjectName : "",
      // validate: (rowData) => {
      //   if (!isEmptyObject(rowData)) {
      //     if (!isEmptyString(rowData.subjectDetails.subjectName)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
    {
      title: "Credit",
      field: "subjectDetails.maximumMarks",
      type: "numeric",
      // render: (rowData, renderType) =>
      //   renderType === "row" ? rowData.subjectDetails.maximumMarks : "",
      // validate: (rowData) => {
      //   // if (!isEmptyObject(rowData)) {
      //   //   if (!isNanAndEmpty(rowData.subjectDetails.maximumMarks)) {
      //   //     return true;
      //   //   } else {
      //   //     return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //   //   }
      //   // }
      // },
    },
    {
      title: "Type",
      field: "score",
      type: "numeric",

      // validate: (rowData) => {
      //   console.log(";;;;;", rowData);
      //   if (!isEmptyObject(rowData)) {
      //     if (!isNanAndEmpty(rowData.score)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
    {
      title: "Result",
      field: "score",
      type: "numeric",

      // validate: (rowData) => {
      //   console.log(";;;;;", rowData);
      //   if (!isEmptyObject(rowData)) {
      //     if (!isNanAndEmpty(rowData.score)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
    {
      title: "Pass/Fail",
      field: "score",
      type: "numeric",

      // validate: (rowData) => {
      //   console.log(";;;;;", rowData);
      //   if (!isEmptyObject(rowData)) {
      //     if (!isNanAndEmpty(rowData.score)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
    {
      title: "Type",
      field: "score",
      type: "numeric",

      // validate: (rowData) => {
      //   console.log(";;;;;", rowData);
      //   if (!isEmptyObject(rowData)) {
      //     if (!isNanAndEmpty(rowData.score)) {
      //       return true;
      //     } else {
      //       return { isValid: false, helperText: HELPER_TEXT.requiredField };
      //     }
      //   }
      // },
    },
  ];


  handleRowAdd = (newData) => {
   console.log(newData)
  };

  handleRowDelete = (oldData) => {
    console.log(oldData);
 
  };


  

  render() {
   
    // const { classes } = useStyles();

    return (
      <div>
        <Grid container position="relative" height="100vh">
          {/*  left container*/}

          {/* semester details */}
          <Grid item md={7}>
            <Grid container>
              <Grid
                item
                md={12}
                // className={classes.container}
                style={{
                  height: "95vh",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  width: "100%",
                }}
              >
                <ViewSemesterDetails />

                 <Grid item md={12}></Grid>
                <TableGrid
                  columns={this.columns}
                  data={this.state.data}
                  onRowDelete={this.handleRowDelete}
                  onRowAdd={this.handleRowAdd}
                />
                <ViewMarks />
              </Grid>

             <Grid item md={12}></Grid>
              <Grid item md={12}>
                <BottomButton />
              </Grid>
            </Grid>
          </Grid>

          {/* right container - markSheet */}
          <Grid item md={5}>
            <CvViewer path={this.state.studentDocument} {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
