import {COURSES} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'

export const getCourses=()=>{
    return dispatch => {
        axios.get("http://services.thecareerlabs.com:8080/api/v1/courses", {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COURSES.GetCourses,courseList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getRecommendedCourses=(TestId,studentId)=>{
   return dispatch =>{
    axios.get(URL+"/api/v1/students/recommendedandsimilar/courses?studentId="+ studentId +"&testExecutionId="+TestId, {
        crossDomain: true
    })
        .then(result => {
            dispatch({type:COURSES.GetRecommendedCouses,recommendedCourseList:result.data})
        })
        .catch(error => {
            console.log(error);
        });
   }
}

export const getPopularCourses=()=>{
    return dispatch =>{
     axios.get(URL+"/api/v1/students/courses/popular", {
         crossDomain: true
     })
         .then(result => {
             dispatch({type:COURSES.GetPopularCourses,popularCourseList:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

 export const getSimilarCourses=(studentId)=>{
    return dispatch =>{
     axios.get(URL+"/api/v1/students/courses/branch?studentId="+studentId, {
         crossDomain: true
     })
         .then(result => {
             dispatch({type:COURSES.GetSimilarCourses,similarCourseList:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }
 

