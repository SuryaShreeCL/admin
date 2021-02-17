import {CAREER_TRACK} from '../Redux/Action'
import axios from 'axios'
import {URL} from './URL'

export const viewAllCareerTrack=()=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/careerTrackApp", {
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

