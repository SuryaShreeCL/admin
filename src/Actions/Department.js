import {URL} from './URL'
import axios from 'axios'
import { DEPARTMENT } from '../Redux/Action'
export const addDepartment=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.post(URL+"/api/v1/departments",data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {                
                dispatch({type: DEPARTMENT.addDepartment,addDepartment:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateNewDepartment=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/departments/"+id,data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:DEPARTMENT.updateDepartment,updateDepartment:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteDepartment=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.delete(URL+"/api/v1/departments/"+id,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:DEPARTMENT.deleteDepatment,deleteDepatment:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}