import {CALL_DETAILS} from '../Redux/Action'
import axios from 'axios'
import {URL} from './URL'

export const updateclientdetails=(studentId,productId,data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/student/onboardingcallsummary/"+studentId+"/"+productId, data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:CALL_DETAILS.updateclientdetails,payload:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}
