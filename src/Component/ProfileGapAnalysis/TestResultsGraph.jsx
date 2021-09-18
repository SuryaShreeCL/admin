import React from "react";
import { Grid } from "@material-ui/core";
import "./TestResults.css";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [9, 11, 20, 17, 8,3],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [10, 12, 25, 33, 36, 40],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const data1 = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "First dataset",
      data: [3, 15, 26, 31, 35, 37],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const options = {
  plugins:{   
    legend: {
      display: false
            },
            
         },
  scales: {
    y:{
      grid:{
        borderColor:'#fff',        
      }
    },
    // { yAxes: [{ display: false }] }
    // yAxes: [
    //   {
    //     ticks: {
    //       beginAtZero: true,
    //       display: false,
    //     },
    //     grid: {
    //       drawBorder: false,
    //     },
    //     angleLines: {
    //       display: false
    //     }
    //   },
    // ],
    
    

    x: {
      grid: {
        display: false,
        Border: false
      },
    },
    
  
  },
};

export default function App() {
  return (
    <>
    {/* graph-1 */}
    <Grid container>
      <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
      <div>
        <div className={"graph1_title"}>
          <p>Diagnostic Test</p>
        </div>
        <Line data={data} options={options} />
        <div className={"graph1_label_main_div"}>
          <div className={"graph1_label1_div"}>
            <div>
              <div className={"graph1_label1"}></div>
            </div>
            <div className={"graph1_label1_text"}>
              <p>Legend 1</p>
            </div>
          </div>
          <div className={"graph1_label2_div"}>
            <div>
              <div className={"graph1_label2"}></div>
            </div>
            <div className={"graph1_label2_text"}>
              <p>Legend 2</p>
            </div>
          </div>
        </div>
      </div>
      </Grid>
      {/* graph-2 */}
      <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
      <div className={"graph2_title"}>
        <div>
          <p>Diagnostic Test</p>
        </div>
        <Line data={data1} options={options} />

        <div className={"graph2_label_main_div"}>
          <div className={"graph2_label1_div"}>
            <div>
              <div className={"graph2_label1"}></div>
            </div>
            <div className={"graph2_label1_text"}>
              <p>Legend 1</p>
            </div>
          </div>
          <div className={"graph2_label2_div"}>
            <div>
              <div className={"graph2_label2"}></div>
            </div>
            <div className={"graph2_label2_text"}>
              <p>Legend 2</p>
            </div>
          </div>
        </div>
      </div>
      </Grid>
      </Grid>
    </>
  );
}
