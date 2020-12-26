import {QUESTIONSET} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewQuestionSet = () =>{
    // keyword=keyword===null? '':keyword
    return dispatch =>{
        axios.get(URL+"/api/v1/testquestionsets")
        .then(result=>{
            console.log(result)
            dispatch({type:QUESTIONSET.viewQuestionSet,viewQuestionSetList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const addQuestionSet=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/testquestionsets",data,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type: QUESTIONSET.addQuestionSet,addQuestionSet:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateQuestionSet=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/testquestionsets",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONSET.updateQuestionSet,updateQuestionSet:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteQuestionSet=(id)=>{
    return dispatch => {
        axios.delete(URL+"/api/v1/testquestionsets/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONSET.deleteQuestionSet,deleteQuestionSet:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}