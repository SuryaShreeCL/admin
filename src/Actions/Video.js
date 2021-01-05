import {VIDEO} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"

export const viewVideo = () =>{
    return dispatch =>{
        axios.get(URL+"/api/v1/videos")
        .then(result=>{
            dispatch({type:VIDEO.viewVideo,viewVideoList:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const addVideo=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/videos",data,{
            crossDomain: true
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
    return dispatch => {
        axios.put(URL+"/api/v1/videos",data,{
            crossDomain: true
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
    return dispatch => {
        axios.delete(URL+"/api/v1/videos/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:VIDEO.deleteVideo,deleteVideo:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
