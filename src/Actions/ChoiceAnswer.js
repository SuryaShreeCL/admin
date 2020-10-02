import {CHOICE_ANSWER} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const getChoiceAnswer=(testId)=>{    
    return dispatch => {
        axios.get(URL+"/api/v1/students/personalitytestsummary?testExecutionId="+testId,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type:CHOICE_ANSWER.getChoiceAnswer,ChoiceAnswer:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}