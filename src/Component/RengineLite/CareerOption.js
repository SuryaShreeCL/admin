import React, { Component } from 'react'
import { FormControl, FormLabel, RadioGroup, Radio,  Checkbox, FormGroup } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {getQuestions} from '../../Actions/Questions'
import {connect} from 'react-redux'

export  class CareerOption extends Component {
    constructor(props){
        super(props);
        this.state={
            questionId:'',
            choices:[],
        }  
    }

    componentDidMount(){
        this.props.getQuestions('CareerOption')
    }
    
    handleChange=(e)=>{
        this.state.choices.pop();
        let choiceId=this.state.choices.concat(e.target.value);
        this.setState({choices:choiceId})
    }

    render() {
        let questionId=this.props.QuestionList.map((q)=>{return q.id});
        let stuData = JSON.parse(window.sessionStorage.getItem("careerOption"));
    if(stuData !=null){
      if (stuData.choices.length !== 0) {
        if(this.state.choices.length===0){this.state.choices = stuData.choices;}
      }
    }
        let CareerOption={
            questionId:questionId[0],
            choices:this.state.choices,
            studentId:window.sessionStorage.getItem('studentId'),
        }
        if(this.state.questionId!=null && this.state.choices!=null){
            window.sessionStorage.setItem("careerOption",JSON.stringify(CareerOption));
        }

        var questionList=this.props.QuestionList;
        return (
            <div>
                {(questionList!='' && questionList!=null && questionList!=undefined)? 
                <>
                {questionList.map((qus)=>(
                    <>
                <div className='item-header'>
                    <label className='item-header-label'>Career Option</label>
                <label className="item-header-question">{qus.question}</label>
                </div>
                <div className='item-body'>
                    <FormControl component="fieldset">
                        <RadioGroup  onChange={this.handleChange.bind(this)} value={(this.state.choices.length !==0)? this.state.choices[0] :null } >
                        {qus.choices.map((option)=>
                            <FormControlLabel
                                control={<Radio color="primary" name={option.text} value={option.id} />}
                                label={option.text}
                            />
                        )}
                        </RadioGroup>
                    </FormControl>
                </div>
                </>
                ))}
                </>:null}
            </div>
        )
    }
}

const mapStateToprops=(state)=>{
    console.log(state.QuestionsReducer.QuestionList);
    return{QuestionList:state.QuestionsReducer.QuestionList}
  }
  
  export default connect(mapStateToprops,{getQuestions})(CareerOption)