import {ADMIN} from "../Redux/Action"
import axios from "axios"
import {URL} from "../Actions/URL"
export const adminLogin=(data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/students/validateAdmin",data,{
            crossDomain: true
        })
            .then(result => {
                console.log(result)
                dispatch({type:ADMIN.adminLogin,adminLoginDetails:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}