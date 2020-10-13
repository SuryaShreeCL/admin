import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { port } from "./RoutePaths";
import { connect } from "react-redux";
import { getStudentsById } from "../Actions/Student";

export class CareerInterestSurveyResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  careerInterestSurveyResults = [
    "Do you like your undergraduate field of study?",
    "How did you choose your undergraduate field of study (Eg. mechanical engineering, computer science engineering, etc.)?",
    "How did you choose your undergraduate field of study (Eg. mechanical engineering, computer science engineering, etc.)? [Other]",
    "From the following, what is your first preference for a career option immediately after graduation?",
    "From the following, what is your first preference for a career option immediately after graduation? [Other]",
    "What would you look for in your ideal job?",
    "Pay",
    "Growth",
    "Applying what you studied",
    "Working with people from different backgrounds",
    "Other",
    "Build a system to automatically recognise different food items",
    "Recruit new employees and design employee benefit program for them",
    "Develop systems where multiple devices that talk to each other",
    "Design User Interface for different mobile applications",
    "Generate more revenue for the bank by bringing in customers",
    "Use design software to model, test, and create products/assemblies",
    "Recognise and analyse patterns in large datasets",
    "Help business grow by improving their sales",
    "Design and develop machines that replace humans for various activities.",
    "Create my own 3D animated film like Kungfu Panda",
    "Analyse stocks and forecast capital markets",
    "Design machinery for large manufacturing companies",
  ];

  componentDidMount() {
    this.props.getStudentsById(this.props.id);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.StudentDetails.length !== 0) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    if (this.props.StudentDetails.length !== 0) {
      var testExecution = [];
      var careerInterestSurvey = this.props.StudentDetails.testExecutions.map(
        (test) => {
          return testExecution.push(test.testExecution);
        }
      );
    }    
    function CareerInterestAnswer(){
      var selectedChoice=[];
      var CareerInterestChoices=[];   
      var YesArr=[];
      var NoArr=[];

      let careerChoiceIterator=testExecution.map((test)=>{
        return test.questionsSet.questions.filter((question)=>question.name==='CareerInterestCategory').map((Careerquestions)=>{
          Careerquestions.choices.map((allOptions)=>{
            return CareerInterestChoices.push(allOptions.text);            
          })
        })
      });

      let selectedChoiceIterator=testExecution.map((test)=>{
        return test.questionsSet.questions.map((qus)=>{
          if(qus.name==='CareerInterestCategory'){
            return test.answers
            .filter(
              (arr) =>
                arr.questionId === qus.id
            )
            .map((answer) => {
              answer.selectedChoices.map((selectChoice)=>{
                return selectedChoice.push(selectChoice.text);
              })
            })   
          }
        })
      });    

      for (let i = 0; i < CareerInterestChoices.length; i++) {
        var matchFlag=false;
        for (let j = 0; j < selectedChoice.length; j++) {
          if(CareerInterestChoices[i] === selectedChoice[j]){
            matchFlag=true;
            break;
          }                        
        }
        if(matchFlag){
          if(YesArr.indexOf(CareerInterestChoices[i])){
            YesArr.push(CareerInterestChoices[i]);
          }
        }else{          
          if(NoArr.indexOf(CareerInterestChoices[i])){
            NoArr.push(CareerInterestChoices[i]);
          }                              
        }        
      }
     
     return [YesArr,NoArr];
    } 

    let CareerInterestQustions=CareerInterestAnswer();    

    function CareerInterestResult(){
        return testExecution.map((test) => {
            return test.questionsSet.questions.map((e) => {                                   
                if(e.name!=='CareerInterestCategory'){
                    return test.answers
                .filter(
                  (arr) =>
                    arr.questionId === e.id 
                )
                .map((answer) => {                              
                    return(
                    <tr>
                        <td>{e.question}</td>
                    {answer.selectedChoices.map((choice)=><td>{choice.text}</td>)}                    
                    </tr>                        
                    )                     
                });                    
                }    
                else{
                 return (
                 <>
                 <tr><td colSpan={2}>{e.question}</td><td></td></tr>                 
                     {
                       CareerInterestQustions[0].map((yes)=>
                     <tr><td>{yes}</td><td>Yes</td></tr>
                       )                  
                     }                                                                              
                     {
                       CareerInterestQustions[1].map((No)=>
                     <tr><td>{No}</td><td>No</td></tr>
                       )                  
                     }            
                 </>
                 );
                }          
            });
          });
    }

    return (
      <div>
        <div className="container">
            <table>
                <tbody>                
          {careerInterestSurvey !== undefined ?            
            <>
            {CareerInterestResult()}                       
            </>
            : null}
            </tbody>
            </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StudentDetails: state.StudentReducer.StudentList,
  };
};

export default connect(mapStateToProps, { getStudentsById })(
  CareerInterestSurveyResults
);

// test.answers.filter((arr)=>arr.questionId=='1d0dcbf1-e34a-4a0f-bf4a-3dd1aac7d610').map((answer)=>{
//     console.log(answer);
//     answer.selectedChoices.map((choice)=>{
//        //  console.log(choice)
//     })
// })
