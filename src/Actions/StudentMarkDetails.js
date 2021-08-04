import { STUDENTMARKDETAILS} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'
export const viewstudentmarkdetails=(id)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/students/"+id+"/teststatus", {
            crossDomain: true, 
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
               dispatch({type:STUDENTMARKDETAILS.viewStudentMarkDetails,viewStudentMarkDetailsList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export const viewresettest=(id,executionid)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch => {
        axios.get(URL+"/api/v1/student/"+id+"/testexecution/"+executionid+"/resettest", {
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        })
            .then(result => {
               dispatch({type:STUDENTMARKDETAILS. viewResetTest,viewReseTestList:result.data})
            })
            .catch(error => {
                console.log(error); 
            });
    }
}
export const viewanswers=(id,QuestionSetName)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")

    return dispatch => {
        axios.get(URL+"/api/v1/students/testAnswers/"+id+"/"+QuestionSetName,
         {
            crossDomain: true,
            headers:{
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
            
        })
            .then(result => {
               dispatch({type:STUDENTMARKDETAILS.viewAnswers,viewAnswersList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}
