import React, { Component } from "react";
import CollapseContainer from "../Utils/CollapseContainerHeader";
import CollapseContainerBody from "../Utils/CollapseContainerBody";
import { Grid } from "@material-ui/core";
import { getStudentsById } from "../../../../Actions/Student";
import { connect } from "react-redux";
export class DetailsOfHigherEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      rowKey: [],
    };
  }

  componentDidMount() {
    // this.props.getStudentsById(this.props.id);
  }

  renderStudent = () => {
    let educationObj={
        higherEdu:'None',
        pursueHigherEdu:'none',    
        intendTake:'none',
        alreadTaken:'none',
        testDetail:'none',
        takenGre:{
            takenGre:'none',
            expectedDateOfExam:'none',
            quant:'none',
            verbal:'none',
            awa:'none',
            total:'none',
        },
        
        takenGmat:{
            takenGmat:'none',
            expectedDateOfExam:'none',
            quant:'none',
            verbal:'none',
            awa:'none',
            total:'none',
            integratedReasoning:'none',
        },
        
        takenToelf:{
            takenToelf:'none',
            expectedDateOfExam:'none',
            reading:'none',
            listening:'none',
            speaking:'none',
            writing:'none',
            total:'none',
        },

        takenIelts:{
            takenIelts:'none',
            expectedDateOfExam:'none',
            reading:'none',
            listening:'none',
            speaking:'none',
            writing:'none',
            total:'none',
            gateRank:'none',
            branch:'',
        },

    };
    var studentObj = [
      { title: "Are you planning to pursue Higher Education", value: educationObj.higherEdu },
      {title:"Which of the below fields would you choose to pursue your higher education in?", 
      value:educationObj.pursueHigherEdu},
      {title:"Which of the following tests do you intend to take?",value:educationObj.intendTake},
      {title:"ALREADY TAKEN ?",value:educationObj.alreadTaken},
      {title:"Test Details",value:educationObj.testDetail},

      {title:"Taken GRE?",value:educationObj.takenGre.takenGre},
      {title:"Expected Date of Exam",value:educationObj.takenGre.expectedDateOfExam},
      {title:"Quant",value:educationObj.takenGre.quant},
      {title:"Verbal",value:educationObj.takenGre.verbal},
      {title:"AWA",value:educationObj.takenGre.awa},
      {title:"Total",value:educationObj.takenGre.total},

      {title:"Taken GMAT?",value:educationObj.takenGmat.takenGmat},
      {title:"Expected Date of Exam",value:educationObj.takenGmat.expectedDateOfExam},
      {title:"Quant",value:educationObj.takenGmat.quant},
      {title:"Verbal",value:educationObj.takenGmat.verbal},
      {title:"AWA",value:educationObj.takenGmat.awa},
      {title:"Integrated Reasoning",value:educationObj.takenGmat.integratedReasoning},

      {title:"Taken TOEFL",value:educationObj.takenToelf.takenToelf},
      {title:"Expected Date of Exam",value:educationObj.takenToelf.expectedDateOfExam},
      {title:"Reading",value:educationObj.takenToelf.reading},
      {title:"Listening",value:educationObj.takenToelf.listening},
      {title:"Speaking",value:educationObj.takenToelf.speaking},
      {title:"Writing",value:educationObj.takenToelf.writing},
      {title:"Total",value:educationObj.takenToelf.total},

      {title:"Taken IELTS",value:educationObj.takenIelts.takenIelts},
      {title:"Expected Date of Exam",value:educationObj.takenIelts.expectedDateOfExam},
      {title:"Reading",value:educationObj.takenIelts.reading},
      {title:"Listening",value:educationObj.takenIelts.listening},
      {title:"Speaking",value:educationObj.takenIelts.speaking},
      {title:"Writing",value:educationObj.takenIelts.writing},
      {title:"Total",value:educationObj.takenIelts.total},
      {title:"GATE Rank",value:educationObj.takenIelts.gateRank},
    ];
    return studentObj.map((row)=>{
        return(                                
                  <CollapseContainerBody
                    keyName={row.title}
                    value={row.value}
                    keyRow={"6"}
                    valueRow={"6"}
                  />                                                 
        );
    });
  };
  render() {    
    return (
      <div>
        <CollapseContainer
          title={"Details of Higher Education"}
          onClick={(e) => this.setState({ show: !this.state.show })}
          show={this.state.show}
        >
          <Grid container spacing={3} style={_TableTitle}>
          {(this.props.StudentDetails.length !== 0)? this.renderStudent() :null }
          </Grid>
        </CollapseContainer>
      </div>
    );
  }
}
const _TableTitle = {
  padding: 12,
  label: {
    margin: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    StudentDetails: state.StudentReducer.StudentList,
  };
};

export default connect(mapStateToProps, { getStudentsById })(DetailsOfHigherEducation);
