import {QUESTIONSET} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

// Question Set Actions

export const viewQuestionSet = () =>{
    // keyword=keyword===null? '':keyword
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch =>{
        axios.get(URL+"/api/v1/testquestionsets", {
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
        })
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.post(URL+"/api/v1/testquestionsets",data,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.put(URL+"/api/v1/testquestionsets",data,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.delete(URL+"/api/v1/testquestionsets/"+id,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    // keyword=keyword===null? '':keyword
    return dispatch =>{
        axios.get(URL+"/api/v1/testquestionset/"+id, {
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
        })
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.post(URL+"/api/v1/testquestion",data,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.put(URL+"/api/v1/questions",data,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.delete(URL+"/api/v1/testquestion/"+id,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    console.log(id)
    // keyword=keyword===null? '':keyword
    return dispatch =>{
        axios.get(URL+"/api/v1/choice/"+id,{
            crossDomain : true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
export const addChoice=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.post(URL+"/api/v1/choice/"+id,data,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
        })
            .then(result => {         
                console.log(result)       
                dispatch({type: QUESTIONSET.addChoice,addChoice:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateChoice=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.put(URL+"/api/v1/choice/"+id,data,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
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
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.delete(URL+"/api/v1/choice/"+id,{
            crossDomain: true,
            headers: {
                admin: "yes",
                Authorization: `Bearer ${accessToken}`,
              },
        })
            .then(result => {
                dispatch({type:QUESTIONSET.deleteChoice,deleteChoice:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
