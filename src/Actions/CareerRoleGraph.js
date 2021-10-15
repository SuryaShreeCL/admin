import { CAREER_ROLE_GRAPH } from '../Redux/Action'
import axios from 'axios'
import { URL } from './URL'

export const updateStudentGoals = (studentId, productId, data, callback) => {
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.put(URL + "/api/v1/students/"+studentId+"/product/"+productId+"/pgacareerrolegraph/studentcrggoals", data, {
            crossDomain: true,
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
            .then(result => {
                callback(result)
                dispatch({ type: CAREER_ROLE_GRAPH.updateStudentGoals, payload: result.data })
            })
            .catch(error => {
                callback(error)
                console.log(error);
            });
    }
}

export const getStudentGoals = (studentId,productId,callback) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgacareerrolegraph/goals", {
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
        .then(result=>{
            callback(result)
            dispatch({type:CAREER_ROLE_GRAPH.getStudentGoals,payload:result.data})
        })
        .catch(error=>{
            callback(error)
            console.log(error)
        })
    }
}
export const deleteStudentGoals = (id,callback) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.delete(URL+"/api/v1/pgacareerrolegraph/goals/"+id, {
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
        .then(result=>{
            callback(result)
            dispatch({type:CAREER_ROLE_GRAPH.deleteStudentGoals,payload:result.data})
            console.log(result)
        })
        .catch(error=>{
            console.log(error)
            callback(error)
        })
    }
}
export const getGoalsType = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/pgacareerrolegraph/goals", {
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
        .then(result=>{
            dispatch({type:CAREER_ROLE_GRAPH.getGoalsType,payload:result.data})
            console.log(result)
        })
        .catch(error=>{
            console.log(error)
        })
    }
}
export const getCareerDetails = (studentId,callback) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+studentId+"/careerRole/details", {
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
        .then(result=>{
            callback(result)
            dispatch({type:CAREER_ROLE_GRAPH.getCareerDetails,payload:result.data})
            console.log(result)
        })
        .catch(error=>{
            callback(error)
            console.log(error)
        })
    }
}
export const getGraphDetails = (studentId,callback) =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/students/"+studentId+"/careerRole/graphDetail", {
            headers : {
                "Authorization" : `Bearer ${accessToken}`,
                admin : "yes"
            }
        })
        .then(result=>{
            callback(result)
            dispatch({type:CAREER_ROLE_GRAPH.getGraphDetails,payload:result.data})
            console.log(result)
        })
        .catch(error=>{
            callback(error)
            console.log(error)
        })
    }
}


