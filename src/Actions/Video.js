import {VIDEO} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewVideo = () =>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch =>{
        axios.get(URL+"/api/v1/videos",{
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
        .then(result=>{
            dispatch({type:VIDEO.viewVideo,viewVideoList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const addVideo=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken");

    return dispatch => {
        axios.post(URL+"/api/v1/videos",data,{
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {                
                dispatch({type: VIDEO.addVideo,addVideo:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
export const updateVideo=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch => {
        axios.put(URL+"/api/v1/videos",data,{
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:VIDEO.editVideo,editVideo:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const deleteVideo=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken");
    return dispatch => {
        axios.delete(URL+"/api/v1/videos/"+id,{
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
                dispatch({type:VIDEO.deleteVideo,deleteVideo:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
