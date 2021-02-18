import {CAREER_TRACK} from '../Redux/Action'
import axios from 'axios'
import {URL} from './URL'

export const viewAllCareerTrack=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/careerTrackApp/all", {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                dispatch({type:CAREER_TRACK.viewCareerTrack,careerTrackList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const addCareerTrack=(data)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.post(URL+"/api/v1/careerTrackApp",data, {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const updateCareerTrack=(data,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.put(URL+"/api/v1/careerTrackApp",data, {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}


// api/v1/careerTrack/bdbae090-7f14-4f97-8f72-5fea86a0b716/videoset

export const getCareerTrackVideoSet=(id,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/careerTrack/"+id+"/videoset", {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}

export const getCareerTrackVideo=(id,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/careerTrack/videoset/"+id+"/video", {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}

export const createCareerTrackVideoSet=(data,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.post(URL+"/api/v1/careerTrackVideoSet",data, {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}

export const updateCareerTrackVideoSet=(data,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.put(URL+"/api/v1/careerTrackVideoSet",data, {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}

export const createCareerTrackVideo=(data,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.post(URL+"/api/v1/careerTrackVideo",data, {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}

export const updateCareerTrackVideo=(data,callback)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.put(URL+"/api/v1/careerTrackVideo",data, {
            crossDomain: true,
            headers : {
                Admin : "yes",
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
            .then(result => {
                callback(result.data)
                // dispatch({type:CAREER_TRACK.addCareerTrack,addedCareerTrack:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    } 
}


