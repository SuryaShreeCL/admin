import { Grid } from "@material-ui/core";
import React from "react";
import BoardTable from "./BoardTable";
import SemScoreCard from "./SemScoreCard";
import { Line } from "react-chartjs-2";
import { useStyles } from "../FormStyles";
import { Typography } from "@material-ui/core";

function TopSubjects(props) {
  // Styles for this component
  const classes = useStyles();

  //   Data that is passed to the line chart
  const data = {
    labels: props.semester.map(
      (eachItem) => "Sem " + eachItem.semester.toString()
    ),
    datasets: [
      {
        label: "CGPA",
        data: props.semester.map((eachItem) => eachItem.cgpa),
        fill: false,
        pointBackgroundColor: "#6495ED",
        borderColor: "#6495ED",
      },
      {
        label: "SGPA",
        data: props.semester.map((eachItem) => eachItem.sgpa),
        fill: false,
        pointBackgroundColor: "#F08080",
        borderColor: "#F08080",
      },
    ],
  };

  //   Setting up config for the chart

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          borderColor: "#fff",
        },
      },

      x: {
        grid: {
          display: false,
          Border: false,
        },
      },
    },
  };

  // Render chart container

  const renderChart = () =>{
    if(props.degreeType !== null){
      if(props.degreeType.id === "ug" || props.degreeType.id === "pg" || props.degreeType.id === "diploma"){
        return (
          <Grid item md={4}>
          <div className={classes.chartContainer}>
            <Line data={data} options={options} />
            <div className={classes.chartLegendContainer}>
              <div className={classes.dotContainer}>
                {/* This div behaves like a blue dot */}
                <div className={classes.blueDot}></div>
                <Typography>CGPA</Typography>
              </div>
              <div className={classes.dotContainer}>
                {/* This div behaves like a red dot */}
                <div className={classes.redDot}></div>
                <Typography>SGPA</Typography>
              </div>
            </div>
          </div>
        </Grid>
        )
      }
      
    }
  }
  return (
    <Grid container spacing={2}>
      {/* Subject details table */}
      <Grid item md={12}>
        <BoardTable
          subjects={props.subjects}
          subjectTableFields={props.subjectTableFields}
        />
      </Grid>
      <Grid item md={8}>
        <Grid container spacing={2}>
          {/* Mapping semester to list the list of semester details */}
          {props.semester.map((eachSem, index) => {
            return (
              <Grid item md={6}>
                <SemScoreCard
                  subjectDetails={eachSem.subjects}
                  semNumber={eachSem.semester}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {renderChart()}
    </Grid>
  );
}

export default TopSubjects;
