import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "./TestResults.css";
import { Line } from "react-chartjs-2";
import { getTestResults } from "../../Actions/ProfileGapAction";
import { connect } from "react-redux";

class TestResultsGraph extends Component {

 constructor(props) {
   super(props);

   this.state = {
    data: [],
    diagnosticTest : {testName : null, sectionScoreModels : []},
    technicalTest : {testName : null, sectionScoreModels : []},
    diagnosticDataModel : {},
    technicalDataModel : {}

    
   }
 }

 componentDidMount(){
  this.props.getTestResults(
    this.props.match.params.studentId,
    this.props.match.params.productId,
    (response) => {
      console.log(response);
      this.setState({
        data: response.data,
        diagnosticTest : response.data.find((item)=>(item.testName === "Diagnostic Test")),
        technicalTest : response.data.find((item)=>(item.testName === "Technical Test")),
      });
      const diagnosticLabel = response.data.find((item)=>(item.testName === "Diagnostic Test")).sectionScoreModels.map((item)=>(item.sectionName))
      const diagnosticStudentScore = response.data.find((item)=>(item.testName === "Diagnostic Test")).sectionScoreModels.map((item)=>(item.studentScore))
      const diagnosticAvgScore = response.data.find((item)=>(item.testName === "Diagnostic Test")).sectionScoreModels.map((item)=>(item.averageScore))
      const data = {
        labels: 
        ["Quant", "Verbal", "Logical","Psychometric"]
        ,
        datasets: [
          {
            label: "First dataset",
            data: diagnosticStudentScore,
            fill: false,
            pointBackgroundColor: "#6495ED",
            // backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#6495ED",
          },
          {
            label: "Second dataset",
            data: diagnosticAvgScore,
            fill: false,
            pointBackgroundColor: "#F08080",
            borderColor: "#F08080",
          },
        ],
      }
      this.setState({
        diagnosticDataModel : data
      })
      // technical test
      const technicalLabel = response.data.find((item)=>(item.testName === "Technical Test")).sectionScoreModels.map((item)=>(item.sectionName.replace("_"," ")))
      const technicalStudentScore = response.data.find((item)=>(item.testName === "Technical Test")).sectionScoreModels.map((item)=>(item.studentScore))
      const technicalAvgScore = response.data.find((item)=>(item.testName === "Technical Test")).sectionScoreModels.map((item)=>(item.averageScore))
      const item = {
        labels: 
        technicalLabel
        ,
        datasets: [
          {
            label: "First dataset",
            data: technicalStudentScore,
            fill: false,
            pointBackgroundColor: "#6495ED",
            // backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#6495ED",
          },
          {
            label: "Second dataset",
            data: technicalAvgScore,
            fill: false,
            pointBackgroundColor: "#F08080",
            borderColor: "#F08080",
          },
        ],
      }
      this.setState({
        technicalDataModel : item
      })
    }
  );
 }




  data1 = {
    labels: ["technicalTest"],
    datasets: [
      {
        label: "First dataset",
        data: [3, 15, 26, 31, 35, 37],
        fill: false,
        pointBackgroundColor: "#6495ED",
        // backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#6495ED",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        pointBackgroundColor: "#F08080",
        borderColor: "#F08080",
      },
    ],
  };

  options = {
   

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
render() {
    console.log(this.state)
    
    return (
      <div>
        <>
          {/* graph-1 */}
          <Grid container>
            <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
              <div>
                <div className={"graph1_title"}>
                  <p>Diagnostic Test</p>
                </div>
                <Line data={this.state.diagnosticDataModel} options={this.options} />
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
                  <p>Technical Test</p>
                </div>
                <Line data={this.state.technicalDataModel} options={this.options} />

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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    testResponse: state.ProfileGapAnalysisReducer.testResults,
  };
};
export default connect(mapStateToProps, {
  getTestResults,
})(TestResultsGraph);

