import {NOTIFICATION} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewNotification = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
        axios.get(URL+"/api/v1/notification",{
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:NOTIFICATION.viewNotification,viewNotificationList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}