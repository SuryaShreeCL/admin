import { COLLEGES } from "../Redux/Action";
import { URL } from "./URL";
import axios from "axios";

// export const getDegree=(name)=>{
//     let accessToken = window.sessionStorage.getItem("accessToken")

//     return dispatch => {
//         axios.get(URL+"/api/v1/colleges/search?name="+name,{
//             crossDomain: true,
//             headers : {
//                 "Authorization" : `Bearer ${accessToken}`,
//                 admin : "yes"
//             }
//         })
//             .then(result => {
//                 dispatch({type:COLLEGES.getCollege,CollegeList:result.data})
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }

// }
