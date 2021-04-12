import {MENTORSCHEDULELIST} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const viewschedule=()=>{
    
   
    let role = window.sessionStorage.getItem("role")
    if(role !== "SUPER ADMIN"){
        let mentorDetails = JSON.parse(window.sessionStorage.getItem("mentor"))
        var calenderId = mentorDetails.calendarId
    }
    if(role === "SUPER ADMIN"){
        return dispatch => {
            axios.get(URL+"/api/v1/schedule/listappointmentsall")
                .then(result => {
                   dispatch({type:MENTORSCHEDULELIST.viewSchedule,viewscheduleList:result.data})
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }else{
        return dispatch => {
            axios.get(URL+"/api/v1/schedule/listappointmentsmentor?calendarID="+calenderId)
                .then(result => {
                   dispatch({type:MENTORSCHEDULELIST.viewSchedule,viewscheduleList:result.data})
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    
}
