import {URL} from './URL'
import axios from 'axios'
import { DEPARTMENT } from '../Redux/Action'
export const addDepartment=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/departments",data,{
            crossDomain: true
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
    return dispatch => {
        axios.put(URL+"/api/v1/departments/"+id,data,{
            crossDomain: true
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
    return dispatch => {
        axios.delete(URL+"/api/v1/departments/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:DEPARTMENT.deleteDepatment,deleteDepatment:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}