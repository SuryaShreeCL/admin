import {COURSES} from '../Redux/Action'
import {URL} from './URL'
import axios from 'axios'
import { data } from 'jquery'


export const addCourses=(data)=>{
    return dispatch => {
        axios.post(URL+"/api/v1/courses", data ,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COURSES.AddCourse,addCourses:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const getCourses=()=>{
    return dispatch => {
        axios.get(URL+"/api/v1/courses", {
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

export const getCoursesById=(id)=>{
    return dispatch => {
        axios.get(URL+"/api/v1/courses/"+id, {
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COURSES.GetCourseById,courseList:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export const updateCourse=(id,data)=>{
    return dispatch => {
        axios.put(URL+"/api/v1/courses/"+id,data,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COURSES.UpdateCourse,updateCourse:result.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

// Selva

export const deleteCourse=(id)=>{
    return dispatch => {
        axios.delete(URL+"/api/v1/courses/"+id,{
            crossDomain: true
        })
            .then(result => {
                dispatch({type:COURSES.deleteCourse,deleteCourse:result.data})
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
 
 export const getMarkettingRecommended=(studentId)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
     axios.get(URL+'/api/v1/students/'+ studentId +'/RunRecommendationEngine?type=marketing', {
         crossDomain: true,
         headers : {
            "admin" : "yes",
            "Authorization" : `Bearer ${accessToken}`
        }
     })
         .then(result => {
             dispatch({type:COURSES.GetMarkettingRecommended,MarkettingRecommended:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

 export const getServiceRecommended=(studentId)=>{
    let accessToken = window.sessionStorage.getItem("accessToken")
    return dispatch =>{
     axios.get(URL+'/api/v1/students/'+ studentId +'/RunRecommendationEngine?type=service', {
         crossDomain: true,
         headers : {
            "admin" : "yes",
            "Authorization" : `Bearer ${accessToken}`
        }
     })
         .then(result => {
             dispatch({type:COURSES.GetServiceRecommended,ServiceRecommended:result.data})
         })
         .catch(error => {
             console.log(error);
         });
    }
 }

 // Selva

 export const getPaginateCourse=(pageNumber,size,keyword)=>{
    if(keyword === null || keyword === undefined ){
        keyword='';
    }
    return dispatch =>{        
        axios.get(URL+"/api/v1/courses/page/search?page="+pageNumber+"&size="+size+"&q="+keyword,{
            crossDomain:true,
        })
        .then(result=>{
            dispatch({type:COURSES.getPaginateCourse,courseFilterResult:result.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
}

// students/{studentId}/RunRecommendationEngine?type=marketing/service