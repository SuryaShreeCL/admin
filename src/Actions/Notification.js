import { NOTIFICATION} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const viewnotification=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/notification", {
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
               dispatch({type:NOTIFICATION.viewNotification,viewnotificationList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const addnotification=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.post(URL+"/api/v1/notification", data ,{
            crossDomain: true,
            headers:{
                "admin":"yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:NOTIFICATION.addNotification,addnotificationList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const updatenotification=(id,data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.put(URL+"/api/v1/notification",data,{
            crossDomain: true,
            headers:{
                "admin":"yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:NOTIFICATION.updateNotification,updatenotificationList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const deletenotification=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.delete(URL+"/api/v1/notification/"+id,{
            crossDomain: true,
            headers:{
                "admin":"yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:NOTIFICATION.deleteNotification,deletenotificationList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// export const getNotificationPaginate=(pageNumber,size,keyword)=>{
//     let accessToken = window.sessionStorage.getItem("accessToken")
//     if(keyword === null || keyword === undefined ){
//         keyword='';
//     }
//     return dispatch =>{        
//         axios.get(URL+"/api/v1/notification/search?page="+pageNumber+"&size="+size+"&q="+keyword,{
//             crossDomain:true,
//             headers : {
//                 "admin" : "yes",
//                 "Authorization" : `Bearer ${accessToken}`
//             }
//         })
//         .then(result=>{
//             dispatch({type:STUDENT.getNotificationPaginate,NotificationFilterResult:result.data});
//         })
//         .catch(error=>{
//             console.log(error);
//         })
//     }
// }