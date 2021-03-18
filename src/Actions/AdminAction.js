import {ADMIN} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const adminLogin=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/students/validateAdmin",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.adminLogin,adminLoginDetails:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const toRefreshToken=(data)=>{
    let refreshToken = window.sessionStorage.getItem("refreshToken")
    return dispatch => {
        axios.get(URL+"/api/v1/refresh/token",{
            crossDomain: true,
        headers : {
            "x-refresh-token" : refreshToken,
            "admin" : "yes"
        }
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.refreshToken,refreshTokenDetails:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const postStudentAccess=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/students/unifiedAccess",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.studentAccess,studentAccessResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateStudentPersonal=(id,data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/student/"+id+"/personaldetails",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updatePersonalData,updatePersonalResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const viewStudentStatus=(id)=>{
    return dispatch => {
        axios.get(URL+"/studentVerification/view/"+id,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.viewStudentStatus,studentStatusResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateVerificationStatus=(data)=>{
    return dispatch => {
        axios.put(URL+"/studentVerification/update",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.updateVerificationStatus,updateVerificationResponse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
