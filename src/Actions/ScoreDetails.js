import { SCOREDETAILS} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'
export const viewscoredetails=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/students/score/"+id, {
            crossDomain: true,
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
            
        })
            .then(result => {
               dispatch({type:SCOREDETAILS.viewScoreDetails,viewScoreDetailsList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
