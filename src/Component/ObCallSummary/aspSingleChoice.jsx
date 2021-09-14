import React, { Component } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import { pushIntoSingleChoiceArr,getChoiceText } from "../../../Actions/HelperAction"
 class AspSingleChoice extends Component {   
    render() {        
       return (
        <FormControl component="fieldset">
             <RadioGroup 
              row
              name={this.props.question.name}            
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