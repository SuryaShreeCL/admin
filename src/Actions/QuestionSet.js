import {QUESTIONSET} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

// Question Set Actions

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

// Questions Actions

export const viewQuestion = (id) =>{
    // keyword=keyword===null? '':keyword
    return dispatch =>{
        axios.get(URL+"/api/v1/testquestionset/"+id)
        .then(result=>{
            console.log(result.data.questions)
            dispatch({type:QUESTIONSET.viewQuestion,viewQuestionList:result.data.questions});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const addQuestion=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/testquestion",data,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type: QUESTIONSET.addQuestion,addQuestion:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateQuestion=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/testquestion",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONSET.updateQuestion,updateQuestion:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteQuestion=(id)=>{
    return dispatch => {
        axios.delete(URL+"/api/v1/testquestion/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONSET.deleteQuestion,deleteQuestion:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// Choice Action

export const viewChoice = (id) =>{
    console.log(id)
    // keyword=keyword===null? '':keyword
    return dispatch =>{
        axios.get(URL+"/api/v1/choice/"+id,{
            crossDomain : true
        })
        .then(result=>{
            console.log(result)
            dispatch({type:QUESTIONSET.viewChoice,viewChoiceList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const addChoice=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/choice",data,{
            crossDomain: true
        })
            .then(result => {                
                dispatch({type: QUESTIONSET.addChoice,addChoice:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateChoice=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/choice",data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONSET.updateChoice,updateChoice:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteChoice=(id)=>{
    return dispatch => {
        axios.delete(URL+"/api/v1/choice/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:QUESTIONSET.deleteChoice,deleteChoice:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
