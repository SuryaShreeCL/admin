import React, { Component } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import { pushIntoSingleChoiceArr,getChoiceText } from "../../../Actions/HelperAction"
 class AspSingleChoice extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleChange = (e) =>{
        console.log(e.target.name)
        let data = JSON.parse(e.target.value)
        console.log(data)
        if(e.target.name === "pursueHigherEducation"){
            this.props.getChoiceText(data.text)
        }
        // this.props.pushIntoSingleChoiceArr({questionId : e.target.id, answer : JSON.parse(e.target.value)})
    }
    render() {
        console.log(this.props.choiceText)
       return (
        <FormControl component="fieldset">

             <RadioGroup 
             row
              name={this.props.question.name} 
            //   value={value} 
              onChange={this.handleChange}
              >
                  {this.props.choices.map(eachChoice=>{
                      return (
                        <FormControlLabel id={this.props.question.id} labelPlacement="end" value={JSON.stringify(eachChoice)} control={<Radio id={this.props.question.id} color="primary" size="small" />} label={eachChoice.text} />
                        
                      )
                  })}
             </RadioGroup>
        </FormControl>
       )
    }
}

// const mapStateToProps =(state) =>({
//     singleChoiceArr : state.HelperReducer.singleChoiceArr,
//     choiceText : state.HelperReducer.choiceText
// })

// export default connect(mapStateToProps,{pushIntoSingleChoiceArr,getChoiceText})(AspSingleChoice)
 
export default AspSingleChoice