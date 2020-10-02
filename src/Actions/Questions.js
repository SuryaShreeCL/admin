import {QUESTIONS} from '../Redux/Action'
import axios from 'axios'
import {URL} from './URL'

export const getQuestions=()=>{
    return dispatch => {
        axios.get(URL+"/api/v1/testquestionsets/search?name=RecEenginePersonalityBasedSurvey", {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONS.getQuestions,QuestionList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
