import React, { Component } from 'react'
import { FormGroup, Checkbox,FormControlLabel, FormControl } from "@material-ui/core"
import { connect } from 'react-redux';
import { pushIntoMultiChoiceArr } from "../../../Actions/HelperAction"
 class AspMultiChoice extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    handleChange = (e) =>{

        this.props.pushIntoMultiChoiceArr({questionId : e.target.id, answer : JSON.parse(e.target.value)})
    }
    render() {
      
        return (
            <FormControl component="fieldset">
            <FormGroup row>
                {/* {this.props.choices.map(eachChoice=>{ */}
                    return (
                        <FormControlLabel
                        // value={JSON.stringify(eachChoice)}
                    control={<Checkbox 
                        color="primary"
                        size="small"
                        // onChange={this.handleChange}
                        onChange={}
                        //  id={this.props.question.id}
                          />}
                        //  label={eachChoice.text}
                        label={'kjijijio'}
                />
                    )
                {/* })} */}
                </FormGroup>
                </FormControl>    
        )
    }
}

// const mapStateToProps =(state) =>({
//     multiChoiceArr : state.HelperReducer.multiChoiceArr
// })

// export default connect(mapStateToProps,{pushIntoMultiChoiceArr})(AspMultiChoice)
export default AspMultiChoice