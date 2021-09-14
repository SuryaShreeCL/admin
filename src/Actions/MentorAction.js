import {MENTORSCHEDULELIST} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const viewschedule=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    
   
    let role = window.sessionStorage.getItem("role")
    if(role !== "SUPER ADMIN"){
        let mentorDetails = JSON.parse(window.sessionStorage.getItem("mentor"))
        var calenderId = mentorDetails.calendarId
    }
    if(role === "SUPER ADMIN"){
        return dispatch => {
            axios.get(URL+"/api/v1/schedule/listappointmentsall", {
                headers : {
                    "admin" : "yes",
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
                .then(result => {
                   dispatch({type:MENTORSCHEDULELIST.viewSchedule,viewscheduleList:result.data})
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }else{
        return dispatch => {
            axios.get(URL+"/api/v1/schedule/listappointmentsmentor?calendarID="+calenderId, {
                headers : {
                    "admin" : "yes",
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
                .then(result => {
                   dispatch({type:MENTORSCHEDULELIST.viewSchedule,viewscheduleList:result.data})
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    
}
export const getstudentMapping = (id) => {
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/adminuser/studentProduct/"+id,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:MENTORSCHEDULELIST.getstudentMapping,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const getproductdetails = (studentID) => {
    let accessToken = window.sessionStorage.getItem("accessToken")

    let userId = window.sessionStorage.getItem("adminUserId")
    return dispatch => {
        axios.get(URL+"/api/v1/adminuser/product/"+studentID+"/"+userId,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:MENTORSCHEDULELIST.getproductdetails,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const updateallocatementor = (data) => {
    let accessToken = window.sessionStorage.getItem("accessToken")

    let userId = window.sessionStorage.getItem("adminUserId")
    return dispatch => {
        axios.put(URL+"/api/v1/adminuser/"+userId, data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:MENTORSCHEDULELIST.updateallocatementor,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const getmentor = (studentId) => {
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/mentor/"+studentId,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:MENTORSCHEDULELIST.getmentor,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const updatementor = (studentId,productId ,data) => {
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.put(URL+"/api/v1/student/mentor/"+studentId+"/"+productId,data,{
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:MENTORSCHEDULELIST.updatementor,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}