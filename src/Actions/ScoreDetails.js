import { SCOREDETAILS} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'
export const viewscoredetails=(id)=>{

    return dispatch => {
        axios.get(URL+"/api/v1/students/score/"+id, {
            crossDomain: true,
            
        })
            .then(result => {
               dispatch({type:SCOREDETAILS.viewScoreDetails,viewScoreDetailsList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
